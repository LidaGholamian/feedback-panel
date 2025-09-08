import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface FileUploadProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  accept?: string;
  label?: string;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}
