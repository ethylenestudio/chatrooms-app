import { create } from "zustand";
// @ts-expect-error
import { Orbis } from "@orbisclub/orbis-sdk";
type ConnectionType = {
  user: string;
  setUser: (did: string) => void;
  orbis: any;
};

const orbis = new Orbis();
const useUser = create<ConnectionType>((set) => ({
  user: "",
  orbis,
  setUser: (did: string) => {
    window.localStorage.setItem("did", did);
    set((prev) => ({ ...prev, user: did }));
  },
}));

export default useUser;
