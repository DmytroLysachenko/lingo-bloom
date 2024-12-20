"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Button } from "@components/ui/button";
import Link from "next/link";

const AuthButtons = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/login" && (
        <Button
          asChild
          variant="ghost"
          className="w-full sm:w-auto text-primary-700 hover:text-primary-800 hover:bg-primary-100"
        >
          <Link href="/login">Login</Link>
        </Button>
      )}
      {pathname !== "/register" && (
        <Button
          asChild
          className="w-full sm:w-auto bg-secondary-500 hover:bg-secondary-600 text-white"
        >
          <Link href="/register">Register</Link>
        </Button>
      )}
    </>
  );
};

export default AuthButtons;
