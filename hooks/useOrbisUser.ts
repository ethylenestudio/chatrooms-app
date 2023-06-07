import { GENERAL_CHAT } from "@/config";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useOrbisUser = create(
  persist(
    devtools<any>((set) => ({
      userDid: "",
      setUserDid: (userDid: string) => set({ userDid }, false, "setUserDid"),
      selectedChat: GENERAL_CHAT,
      setSelectedChat: (context: string) =>
        set({ selectedChat: context }, false, "setSelectedChat"),
    })),
    {
      name: "userData",
      // merge: (persistedState: any, currentState) => {
      //   console.log(persistedState, "persisted state");
      //   return persistedState["rooms"];
      // },
    }
  )
);

export default useOrbisUser;
