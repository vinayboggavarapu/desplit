"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
function SignInButton() {
  const handleSignIn = async () => {
    await signIn("google");
  };
  return (
    <Button variant="default" className="w-full" onClick={handleSignIn}>
      Sign in with{" "}
      <span>
        <Image
          src={"/auth/google.png"}
          className="ml-2 object-cover"
          alt="google"
          width={24}
          height={24}
        />
      </span>
    </Button>
  );
}

export default SignInButton;
