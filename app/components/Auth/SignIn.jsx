"use client";

import { useState } from "react";
import { AuthLayout } from "@/app/_layouts";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignIn = () => {
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  return (
    <AuthLayout>
      <div className="flex flex-col gap-8 max-w-[480px] lg:w-[480px] mx-auto lg:mx-0 text-base md:text-[20px] font-medium">
        <form className="flex flex-col gap-6 bg-white p-[24px] lg:p-[40px] rounded-md shadow-2xl">
          <h2 className="text-[#202020] text-xl font-semibold pb-4">
            Welcome back!
          </h2>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            autoFocus
            className="w-full p-3 text-[#202020] bg-[#E8E8E8] rounded-md outline-none border focus:border-academia-general text-sm"
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
              className="w-full p-3 text-[#202020] bg-[#E8E8E8] rounded-md outline-none border focus:border-academia-general text-sm"
            />
          </div>

          <button
            type="submit"
            className="py-3 bg-academia-general hover:bg-academia-general/90 rounded-md text-base text-white font-semibold "
          >
            Sign In
          </button>

          <Link
            href="/forgot-password"
            className="text-sm text-academia-general link link-hover w-max"
          >
            Forgot Password?
          </Link>

          <hr />
          <p className="text-sm">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/signup"
              className="text-academia-general cursor-pointer link link-hover"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
