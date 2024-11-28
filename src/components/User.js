import React, { useEffect } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { saveUserToDB, updateUserInDB } from "../services/userUtils";

const User = () => {
  const { user } = useUser();

  useEffect(() => {
    const handleUser = async () => {
      await saveUserToDB(user);
      await updateUserInDB(user);
    };

    if (user) {
      handleUser();
    }
  }, [user]);

  return (
    <div className="flex items-center gap-4 absolute top-4 right-4 text-gray-800">
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
