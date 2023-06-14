"use client";
import { Chat } from "@/components";
import { ORBIS } from "@/config";
import useSelectRoom from "@/hooks/useSelectRoom";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function ChatPage() {
  const selectedChat = useSelectRoom((state) => state.selectedRoom);
  const router = useRouter();

  const checkConnection = useCallback(async () => {
    let res = await ORBIS.isConnected();
    if (res.status != 200) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  return (
    <div className="overflow-y-auto w-[100%]">
      <Chat context={selectedChat} />
    </div>
  );
}
