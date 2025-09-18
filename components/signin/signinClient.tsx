"use client";
import { Button } from "@/components/ui/button";
import {
  BUTTON_SIZE,
  BUTTON_VARIANT,
} from "@/components/ui/button/Button.types";
import { signIn } from "next-auth/react";
import { SigninForm } from "./signinForm";

export const SignInClient = () => {
  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <h1 className="font-bold text-2xl text-center">Sign In</h1>

      <div className="flex justify-center items-center">
        <Button
          variant={BUTTON_VARIANT.BLACK}
          size={BUTTON_SIZE.MEDIUM}
          onClick={() => signIn("keycloak", { callbackUrl: "/" })}
        >
          Sign in with Dorehami Account
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>

      <SigninForm />
    </div>
  );
};
