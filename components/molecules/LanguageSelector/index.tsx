"use client";

import { useState } from "react";
import { Check, ChevronDown, GlobeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "pl", name: "Polish", flag: "🇵🇱" },
  { code: "uk", name: "Ukrainian", flag: "🇺🇦" },
];

const LanguageSelector = () => {
  const [language, setLanguage] = useState(languages[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start bg-white text-primary-700 border-primary-200 hover:bg-primary-50 hover:text-primary-800"
        >
          <GlobeIcon className="mr-2 h-4 w-4" />
          {language.flag} {language.name}
          <ChevronDown className="ml-auto h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[200px]"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang)}
            className="justify-between cursor-pointer"
          >
            <span>
              {lang.flag} {lang.name}
            </span>
            {language.code === lang.code && (
              <Check className="h-4 w-4 text-primary-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
