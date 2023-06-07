import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
const useRooms = create(
  persist(
    devtools<StoreType>((set) => ({
      rooms: [],
      setRooms: (rooms) => set({ rooms }, false, "setRooms"),
      pushRoom: (room) => set((prev) => ({ rooms: [...prev.rooms, room] }), false, "pushRoom"),
      clearRooms: () => set({ rooms: [] }, false, "clearRooms"),
    })),
    {
      name: "roomData",
      // merge: (persistedState: any, currentState) => {
      //   console.log(persistedState, "persisted state");
      //   return persistedState["rooms"];
      // },
    }
  )
);

type RoomType = {
  stream_id: string;
  issuer: string;
  subject_id: string;
  content: {
    issuer: {
      id: string;
      name: string;
    };
    "@context": string[];
    issuanceDate: string;
    credentialSubject: {
      id: string;
      name: string;
      type: string;
      network: "EVM";
      protocol: string;
      description: string;
    };
  };
  provider: null;
  created_at: string;
  timestamp: number;
  creator: string;
  family: string;
  hash: null;
  weight: number;
  identifier: `eth-barcelona-chatrooms-access-${string}`;
};
type SetRoomsType = (rooms: RoomType[]) => void;
type PushRoomType = (room: RoomType) => void;
type ClearRoomsType = () => void;
type StoreType = {
  rooms: RoomType[];
  setRooms: SetRoomsType;
  pushRoom: PushRoomType;
  clearRooms: ClearRoomsType;
};

export default useRooms;
export type { RoomType };
