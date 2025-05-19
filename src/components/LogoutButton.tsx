import { createClient } from "@/lib/supabase/server";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        const supabase = await createClient();
        await supabase.auth.signOut();
        redirect("/login");
      }}
    >
      {" "}
      <button type="submit">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </button>
    </form>
  );
};

export default LogoutButton;
