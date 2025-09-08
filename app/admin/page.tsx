"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BUTTON_VARIANT } from "@/components/ui/button/Button.types";
import { SignOut } from "@/components/signout";
import { useRouter } from "next/navigation";

type Comment = {
  id: string;
  content: string;
  fileUrl: string;
  status: string;
  createdAt: string;
  user: { name: string; email: string };
};

export default function AdminComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const sessionRes = await fetch("/api/auth/session");
      const sessionData = await sessionRes.json();

      if (
        !sessionData?.user ||
        sessionData.user.email !== "admin@dorehami.dev"
      ) {
        router.replace("/"); // هدایت به home اگر session نامعتبر است
        return;
      }

      // فقط وقتی session معتبر است، comments را fetch کن
      const res = await fetch("/admin/comments");
      const data = await res.json();
      setComments(data);
      setLoading(false);
    };

    init();
  }, [router]);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    await fetch(`/admin/comments/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const deleteComment = async (id: string) => {
    await fetch(`/admin/comments/${id}`, { method: "DELETE" });
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col justify-between items-center gap-12">
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Content</th>
            <th>File</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((c) => (
            <tr key={c.id} className="border-t border-gray-300">
              <td>{c.user.name}</td>
              <td>{c.user.email}</td>
              <td>{c.content}</td>
              <td>
                {c.fileUrl.endsWith(".pdf") ? (
                  <iframe src={c.fileUrl} width={100} height={100} />
                ) : (
                  <img src={c.fileUrl} width={100} height={100} />
                )}
              </td>
              <td>{c.status}</td>
              <td className="flex gap-2">
                {c.status !== "approved" && (
                  <Button
                    variant={BUTTON_VARIANT.SUCCESS}
                    onClick={() => updateStatus(c.id, "approved")}
                  >
                    Approve
                  </Button>
                )}
                {c.status !== "rejected" && (
                  <Button
                    variant={BUTTON_VARIANT.ERROR}
                    onClick={() => updateStatus(c.id, "rejected")}
                  >
                    Reject
                  </Button>
                )}
                <Button
                  variant={BUTTON_VARIANT.WARNING}
                  onClick={() => deleteComment(c.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <SignOut />
    </div>
  );
}

// import { SignOut } from "@/components/signout";
// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";

// export default async function AdminPage() {
//   const session = await auth();

//   if (!session) redirect("/sign-in");
//   if (!session || session.user.email !== "admin@dorehami.dev")
//     redirect("/sign-in");

//   return (
//     <div className="flex flex-col justify-center items-center w-full gap-20">
//       <h1>Admin page</h1>
//       <p>Welcome, {session.user?.email}</p>
//       <SignOut />
//     </div>
//   );
// }
