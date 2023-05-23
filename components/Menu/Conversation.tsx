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
      className={`flex justify-center items-center px-8 py-6 border-b-[1px] ${
        name == "General Chat" && "bg-slate-300 sticky top-0"
      } ${chosen && "bg-slate-900 text-slate-100"}`}
    >
      <div className="w-[15%]">
        <SiHackthebox size={32} color={`${chosen ? "rgb(203 213 225)" : "rgb(15 23 42)"}`} />
      </div>
      <div className="w-[85%] pl-2 flex flex-col items-start justify-center">
        <p className="font-bold text-sm">{name}</p>
        <p className="text-xs">
          {lastMessage.length > lastMessageLimit
            ? lastMessage.slice(0, lastMessageLimit) + "..."
            : lastMessage}
        </p>
      </div>
    </div>
  );
};

export default Conversation;
