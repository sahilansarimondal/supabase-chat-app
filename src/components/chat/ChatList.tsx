"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface Users {
  id: string;
  updated_at?: string;
  username?: string;
  avatar_url: string;
  full_name: string;
}

const ChatList = ({
  allUsers,
  userId,
}: {
  allUsers: Users[];
  userId: string;
}) => {
  const client = createClient();
  const router = useRouter();
  const handleChatCreate = async (receiverId: string) => {
    const { data, error } = await client
      .from("chat")
      .select("*")
      .filter("chat_users", "cs", `{${receiverId}, ${userId}}`)
      .single();

    if (!data) {
      const { data, error } = await client
        .from("chat")
        .insert([{ chat_users: [userId, receiverId] }])
        .select("id")
        .single();
      if (error) {
        console.log(error);
        router.push("/error");
      }
      if (data) {
        router.push(`/chat/${data.id}`);
      }
    }

    if (data) {
      router.push(`/chat/${data.id}`);
    }
  };
  return (
    <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
      <CommandInput placeholder="Search user..." />
      <CommandList>
        <CommandEmpty>No users found.</CommandEmpty>
        <CommandGroup className="p-2">
          {allUsers.map((user) => (
            <CommandItem
              key={user.id}
              className="flex items-center px-2 cursor-pointer"
            >
              <div
                className=" flex items-center w-full"
                onClick={() => handleChatCreate(user.id)}
              >
                <Avatar>
                  <AvatarImage src={user.avatar_url} alt="Image" />
                  <AvatarFallback>{user.full_name[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-2">
                  <p className="text-sm font-medium leading-none">
                    {user.full_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {user.full_name}
                  </p>
                </div>
                {/* {selectedUsers.includes(user) ? (
                      <Check className="ml-auto flex h-5 w-5 text-primary" />
                    ) : null} */}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default ChatList;
