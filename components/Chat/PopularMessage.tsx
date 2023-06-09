import React, { FC } from "react";
import Message from "./Message";
import { MessageType } from "@/types/MessageType";
import { renderMessageLimit } from "@/config";
import Loader from "../ui/Loader";

const PopularMessage: FC<{
  loading: boolean;
  popularMessage: undefined | MessageType;
  fetchMessages: () => Promise<void>;
  setReplyTo: React.Dispatch<
    React.SetStateAction<{
      content: string;
      postId: string;
    }>
  >;
}> = ({ loading, popularMessage, fetchMessages, setReplyTo }) => {
  return (
    <div
      className="sticky top-0 bg-[#090A10]"
    >
      <p className="text-[#CBA1A4] text-xs pt-2 text-center flex items-center justify-center space-x-2">
        Popular Message
        <span className={`${loading ? "opacity-100" : "opacity-0"}`}>
          <Loader height="20" width="20" />
        </span>
      </p>
      {popularMessage?.stream_id && (
        <Message
          postId={popularMessage.stream_id}
          content={
            popularMessage.content.body.length > renderMessageLimit
              ? popularMessage.content.body.slice(0, renderMessageLimit - 3) + "..."
              : popularMessage.content.body
          }
          sender={popularMessage.creator}
          upvotes={popularMessage.count_likes}
          replyCount={popularMessage.count_replies}
          refetchAllMessages={fetchMessages}
          setThisAsReply={setReplyTo}
          master={popularMessage.master}
          username={
            popularMessage.creator_details.profile
              ? popularMessage.creator_details.profile.username
              : ""
          }
        />
      )}
    </div>
  );
};

export default PopularMessage;
