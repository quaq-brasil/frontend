import {
  ArrowsOutCardinal,
  Crop,
  Eye,
  Faders,
  PencilSimple,
  Play,
} from "phosphor-react";

type ShortcutMenuProps = {};

export default function ShortcutMenu({}: ShortcutMenuProps) {
  return (
    <div className="relative z-10 h-fit min-w-full w-fit pt-3 pl-3 overflow-scroll flex scrollbar-hide gap-3 items-center justify-start">
      <div className="min-w-[40px] h-10 rounded-full bg-white p-1 flex items-center justify-center">
        <PencilSimple className="w-5 h-5 text-black" weight="bold" />
      </div>
      <div className="min-w-[40px] h-10 rounded-full bg-white p-1 flex items-center justify-center">
        <Play className="w-5 h-5 text-black" weight="bold" />
      </div>
      <div className="min-w-[40px] h-10 rounded-full bg-white p-1 flex items-center justify-center">
        <Faders className="w-5 h-5 text-black" weight="bold" />
      </div>
      <div className="min-w-[40px] h-10 rounded-full bg-white p-1 flex items-center justify-center">
        <Crop className="w-5 h-5 text-black" weight="bold" />
      </div>
      <div className="min-w-[40px] h-10 rounded-full bg-white p-1 flex items-center justify-center">
        <Eye className="w-5 h-5 text-black" weight="bold" />
      </div>
      <div className="min-w-[40px] h-10 rounded-full bg-white p-1 flex items-center justify-center mr-3">
        <ArrowsOutCardinal className="w-5 h-5 text-black" weight="bold" />
      </div>
    </div>
  );
}
