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
            className="flex flex-col gap-6 bg-white p-[24px] lg:p-[40px] rounded-md shadow-xl"
          >
            <h2 className="text-[#080808] text-xl font-medium pb-4">
              Create a free account
            </h2>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              required
              autoFocus
              className="w-full p-3 text-[#202020] bg-[#E8E8E8] rounded-md outline-none border focus:border-academia-primary text-sm"
            />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full p-3 text-[#202020] bg-[#E8E8E8] rounded-md outline-none border focus:border-academia-primary text-sm"
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
                className="w-full p-3 text-[#202020] bg-[#E8E8E8] rounded-md outline-none border focus:border-academia-primary text-sm"
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
                className="w-full p-3 text-[#202020] bg-[#E8E8E8] rounded-md outline-none border focus:border-academia-primary text-sm"
              />
            </div>

            <button
              type="submit"
              className="py-2 bg-academia-primary hover:bg-academia-primary/90 rounded-full text-base text-white font-semibold "
            >
              Sign Up
            </button>

            <p className="text-[#7A8A98] text-[18px] max-w-sm">
              By Signing up, you agree to our{" "}
              <Link href="" className="hover:underline text-academia-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="" className="hover:underline text-academia-primary">
                Privacy Policy
              </Link>
            </p>
            <hr />
            <p className="text-sm">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-academia-primary cursor-pointer link link-hover"
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
