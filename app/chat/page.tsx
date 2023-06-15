"use client";
import { Chat } from "@/components";
import useSelectRoom from "@/hooks/store/useSelectRoom";
import useCheckConnection from "@/hooks/useCheckConnection";

export default function ChatPage() {
  const selectedChat = useSelectRoom((state) => state.selectedRoom);
  useCheckConnection();

  return (
    <div className="overflow-y-auto w-[100%]">
      <Chat context={selectedChat} />
    </div>
  );
}
