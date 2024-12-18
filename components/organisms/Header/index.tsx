"use client";

import Link from "next/link";
import { Flower } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import LanguageSelector from "@molecules/LanguageSelector";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-primary-50 border-b border-primary-200">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
        <Link
          href="/"
          className="flex items-center space-x-2 mb-2 sm:mb-0"
        >
          <Flower className="h-8 w-8 text-primary-500" />
          <span className="text-xl font-bold text-primary-700 font-heading">
            Lingo Bloom
          </span>
        </Link>
        <nav className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <div className="w-full sm:w-auto mb-2 sm:mb-0">
            <LanguageSelector />
          </div>
          {pathname !== "/auth/login" && (
            <Button
              asChild
              variant="ghost"
              className="w-full sm:w-auto text-primary-700 hover:text-primary-800 hover:bg-primary-100"
            >
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
          {pathname !== "/auth/register" && (
            <Button
              asChild
              className="w-full sm:w-auto bg-secondary-500 hover:bg-secondary-600 text-white"
            >
              <Link href="/auth/register">Sign Up</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
