"use client";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/input";
import { Button} from "@/components/ui/button";
import { BUTTON_SIZE, BUTTON_VARIANT } from "../ui/button/Button.types";
import { CommentFormProps } from "./commentForm.type";

export const CommentForm = ({ userEmail }: { userEmail: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormProps>();

  const onSubmit = async (data: CommentFormProps) => {
    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("email", userEmail);
    if (data.file && data.file.length > 0) {
      formData.append("file", data.file[0]);
    }

    const res = await fetch("/api/comment/upload", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    console.log(json);
  };

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-full max-w-[480px] p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Comment"
            type="text"
            placeholder="Write Your Comment"
            name="content"
            register={register}
            errors={errors}
            required
          />
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700 cursor-pointer">
              Attach File
            </label>
            <input
              type="file"
              {...register("file")}
              accept=".pdf,image/*"
              className="border border-gray-300 rounded-md p-2 cursor-pointer"
            />
          </div>
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
