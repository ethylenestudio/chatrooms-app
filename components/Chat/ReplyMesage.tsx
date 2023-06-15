/* eslint-disable @next/next/no-img-element */
"use client";
import React, { FC } from "react";
import { BiUpvote } from "react-icons/bi";
import useOrbisUser from "@/hooks/store/useOrbisUser";
import Loader from "../ui/Loader";
import useMessageReaction from "@/hooks/useMessageReaction";
type MessageType = {
  content: string;
  sender: string;
  upvotes: number | undefined;
  postId: string;
  refetchAllMessages?: () => Promise<void>;
  setThisAsReply: React.Dispatch<
    React.SetStateAction<{
      content: string;
      postId: string;
    }>
  >;
  username: string;
};

const ReplyMessage: FC<MessageType> = ({
  content,
  sender,
  upvotes,
  postId,
  refetchAllMessages,
  username,
}) => {
  const userDid = useOrbisUser((state) => state.userDid);
  const { reactToPost, isReacted, loading } = useMessageReaction(
    postId,
    userDid,
    refetchAllMessages
  );

  if (!sender) return null;
  const senderArray = sender.split(":");
  const senderAddress = senderArray[senderArray.length - 1];
  return (
    <div className="flex items-center px-4 border-b-[1px] py-4 border-[rgba(126,144,175,0.1)] space-x-2 text-white">
      <div
        className={`${upvotes == undefined ? "w-[90%]" : "w-[60%]"}  flex flex-col justify-center`}
      >
        <div className="flex mb-1 items-center">
          <p className="font-bold text-sm mr-4">
            {username ? username : senderAddress.slice(0, 4) + "..." + senderAddress.slice(39)}
          </p>
        </div>
        <p className="text-[12px] break-words font-extralight">{content}</p>
      </div>
      {upvotes != undefined && (
        <div className="flex space-x-3 justify-end w-[40%] items-center">
          <div
            onClick={reactToPost}
            className={`w-[60%] rounded-md flex items-center justify-center space-x-1 py-1 bg-black ${
              !isReacted && "hover:cursor-pointer hover:opacity-80"
            }`}
          >
            {loading ? (
              <Loader height="18" width="18" />
            ) : (
              <BiUpvote color={isReacted ? "#CBA1A4" : "#4A5875"} />
            )}
            <p className={`${isReacted ? "text-[#CBA1A4]" : "text-[#4A5875]"} text-sm`}>
              {upvotes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReplyMessage;
