"use client";
import { useForm } from "react-hook-form";

import { Button} from "@/components/ui/button";
import { BUTTON_SIZE, BUTTON_VARIANT } from "../ui/button/Button.types";
import { CommentFormProps } from "./commentForm.type";
import { FileUpload } from "../ui/fileUplaod/fileUpload";
import { Input } from "../ui/input/Input";
import { useState } from "react";



export const CommentForm = ({ userEmail }: { userEmail: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormProps>();
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = async (data: CommentFormProps) => {
    if (!data.content.trim()) return;

    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("email", userEmail);

    if (file) {
      formData.append("file", file);
    }

    const res = await fetch("/api/comments/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      reset();
      setFile(null);
    }
  };


  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-full max-w-[480px] p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Comment"
            placeholder="Write Your Comment"
            name="content"
            errors={errors}
            register={register}
            type={"text"}
          />
          <FileUpload
            name="file"
            register={register}
            label="Attachment File (PDF or Image)"
            setFile={setFile}
          />
          {errors.content && (
            <p className="text-red-500">please write a message</p>
          )}
          <Button
            type="submit"
            variant={BUTTON_VARIANT.BLACK}
            size={BUTTON_SIZE.LARGE}
          >
            send message
          </Button>
        </form>
      </div>
    </div>
  );
};
