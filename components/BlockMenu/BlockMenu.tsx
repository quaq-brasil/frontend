import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react"
import useTranslation from "next-translate/useTranslation"
import { ArrowsOutCardinal, DotsThree, X } from "phosphor-react"
import { memo, useState } from "react"

export type BlockMenuProps = {
  onEdit?: () => void
  onDelete?: () => void
  onDrag?: () => void
}

export const BlockMenu = memo(function BlockMenu({
  onDelete,
  onDrag,
  onEdit,
}: BlockMenuProps) {
  const text = useTranslation().t

  const [selected, setSelected] = useState(false)
  const [isMoveSelected, setIsMoveSelected] = useState(false)

  return (
    <div className="absolute right-0 top-0 z-50">
      <Menu placement="left-start">
        {!isMoveSelected && (
          <>
            <button
              onClick={() => setSelected(!selected)}
              className="w-fit h-fit"
            >
              <MenuHandler>
                <button
                  className={`h-[1.5rem] w-[1.5rem] shrink-0 rounded-full flex justify-center items-center ${
                    selected ? "bg-slate-900 text-white" : "bg-white text-black"
                  } ring-1 ring-slate-100`}
                >
                  <DotsThree className="w-[2rem] h-[2rem]" weight="bold" />
                </button>
              </MenuHandler>
            </button>
            <MenuList className="rounded-xl text-[1rem] lg:text-[1rem] px-0 py-0">
              <MenuItem className="flex justify-start w-full">
                <p
                  onClick={() => {
                    setSelected(false)
                    onEdit && onEdit()
                  }}
                  className="flex flex-row gap-2 justify-center items-center py-1 px-2 mt-2 rounded-xl hover:bg-slate-100"
                >
                  {text("blockmenu:edit")}
                </p>
              </MenuItem>
              <MenuItem className="flex justify-start w-full">
                <p
                  onClick={() => {
                    setIsMoveSelected(true)
                  }}
                  className="flex flex-row gap-2 justify-center items-center py-1 px-2 rounded-xl hover:bg-slate-100"
                >
                  {text("blockmenu:drag")}
                </p>
              </MenuItem>
              <MenuItem className="flex justify-start w-full">
                <p
                  onClick={() => {
                    setSelected(false)
                    onDelete && onDelete()
                  }}
                  className="flex flex-row gap-2 justify-center items-center py-1 px-2 rounded-xl hover:bg-slate-100"
                >
                  {text("blockmenu:delete")}
                </p>
              </MenuItem>
            </MenuList>
          </>
        )}
        {isMoveSelected && (
          <>
            <button
              onClick={() => {}}
              className="w-fit h-fit flex flex-row justify-start items-center align-middle gap-2"
            >
              <button
                onClick={() => setIsMoveSelected(false)}
                className={`h-[1.5rem] w-[1.5rem] rounded-full flex justify-center items-center bg-white text-black ring-1 ring-slate-100`}
              >
                <X className="w-[1.15rem] h-[1.15rem] ml-[1px]" />
              </button>
              <button
                className={`h-[1.5rem] w-[1.5rem] rounded-full flex justify-center items-center bg-slate-900 text-white ring-1 ring-slate-100`}
              >
                <ArrowsOutCardinal className="w-[1.15rem] h-[1.15rem] ml-[1px]" />
              </button>
            </button>
          </>
        )}
      </Menu>
    </div>
  )
})
