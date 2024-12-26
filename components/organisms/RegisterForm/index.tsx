"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/auth/register", data);

      toast({
        title: "Success!",
        description: response.data.message,
        variant: "default",
        color: "green",
      });

      reset();
      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast({
            title: "Error",
            description: error.response.data.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "An unknown error occurred",
            variant: "destructive",
          });
        }
      }
    }
  };

  const password = watch("password");

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-primary-700"
          >
            Name
          </Label>
          <div className="relative">
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              className="pl-10 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 h-5 w-5" />
          </div>
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-primary-700"
          >
            Email
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
              className="pl-10 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 h-5 w-5" />
          </div>
          {errors.email && (
            <p className="text-destructive text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-primary-700"
          >
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
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
          {errors.password && (
            <p className="text-destructive text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="repeatPassword"
            className="text-primary-700"
          >
            Repeat Password
          </Label>
          <div className="relative">
            <Input
              id="repeatPassword"
              type={showRepeatPassword ? "text" : "password"}
              placeholder="Repeat your password"
              {...register("repeatPassword", {
                required: "Please repeat your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="pl-10 pr-10 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 h-5 w-5" />
            <button
              type="button"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400"
            >
              {showRepeatPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.repeatPassword && (
            <p className="text-destructive text-sm">
              {errors.repeatPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-primary-500 hover:bg-primary-600 text-white"
        >
          Register
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-primary-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary-700 hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
