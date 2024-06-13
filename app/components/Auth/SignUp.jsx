"use client";

import { useState } from "react";
import { AuthLayout } from "@/app/_layouts";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignUp = () => {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(true);

  const [isSubmitted, setIsSubmitted] = useState(false);

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
            className="flex flex-col gap-6 bg-white p-[24px] lg:p-[40px] rounded-md shadow-2xl"
          >
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              required
              autoFocus
              className="w-full p-3 text-[#7A8A98] bg-[#7A8A983D] rounded-none outline-none border focus:border-black"
            />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full p-3 text-[#7A8A98] bg-[#7A8A983D] rounded-none outline-none border focus:border-black"
            />
            <div className="relative w-full">
              <button
                type="button"
                className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-[#7A8A98]"
                onClick={() => setPasswordHidden(!isPasswordHidden)}
              >
                {isPasswordHidden ? (
                  <FiEye className="w-6 h-6" />
                ) : (
                  <FiEyeOff className="w-6 h-6" />
                )}
              </button>
              <input
                id="password"
                name="password"
                type={isPasswordHidden ? "password" : "text"}
                placeholder="Password"
                required
                className="w-full pr-12 pl-3 py-3 text-[#7A8A98] bg-[#7A8A983D] rounded-none outline-none border focus:border-black"
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
                  <FiEye className="w-6 h-6" />
                ) : (
                  <FiEyeOff className="w-6 h-6" />
                )}
              </button>
              <input
                id="ConfirmPassword"
                name="ConfirmPassword"
                type={isConfirmPasswordHidden ? "password" : "text"}
                placeholder="Confirm password"
                required
                className="w-full pr-12 pl-3 py-3 text-[#7A8A98] bg-[#7A8A983D] rounded-none outline-none border focus:border-black"
              />
            </div>

            <button
              type="submit"
              className="btn btn-ghost bg-docify-primary hover:bg-docify-primary/90 rounded-none text-base md:text-[20px] text-white font-semibold"
            >
              Sign Up
            </button>

            <p className="text-[#7A8A98] text-[18px] max-w-sm">
              By Signing up, you agree to our{" "}
              <Link href="" className="hover:underline text-docify-teal">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="" className="hover:underline text-docify-teal">
                Privacy Policy
              </Link>
            </p>
          </form>
        )}

        <Link
          href="/signin"
          className="btn btn-ghost bg-docify-teal hover:bg-docify-teal/90 rounded-none text-base md:text-[20px] text-white font-semibold"
        >
          Sign In
        </Link>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
