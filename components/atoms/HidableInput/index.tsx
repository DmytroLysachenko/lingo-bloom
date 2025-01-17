import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock } from "lucide-react";
import { FieldValues, Path, Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";

interface HidableInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
  placeholder?: string;
  description?: string;
  type?: "text" | "number" | "email";
}

const HidableInput = <TFieldValues extends FieldValues>({
  name,
  label,
  type = "text",
  placeholder = "Input here...",
  control,
  description,
}: HidableInputProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
                type={showPassword ? type || "text" : "password"}
                placeholder={placeholder || "Input here..."}
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
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HidableInput;
