import React from "react";
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-700">
    <SignIn />
  </div>
);
export default SignInPage;
