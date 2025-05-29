import { CardsChat } from "@/components/chat/CardsChat";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const PersonalRoom = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const client = await createClient();
  const { id } = await params;
  const user = await client.auth.getUser();
  const userId = user.data.user?.id;

  const { data: fetchMessages, error } = await client
    .from("messages")
    .select("*")
    .eq("chat_id", id)
    .order("sent_at", { ascending: true });

  fetchMessages?.map((message) => {
    if (message.sender_id === userId) {
      message.role = "user";
    } else {
      message.role = "agent";
    }
  });

  console.log(fetchMessages);
  console.log("error: ", error);
  if (!userId) {
    redirect("/error");
  }
  return (
    <div>
      <CardsChat
        chatId={id}
        userId={userId}
        prevMessages={fetchMessages ?? []}
      />
    </div>
  );
};

export default PersonalRoom;
