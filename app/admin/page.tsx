import { SignOut } from "@/components/signout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (!session) redirect("/sign-in");
  if (!session || session.user.email !== "admin@dorehami.dev")
    redirect("/sign-in");

  return (
    <div className="flex flex-col justify-center items-center w-full gap-20">
      <h1>Admin page</h1>
      <p>Welcome, {session.user?.email}</p>
      <SignOut />
    </div>
  );
}
