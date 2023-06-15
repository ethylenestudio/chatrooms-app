"use client";
import { Chat } from "@/components";
import useSelectRoom from "@/hooks/store/useSelectRoom";
import useCheckConnection from "@/hooks/useCheckConnection";

export default function ChatPage() {
  const selectedChat = useSelectRoom((state) => state.selectedRoom);
  useCheckConnection();

  return (
      <Chat context={selectedChat} className="col-span-2" />
  );
}
