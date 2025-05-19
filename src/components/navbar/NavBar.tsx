import React from "react";
import AuthButtons from "./AuthButtons";
import { GalleryVerticalEnd } from "lucide-react";

const NavBar = async () => {
  return (
    <nav className="w-full px-6 bg-white/50 backdrop-blur-sm dark:bg-black/40 flex justify-between items-center py-4 border-b sticky top-0">
      <div className="flex justify-center gap-2 md:justify-start">
        <a href="#" className="flex items-center gap-2 font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <a href="#features" className="text-sm font-medium">
          Features
        </a>
        <a href="#pricing" className="text-sm font-medium">
          Pricing
        </a>
        <a href="#help" className="text-sm font-medium">
          Help
        </a>
        <AuthButtons />
      </div>
    </nav>
  );
};

export default NavBar;
