import { FieldErrors, UseFormRegister } from "react-hook-form";

interface CommonProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  supportText?: string;
  onRemove?: () => void;
  className?: string;
  inputStyle?: string;
}

export interface RHFMode extends CommonProps {
  register: UseFormRegister<any>;
  errors?: FieldErrors<any>;
  value?: never;
  onChange?: never;
}

export interface ManualMode extends CommonProps {
  value: string;
  onChange: (text: string) => void;
  errors?: string;
  register?: never;
}

export type InputProps = RHFMode | ManualMode;
