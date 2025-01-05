import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock } from "lucide-react";
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  RegisterOptions,
  Path,
} from "react-hook-form";

interface HiddableInputProps<TFieldValues extends FieldValues> {
  id: Path<TFieldValues>;
  label: string;
  placeholder: string;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  validation?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
}

const HiddableInput = <TFieldValues extends FieldValues>({
  id,
  label,
  placeholder,
  register,
  errors,
  validation,
}: HiddableInputProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState(false);

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
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register(id, validation)}
          className="pl-10 pr-10 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
        />
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 h-5 w-5" />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      {errors[id] && (
        <p className="text-destructive text-sm">
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  );
};

export default HiddableInput;
