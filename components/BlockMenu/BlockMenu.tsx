import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react"
import useTranslation from "next-translate/useTranslation"
import { DotsThree } from "phosphor-react"
import { useState } from "react"

type BlockMenuProps = {
  onEdit?: () => void
  onDelete?: () => void
  onDrag?: () => void
}

export default function BlockMenu({
  onDelete,
  onDrag,
  onEdit,
}: BlockMenuProps) {
  const text = useTranslation().t
  const [selected, setSelected] = useState(false)
  return (
    <div className="absolute right-0 top-0 z-10">
      <Menu placement="left-start">
        <button onClick={() => setSelected(!selected)} className="w-fit h-fit">
          <MenuHandler>
            <button
              className={`h-[1.5rem] w-[1.5rem] rounded-full flex justify-center items-center ${
                selected ? "bg-slate-900 text-white" : "bg-white text-black"
              } outline outline-1 outline-slate-100`}
            >
              <DotsThree className="w-[2rem] h-[2rem]" weight="bold" />
            </button>
          </MenuHandler>
        </button>
        <MenuList className="rounded-xl text-[1rem] lg:text-[1rem] px-0 py-0">
          <MenuItem className="flex justify-start w-full">
            <p
              onClick={onEdit}
              className="flex flex-row gap-2 justify-center items-center py-1 px-2 mt-2 rounded-xl hover:bg-slate-100"
            >
              {text("blockmenu:edit")}
            </p>
          </MenuItem>
          <MenuItem className="flex justify-start w-full">
            <p
              onClick={onDrag}
              className="flex flex-row gap-2 justify-center items-center py-1 px-2 rounded-xl hover:bg-slate-100"
            >
              {text("blockmenu:drag")}
            </p>
          </MenuItem>
          <MenuItem className="flex justify-start w-full">
            <p
              onClick={onDelete}
              className="flex flex-row gap-2 justify-center items-center py-1 px-2 rounded-xl hover:bg-slate-100"
            >
              {text("blockmenu:delete")}
            </p>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}
