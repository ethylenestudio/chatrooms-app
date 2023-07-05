import { ORBIS } from "@/config";
import React, { useCallback, useEffect, useState } from "react";

const useMessageReaction = (
  postId: string,
  userDid: string,
  refetchAllMessages?: () => Promise<void>
) => {
  const [loading, setLoading] = useState(false);
  const [isReacted, setIsReacted] = useState(false);

  const fetchUserReaction = useCallback(async () => {
    const { data } = await ORBIS.getReaction(postId, userDid);
    if (data?.type == "like") {
      setIsReacted(true);
    } else {
      setIsReacted(false);
    }
    return data;
  }, [postId, userDid, setIsReacted]);
  const reactToPost = useCallback(async () => {
    if (isReacted) return;
    setLoading(true);
    const res = await ORBIS.react(postId, "like");
    if (res.status == 200) {
      if (refetchAllMessages) {
        setTimeout(async () => {
          await refetchAllMessages();
          setIsReacted(true);
          setLoading(false);
        }, 1000);
      }
    }
  }, [postId, refetchAllMessages, isReacted]);

  useEffect(() => {
    fetchUserReaction();
  }, [fetchUserReaction]);

  if(!userDid){
    return {
      loading: false,
      reactToPost: () => {},
      isReacted: false
    }
  }

  return { reactToPost, isReacted, loading };
};

export default useMessageReaction;
