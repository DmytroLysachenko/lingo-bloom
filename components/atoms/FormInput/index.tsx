"use client";

import { Input } from "@components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";

interface FormInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
  placeholder: string;
  description?: string;
  type?: "text" | "number" | "email";
}

const FormInput = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  placeholder,
  description,
  type = "text",
}: FormInputProps<TFieldValues>) => {
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-primary-700">{label}</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  id={name}
                  type={type || "text"}
                  placeholder={placeholder || "Input here..."}
                  className="pl-10 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default FormInput;
