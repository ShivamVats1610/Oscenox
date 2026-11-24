"use client";

import {
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type AuthType = "login" | "signup";

interface AuthFormProps {
  type: AuthType;
}

interface FormState {
  name?: string;
  email: string;
  password: string;
}

// ✅ Base URL from env
const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const { setUser } = useAuth();

  const isSignup = type === "signup";

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const credential = isSignup
        ? await createUserWithEmailAndPassword(firebaseAuth, form.email, form.password)
        : await signInWithEmailAndPassword(firebaseAuth, form.email, form.password);

      if (isSignup && form.name) await updateProfile(credential.user, { displayName: form.name });
      const idToken = await credential.user.getIdToken();
      const res = await fetch(
        `${BASE_URL}/api/auth/firebase-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ idToken, name: form.name }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.user) {
        throw new Error(data.message || "Authentication failed");
      }

      setUser(data.user);

      router.replace("/");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/table-scene.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Card */}
      <div className="relative z-10 flex items-center justify-center w-full px-4 pt-24">
        <div className="auth-card w-full max-w-md bg-black/55 backdrop-blur-xl border border-[#c6a75e]/40 rounded-2xl p-8 shadow-[0_50px_140px_rgba(0,0,0,0.9)]">

          <h1 className="text-3xl font-serif text-[#c6a75e] text-center mb-6 tracking-wide">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>

          {error && (
            <p className="bg-red-500/10 text-red-400 text-sm p-3 rounded mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/40 border border-[#c6a75e]/30 rounded-lg text-white focus:outline-none focus:border-[#c6a75e]"
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/40 border border-[#c6a75e]/30 rounded-lg text-white focus:outline-none focus:border-[#c6a75e]"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                minLength={6}
                required
                onChange={handleChange}
                className="w-full px-4 py-3 pr-12 bg-black/40 border border-[#c6a75e]/30 rounded-lg text-white focus:outline-none focus:border-[#c6a75e]"
              />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c6a75e]">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#c6a75e] text-black font-semibold rounded-lg hover:bg-[#b8964d] transition"
            >
              {loading
                ? "Please wait..."
                : isSignup
                ? "Sign Up"
                : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-[#c6a75e] hover:underline"
                >
                  Login
                </a>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <a
                  href="/signup"
                  className="text-[#c6a75e] hover:underline"
                >
                  Sign up
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
