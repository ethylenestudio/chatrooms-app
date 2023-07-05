"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ORBIS } from "@/config";
import { disconnect } from '@wagmi/core'
import { AiOutlineClose } from "react-icons/ai";
import useOrbisUser from "@/hooks/store/useOrbisUser";

const ProfileModal: FC<{ close: () => any }> = ({ close }) => {
    const router = useRouter()
    const [user, setUser] = useState<any>(false)
    const [username, setUsername] = useState<string>("");
    const [note, setNote] = useState<string>("")
    const setUserDid = useOrbisUser((state) => state.setUserDid);

    async function updateUsername() {
        if(!username || username.replace(/\s{1,}/g, "").length === 0 || username === user.username) return
        const { status } = await ORBIS.updateProfile({ username });
        if(status === 200){
            setUser({ ...user, username })
            setNote("Username changed successfully")
        } else {
            setUsername(user.username || user.details.profile?.username || "")
            setNote("Error changing the username, try again.")
        }
    }

    const fetchCurrentUser = async () => {
        const { data, error } = await ORBIS.getProfile(ORBIS.session.id)
        if (error) return setUser({ error })
        const username = data.username || data.details.profile?.username || ""
        setUsername(username)
        setUser({ ...data, username })
    }

    useEffect(() => { fetchCurrentUser() }, [])

    return (
        <>
            <div
                onClick={close}
                className="fixed z-[60] top-0 left-0 flex flex-col justify-center items-center w-full h-full bg-[rgba(10,15,22,0.6)] backdrop-blur-md"
            >
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="px-8 border-[1px] border-[#292F3F] rounded-lg w-[min(100%, 450px)] bg-[rgb(10,15,22)] py-4"
                >
                    <div className="flex justify-between w-[100%] items-center mb-6">
                        <p className="self-start ml-2 pr-4 text-lg text-white">
                            {!user && "Loading profile..." || "Profile Settings"}
                        </p>
                        <AiOutlineClose
                            onClick={close}
                            className="hover:cursor-pointer"
                            color="#7E90AF"
                            size={24}
                        />
                    </div>
                    {user && 
                        <form className="flex flex-col items-center" onSubmit={e => (e.preventDefault(), updateUsername())} action="submit">
                            <img className="mb-4 border-4 border-white block h-[120px] w-[120px] rounded-[50%]" src={`https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${user.did}`} alt="Your generated profile picture" />
                            <div className="text-sm text-slate-400">
                                { user.address && (user.address.slice(0, 8) + "..." + user.address.slice(-6)) || ""}
                            </div>
                            <label>
                                <span className="text-white text-xs">Username</span>
                                <input onChange={e => setUsername(e.target.value)} className="mt-2 border-[1px] border-[#292F3F] bg-[rgba(77,77,77,0.2)] text-white w-full px-4 py-2 opacity-100 rounded-[6px]" value={username} />
                            </label>
                            {
                                note &&
                                <div className="mt-2 w-full text-slate-400 text-sm">{note}</div>
                            }
                            <div className="flex w-full mt-6">
                                <button 
                                    type="button"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        await ORBIS.logout();
                                        setUserDid("")
                                        try{ await disconnect() }catch{}
                                        close();
                                        router.push("/");
                                    }}
                                    className="text-[#CBA1A4] p-2 mr-auto"
                                >
                                    Disconnect
                                </button>
                                <div className="ml-auto">
                                    {username && username !== user.username && 
                                        <button 
                                            type="button"
                                            onClick={e => (e.preventDefault(), setUsername(user.username))} 
                                            className="text-[#7E90AF] p-2 ml-auto inline-block"
                                        >
                                            Cancel
                                        </button>
                                    }
                                    {
                                        (username === user.username || username.replace(/\s{1,}/g, "").length === 0) && 
                                        <button 
                                            onClick={e => (e.preventDefault(), close())} 
                                            className="text-[#7E90AF] p-2 inline-block disabled:opacity-50"
                                        >
                                            Close
                                        </button> ||
                                        <button 
                                            type="submit"
                                            className="text-[#7E90AF] p-2 inline-block disabled:opacity-50"
                                        >
                                            Save
                                        </button>
                                    }
                                </div>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </>
    );
};

export default ProfileModal;
