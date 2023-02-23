import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"

type CreationsConfigBlocksProps = {
  isOpen: boolean
  setIsOpen: () => void
  size?: "sm" | "md" | "full"
}

export function CreationsConfigBlocks(props: CreationsConfigBlocksProps) {
  const text = useTranslation().t

  const [selected, setSelected] = useState<number[]>([])

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("creationsconfig:back")}
        onClick={() => props.setIsOpen()}
      />,
    ]
  }

  function handleSelection(index: number) {
    if (selected.includes(index)) {
      setSelected(selected.filter((item) => item !== index))
    } else {
      setSelected([...selected, index])
    }

    console.log(selected)
  }

  return (
    <>
      <Dialog
        height={props.size}
        isOpen={props.isOpen}
        title={"Template Title"}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          {props.size === "sm" && (
            <button
              className="flex flex-col gap-[0.3125rem] w-[23.375rem] justify-center bg-white
            rounded-[20px] lg:w-[35.25rem] lg:rounded-[30px]"
            >
              <p className="w-full p-3 lg:text-[1.1rem] lg:p-[1.125rem]">
                {text("creationsconfig:copy")}
              </p>
            </button>
          )}
        </div>
        <TabBar
          isHidden={props.size === "sm" ? true : false}
          tags={handleTabBar()}
        />
      </Dialog>
    </>
  )
}
