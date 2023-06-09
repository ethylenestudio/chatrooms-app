"use client";
import React, { FC, Fragment, useCallback, useEffect, useMemo, useState } from "react";
import Message from "./Message";
import { MessageType } from "@/types/MessageType";
import { ORBIS, POLLING_RATE } from "@/config";
import { ColorRing } from "react-loader-spinner";
import { AiOutlineCloseCircle } from "react-icons/ai";
type ContextType = {
  context: string;
};

const Chat: FC<ContextType> = ({ context }) => {
  const [orbisMessages, setOrbisMessages] = useState<MessageType[]>();
  const [message, setMessage] = useState<string>("");
  const [replyTo, setReplyTo] = useState<{ content: string; postId: string }>({
    content: "",
    postId: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    const { data, error } = await ORBIS.getPosts({
      context,
    });
    setOrbisMessages(data);
    setLoading(false);
  }, [context]);

  const sendMessage = useCallback(async () => {
    setLoading(true);
    const res = await ORBIS.createPost({
      body: message,
      context: context,
      master: replyTo.content ? replyTo.postId : null,
    });
    if (res.status == 200) {
      setTimeout(() => {
        setMessage("");
        setReplyTo({ content: "", postId: "" });
        fetchMessages();
        setLoading(false);
      }, 1000);
    }
  }, [context, message, fetchMessages, replyTo]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    const polling = setInterval(fetchMessages, POLLING_RATE);
    return () => {
      clearInterval(polling);
    };
  }, [fetchMessages]);

  if (!orbisMessages) return null;

  return (
    <div className="relative h-[80vh]">
      <div className="h-[88%] overflow-scroll">
        <div className="sticky top-0 z-50 bg-[#090A10]">
          <p className="text-[#CBA1A4] text-xs pt-2 text-center flex items-center justify-center space-x-2">
            Latest
            <span className={`${loading ? "opacity-100" : "opacity-0"}`}>
              <ColorRing
                visible={true}
                height="20"
                width="20"
                ariaLabel="blocks-loading"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </span>
          </p>
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
                  setThisAsReply={setReplyTo}
                  master={message.master}
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
                  setThisAsReply={setReplyTo}
                  master={message.master}
                />
              </Fragment>
            );
          })}
        </div>
      </div>
      <div className="h-[12%] absolute bottom-0 left-0 w-full flex flex-col space-y-2 justify-center bg-black py-1">
        <div
          className={`text-white flex items-center pl-4 text-xs ${
            replyTo.content ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="flex items-center space-x-4">
            <AiOutlineCloseCircle
              size={18}
              className="hover:cursor-pointer"
              onClick={() => setReplyTo({ content: "", postId: "" })}
            />
            <span className="font-bold">re:</span> {replyTo.content && replyTo.content}
          </p>
        </div>
        <div className="flex justify-center space-x-2 w-full items-center">
          <input
            placeholder="New message"
            className="outline-1 outline-black rounded-md text-sm px-2 py-1 w-[70%] bg-slate-400"
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
    </div>
  );
};

export default Chat;
