import { lastMessageLimit } from "@/config";
import useSelectRoom from "@/hooks/store/useSelectRoom";
import useWindowSize from "@/hooks/useWindowSize";
import { useRouter } from "next/navigation";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { SiHackthebox } from "react-icons/si";

type RoomPropType = {
  room: any;
  lastMessage: string;
};

const Conversation: FC<RoomPropType> = ({ room, lastMessage }) => {
  const router = useRouter();
  const windowSize = useWindowSize();
  const selectThisChat = useSelectRoom((state) => state.setSelectedRoom);
  const selectedChat = useSelectRoom((state) => state.selectedRoom);
  const displayedMessage = useMemo(() => {
    if (lastMessage) {
      return lastMessage;
    } else {
      return "";
    }
  }, [lastMessage]);

  return (
    <div
      onClick={() => {
        selectThisChat(room.stream_id);
        if (windowSize[0] <= 760) {
          router.push("/chat");
        }
      }}
      className={`${
        selectedChat == room.stream_id && "bg-slate-800"
      } hover:cursor-pointer flex justify-center items-center px-8 py-6 border-b-[1px] border-[rgba(126,144,175,0.1)] text-white`}
    >
      <div className="w-[15%]">
        <SiHackthebox size={32} color={"rgb(203 213 225)"} />
      </div>
      <div className="w-[85%] pl-2 flex flex-col items-start justify-center">
        <p className="font-bold text-sm">{room.content.name}</p>
        <p className="text-[12px] font-extralight">
          {displayedMessage.length > lastMessageLimit
            ? displayedMessage.slice(0, lastMessageLimit) + "..."
            : displayedMessage}
        </p>
      </div>
    </div>
  );
};

export default Conversation;
