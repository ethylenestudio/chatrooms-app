import { GENERAL_CHAT, ORBIS, POLLING_RATE, lastMessageLimit } from "@/config";
import useSelectRoom from "@/hooks/store/useSelectRoom";
import useWindowSize from "@/hooks/useWindowSize";
import { useRouter } from "next/navigation";
import React, { FC, useCallback, useEffect, useState } from "react";
import { SiHackthebox } from "react-icons/si";

const GeneralConversation: FC = () => {
  const router = useRouter();
  const windowSize = useWindowSize();
  const selectThisChat = useSelectRoom((state) => state.setSelectedRoom);
  const [lastMessage, setLastMessage] = useState("");
  const fetchLastMessage = useCallback(async () => {
    // // ! DISABLE LAST MESSAGE
    // return setLastMessage("")
    const { data, error } = await ORBIS.getPosts({ context: GENERAL_CHAT, only_master: true }, 0, 1);
    if (data.length > 0) {
      setLastMessage(data[0].content.body);
    }
  }, []);

  useEffect(() => {
    fetchLastMessage();
  }, [fetchLastMessage]);
  useEffect(() => {
    const polling = setInterval(fetchLastMessage, POLLING_RATE);
    return () => {
      clearInterval(polling);
    };
  }, []);
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
