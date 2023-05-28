/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import { BiUpvote } from "react-icons/bi";

type MessageType = {
  content: string;
  sender: string;
  upvotes: number;
  upvoted: boolean;
};

const Message: FC<MessageType> = ({ content, sender, upvoted, upvotes }) => {
  return (
    <div className="flex items-center px-4 border-b-[1px] py-4 border-[rgba(126,144,175,0.1)] space-x-2 text-white">
      <div className="w-[85%] flex flex-col justify-center">
        <div className="flex mb-1 items-center">
          <p className="font-bold mr-4">{sender.slice(0, 4) + "..." + sender.slice(39)}</p>
          <p className="text-[10px]">25 min</p>
        </div>
        <p className="text-[12px] font-extralight">{content}</p>
      </div>
      <div
        className={`w-[15%] rounded-md flex items-center justify-center space-x-1 py-1 bg-black`}
      >
        <BiUpvote color={upvoted ? "#CBA1A4" : "#4A5875"} />
        <p className={`${upvoted ? "text-[#CBA1A4]" : "text-[#4A5875]"} text-sm`}>{upvotes}</p>
      </div>
    </div>
  );
};

export default Message;
