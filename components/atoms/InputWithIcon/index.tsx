import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type LucideIcon } from "lucide-react";
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  RegisterOptions,
  Path,
} from "react-hook-form";

interface InputWithIconProps<TFieldValues extends FieldValues> {
  id: Path<TFieldValues>;
  label: string;
  type: string;
  placeholder: string;
  icon: LucideIcon;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  validation?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
}

const InputWithIcon = <TFieldValues extends FieldValues>({
  id,
  label,
  type,
  placeholder,
  icon: Icon,
  register,
  errors,
  validation,
}: InputWithIconProps<TFieldValues>) => {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={id}
        className="text-primary-700"
      >
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id, validation)}
          className="pl-10 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
        />
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 h-5 w-5" />
      </div>
      {errors[id] && (
        <p className="text-destructive text-sm">
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  );
};

export default InputWithIcon;
