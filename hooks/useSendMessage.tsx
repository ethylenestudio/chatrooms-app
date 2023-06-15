import { ORBIS } from "@/config";
import React, { useCallback, useState } from "react";

const useSendMessage = (context: string, fetchMessages: () => Promise<void>) => {
  const [message, setMessage] = useState<string>("");
  const [replyTo, setReplyTo] = useState<{ content: string; postId: string }>({
    content: "",
    postId: "",
  });
  const [sending, setSending] = useState(false);

  const clearFields = () => {
    setMessage("");
    setReplyTo({ content: "", postId: "" });
  };

  const sendMessage = useCallback(async () => {
    if (!sending) {
      setSending(true);
      const res = await ORBIS.createPost({
        body: message,
        context: context,
        master: replyTo.content ? replyTo.postId : null,
        reploy_to: replyTo.content ? replyTo.postId : null,
      });
      if (res.status == 200) {
        setTimeout(async () => {
          clearFields();
          setSending(false);
          window.scrollTo(0, 0);
        }, 1800);
      }
    }
  }, [context, message, replyTo, sending]);

  return { sendMessage, message, setMessage, replyTo, setReplyTo, sending };
};

export default useSendMessage;
