"use client";

import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { logout } from "@/lib/actions/userAction";

const LogoutButton = () => {
  return (
    <form action={logout} className="w-full">
      <DropdownMenuItem className=" p-0">
        <button
          type="submit"
          className="flex w-full items-center px-2 py-1.5 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </button>
      </DropdownMenuItem>
    </form>
  );
};

export default LogoutButton;
