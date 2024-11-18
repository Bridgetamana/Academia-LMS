import ForgotPassword from "@/app/components/Auth/ForgotPassword";
import React from "react";

export const metadata = {
  title: "Forgot Password",
  description: "Reset Password",
};

const page = () => {
  return <ForgotPassword />;
};

export default page;
