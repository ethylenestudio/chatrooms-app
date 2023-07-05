"use client";
import React, { FC, Fragment, useCallback, useEffect, useState } from "react";
import GeneralConversation from "./GeneralConversation";
import useRooms from "@/hooks/store/useRooms";
import Conversation from "./Conversation";
import useHydrated from "@/hooks/useHydrated";
import { ORBIS, POLLING_RATE } from "@/config";
import useWindowSize from "@/hooks/useWindowSize";
import useFetchEligibleRooms from "@/hooks/useFetchEligibleRooms";

const Menu: FC = () => {
  const hasHydrated = useHydrated();
  const rooms = useRooms((state) => state.rooms);
  const setRooms = useRooms(state => state.setRooms)
  const [lastMessages, setLastMessages] = useState<string[]>([]);
  const [loadingRooms, setLoadingRooms] = useState<boolean>(false)
  const { updateRoomAccess } = useFetchEligibleRooms()

  const fetchLastMessage = async (room: any) => {
    const { data } = await ORBIS.getPosts({ context: room.stream_id, only_master: true }, 0, 1);
    return data;
  };

  useEffect(() => {
    if (rooms == null) return;
    const polling = async () => {
      // ! DISABLE LAST MESSAGE
      // const result = await Promise.all(rooms.map((room: any) => fetchLastMessage(room)));
      let lastMessages = [];
      // lastMessages = result.map((i) => {
      //   if (i && i.length > 0) {
      //     return i[0].content.body;
      //   }

      //   return "Be the first one to chat!"
      // });

      setLastMessages(rooms.map(() => []));
    };
    polling();
    const pollingInterval = setInterval(polling, 15 * 1000);
    return () => {
      clearInterval(pollingInterval);
    };
  }, [rooms]);

  const updateAccess = async () => {
    if (loadingRooms) return
    setLoadingRooms(true)
    try { await updateRoomAccess(setRooms) } catch { }
    setLoadingRooms(false)
  }


  if (!hasHydrated) return null;
  return (
    <div className="relative">
      <div
        className={`w-full bg-[#090A10] border-r-2 border-slate-900 sticky top-0 left-0`}
      >
        <p className="text-[#CBA1A4] text-xs pt-2 text-center relative">
          Rooms
          <span className="absolute cursor-pointer text-white right-[1em] text-[.9em] uppercase" onClick={() => updateAccess()}>
            {loadingRooms ? "Refreshing..." : "Refresh"}
          </span>
        </p>
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
