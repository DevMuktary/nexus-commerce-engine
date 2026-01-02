"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials. Please try again.");
        setLoading(false);
      } else {
        // We will make this dynamic later to redirect Customers to /shop and Admins to /admin
        // For now, let's send everyone to the dashboard check
        router.refresh();
        router.push("/admin"); 
      }
    } catch (error) {
      setError("Something went wrong. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6"
      >
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100">
          {/* Header Section */}
          <div className="bg-white p-8 text-center pb-0">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white shadow-lg mb-4"
            >
              <Lock className="h-6 w-6" />
            </motion.div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8 pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-black" />
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 pl-10 text-sm outline-none transition-all focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-black" />
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 pl-10 text-sm outline-none transition-all focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-500"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg disabled:opacity-70 disabled:hover:shadow-none"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="bg-gray-50 p-4 text-center text-xs text-gray-400">
            Protected by Secure Encryption
          </div>
        </div>
      </motion.div>
    </div>
  );
}
