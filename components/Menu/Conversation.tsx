"use client";
import { ORBIS, ORBIS_IDENTIFIER, lastMessageLimit } from "@/config";
import { useGetSessionById } from "@/hooks/queries/useGetSessionById";
import useOrbisUser from "@/hooks/useOrbisUser";
import type { RoomType } from "@/hooks/useRooms";
import useWindowSize from "@/hooks/useWindowSize";
import { useRouter } from "next/navigation";
import React, { FC, useCallback, useEffect, useState } from "react";
import { SiHackthebox } from "react-icons/si";

type RoomPropType = {
  room: RoomType;
};

const Conversation: FC<RoomPropType> = (room) => {
  const router = useRouter();
  const windowSize = useWindowSize();
  const selectThisChat = useOrbisUser((state) => state.setSelectedChat);
  const selectedChat = useOrbisUser((state) => state.selectedChat);
  const [lastMessage, setLastMessage] = useState("");
  const [isEthBarcelona, setIsEthBarcelona] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const { session } = useGetSessionById(sessionId, isEthBarcelona);

  const fetchLastMessage = useCallback(async () => {
    const { data, error } = await ORBIS.getPosts({ context: room.room.stream_id }, 1);
    if (data.length > 0) {
      console.log(data);
      setLastMessage(data[0].content.body);
    }
  }, [room]);

  useEffect(() => {
    if (room.room.identifier.startsWith(ORBIS_IDENTIFIER)) {
      setIsEthBarcelona(true);
      setSessionId((prev) => room.room.identifier.split(`${ORBIS_IDENTIFIER}-`)[1]);
    }
    fetchLastMessage();
  }, [room, sessionId, session?.data, fetchLastMessage]);

  if (!isEthBarcelona) return null;

  return (
    <div
      onClick={() => {
        selectThisChat(room.room.stream_id);
        if (windowSize[0] <= 760) {
          router.push("/chat");
        }
      }}
      className={`${
        selectedChat == room.room.stream_id && "bg-slate-600"
      } hover:cursor-pointer flex justify-center items-center px-8 py-6 border-b-[1px] border-[rgba(126,144,175,0.1)] text-white`}
    >
      <div className="w-[15%]">
        <SiHackthebox size={32} color={"rgb(203 213 225)"} />
      </div>
      <div className="w-[85%] pl-2 flex flex-col items-start justify-center">
        <p className="font-bold text-sm">{session?.data.name}</p>
        <p className="text-[12px] font-extralight">
          {lastMessage.length > lastMessageLimit
            ? lastMessage.slice(0, lastMessageLimit) + "..."
            : lastMessage}
        </p>
      </div>
    </div>
  );
};

export default Conversation;
