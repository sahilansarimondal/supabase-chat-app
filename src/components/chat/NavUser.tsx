import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import LogoutButton from "../LogoutButton";

type UserCardProps = {
  name: string;
  email: string;
  avatarUrl?: string;
};

export function UserCard({ name, email, avatarUrl }: UserCardProps) {
  return (
    <div className="flex items-center w-full justify-between p-4 hover:bg-muted rounded-md transition">
      <div className="flex items-center gap-4">
        <Avatar className="w-10 h-10 rounded-md">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="space-y-0.5">
          <p className="text-sm font-medium leading-none">{name}</p>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 rounded-md  focus:outline-none cursor-pointer hover:bg-white transition">
            <Ellipsis className="w-4 h-4 rotate-90" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <LogoutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
