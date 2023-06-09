import { GENERAL_CHAT } from "@/config";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useSelectRoom = create(
  devtools<any>((set) => ({
    selectedRoom: GENERAL_CHAT,
    setSelectedRoom: (context: string) => set({ selectedRoom: context }, false, "setSelectedRoom"),
  }))
);

export default useSelectRoom;
