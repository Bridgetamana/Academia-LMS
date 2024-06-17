"use client";

import { useState, useEffect } from "react";
import { AuthLayout } from "@/app/_layouts";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        router.push("/signin");
      }, 5000); // Redirect after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isSubmitted, router]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // form submission
    setIsSubmitted(true);
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-8 max-w-[480px] lg:w-[480px] mx-auto lg:mx-0 text-base md:text-[20px] font-medium">
        {isSubmitted ? (
          <p className="bg-white p-[24px] lg:p-[40px] rounded-md shadow-2xl">
            We sent a confirmation link to your email, click it to continue your
            onboarding process.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 bg-white p-[24px] lg:p-[40px] rounded-md shadow-xl"
          >
            <h2 className="text-[#202020] text-xl font-semibold pb-4">
              Create your account
            </h2>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              required
              autoFocus
              className="w-full p-3 text-[#202020] bg-[#E8E8E8] rounded-md outline-none border focus:border-academia-general focus:bg-white lg:text-sm"
            />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full p-3 text-[#202020] bg-[#E8E8E8] rounded-md outline-none border focus:border-academia-general focus:bg-white lg:text-sm"
            />
            <div className="relative w-full">
              <button
                type="button"
                className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-[#7A8A98]"
                onClick={() => setPasswordHidden(!isPasswordHidden)}
              >
                {isPasswordHidden ? (
                  <FiEye className="w-5 h-5" />
                ) : (
                  <FiEyeOff className="w-5 h-5" />
                )}
              </button>
              <input
                id="password"
                name="password"
                type={isPasswordHidden ? "password" : "text"}
                placeholder="Password"
                required
                className="w-full p-3 text-[#202020] bg-[#E8E8E8] rounded-md outline-none border focus:border-academia-general focus:bg-white lg:text-sm"
              />
            </div>

            <div className="relative w-full">
              <button
                type="button"
                className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-[#7A8A98]"
                onClick={() =>
                  setConfirmPasswordHidden(!isConfirmPasswordHidden)
                }
              >
                {isConfirmPasswordHidden ? (
                  <FiEye className="w-5 h-5" />
                ) : (
                  <FiEyeOff className="w-5 h-5" />
                )}
              </button>
              <input
                id="ConfirmPassword"
                name="ConfirmPassword"
                type={isConfirmPasswordHidden ? "password" : "text"}
                placeholder="Confirm password"
                required
                className="w-full p-3 text-[#202020] bg-[#E8E8E8] rounded-md outline-none border focus:border-academia-general focus:bg-white lg:text-sm"
              />
            </div>

            <select
              required
              className="select select-ghost select-bordered w-full text-[#202020] bg-[#E8E8E8] outline-none border focus:border-academia-general focus:bg-white focus:outline-none"
            >
              <option disabled selected value="">
                Account Type
              </option>
              <option value="educator">Teacher/Educator</option>
              <option value="student">Student</option>
            </select>

            <button
              type="submit"
              className="py-2 bg-academia-general hover:bg-academia-general/90 rounded-md text-base text-white font-semibold "
            >
              Sign Up
            </button>

            <p className="text-[#7A8A98] lg:text-sm max-w-sm">
              By Signing up, you agree to our{" "}
              <Link href="" className="hover:underline text-academia-general">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="" className="hover:underline text-academia-general">
                Privacy Policy
              </Link>
            </p>
            <hr />
            <p className="lg:text-sm">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-academia-general cursor-pointer link link-hover"
              >
                Sign In
              </Link>
            </p>
          </form>
        )}
      </div>
    </AuthLayout>
  );
};

export default SignUp;
