"use client";
// @ts-expect-error
import { Orbis } from "@orbisclub/orbis-sdk";
import React, { FC, useEffect, useMemo } from "react";
import useRooms from "@/hooks/useRooms";
const Login: FC = () => {
  const setRooms = useRooms((state) => state.setRooms);

  const orbis = useMemo(() => new Orbis(), []);

  useEffect(() => {
    async function update() {
      let res = await orbis.isConnected();
      if (res.status == 200) {
        const { data: creds } = await orbis.getCredentials(res.did);
        setRooms(creds);
      }
    }
    update();
  }, [orbis, setRooms]);

  async function connect() {
    let res = await orbis.isConnected();
    if (res.status != 200) {
      res = await orbis.connect_v2({ lit: false, chain: "ethereum" });
    }
    const { data: creds } = await orbis.getCredentials(res.did);
    setRooms(creds);
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
