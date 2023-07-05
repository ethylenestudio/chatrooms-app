"use client";
import { Chat } from "@/components";

import useCheckConnection from "@/hooks/useCheckConnection";
import { useRouter, useParams } from "next/navigation";


export default function ChatPage() {
  const router = useRouter();

  const { context } = useParams()
  if(!context){
    router.push("/")
    return <h1>Redirecting...</h1>
  }

  return <Chat context={context as string} className="col-span-2" />;
}
