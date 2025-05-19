"use client";

import {
  MessageSquare,
  Phone,
  Video,
  MoreVertical,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Archive,
  Store,
  Bell,
  Smile,
  Paperclip,
  Send,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import truncateString from "@/utils/truncation";
import { ProfileMenu } from "@/components/ProfileMenu";

export default function ChatSection() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeChat, setActiveChat] = useState(0);
  const [message, setMessage] = useState("");

  const chats = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    name: i === 0 ? "Sohel Mia" : `Contact ${i + 1}`,
    lastMessage:
      i === 0
        ? "100 dollar investment a daily 2 dollar income"
        : `Last message from contact ${i + 1}`,
    unread: i === 3 ? 5 : 0,
    online: i % 3 === 0,
    avatar: `https://randomuser.me/api/portraits/${
      i % 2 === 0 ? "men" : "women"
    }/${i + 20}.jpg`,
  }));

  const messages = [
    { sender: false, text: "100 dollar investment a daily 2 dollar income" },
    {
      sender: true,
      text: "Kom, kintu tomar marketing khub valo chilo aage, akto focus korle 7k the 70k hote pare.",
    },
    {
      sender: true,
      text: "Jodio vul korlam message kore tomake, tao ata tomar jonno ata speed breaker chilo.",
    },
    { sender: false, text: "Ok" },
  ];

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Collapsible Sidebar */}
      <aside
        className={`transition-all duration-300 bg-muted/40 border-r p-2 flex flex-col ${
          collapsed ? "w-[60px]" : "w-[220px]"
        }`}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-2">
            <SidebarItem
              icon={<MessageSquare className="w-5 h-5" />}
              label="Chats"
              collapsed={collapsed}
              active
            />
            <SidebarItem
              icon={<Store className="w-5 h-5" />}
              label="Marketplace"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Bell className="w-5 h-5" />}
              label="Requests"
              collapsed={collapsed}
              badge={3}
            />
            <SidebarItem
              icon={<Archive className="w-5 h-5" />}
              label="Archive"
              collapsed={collapsed}
            />

            {!collapsed && (
              <div className="mt-6">
                <div className="text-xs font-semibold mb-2 px-2 text-muted-foreground">
                  COMMUNITIES
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-muted">
                  <div className="bg-primary/10 p-1 rounded-md">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">CovaTech</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="w-full justify-start rounded-md"
            >
              {collapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <>
                  <ChevronLeft className="w-5 h-5" />
                  <span className="ml-2 text-sm">Collapse</span>
                </>
              )}
            </Button>

            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted">
              <Avatar className="h-8 w-8">
                <ProfileMenu />
              </Avatar>
              {!collapsed && (
                <div className="flex-1">
                  <div className="text-sm font-medium">Sahil</div>
                  <div className="text-xs text-muted-foreground">Online</div>
                </div>
              )}
              {!collapsed && (
                <Settings className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          </div>
        </div>
      </aside>
      {/* Chat Sidebar */}
      {/* <aside className="w-[300px] border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Chats</h2>
          <Input
            placeholder="Search Messenger"
            className="mt-3 bg-muted/50 border-none focus-visible:ring-1"
          />
        </div>

        <ScrollArea className="flex-1">
          <div className="divide-y">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center space-x-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors ${
                  activeChat === chat.id ? "bg-muted/30" : ""
                }`}
                onClick={() => setActiveChat(chat.id)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <div className="font-medium truncate">{chat.name}</div>
                    <div className="text-xs text-muted-foreground">
                      12:30 PM
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground truncate">
                      {chat.lastMessage}
                    </div>
                    {chat.unread > 0 && (
                      <Badge
                        variant="default"
                        className="h-5 w-5 p-0 flex items-center justify-center"
                      >
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside> */}
      {/* Updated Chat Sidebar component with proper scroll and sizing */}
      <aside className="w-[300px] border-r flex flex-col h-full">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Chats</h2>
          <Input
            placeholder="Search Messenger"
            className="mt-3 bg-muted/50 border-none focus-visible:ring-1"
          />
        </div>

        {/* Updated ScrollArea with proper height calculation */}
        <ScrollArea className="flex-1 h-[calc(100vh-120px)]">
          <div className="divide-y">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center space-x-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors ${
                  activeChat === chat.id ? "bg-muted/30" : ""
                }`}
                onClick={() => setActiveChat(chat.id)}
              >
                <div className="relative min-w-[40px]">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <div className="font-medium truncate">{chat.name}</div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      12:30 PM
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground truncate">
                      {truncateString(chat.lastMessage)}
                    </div>
                    {chat.unread > 0 && (
                      <Badge
                        variant="default"
                        className="h-5 w-5 p-0 flex items-center justify-center ml-2"
                      >
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>
      {/* Chat Section */}
      <section className="flex-1 flex flex-col bg-muted/20">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-background">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar>
                <AvatarImage src={chats[activeChat].avatar} />
                <AvatarFallback>
                  {chats[activeChat].name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {chats[activeChat].online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
              )}
            </div>
            <div>
              <div className="font-medium">{chats[activeChat].name}</div>
              <div className="text-xs text-muted-foreground">
                {chats[activeChat].online ? "Active now" : "Last seen 2h ago"}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 space-y-4">
          <div className="space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[70%] ${
                    msg.sender
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-muted rounded-tl-none"
                  }`}
                >
                  {msg.text}
                  <div
                    className={`text-xs mt-1 text-right ${
                      msg.sender
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {msg.sender ? "You" : chats[activeChat].name.split(" ")[0]}{" "}
                    • 12:30 PM
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t p-3 bg-background">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Paperclip className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Input
              placeholder="Type a message..."
              className="flex-1 rounded-full bg-muted/50 border-none focus-visible:ring-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="ghost" size="icon" className="rounded-full">
              <Smile className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Button size="icon" className="rounded-full">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  collapsed,
  active = false,
  badge = 0,
}: {
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active?: boolean;
  badge?: number;
}) {
  return (
    <div
      className={`flex items-center space-x-2 hover:bg-muted px-2 py-2 rounded-md cursor-pointer transition-colors ${
        active ? "bg-muted" : ""
      }`}
    >
      <div className="relative">
        {icon}
        {badge > 0 && !collapsed && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center"
          >
            {badge}
          </Badge>
        )}
      </div>
      {!collapsed && (
        <div className="flex-1 flex justify-between items-center">
          <span className="text-sm font-medium">{label}</span>
          {badge > 0 && (
            <Badge
              variant="destructive"
              className="h-5 w-5 p-0 flex items-center justify-center"
            >
              {badge}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
