import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { createClient } from "@/lib/supabase/server";

import { UserCard } from "./NavUser";
import ChatList from "./ChatList";

const ChatSidebar = async () => {
  const client = await createClient();
  const { data } = await client.auth.getUser();
  const userId = data.user?.id;
  const fullUser = await client
    .from("profiles")
    .select()
    .eq("id", userId)
    .single();
  console.log("full user: ", fullUser);
  if (!userId) {
    return <div>User not authenticated</div>;
  }
  const allUsers =
    (await (
      await client.from("profiles").select("*").neq("id", userId)
    ).data) ?? [];
  console.log("all users: ", allUsers);

  return (
    <Card className="w-80 shadow-lg pb-2 flex flex-col h-screen">
      <CardHeader className="">
        <CardTitle className=" text-xl">Chats</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <div className="flex flex-col overflow-hidden flex-1">
        <CardContent className="flex-1 overflow-auto px-0 ">
          <ChatList allUsers={allUsers} userId={userId} />
        </CardContent>
        <CardFooter className=" px-0">
          <UserCard
            name={fullUser.data.full_name}
            avatarUrl={fullUser.data.avatar_url}
            email="sahil@gamil.com"
          />
        </CardFooter>
      </div>
    </Card>
  );
};

export default ChatSidebar;
