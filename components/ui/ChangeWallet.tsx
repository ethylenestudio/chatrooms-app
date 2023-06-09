import React, { FC, useState } from "react";
import { disconnect } from "@wagmi/core";
import { useRouter } from "next/navigation"
import { ORBIS } from "@/config";
import useOrbisUser from "@/hooks/store/useOrbisUser";

export const ChangeWallet: FC<{ text?: string, redirect?: boolean }> = ({ text, redirect = false }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const setUserDid = useOrbisUser((state) => state.setUserDid);

    const logout = async () => {
        if (loading) return
        setLoading(true)

        try { await ORBIS.logout() } catch { }
        localStorage.removeItem("chatrooms:auth:signature")
        try { setUserDid("") } catch { }
        try { await disconnect() } catch { }

        if(!redirect) return
        return router.push("/")
    }

    return <button
        className="rounded-3xl outline-white hover:outline-[1px] py-2 text-sm px-4 text-[.8rem]"
        onClick={() => logout()}
    >
        {text || "Change Wallet"}
    </button>
}