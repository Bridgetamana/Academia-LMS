"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleSignUp } from "@/app/_store/authStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@base-ui/react";
import Logo from "../common/Logo";

const SignUp = () => {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "educator", // Default to educator
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await handleSignUp(
        formData.name,
        formData.email,
        formData.password,
        formData.role
      );

      if (result.success) {
        if (formData.role === "educator") {
          setTimeout(() => router.push("/signin?registered=true"), 1000);
        } else {
          setTimeout(() => router.push("/signin?registered=true"), 1000);
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-background">
      <div className="w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-12 lg:px-24 xl:px-32 relative py-12">
        <div className="absolute top-8 left-6 sm:left-12 lg:left-24">
          <Logo />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md mx-auto"
        >
          <div className="mb-10">
            <h1 className="text-3xl font-serif font-bold text-text-main mb-3">
              Create your account
            </h1>
            <p className="text-text-muted font-sans">
              Already have an account?{" "}
              <Link href="/signin" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 font-medium"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <label className={`cursor-pointer flex flex-col p-4 border rounded-2xl transition-all ${formData.role === 'educator' ? 'border-primary bg-primary-light/30' : 'border-border bg-white hover:border-gray-300'}`}>
                <input type="radio" name="role" value="educator" checked={formData.role === "educator"} onChange={handleInputChange} className="sr-only" />
                <span className="font-semibold text-text-main text-sm">Educator</span>
                <span className="text-xs text-text-muted mt-1">Create an academy</span>
              </label>
              <label className={`cursor-pointer flex flex-col p-4 border rounded-2xl transition-all ${formData.role === 'student' ? 'border-primary bg-primary-light/30' : 'border-border bg-white hover:border-gray-300'}`}>
                <input type="radio" name="role" value="student" checked={formData.role === "student"} onChange={handleInputChange} className="sr-only" />
                <span className="font-semibold text-text-main text-sm">Student</span>
                <span className="text-xs text-text-muted mt-1">Join a classroom</span>
              </label>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-text-main ml-1">Full Name</label>
              <input
                name="name"
                type="text"
                required
                disabled={isSubmitting}
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3.5 text-text-main bg-surface rounded-xl outline-none border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
                placeholder="Jane Doe"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-text-main ml-1">Email address</label>
              <input
                name="email"
                type="email"
                required
                disabled={isSubmitting}
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3.5 text-text-main bg-surface rounded-xl outline-none border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
                placeholder="jane@example.com"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-text-main ml-1">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={isPasswordHidden ? "password" : "text"}
                  required
                  disabled={isSubmitting}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-3.5 text-text-main bg-surface rounded-xl outline-none border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setPasswordHidden(!isPasswordHidden)}
                  disabled={isSubmitting}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors"
                >
                  {isPasswordHidden ? <FiEye className="w-5 h-5" /> : <FiEyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-4 px-4 rounded-xl shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.99] flex justify-center items-center"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                "Create Account"
              )}
            </Button>

            <p className="text-xs text-text-muted text-center mt-6">
              By signing up, you agree to our{" "}
              <Link href="#" className="underline hover:text-text-main transition-colors">Terms of Service</Link>{" "}
              and{" "}
              <Link href="#" className="underline hover:text-text-main transition-colors">Privacy Policy</Link>.
            </p>
          </form>
        </motion.div>
      </div>

      <div className="hidden lg:flex lg:w-[45%] bg-surface border-l border-border relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-primary/5 pattern-dots pattern-border pattern-opacity-10 pattern-size-4"></div>
        <div className="absolute top-[-20%] right-[-10%] w-150 h-150 bg-primary/20 rounded-[100%] blur-[120px] opacity-70" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-lg"
        >
          <div className="bg-white/80 backdrop-blur-xl p-8 border border-border rounded-3xl shadow-2xl relative">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <span className="text-primary text-xl">✨</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-text-main mb-4 leading-snug">
              "Academia transformed how we deliver our curriculum. The interface gets out of the way so students can actually learn."
            </h3>
            <div className="flex items-center gap-4 mt-8">
              <div className="w-10 h-10 rounded-full bg-surface-hover border border-border"></div>
              <div>
                <p className="text-sm font-bold text-text-main">Sarah Jenkins</p>
                <p className="text-xs text-text-muted">Director, Animation Guild</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
