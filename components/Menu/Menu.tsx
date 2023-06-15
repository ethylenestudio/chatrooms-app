"use client";
import React, { FC, Fragment, useCallback, useEffect, useState } from "react";
import GeneralConversation from "./GeneralConversation";
import useRooms from "@/hooks/store/useRooms";
import Conversation from "./Conversation";
import useHydrated from "@/hooks/useHydrated";
import { ORBIS, POLLING_RATE } from "@/config";
import useWindowSize from "@/hooks/useWindowSize";

const Menu: FC = () => {
  const hasHydrated = useHydrated();
  const rooms = useRooms((state) => state.rooms);
  const [lastMessages, setLastMessages] = useState<string[]>([]);
  const fetchLastMessage = async (room: any) => {
    const { data } = await ORBIS.getPosts({ context: room.stream_id, only_master: true }, 0, 1);
    return data;
  };
  const [width, height] = useWindowSize();
  useEffect(() => {
    if (rooms == null) return;
    const polling = async () => {
      const result = await Promise.all(rooms.map((room: any) => fetchLastMessage(room)));
      let lastMessages = [];
      lastMessages = result.map((i) => {
        if (i.length > 0) {
          return i[0].content.body;
        }
      });

      setLastMessages(lastMessages);
    };
    polling();
    const pollingInterval = setInterval(polling, POLLING_RATE);
    return () => {
      clearInterval(pollingInterval);
    };
  }, [rooms]);
  if (!hasHydrated) return null;
  return (
    <div className="relative pt-[114px]">
      <div
        className={`${
          width <= 760 ? "w-[100%]" : "w-[25%]"
        } bg-[#090A10] border-r-2 border-slate-900 fixed top-[100px] left-0`}
      >
        <p className="text-[#CBA1A4] text-xs pt-2 text-center">Rooms</p>
        <GeneralConversation />
      </div>
      {rooms?.map((room: any, i: number) => {
        return (
          <Fragment key={i}>
            <Conversation room={room} lastMessage={lastMessages[i]} />
          </Fragment>
        );
      })}
    </div>
  );
};

export default Menu;
