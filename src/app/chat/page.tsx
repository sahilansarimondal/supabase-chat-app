import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
import { MessageSquare, Phone, Video, MoreVertical } from "lucide-react";

export default function ChatSection() {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="w-[300px] border-r p-4 space-y-4">
        <h2 className="text-lg font-semibold">Chats</h2>
        <Input placeholder="Search Messenger" className="mb-4" />
        <ScrollArea className="h-[calc(100vh-160px)]">
          <div className="space-y-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted cursor-pointer"
              >
                <Avatar>
                  <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">Sohel Mia</div>
                  <div className="text-xs text-muted-foreground truncate">
                    100 dollar investment a daily 2 dollar income
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>

      {/* Chat Section */}
      <section className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Sohel Mia</div>
              <div className="text-xs text-muted-foreground">Active now</div>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <Video className="w-4 h-4" />
            <MoreVertical className="w-4 h-4" />
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 space-y-4">
          <div className="space-y-2">
            <div className="self-start bg-muted px-3 py-2 rounded-md text-sm max-w-sm">
              100 dollar investment a daily 2 dollar income
            </div>
            <div className="self-end bg-primary text-white px-3 py-2 rounded-md text-sm max-w-sm">
              Kom, kintu tomar marketing khub valo chilo aage, akto focus korle
              7k the 70k hote pare.
            </div>
            <div className="self-end bg-primary text-white px-3 py-2 rounded-md text-sm max-w-sm">
              Jodio vul korlam message kore tomake, tao ata tomar jonno ata
              speed breaker chilo.
            </div>
            <div className="self-start bg-muted px-3 py-2 rounded-md text-sm max-w-sm">
              Ok
            </div>
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t p-4 flex items-center space-x-2">
          <Input placeholder="Aa" className="flex-1" />
          <Button>Send</Button>
        </div>
      </section>
    </div>
  );
}
