"use client";
import { Chat } from "@/components";
import useOrbisUser from "@/hooks/useOrbisUser";

export default function ChatPage() {
  const selectedChat = useOrbisUser((state) => state.selectedChat);
  return (
    <div className="overflow-scroll h-[80vh]">
      <Chat context={selectedChat} />
    </div>
  );
}
