
import { CommentForm } from "@/components/comments/commentForm";
import { SignOut } from "@/components/signout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CommentPage() {
  const session = await auth();

  if (!session) redirect("/sign-in");
  if (!session || session.user.email !== "user@dorehami.dev")
    redirect("/sign-in");

  return (
    <div>
      <h1>Comment Page</h1>
      <p>Welcome, {session.user?.email}</p>
      <CommentForm userEmail={session.user.email} />
      <SignOut />
    </div>
  );
}
