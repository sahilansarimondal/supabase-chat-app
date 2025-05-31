import ChatSidebar from "@/components/chat/ChatSidebar";
import { createClient } from "@/lib/supabase/server";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = await createClient();
  const user = await client.auth.getUser();
  const userId = user.data.user?.id;
  if (!userId) {
    return <div>User not authenticated</div>;
  }
  return (
    <div className="flex h-screen w-full bg-background gap-2">
      {/* Chat Sidebar */}
      <ChatSidebar />

      {/* Chat Content Area */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
