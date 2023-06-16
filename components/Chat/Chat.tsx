"use client";
import React, { FC, Fragment } from "react";
import Message from "./Message";
import useGetMessages from "@/hooks/useGetMessages";
import useSendMessage from "@/hooks/useSendMessage";
import PopularMessage from "./PopularMessage";
import SendMessage from "./SendMessage";
type ContextType = {
  context: string;
};

const Chat: FC<ContextType & { className?: string }> = ({ context, className }) => {
  const { loading, orbisMessages, popularMessage, fetchMessages } = useGetMessages(context);
  const { sendMessage, message, setMessage, replyTo, setReplyTo, sending } =
    useSendMessage(context);

  if (!orbisMessages) return null;

  return (
    <>
      <div className={`${className || ""} overflow-auto flex flex-col`}>
        <PopularMessage
          fetchMessages={fetchMessages}
          loading={loading}
          popularMessage={popularMessage}
          setReplyTo={setReplyTo}
        />
        <div className="flex-1">
          {orbisMessages.map((message, i) => {
            if (message.stream_id != popularMessage?.stream_id) {
              return (
                <Fragment key={i}>
                  <Message
                    postId={message.stream_id}
                    content={message.content.body}
                    sender={message.creator}
                    upvotes={message.count_likes}
                    key={i}
                    replyCount={message.count_replies}
                    refetchAllMessages={fetchMessages}
                    setThisAsReply={setReplyTo}
                    master={message.master}
                    username={
                      message.creator_details.profile
                        ? message.creator_details.profile.username
                        : ""
                    }
                  />
                </Fragment>
              );
            }
          })}
        </div>
        <SendMessage
          message={message}
          replyTo={replyTo}
          sendMessage={sendMessage}
          sending={sending}
          setMessage={setMessage}
          setReplyTo={setReplyTo}
        />
      </div>
    </>
  );
};

export default Chat;
