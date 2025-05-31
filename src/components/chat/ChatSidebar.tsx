import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { createClient } from "@/lib/supabase/server";

import ChatList from "./ChatList";

const ChatSidebar = async () => {
  const client = await createClient();
  const user = await client.auth.getUser();
  const userId = user.data.user?.id;
  if (!userId) {
    return <div>User not authenticated</div>;
  }
  const allUsers =
    (await (
      await client.from("profiles").select("*").neq("id", userId)
    ).data) ?? [];
  console.log("all users: ", allUsers);

  return (
    <Card className="w-80 h-full bg-white shadow-lg">
      <CardHeader>
        <CardTitle>Chats</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <ChatList allUsers={allUsers} userId={userId} />
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default ChatSidebar;
