"use client";
import { Chat, Menu } from "@/components";
import { ORBIS } from "@/config";
import useSelectRoom from "@/hooks/useSelectRoom";
import useWindowSize from "@/hooks/useWindowSize";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

const App = () => {
  const router = useRouter();
  const checkConnection = useCallback(async () => {
    let res = await ORBIS.isConnected();
    if (res.status != 200) {
      router.push("/");
    }
  }, [router]);
  const [width, height] = useWindowSize();
  const selectedChat = useSelectRoom((state) => state.selectedRoom);
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  if (width <= 760) {
    return (
      <div className="md:hidden">
        <Menu />
      </div>
    );
  } else {
    return (
      <div className="hidden md:flex max-h-[100%]">
        <div className="overflow-y-scroll w-[25%] h-[100%] max-w-[400px] border-r-2 border-slate-900">
          <Menu />
        </div>
        <div className="overflow-y-scroll w-[75%] h-[100%]">
          <Chat context={selectedChat} />
        </div>
      </div>
    );
  }
};

export default App;
