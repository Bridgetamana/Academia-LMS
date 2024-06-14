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
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            autoFocus
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

          <button
            type="submit"
            className="btn btn-ghost bg-academia-primary hover:bg-academia-primary/90 rounded-none text-base md:text-[20px] text-white font-semibold"
          >
            Sign In
          </button>

          <Link
            href="/forgot-password"
            className="hover:underline text-academia-primary w-max"
          >
            Forgot Password?
          </Link>
        </form>

        <Link
          href="/signup"
          className="btn btn-ghost bg-academia-primary hover:bg-academia-primary/90 rounded-none text-base md:text-[20px] text-white font-semibold"
        >
          Sign Up
        </Link>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
