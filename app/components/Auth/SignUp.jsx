"use client";

import { useState } from "react";
import { AuthLayout } from "@/app/_layouts";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import { message } from "antd";
import useAuthStore from "@/app/_store/authStore";

const SignUp = () => {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(true);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [role, setRole] = useState("");
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, ConfirmPassword } = event.target.elements;

    if (password.value !== ConfirmPassword.value) {
      message.error("Passwords do not match");
      return;
    }

    if (password.value.length <= 5) {
      message.error("Password must be longer than 5 characters.");
    } else if (!/\d/.test(password.value)) {
      message.error("Password must contain at least one number.");
    } else {
      message.error("");
    }

    setIsSubmitting(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );

      const user = userCredential.user;
      await updateProfile(user, { displayName: name.value });
      await setDoc(doc(db, "users", user.uid), {
        role,
        name: name.value,
        email: email.value,
      });

      setUser(user, role, name.value); // Update to include displayName
      setIsSubmitted(true);
      message.success("Account created successfully!");
      setTimeout(() => {
        router.push("/signin");
      }, 5000);
    } catch (error) {
      console.error("Error signing up:", error);
      message.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-20 flex flex-col gap-8 max-w-[480px] lg:w-[480px] mx-auto lg:mx-0 text-base md:text-[20px] font-medium">
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
            placeholder="Full Name"
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
              onClick={() => setConfirmPasswordHidden(!isConfirmPasswordHidden)}
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
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
            className="py-2 flex gap-2 items-center justify-center bg-academia-general hover:bg-academia-general/90 rounded-md text-base text-white font-semibold "
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <span className="loading loading-spinner loading-sm" />
            )}
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
        {/* )} */}
      </div>
    </AuthLayout>
  );
};

export default SignUp;
