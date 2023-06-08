import { GENERAL_CHAT } from "@/config";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useReply = create(
  devtools<any>((set) => ({
    userDid: "",
    setUserDid: (userDid: string) => set({ userDid }, false, "setUserDid"),
    selectedChat: GENERAL_CHAT,
    setSelectedChat: (context: string) => set({ selectedChat: context }, false, "setSelectedChat"),
  }))
);

export default useReply;
