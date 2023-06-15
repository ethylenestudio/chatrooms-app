"use client";
import { Chat, Menu } from "@/components";
import useSelectRoom from "@/hooks/store/useSelectRoom";
import useWindowSize from "@/hooks/useWindowSize";
import React from "react";
import useCheckConnection from "@/hooks/useCheckConnection";

const App = () => {
  useCheckConnection();
  const [width, height] = useWindowSize();
  const selectedChat = useSelectRoom((state) => state.selectedRoom);

  if (width <= 760) {
    return (
      <div className="md:hidden w-[100%]">
        <Menu />
      </div>
    );
  } else {
    return (
      <div className="hidden md:flex w-[100%]">
        <div className="w-[25%] border-r-2 border-slate-900">
          <Menu />
        </div>
        <div className="w-[75%]">
          <Chat context={selectedChat} />
        </div>
      </div>
    );
  }
};

export default App;
