"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleSignIn } from "@/app/_store/authStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@base-ui/react";
import Logo from "../common/Logo";

const SignIn = () => {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Notice we are NOT passing `role` anymore!
      const result = await handleSignIn(formData.email, formData.password);

      if (result.success) {
        const redirectUser =
          result.user.role === "educator" ? "/admin/dashboard" : "/user/dashboard";

        setTimeout(() => {
          router.push(redirectUser);
        }, 200);
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error("Error signing in:", err);
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
              Welcome back
            </h1>
            <p className="text-text-muted font-sans">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary font-medium hover:underline">
                Sign up
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
            <div className="space-y-1">
              <label className="text-sm font-medium text-text-main ml-1">Email address</label>
              <input
                name="email"
                type="email"
                required
                autoFocus
                disabled={isSubmitting}
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3.5 text-text-main bg-surface rounded-xl outline-none border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
                placeholder="jane@example.com"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1 mb-1">
                <label className="text-sm font-medium text-text-main">Password</label>
                <Link
                  href="/forgotpassword"
                  className="text-xs text-primary font-medium hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
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
              className="w-full mt-6 py-4 px-4 rounded-xl shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.99] flex justify-center items-center"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </motion.div>
      </div>

      <div className="hidden lg:flex lg:w-[45%] bg-surface border-l border-border relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-200 h-200 bg-accent/10 rounded-[100%] blur-[150px] opacity-70" />
        <div className="absolute top-[10%] right-[10%] w-200 h-200 bg-primary/20 rounded-[100%] blur-[120px] opacity-70" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-md text-center"
        >
          <div className="p-8 border border-border bg-white/50 backdrop-blur-xl rounded-3xl shadow-xl">
            <h2 className="text-3xl font-serif font-bold text-text-main mb-4">
              The control center for your academy.
            </h2>
            <p className="text-text-muted font-sans leading-relaxed">
              Log in to manage your students, view analytics, and publish new modules to your audience seamlessly.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;