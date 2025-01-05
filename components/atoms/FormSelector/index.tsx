"use client";

import { Label } from "@components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

interface FormSelectorProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  options: { value: string; name: string }[];
  placeholder: string;
}
const FormSelector = <T extends FieldValues>({
  id,
  label,
  control,
  errors,
  options,
  placeholder,
}: FormSelectorProps<T>) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <SelectTrigger id={id}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  value={option.value}
                  key={option.name}
                >
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

export default FormSelector;
