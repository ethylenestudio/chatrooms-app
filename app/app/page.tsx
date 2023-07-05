"use client";
import { Chat, Menu } from "@/components";
import useSelectRoom from "@/hooks/store/useSelectRoom";
import useWindowSize from "@/hooks/useWindowSize";
import React from "react";

const App = () => {
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
