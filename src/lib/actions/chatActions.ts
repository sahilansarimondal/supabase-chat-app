import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

export const createChat = async (formData: FormData) => {
  const client = await createClient();
  const senderId = (await client.auth.getUser()).data.user?.id;
  const receiverId = formData.get("receiverId");

  const { data, error } = await client
    .from("chat")
    .insert([
      {
        user1_id: senderId,
        user2_id: receiverId,
      },
    ])
    .select("id");

  if (error) {
    redirect("/error");
  }
  redirect(`/room/${data[0].id}`);
};
