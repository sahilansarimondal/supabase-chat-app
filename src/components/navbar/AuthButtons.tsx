import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "../ModeToggle";

const AuthButtons = () => {
  return (
    <div className="flex items-center space-x-4">
      <ModeToggle />
      <Link href={"/login"}>
        <Button variant={"outline"}> Log in</Button>
      </Link>
      <Link href={"/signup"}>
        <Button>Sign Up</Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
