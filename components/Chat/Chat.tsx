"use client";
import React, { FC, Fragment, useCallback, useEffect, useMemo, useState } from "react";
import Message from "./Message";
import { MessageType } from "@/types/MessageType";
import { ORBIS } from "@/config";

type DummyType = {
  context: string;
};

const Chat: FC<DummyType> = ({ context }) => {
  const [orbisMessages, setOrbisMessages] = useState<MessageType[]>();
  const [message, setMessage] = useState<string>("");

  const fetchMessages = useCallback(async () => {
    const { data, error } = await ORBIS.getPosts({
      context: context,
    });
    setOrbisMessages(data);
    setMessage("");
  }, [context]);

  const sendMessage = useCallback(async () => {
    const res = await ORBIS.createPost({
      body: message,
      context: context,
    });
    if (res.status == 200) {
      setTimeout(fetchMessages, 3000);
    }
  }, [context, message, fetchMessages, orbisMessages]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  if (!orbisMessages) return null;

  return (
    <div className="relative h-[80vh]">
      <div className="h-[90%] overflow-scroll">
        <div className="sticky top-0 z-50 bg-[#090A10]">
          <p className="text-[#CBA1A4] text-xs pt-2 text-center">Most Upvotes</p>
          {orbisMessages.slice(0, 1).map((message, i) => {
            return (
              <Fragment key={i}>
                <Message
                  postId={message.stream_id}
                  content={message.content.body}
                  sender={message.creator}
                  upvotes={message.count_likes}
                  key={i}
                  refetchAllMessages={fetchMessages}
                />
              </Fragment>
            );
          })}
        </div>

        <div className="overflow-y-auto z-10">
          {orbisMessages.slice(1).map((message, i) => {
            return (
              <Fragment key={i}>
                <Message
                  postId={message.stream_id}
                  content={message.content.body}
                  sender={message.creator}
                  upvotes={message.count_likes}
                  key={i}
                  refetchAllMessages={fetchMessages}
                />
              </Fragment>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex justify-center items-center mt-2 space-x-2 bg-black py-2">
        <input
          placeholder="New message"
          className="rounded-md text-sm px-2 py-1 w-[70%] bg-slate-400"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={async () => await sendMessage()}
          className="px-2 text-sm py-1 rounded-md w-[20%] text-center bg-slate-500 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
