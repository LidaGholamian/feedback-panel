"use client";
import { SignOut } from "@/components/signout";
import { Button } from "@/components/ui/button";
import { BUTTON_VARIANT } from "@/components/ui/button/Button.types";
import { FileUpload } from "@/components/ui/fileUplaod";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type CommentForm = {
  content: string;
  file: FileList;
};

export default function CommentForm() {
  const { register, handleSubmit, reset } = useForm<CommentForm>();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = async (data: CommentForm) => {
    if (!file) return alert("Please select a file");

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
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
    } else {
      const err = await commentRes.json();
      alert(err.error);
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between items-start gap-12 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Your Comment"
          type="text"
          name="content"
          register={register}
          className="w-full"
        />

        <FileUpload name="file" register={register} label="Upload file" setFile = {setFile} />

        <Button type="submit" variant={BUTTON_VARIANT.PRIMARY}>
          Submit Comment
        </Button>
      </form>
      <SignOut />
    </div>
  );
}
