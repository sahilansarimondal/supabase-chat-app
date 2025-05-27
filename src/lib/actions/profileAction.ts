import { createClient } from "../supabase/server";

export const getAllUsers = async () => {
  const client = await createClient();
  const { data, error } = await client.from("profiles").select("*");
  if (error) return { data: null, error: error.message };
  return { data };
};
