"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleSignUp } from "@/app/_store/authStore";
import { message } from "antd";

const SignUp = () => {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (formData.name.length < 2) {
      newErrors.name = "Full name must be at least 2 characters";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!formData.role) {
      newErrors.role = "Please select an account type";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!validateForm()) {
      message.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await handleSignUp(
        formData.name,
        formData.email,
        formData.password,
        formData.role
      );

      if (result.success) {
        message.success(result.message);
        setTimeout(() => {
          router.push("/signin");
        }, 1000);
      } else {
        setError(result.message);
        message.error(result.message);
      }
    } catch (err) {
      setError(error.message);
      message.error(error.message);
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[480px] w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-neutral-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Or{" "}
            <Link
              href="/signin"
              className="font-medium text-primary hover:underline"
            >
              sign in to your account
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow-xl"
        >
          <div className="space-y-4">
            <div>
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                required
                autoFocus
                disabled={isSubmitting}
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-3 text-neutral-900 bg-neutral-100 rounded-md outline-none border ${
                  errors.name ? "border-red-500" : "border-neutral-300"
                } focus:border-primary focus:bg-white lg:text-sm disabled:opacity-50`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                disabled={isSubmitting}
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-3 text-neutral-900 bg-neutral-100 rounded-md outline-none border ${
                  errors.email ? "border-red-500" : "border-neutral-300"
                } focus:border-primary focus:bg-white lg:text-sm disabled:opacity-50`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
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
                className={`w-full p-3 text-neutral-900 bg-neutral-100 rounded-md outline-none border ${
                  errors.password ? "border-red-500" : "border-neutral-300"
                } focus:border-primary focus:bg-white lg:text-sm disabled:opacity-50`}
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
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="relative">
              <input
                name="confirmPassword"
                type={isPasswordHidden ? "password" : "text"}
                placeholder="Confirm Password"
                required
                disabled={isSubmitting}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full p-3 text-neutral-900 bg-neutral-100 rounded-md outline-none border ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-neutral-300"
                } focus:border-primary focus:bg-white lg:text-sm disabled:opacity-50`}
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
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div>
              <select
                name="role"
                required
                value={formData.role}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className={`w-full p-3 text-neutral-900 bg-neutral-100 rounded-md outline-none border ${
                  errors.role ? "border-red-500" : "border-neutral-300"
                } focus:border-primary focus:bg-white lg:text-sm disabled:opacity-50`}
              >
                <option value="">Select Account Type</option>
                <option value="educator">Teacher/Educator</option>
                <option value="student">Student</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-sm" />
                <span>Creating Account...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="text-sm text-neutral-600 text-center">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
