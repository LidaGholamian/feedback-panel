"use server";
import { signIn } from "@/lib/auth";
import { executeAction } from "@/lib/executeActions";

export async function credentialsSignInAction(formData: FormData) {
  await executeAction({
    actionFn: async () => {
      await signIn("credentials", formData);
    },
  });
}
