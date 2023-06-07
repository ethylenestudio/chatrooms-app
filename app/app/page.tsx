"use client";
import { Chat, Menu } from "@/components";
import { ORBIS } from "@/config";
import useOrbisUser from "@/hooks/useOrbisUser";
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
  const selectedChat = useOrbisUser((state) => state.selectedChat);
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  return (
    <div>
      <div className="h-[80vh] hidden md:flex">
        <div className="h-[80vh] overflow-scroll w-[30%] border-r-2 border-slate-900">
          <Menu />
        </div>
        <div className="h-[80vh] overflow-scroll w-[70%]">
          <Chat context={selectedChat} />
        </div>
      </div>
      <div className="overflow-scroll h-[80vh] md:hidden">
        <Menu />
      </div>
    </div>
  );
};

export default App;
