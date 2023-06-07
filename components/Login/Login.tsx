"use client";
import React, { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import useRooms from "@/hooks/useRooms";
import useOrbisUser from "@/hooks/useOrbisUser";
import { ORBIS } from "@/config";

const Login: FC = () => {
  const router = useRouter();
  const setRooms = useRooms((state) => state.setRooms);
  const setUserDid = useOrbisUser((state) => state.setUserDid);
  useEffect(() => {
    async function update() {
      let res = await ORBIS.isConnected();
      if (res.status == 200) {
        const { data: creds } = await ORBIS.getCredentials(res.did);
        setRooms(creds);
        setUserDid(res.did);
        router.push("/app");
      }
    }
    update();
  }, [setRooms, router, setUserDid]);

  async function connect() {
    try {
      let res = await ORBIS.isConnected();
      if (res.status != 200) {
        res = await ORBIS.connect_v2({ lit: false, chain: "ethereum" });
      }
      const { data: creds } = await ORBIS.getCredentials(res.did);
      setRooms(creds);
      setUserDid(res.did);
      router.push("/app");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="text-white flex justify-center items-center h-[80vh]">
      <button className="rounded-md border-2 border-white py-3 px-4" onClick={connect}>
        Connect
      </button>
    </div>
  );
};

export default Login;
