"use client";
import { Chat, Menu } from "@/components";
import useSelectRoom from "@/hooks/store/useSelectRoom";
import useWindowSize from "@/hooks/useWindowSize";
import React from "react";
import useCheckConnection from "@/hooks/useCheckConnection";

const App = () => {
  const [width, height] = useWindowSize();
  const selectedChat = useSelectRoom((state) => state.selectedRoom);

  useCheckConnection();

  if (width <= 760) {
    return (
      <div className="overflow-auto w-[100%] col-span-2">
        <Menu />
      </div>
    );
  } else {
    return (
      <>
        <div className="overflow-auto border-r-2 border-slate-900">
          <Menu />
        </div>
        <Chat context={selectedChat} />
      </>
    );
  }
};

export default App;
