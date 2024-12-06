"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
function SignOutButton() {
  const handleSignIn = async () => {
    await signOut();
  };
  return (
    <Button variant="default" className="w-full" onClick={handleSignIn}>
      Sign Out
    </Button>
  );
}

export default SignOutButton;
