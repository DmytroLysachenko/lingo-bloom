"use client";

import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  placeholder: string;
  type?: string; // Default is "text"
}

const FormInput = <T extends FieldValues>({
  id,
  label,
  control,
  errors,
  placeholder,
  type = "text",
}: FormInputProps<T>) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Controller
        name={id}
        control={control}
        rules={{ required: `${label} is required` }}
        render={({ field }) => (
          <Input
            id={id}
            {...field}
            placeholder={placeholder}
            type={type}
          />
        )}
      />
      {errors[id] && (
        <p className="text-destructive text-sm">
          {errors[id]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default FormInput;
