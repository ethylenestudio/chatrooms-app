import { Chat, Menu } from "@/components";
import { DUMMY } from "@/dummy";

export default function ChatPage() {
  return (
    <div className="overflow-scroll h-[80vh]">
      <Chat messages={DUMMY.messages} />
    </div>
  );
}
