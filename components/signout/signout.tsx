'use client'

import { signOut } from "next-auth/react"
import { Button } from "../ui/button";
import { BUTTON_SIZE, BUTTON_VARIANT } from "../ui/button/Button.types";
import { useRouter } from "next/navigation";


export const SignOut= () => {
  const router = useRouter();
    const handleSignout = async () => {

      await signOut({ redirect: false });
      router.replace("/sign-in");
    };

    return (
      <div className="flex justify-center">
        <Button
          variant={BUTTON_VARIANT.ERROR}
          size={BUTTON_SIZE.MEDIUM}
          onClick={handleSignout}
        >
          Sign Out
        </Button>
      </div>
    );
}
