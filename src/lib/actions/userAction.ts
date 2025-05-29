"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/chat");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log("auth data: ", data);

  const { error } = await supabase.auth.signUp(data);

  console.log("error: ", error);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/chat");
}

export const getUserId = async () => {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  return user.data.user?.id;
};
