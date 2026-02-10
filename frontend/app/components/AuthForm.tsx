"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

type AuthType = "login" | "signup";

interface AuthFormProps {
  type: AuthType;
}

interface FormState {
  name?: string;
  email: string;
  password: string;
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const isSignup = type === "signup";

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/${isSignup ? "signup" : "login"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Authentication failed");

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">

      {/* 🌄 BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/table-scene.jpg')",
        }}
      />

      {/* 🌑 DARK CINEMATIC OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 🎬 AUTH CARD POSITIONED ABOVE TABLE */}
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

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/40 border border-[#c6a75e]/30 rounded-lg text-white focus:outline-none focus:border-[#c6a75e]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#c6a75e] text-black font-semibold rounded-lg hover:bg-[#b8964d] transition"
            >
              {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <a href="/login" className="text-[#c6a75e] hover:underline">
                  Login
                </a>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <a href="/signup" className="text-[#c6a75e] hover:underline">
                  Sign up
                </a>
              </>
            )}
          </p>
        </div>
      </div>

      {/* 🎞️ CINEMATIC SWIPE-UP ANIMATION */}
      <style jsx>{`
        .auth-card {
          animation: riseFromTable 1s ease-out forwards;
          transform-origin: bottom center;
        }

        @keyframes riseFromTable {
          0% {
            opacity: 0;
            transform: translateY(120px) scale(0.92) rotateX(12deg);
          }
          60% {
            opacity: 1;
            transform: translateY(-10px) scale(1.01);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
