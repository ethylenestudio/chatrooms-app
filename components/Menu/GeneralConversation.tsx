"use client";
import { GENERAL_CHAT, ORBIS, lastMessageLimit } from "@/config";
import useOrbisUser from "@/hooks/useOrbisUser";
import useWindowSize from "@/hooks/useWindowSize";
import { useRouter } from "next/navigation";
import React, { FC, useCallback, useEffect, useState } from "react";
import { SiHackthebox } from "react-icons/si";

const GeneralConversation: FC = () => {
  const router = useRouter();
  const windowSize = useWindowSize();
  const selectThisChat = useOrbisUser((state) => state.setSelectedChat);
  const [lastMessage, setLastMessage] = useState("");
  const fetchLastMessage = useCallback(async () => {
    const { data, error } = await ORBIS.getPosts({ context: GENERAL_CHAT }, 0, 1);
    if (data.length > 0) {
      console.log(data);
      setLastMessage(data[0].content.body);
    }
  }, []);

  useEffect(() => {
    fetchLastMessage();
  }, [fetchLastMessage]);

  return (
    <div
      onClick={() => {
        selectThisChat(GENERAL_CHAT);
        if (windowSize[0] <= 760) {
          router.push("/chat");
        }
      }}
      className={`hover:cursor-pointer flex justify-center items-center px-8 py-6 border-b-[1px] border-[rgba(126,144,175,0.1)] text-white`}
    >
      <div className="w-[15%]">
        <SiHackthebox size={32} color={"rgb(203 213 225)"} />
      </div>
      <div className="w-[85%] pl-2 flex flex-col items-start justify-center">
        <p className="font-bold text-sm">General Chat</p>
        <p className="text-[12px] font-extralight">
          {lastMessage.length > lastMessageLimit
            ? lastMessage.slice(0, lastMessageLimit) + "..."
            : lastMessage}
        </p>
      </div>
    </div>
  );
};

export default GeneralConversation;
