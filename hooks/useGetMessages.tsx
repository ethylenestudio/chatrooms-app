import { ORBIS, POLLING_RATE } from "@/config";
import { MessageType } from "@/types/MessageType";
import { useCallback, useEffect, useState } from "react";

const useGetMessages = (context: string, master?: string) => {
  const [loading, setLoading] = useState(false);
  const [orbisMessages, setOrbisMessages] = useState<MessageType[]>();
  const [popularMessage, setPopularMessage] = useState<MessageType>();

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    const { data } = await ORBIS.getPosts({
      context,
      only_master: master ? false : true,
      master: master ? master : null,
    });
    setOrbisMessages(data);
    setLoading(false);
  }, [context, master]);

  const fetchPopularMessage = useCallback(async () => {
    if (master) return;
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
  }, [context, master]);

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

  return { loading, orbisMessages, popularMessage, fetchMessages, fetchPopularMessage };
};

export default useGetMessages;
