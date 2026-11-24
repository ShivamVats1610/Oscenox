const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const firebaseLookup = async (idToken) => {
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FIREBASE_API_KEY}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idToken }),
  });
  if (!response.ok) throw new Error("Invalid Firebase token");
  return (await response.json()).users?.[0];
};

/* ===========================================
   GENERATE JWT
=========================================== */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/* ===========================================
   LOGOUT
=========================================== */
exports.logout = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "lax",
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};

exports.firebaseSession = async (req, res) => {
  try {
    const { idToken, name } = req.body;
    if (!idToken) return res.status(400).json({ message: "Firebase token is required" });
    const firebaseUser = await firebaseLookup(idToken);
    if (!firebaseUser?.localId || !firebaseUser.email) return res.status(401).json({ message: "Firebase account has no email" });

    let user = await User.findOne({ $or: [{ firebaseUid: firebaseUser.localId }, { email: firebaseUser.email.toLowerCase() }] });
    if (!user) user = await User.create({ firebaseUid: firebaseUser.localId, name: name || firebaseUser.displayName || firebaseUser.email.split("@")[0], email: firebaseUser.email.toLowerCase() });
    else if (!user.firebaseUid) { user.firebaseUid = firebaseUser.localId; await user.save(); }
    if (user.isBlocked || user.isDeleted) return res.status(403).json({ message: "This account is unavailable" });

    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000 })
      .json({ success: true, user: { _id: user._id, name: user.name, email: user.email, role: user.role, profileImage: user.profileImage || null } });
  } catch (error) {
    console.error("Firebase session error:", error.message);
    res.status(401).json({ message: "Firebase authentication failed" });
  }
};

/* ===========================================
   SIGNUP
=========================================== */
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // true in production
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        success: true,
        user: {
          _id: user._id, // 🔥 important
          name: user.name,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage || null,
        },
      });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===========================================
   LOGIN
=========================================== */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        user: {
          _id: user._id, // 🔥 must match frontend
          name: user.name,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage || null,
        },
      });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
