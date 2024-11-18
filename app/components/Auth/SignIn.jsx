"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleSignIn } from "@/app/_store/authStore";
import { message } from "antd";

const SignIn = () => {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student"
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await handleSignIn(formData.email, formData.password, formData.role);

      if (result.success) {
        message.success(result.message);
        
        const redirectUser = result.user.role === 'educator' 
          ? '/admin/dashboard'
          : '/user/dashboard';
          
        setTimeout(() => {
          router.push(redirectUser);
        }, 200);
      } else {
        setError(result.message);
        message.error(result.message);
      }
    } catch (err) {
      console.error("Error signing in:", error);
      setError(error.message);
      message.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[400px] w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-neutral-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Or{" "}
            <Link
              href="/signup"
              className="font-medium text-primary hover:underline"
            >
              create a new account
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow-xl">
          <div className="space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={formData.role === "student"}
                  onChange={handleInputChange}
                  className="form-radio text-primary"
                />
                <span className="text-sm text-neutral-700">Student</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="educator"
                  checked={formData.role === "educator"}
                  onChange={handleInputChange}
                  className="form-radio text-primary"
                />
                <span className="text-sm text-neutral-700">Educator</span>
              </label>
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                autoFocus
                disabled={isSubmitting}
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 text-neutral-900 bg-neutral-100 rounded-md outline-none border border-neutral-300 focus:border-primary focus:bg-white lg:text-sm disabled:opacity-50"
              />
            </div>

            <div className="relative">
              <input
                name="password"
                type={isPasswordHidden ? "password" : "text"}
                placeholder="Password"
                required
                disabled={isSubmitting}
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 text-neutral-900 bg-neutral-100 rounded-md outline-none border border-neutral-300 focus:border-primary focus:bg-white lg:text-sm disabled:opacity-50"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                onClick={() => setPasswordHidden(!isPasswordHidden)}
                disabled={isSubmitting}
              >
                {isPasswordHidden ? (
                  <FiEye className="w-5 h-5" />
                ) : (
                  <FiEyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link
              href="/forgotpassword"
              className="text-sm text-primary hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-sm" />
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;