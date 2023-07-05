"use client";
import { Chat } from "@/components";
import useSelectRoom from "@/hooks/store/useSelectRoom";
import useCheckConnection from "@/hooks/useCheckConnection";

export default function ChatPage() {
  useCheckConnection();

  const selectedChat = useSelectRoom((state) => state.selectedRoom);

  return <Chat context={selectedChat} className="col-span-2" />;
}
