import Link from "next/link";
import { Flower } from "lucide-react";
import { Button } from "@/components/ui/button";

import LanguageSelector from "@molecules/LanguageSelector";
import { auth } from "@/auth";
import AuthButtons from "@components/molecules/AuthButtons";

const Header = async () => {
  const session = await auth();

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
        <nav className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8 w-full sm:w-auto">
          <div className="w-full sm:w-auto mb-2 sm:mb-0">
            <LanguageSelector />
          </div>
          {session ? (
            <>
              <Button
                asChild
                variant="ghost"
                className="w-full sm:w-auto text-primary-700 hover:text-primary-800 hover:bg-primary-100 bg-neutral-200"
              >
                <Link href="/test-creation">Create Test</Link>
              </Button>
              <AuthButtons isLoggedIn={true} />
            </>
          ) : (
            <AuthButtons />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
