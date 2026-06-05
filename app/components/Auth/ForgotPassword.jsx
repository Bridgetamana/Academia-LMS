"use client";

import { useState } from "react";
import Link from "next/link";
import { resetPassword } from "@/app/_store/authStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@base-ui/react";
import Logo from "../common/Logo";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await resetPassword(email);

      if (result.success) {
        setIsSuccess(true);
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
              Reset Password
            </h1>
            <p className="text-text-muted font-sans">
              Enter the email address associated with your account and we'll send you a link to reset your password.
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

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 bg-surface border border-border rounded-2xl text-center shadow-sm"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text-main mb-2">Check your email</h3>
              <p className="text-sm text-text-muted mb-6">
                We've sent a password reset link to <span className="font-semibold">{email}</span>.
              </p>
              <Link href="/signin">
                <Button className="w-full py-3.5 px-4 rounded-xl shadow-sm text-sm font-semibold text-text-main bg-white border border-border hover:bg-surface-hover transition-all active:scale-[0.99]">
                  Return to Sign In
                </Button>
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-medium text-text-main ml-1">Email address</label>
                <input
                  type="email"
                  required
                  autoFocus
                  disabled={isSubmitting}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className="w-full p-3.5 text-text-main bg-surface rounded-xl outline-none border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
                  placeholder="jane@example.com"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 py-4 px-4 rounded-xl shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.99] flex justify-center items-center"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  "Send Reset Link"
                )}
              </Button>

              <div className="text-center mt-6">
                <Link href="/signin" className="text-sm text-text-muted hover:text-text-main font-medium transition-colors">
                  ← Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      <div className="hidden lg:flex lg:w-[45%] bg-surface border-l border-border relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="absolute top-[20%] left-[-10%] w-125 h-125 bg-primary/20 rounded-[100%] blur-[120px] opacity-60" />
      </div>
    </div>
  );
};

export default ForgotPassword;