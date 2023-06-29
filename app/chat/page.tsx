"use client";
import { Chat } from "@/components";
import { ORBIS } from "@/config";
import useSelectRoom from "@/hooks/store/useSelectRoom";
import useAddressMatching from "@/hooks/useAddressMatching";
import useCheckConnection from "@/hooks/useCheckConnection";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function ChatPage() {
  const account = useAccount();
  const router = useRouter();
  const checkMatching = useAddressMatching();
  async function logoutOnNotMatch() {
    const res = await ORBIS.isConnected();
    if (account && !account.isConnected) {
      router.push("/");
    }
    if (account.isConnected && res.status == 200) {
      const status = await checkMatching();
      if (!status) {
        await ORBIS.logout();
        router.push("/");
      }
    }
  }
  useCheckConnection();

  useEffect(() => {
    logoutOnNotMatch();
  }, []);
  const selectedChat = useSelectRoom((state) => state.selectedRoom);

  return <Chat context={selectedChat} className="col-span-2" />;
}
