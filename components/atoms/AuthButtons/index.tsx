"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Avatar, AvatarImage } from "@components/ui/avatar";
import { User } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

interface AuthButtonsProps {
  user?: User;
}

const AuthButtons = ({ user }: AuthButtonsProps) => {
  const pathname = usePathname();
  const router = useRouter();

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user.image || "https://placehold.co/20"} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/dashboard")}>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
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
