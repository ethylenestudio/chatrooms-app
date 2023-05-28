import { Menu } from "@/components";
import { DUMMY } from "@/dummy";

export default function MenuPage() {
  return (
    <div className="overflow-scroll h-[80vh]">
      <Menu conversations={DUMMY.conversations} />
    </div>
  );
}
