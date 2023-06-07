"use client";
import React, { FC, Fragment } from "react";
import GeneralConversation from "./GeneralConversation";
import useRooms from "@/hooks/useRooms";
import Conversation from "./Conversation";
import useHydrated from "@/hooks/useHydrated";

type DummyType = {
  conversations: ConversationType[];
};

type ConversationType = {
  name: string;
  lastMessage: string;
  chosen: boolean;
};

const Menu: FC<DummyType> = ({ conversations }) => {
  const hasHydrated = useHydrated();
  const rooms = useRooms((state) => state.rooms);
  if (!hasHydrated) return null;
  return (
    <div>
      <div className="bg-black sticky top-0 ">
        <p className="text-[#CBA1A4] text-xs pt-2 text-center">Rooms</p>
        <GeneralConversation />
      </div>

      {rooms?.map((room, i) => {
        return (
          <Fragment key={i}>
            <Conversation room={room} />
          </Fragment>
        );
      })}
    </div>
  );
};

export default Menu;
