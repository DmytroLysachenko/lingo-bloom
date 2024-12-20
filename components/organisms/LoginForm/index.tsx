"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Github,
  ChromeIcon as Google,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react";

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission here
  };

  const handleGitHubLogin = () => {
    signIn("github", { redirectTo: "/dashboard" });
  };
  const handleGoogleLogin = () => {
    signIn("google", { redirectTo: "/dashboard" });
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
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

        <Button
          type="submit"
          className="w-full bg-primary-500 hover:bg-primary-600 text-white"
        >
          Log in
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-primary-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-primary-500">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          className="border-primary-200 text-primary-700 hover:bg-primary-50"
          onClick={handleGitHubLogin}
        >
          <Github className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="border-primary-200 text-primary-700 hover:bg-primary-50"
          onClick={handleGoogleLogin}
        >
          <Google className="h-5 w-5" />
        </Button>
      </div>

      <div className="text-center">
        <p className="text-sm text-primary-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary-700 hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
