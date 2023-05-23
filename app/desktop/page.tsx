import { Chat, Menu } from "@/components";
import { DUMMY } from "@/dummy";

export default function DesktopPage() {
  return (
    <div className="h-[80vh] flex">
      <div className="h-[80vh] overflow-scroll w-[30%] border-r-2 border-slate-900">
        <Menu conversations={DUMMY.conversations} />
      </div>
      <div className="h-[80vh] overflow-scroll w-[70%]">
        <Chat messages={DUMMY.messages} />
      </div>
    </div>
  );
}
