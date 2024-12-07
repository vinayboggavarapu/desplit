"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
function SignOutButton() {
  const handleSignIn = async () => {
    await signOut();
  };
  return (
    <Button variant="default" className="w-full" onClick={handleSignIn}>
      <LogOut className="w-4 h-4 mr-2" />
      Sign Out
    </Button>
  );
}

export default SignOutButton;
