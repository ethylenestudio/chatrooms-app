import { renderMessageLimit, replyLimit } from "@/config";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Loader from "../ui/Loader";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const SendMessage: FC<{
  replyTo: {
    content: string;
    postId: string;
  };
  setReplyTo: React.Dispatch<
    React.SetStateAction<{
      content: string;
      postId: string;
    }>
  >;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => Promise<void>;
  sending: boolean;
  message: string;
}> = ({ replyTo, setReplyTo, message, setMessage, sendMessage, sending }) => {
  const pathname = usePathname();

  return (
    <div
      className={` h-[75px] fixed bottom-[50px] left-0 flex flex-col space-y-2 justify-center bg-[rgba(8,9,13,1)] ${
        pathname == "/chat" ? "w-[100%]" : "w-[75%] 2xl:w-[74%] 2xl:right-[1%] left-auto right-0"
      }`}
    >
      <div className={`text-white flex justify-between items-center pl-2 text-xs px-4`}>
        <p
          className={`flex items-center space-x-4 ${replyTo.content ? "opacity-100" : "opacity-0"}`}
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
      <form className="flex justify-center space-x-2 px-4 w-full items-center" action="submit">
        <input
          placeholder="Ask a question"
          className="outline-1 border-[1px] border-slate-400 text-slate-400 outline-black rounded-2xl text-sm px-4 py-1 w-[90%] bg-[rgba(0,0,0,0.2)]"
          type="text"
          value={message}
          onChange={(e) =>
            setMessage((prev) => {
              if (prev.length < renderMessageLimit || e.target.value.length <= renderMessageLimit) {
                return e.target.value;
              }
              return prev;
            })
          }
        />
        <button
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            await sendMessage();
          }}
          className="text-sm flex justify-center text-center text-white"
        >
          {sending ? (
            <Loader height="30" width="30" />
          ) : (
            <BsFillArrowUpCircleFill color="rgb(100,116,139)" size={28} />
          )}
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
