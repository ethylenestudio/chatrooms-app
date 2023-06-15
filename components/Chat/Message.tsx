/* eslint-disable @next/next/no-img-element */
"use client";
import React, { FC } from "react";
import { BiCommentDetail, BiUpvote } from "react-icons/bi";
import useOrbisUser from "@/hooks/store/useOrbisUser";
import Loader from "../ui/Loader";
import useMessageReaction from "@/hooks/useMessageReaction";
import useModal from "@/hooks/useModal";
import ReplyModal from "./ReplyModal";
type MessageType = {
  content: string;
  sender: string;
  upvotes: number;
  replyCount: number;
  postId: string;
  master: string | null;
  refetchAllMessages?: () => Promise<void>;
  setThisAsReply: React.Dispatch<
    React.SetStateAction<{
      content: string;
      postId: string;
    }>
  >;
  username: string;
};

const Message: FC<MessageType> = ({
  content,
  sender,
  upvotes,
  replyCount,
  postId,
  refetchAllMessages,
  setThisAsReply,
  master,
  username,
}) => {
  const userDid = useOrbisUser((state) => state.userDid);
  const { open, close, isOpen } = useModal();
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
      <div className="w-[70%] flex flex-col justify-center">
        <div className="flex mb-1 items-center">
          <p className="font-bold text-sm mr-4">
            {username ? username : senderAddress.slice(0, 4) + "..." + senderAddress.slice(39)}
          </p>
        </div>
        <p className="text-[12px] break-words font-extralight">{content}</p>
      </div>
      <div className="flex space-x-3 justify-end w-[30%] items-center">
        <div onClick={open} className="flex items-center">
          <BiCommentDetail
            className="hover:cursor-pointer"
            color={Boolean(replyCount) ? "#EEE" : "#4A5875"}
            size={22}
          />
          <div style={{ fontSize: "12px", fontWeight: "600", marginLeft: ".25rem", color: Boolean(replyCount) ? "#EEE" : "#4A5875" }}>
            {replyCount}
          </div>
        </div>
        <div
          onClick={reactToPost}
          className={`w-[60%] rounded-md flex items-center justify-center space-x-1 py-1 bg-black hover:cursor-pointer hover:opacity-80`}
        >
          {loading ? (
            <Loader height="18" width="18" />
          ) : (
            <BiUpvote color={isReacted ? "#CBA1A4" : "#4A5875"} />
          )}
          <p className={`${isReacted ? "text-[#CBA1A4]" : "text-[#4A5875]"} text-sm`}>{upvotes}</p>
        </div>
      </div>
      {isOpen && (
        <ReplyModal
          close={close}
          master={{
            content,
            sender,
            upvotes,
            postId,
            refetchAllMessages,
            setThisAsReply,
            master,
            username,
          }}
        />
      )}
    </div>
  );
};

export default Message;
