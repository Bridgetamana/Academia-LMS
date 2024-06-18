"use client";

import { useState } from "react";
import { AuthLayout } from "@/app/_layouts";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import { message } from "antd";
import useAuthStore from "@/app/_store/authStore";

const SignIn = () => {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    setIsSubmitting(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );

      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const { role } = userData;
        setUser(user, role);

        if (role === "educator") {
          router.push("/admin/dashboard");
        } else if (role === "student") {
          router.push("/user/dashboard");
        } else {
          message.error("Unknown user role.");
        }
      } else {
        message.error("User data not found.");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      message.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-8 max-w-[480px] lg:w-[480px] mx-auto lg:mx-0 text-base md:text-[20px] font-medium">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 bg-white p-[24px] lg:p-[40px] rounded-md shadow-2xl"
        >
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
            className="py-2 flex gap-2 items-center justify-center bg-academia-general hover:bg-academia-general/90 rounded-md text-base text-white font-semibold "
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <span className="loading loading-spinner loading-sm" />
            )}
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
