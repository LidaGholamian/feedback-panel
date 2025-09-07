"use client";
import React, { useState } from "react";
import { Button } from "../button";
import { BUTTON_VARIANT } from "../button/Button.types";
import { FieldValues} from "react-hook-form";
import { FileUploadProps } from "./fileUpload.types";


export function FileUpload<TFormValues extends FieldValues>({
  name,
  register,
  accept = ".pdf,image/*",
  label = 'choose file',
}: FileUploadProps<TFormValues>) {
  const [fileName, setFileName] = useState<string>("");

  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 font-semibold text-gray-700 cursor-pointer"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        type="file"
        accept={accept}
        {...register(name)}
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setFileName(e.target.files[0].name);
          }
        }}
      />

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant={BUTTON_VARIANT.SURFACE}
          onClick={() => document.getElementById(name)?.click()}
        >
          choose file
        </Button>
        {fileName && (
          <span className="text-sm text-gray-600 truncate max-w-[200px]">
            {fileName}
          </span>
        )}
      </div>
    </div>
  );
}
