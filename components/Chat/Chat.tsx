"use client";
import React, { FC, Fragment, useCallback, useEffect, useMemo, useState } from "react";
import Message from "./Message";
import { MessageType } from "@/types/MessageType";
import { ORBIS, POLLING_RATE, renderMessageLimit, replyLimit } from "@/config";
import { ColorRing } from "react-loader-spinner";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { usePathname } from "next/navigation";
type ContextType = {
  context: string;
};

const Chat: FC<ContextType> = ({ context }) => {
  const pathname = usePathname();
  const [orbisMessages, setOrbisMessages] = useState<MessageType[]>();
  const [message, setMessage] = useState<string>("");
  const [replyTo, setReplyTo] = useState<{ content: string; postId: string }>({
    content: "",
    postId: "",
  });
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [popularMessage, setPopularMessage] = useState<MessageType>();

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    const { data } = await ORBIS.getPosts({
      context,
    });
    setOrbisMessages(data);
    setLoading(false);
  }, [context]);

  const fetchPopularMessage = useCallback(async () => {
    setLoading(true);
    const { data } = await ORBIS.getPosts(
      {
        context,
        only_master: true,
        order_by: "count_likes",
      },
      0,
      1
    );
    setPopularMessage(data[0]);
    setLoading(false);
  }, [context]);

  const sendMessage = useCallback(async () => {
    if (!sending) {
      setLoading(true);
      setSending(true);
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
          setSending(false);
        }, 1500);
      }
    }
  }, [context, message, fetchMessages, replyTo, sending]);

  useEffect(() => {
    fetchPopularMessage();
    fetchMessages();
  }, [fetchMessages, fetchPopularMessage]);

  useEffect(() => {
    const polling = setInterval(async () => {
      await fetchPopularMessage();
      await fetchMessages();
    }, POLLING_RATE);
    return () => {
      clearInterval(polling);
    };
  }, [fetchMessages, fetchPopularMessage]);

  if (!orbisMessages) return null;

  return (
    <div className="overflow-y-auto">
      <div className="pb-[90px]">
        <div
          className={`fixed right-0 top-[100px] ${
            pathname == "/chat" ? "w-[100%]" : "w-[75%]"
          } z-30 bg-[#090A10]`}
        >
          <p className="text-[#CBA1A4] text-xs pt-2 text-center flex items-center justify-center space-x-2">
            Popular Message
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

        <div className="overflow-y-auto z-10 pt-[150px] md:pt-[100px]">
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
      </div>
      <div
        className={` h-[75px] fixed bottom-[20px] left-0 flex flex-col space-y-2 justify-center bg-black ${
          pathname == "/chat" ? "w-[100%]" : "w-[75%] left-auto right-0"
        }`}
      >
        <div className={`text-white flex justify-between items-center pl-2 text-xs px-4`}>
          <p
            className={`flex items-center space-x-4 ${
              replyTo.content ? "opacity-100" : "opacity-0"
            }`}
          >
            <AiOutlineCloseCircle
              size={18}
              className="hover:cursor-pointer"
              onClick={() => setReplyTo({ content: "", postId: "" })}
            />
            <span className="font-bold">re: </span>
            {replyTo.content &&
              (replyTo.content.length > replyLimit
                ? replyTo.content.slice(0, replyLimit - 1) + "..."
                : replyTo.content)}
          </p>
          <p>Chars: {renderMessageLimit - message.length}</p>
        </div>
        <div className="flex justify-center space-x-2 w-full items-center">
          <input
            placeholder="New message"
            className="outline-1 outline-black rounded-md text-sm px-2 py-1 w-[70%] bg-slate-400"
            type="text"
            value={message}
            onChange={(e) =>
              setMessage((prev) => {
                if (
                  prev.length < renderMessageLimit ||
                  e.target.value.length <= renderMessageLimit
                ) {
                  return e.target.value;
                }
                return prev;
              })
            }
          />
          <button
            onClick={async () => await sendMessage()}
            className="px-2 text-sm py-1 rounded-md w-[20%] flex justify-center text-center bg-slate-500 text-white"
          >
            {sending ? <ColorRing height="20" width="20" /> : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
