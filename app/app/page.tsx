"use client";
import { Chat, Menu } from "@/components";
import useSelectRoom from "@/hooks/store/useSelectRoom";
import useWindowSize from "@/hooks/useWindowSize";
import React, { useEffect } from "react";
import useAddressMatching from "@/hooks/useAddressMatching";
import { ORBIS } from "@/config";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const App = () => {
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
  useEffect(() => {
    logoutOnNotMatch();
  }, []);
  const [width, height] = useWindowSize();
  const selectedChat = useSelectRoom((state) => state.selectedRoom);

  if (width <= 760) {
    return (
      <div className="w-[100%] col-span-2">
        <Menu />
      </div>
    );
  } else {
    return (
      <>
        <div className="border-r-2 border-slate-900">
          <Menu />
        </div>
        <Chat context={selectedChat} />
      </>
    );
  }
};

export default App;
