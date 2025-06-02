"use client";

import * as React from "react";
import { Check, Plus, Send } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { addMessageToDb } from "@/lib/actions/clientMessageAction";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface Message {
  role: string;
  content: string;
}

interface MessagePayload {
  chat_id: string;
  id: number;
  sent_at: string;
  content: string;
  sender_id: string;
}

interface Users {
  id: string;
  updated_at?: string;
  username?: string;
  avatar_url: string;
  full_name: string;
}

export function CardsChat({
  chatId,
  userId,
  prevMessages,
  allUsers,
}: {
  chatId: string;
  userId: string;
  prevMessages: { role: string; content: string }[];
  allUsers: Users[];
}) {
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const client = createClient();
  const [open, setOpen] = React.useState(false);
  const [selectedUsers] = React.useState<Users[]>([]);
  const router = useRouter();
  const [messages, setMessages] = React.useState<Message[]>(prevMessages);
  const [input, setInput] = React.useState("");
  const inputLength = input.trim().length;

  React.useEffect(() => {
    const channel = client
      .channel("realtime-messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          const messagePayload = payload.new as MessagePayload;
          const message = {
            role: messagePayload.sender_id === userId ? "user" : "agent",
            content: messagePayload.content,
          };
          setMessages((messages) => [...messages, message]);
        }
      )
      .subscribe();

    return () => {
      createClient().removeChannel(channel);
    };
  }, [chatId, userId, client]);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatCreate = async (receiverId: string) => {
    const { data } = await client
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
    <>
      <Card className="flex flex-col h-screen">
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="Image" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Sofia Davis</p>
              <p className="text-sm text-muted-foreground">m@example.com</p>
            </div>
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="ml-auto rounded-full"
                  onClick={() => setOpen(true)}
                >
                  <Plus />
                  <span className="sr-only">New message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>New message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-2">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
          <div ref={bottomRef} />
        </CardContent>
        <CardFooter className="mt-4">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (inputLength === 0) return;
              addMessageToDb(chatId, userId, input);
              setInput("");
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit" size="icon" disabled={inputLength === 0}>
              <Send />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle>New message</DialogTitle>
            <DialogDescription>
              Invite a user to this thread. This will create a new group
              message.
            </DialogDescription>
          </DialogHeader>
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
                      {selectedUsers.includes(user) ? (
                        <Check className="ml-auto flex h-5 w-5 text-primary" />
                      ) : null}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
            {selectedUsers.length > 0 ? (
              <div className="flex -space-x-2 overflow-hidden">
                {selectedUsers.map((user) => (
                  <Avatar
                    key={user.id}
                    className="inline-block border-2 border-background"
                  >
                    <AvatarImage src={user.avatar_url} />
                    <AvatarFallback>{user.full_name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select users to add to this thread.
              </p>
            )}
            <Button
              disabled={selectedUsers.length < 2}
              onClick={() => {
                setOpen(false);
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
