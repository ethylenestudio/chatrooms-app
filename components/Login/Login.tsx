"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useRooms from "@/hooks/useRooms";
import useOrbisUser from "@/hooks/useOrbisUser";
import { ORBIS } from "@/config";
import { ColorRing } from "react-loader-spinner";

const Login: FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const setRooms = useRooms((state) => state.setRooms);
  const setUserDid = useOrbisUser((state) => state.setUserDid);
  useEffect(() => {
    async function update() {
      setLoading(true);
      let res = await ORBIS.isConnected();
      if (res.status == 200) {
        const { data: creds } = await ORBIS.getCredentials(res.did);
        setRooms(creds);
        setUserDid(res.did);
        setLoading(false);
        router.push("/app");
      }
      setLoading(false);
    }
    update();
  }, [setRooms, router, setUserDid]);

  async function connect() {
    try {
      setLoading(true);
      let res = await ORBIS.isConnected();
      if (res.status != 200) {
        res = await ORBIS.connect_v2({ lit: false, chain: "ethereum" });
      }
      const { data: creds } = await ORBIS.getCredentials(res.did);
      setRooms(creds);
      setUserDid(res.did);
      setLoading(false);
      router.push("/app");
    } catch (e) {
      setLoading(false);

      console.log(e);
    }
  }

  return (
    <div className="text-white flex justify-center items-center h-[80vh]">
      <button className="rounded-md border-2 border-white py-3 px-4" onClick={connect}>
        {!loading ? (
          "Connect"
        ) : (
          <ColorRing
            visible={true}
            height="30"
            width="30"
            ariaLabel="blocks-loading"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        )}
      </button>
    </div>
  );
};

export default Login;
