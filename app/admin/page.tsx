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
      try {
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();

        if (
          !sessionData?.user ||
          sessionData.user.email !== "admin@dorehami.dev"
        ) {
          router.replace("/sign-in");
          return;
        }

        const res = await fetch("/api/admin/comments", { cache: "no-store" });
        if (!res.ok) {
          router.replace("/sign-in");
          return;
        }

        const data = await res.json();
        setComments(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        router.replace("/sign-in");
      }
    };

    init();
  }, [router]);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    await fetch(`/api/admin/comments/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const deleteComment = async (id: string) => {
    await fetch(`/api/admin/comments/${id}`, { method: "DELETE" });
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>
      <div className="overflow-x-auto border rounded-lg border-gray-300">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Content</th>
              <th className="p-2 text-left">File</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((c) => (
              <tr key={c.id} className="border-t border-gray-300">
                <td className="p-2">{c.user.email}</td>
                <td className="p-2">{c.content}</td>
                <td className="p-2">
                  <div className="flex flex-col gap-1">
                    <span className="truncate max-w-[200px]">
                      {c.fileUrl.split("/").pop()}
                    </span>
                    <a
                      href={c.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline"
                      download
                    >
                      Download
                    </a>
                  </div>
                </td>
                <td className="p-2">{c.status}</td>
                <td className="p-2 flex flex-wrap gap-2">
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
      </div>
      <div className="mt-6">
        <SignOut />
      </div>
    </div>
  );
}
