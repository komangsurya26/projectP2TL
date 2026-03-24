"use client";
import { useRouter } from "next/navigation";
import { Zap, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@pln.co.id");
  const [password, setPassword] = useState("password123");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.status === "error") {
        toast.error(data.message);
        return;
      }
      await login(data.user);
      router.push("/dashboard");
    } catch (err) {
      toast.error("Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-16 max-lg:p-8">
        <div className="w-full max-w-[420px]">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-linear-to-br from-electric-blue to-accent rounded-xl flex items-center justify-center text-white">
              <Zap size={26} />
            </div>
            <h1 className="text-2xl font-extrabold text-dark-blue tracking-tight">
              P2TL<span className="text-electric-blue">Analytics</span>
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-dark-blue mb-2">
              Welcome back
            </h2>
            <p className="text-gray-500 mb-8 text-sm">
              Sign in to access the P2TL analysis dashboard
            </p>

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-600 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-[1.5px] border-gray-200 rounded-lg text-sm font-sans text-gray-700 bg-white outline-none transition-all focus:border-electric-blue focus:shadow-[0_0_0_3px_rgba(33,150,243,0.12)] placeholder:text-gray-400"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-600 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-11 border-[1.5px] border-gray-200 rounded-lg text-sm font-sans text-gray-700 bg-white outline-none transition-all focus:border-electric-blue focus:shadow-[0_0_0_3px_rgba(33,150,243,0.12)] placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-gray-400 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 accent-electric-blue cursor-pointer"
                />{" "}
                Remember me
              </label>
              <a
                href="#"
                className="text-sm text-electric-blue font-medium no-underline hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-linear-to-br from-electric-blue to-[#1976D2] text-white border-none rounded-lg text-base font-semibold font-sans cursor-pointer transition-all hover:-translate-y-px hover:shadow-[0_8px_25px_rgba(33,150,243,0.35)] disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>

      {/* Right - Illustration */}
      <div className="flex-1 bg-linear-to-br from-dark-blue via-dark-blue-light to-navy flex items-center justify-center relative overflow-hidden max-lg:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(33,150,243,0.15),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(0,229,255,0.1),transparent_50%)]"></div>
        <img
          src="/login-illustration.png"
          alt="Power grid analytics illustration"
          className="w-[80%] max-w-[500px] relative z-10 rounded-2xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
        />
      </div>
    </div>
  );
}
