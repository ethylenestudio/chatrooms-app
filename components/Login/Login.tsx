"use client";
// @ts-expect-error
import { Orbis } from "@orbisclub/orbis-sdk";

import useUser from "@/hooks/useUser";
import React, { FC, useEffect } from "react";

const Login: FC = () => {
  const setUser = useUser((state) => state.setUser);
  const user = useUser((state) => state.user);
  const orbis = useUser((state) => state.orbis);

  useEffect(() => {
    async function update() {
      let res = await orbis.isConnected();
      if (!res) return;
      setUser(res.did);
      console.log("connected");
    }
    update();
  }, [orbis, user, setUser]);

  async function connect() {
    let res = await orbis.isConnected();
    if (res) {
      setUser(res.did);
    } else {
      let res = await orbis.connect_v2({ lit: false, chain: "ethereum" });
      setUser(res.did);
    }
    console.log(orbis);
  }
  async function createContext() {
    let res = await orbis.createContext({
      project_id: "kjzl6cwe1jw148cji7hgrna5ta4w5wyo0fpovye9m80xod0vtdbe9rbrb4xfbn8",
      name: "Chatrooms-EF",
      websiteUrl: "https://ethylene.io",
    });
    console.log(res, "take this");
  }

  async function createProject() {
    let res = await orbis.createProject({
      name: "Chatrooms-EF",
    });
    console.log(res);
  }

  async function getContexts() {
    let { data, error } = await orbis.getContexts(
      "kjzl6cwe1jw148cji7hgrna5ta4w5wyo0fpovye9m80xod0vtdbe9rbrb4xfbn8"
    );
    console.log(data);
  }

  async function connectAsAdmin() {
    const res = await orbis.connectWithSeed([
      205, 228, 76, 81, 250, 24, 149, 235, 47, 72, 245, 54, 151, 217, 79, 178, 76, 66, 235, 169,
      199, 166, 71, 232, 60, 246, 192, 176, 202, 106, 224, 63,
    ]);
    console.log(res);
  }

  return (
    <div>
      <button onClick={() => console.log(user)}>click me </button>
      <button onClick={connect}>Connect </button>
      <button onClick={createContext}>contextcreate </button>
      <button onClick={createProject}>projectttt </button>
      <button onClick={getContexts}>CONTEXTS </button>
      <button onClick={connectAsAdmin}>ADMIN </button>
    </div>
  );
};

export default Login;
