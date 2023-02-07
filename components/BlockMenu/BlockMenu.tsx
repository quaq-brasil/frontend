import {
  ArrowsOutCardinal,
  DotsThreeOutline,
  PencilSimple,
  TrashSimple,
} from "phosphor-react"
import { useState } from "react"
import { Tag } from "../Tag/Tag"

type BlockMenuProps = {
  onMove?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export function BlockMenu({ onDelete, onEdit, onMove }: BlockMenuProps) {
  const [isEditSelected, setIsEditSelected] = useState(false)

  return (
    <div className="w-full absolute top-0 z-10 flex flex-row justify-between">
      <div
        className={`flex flex-row p-1 gap-1 lg:gap-[0.625rem] lg:p-[0.625rem] ${
          isEditSelected ? "block" : "invisible"
        }`}
      >
        <Tag variant="icn" icon={ArrowsOutCardinal} />
        <Tag variant="icn" icon={PencilSimple} />
        <Tag variant="icn" icon={TrashSimple} />
      </div>
      <button
        onClick={() => setIsEditSelected(!isEditSelected)}
        className={`right-0 w-[1.4rem] h-[1.4rem] lg:w-[2rem] lg:h-[2rem] rounded-full shrink-0 flex justify-center items-center ${
          isEditSelected ? "bg-slate-900" : "bg-white border border-slate-100"
        }`}
      >
        <DotsThreeOutline
          size={32}
          weight="fill"
          className={`w-[1rem] h-[1rem] lg:w-[1.25rem] lg:h-[1.25rem] shrink-0 ${
            isEditSelected ? "text-white" : "text-black"
          }`}
        />
      </button>
    </div>
  )
}
