import { createClient } from "../supabase/client";

const client = await createClient();

export const addMessageToDb = async (
  chatId: string,
  userId: string,
  message: string
) => {
  try {
    await client.from("messages").insert({
      chat_id: chatId,
      sender_id: userId,
      content: message,
    });
  } catch (error) {
    console.log(error);
  }
};
