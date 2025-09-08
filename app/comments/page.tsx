"use client";
import { SignOut } from "@/components/signout";
import { Button } from "@/components/ui/button";
import { BUTTON_VARIANT } from "@/components/ui/button/Button.types";
import { FileUpload } from "@/components/ui/fileUplaod";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type CommentForm = {
  content: string;
  file: FileList;
};

type Comment = {
  id: string;
  content: string;
  fileUrl: string;
  user: { name: string; email: string };
};

export default function CommentForm() {
  const { register, handleSubmit, reset } = useForm<CommentForm>();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    try {
      const res = await fetch("/api/comments", { cache: "no-store" });
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const onSubmit = async (data: CommentForm) => {
    if (!file) return alert("Please select a file");

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadRes = await fetch("/api/comments/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();

      if (!uploadData.filePath) {
        setUploading(false);
        return alert("File upload failed");
      }

      const commentRes = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: data.content,
          fileUrl: uploadData.filePath,
        }),
      });

      if (commentRes.ok) {
        alert("Comment submitted!");
        reset();
        setFile(null);
        setUploading(false);
        fetchComments();
      } else {
        const err = await commentRes.json();
        alert(err.error);
        setUploading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between items-start gap-12 w-full">
      <div className="w-[550px] flex flex-col gap-4">
        {comments.length ? (
          comments.map((c) => (
            <div key={c.id} className="p-3 border rounded shadow-sm bg-white">
              <p className="font-semibold">
                {c.user.name} ({c.user.email})
              </p>
              <p>{c.content}</p>
              {c.fileUrl && (
                <a
                  href={c.fileUrl}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  {c.fileUrl.split("/").pop()}
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      {/* فرم ارسال کامنت */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[550px]">
        <Input
          label="Your Comment"
          type="text"
          name="content"
          register={register}
          className="w-full"
        />

        <FileUpload
          name="file"
          register={register}
          label="Upload file"
          setFile={setFile}
        />

        <Button type="submit" variant={BUTTON_VARIANT.PRIMARY}>
          Submit Comment
        </Button>
      </form>

      <SignOut />
    </div>
  );
}
