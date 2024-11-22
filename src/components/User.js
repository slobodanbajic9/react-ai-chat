import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import React from "react";

const User = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-4 absolute top-4 right-4">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <h3>Hello, {user?.firstName || "Guest"}</h3>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default User;
