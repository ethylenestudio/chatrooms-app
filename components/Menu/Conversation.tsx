import { lastMessageLimit } from "@/config";
import React, { FC } from "react";
import { SiHackthebox } from "react-icons/si";
type ConversationType = {
  name: string;
  lastMessage: string;
  chosen: boolean;
  key: number;
};

const Conversation: FC<ConversationType> = ({ lastMessage, name, chosen }) => {
  return (
    <div
      className={`flex justify-center items-center px-8 py-6 border-b-[1px] border-[rgba(126,144,175,0.1)] text-white`}
    >
      <div className="w-[15%]">
        <SiHackthebox size={32} color={"rgb(203 213 225)"} />
      </div>
      <div className="w-[85%] pl-2 flex flex-col items-start justify-center">
        <p className="font-bold text-sm">{name}</p>
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
