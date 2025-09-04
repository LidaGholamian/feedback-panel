import { redirect } from "next/navigation";

import { SignInClient } from "@/components/signin/signinClient";

import { auth } from "@/lib/auth";

const Page = async () => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <SignInClient />
  );
};

export default Page;
