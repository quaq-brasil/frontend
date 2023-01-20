import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { Dialog } from "../../../components/Dialog/Dialog"
import { ImageBlock } from "../../../components/ImageBlock/ImageBlock"
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

  const blocks = [
    <ImageBlock
      key={1}
      img_url="https://source.unsplash.com/featured/"
      isEditable={false}
    />,
    <ImageBlock
      key={2}
      img_url="https://source.unsplash.com/featured/"
      isEditable={false}
    />,
    <ImageBlock
      key={3}
      img_url="https://source.unsplash.com/featured/"
      isEditable={false}
    />,
    <ImageBlock
      key={4}
      img_url="https://source.unsplash.com/featured/"
      isEditable={false}
    />,
    <ImageBlock
      key={5}
      img_url="https://source.unsplash.com/featured/"
      isEditable={false}
    />,
  ]

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
          {blocks.map((block, index) => {
            return (
              <button
                className={`w-full rounded-[20px] lg:rounded-[30px] ${
                  selected.includes(index)
                    ? "outline outline-2 outline-sky-600"
                    : "outline-none"
                }`}
                onClick={() => handleSelection(index)}
                key={block.key}
              >
                {block}
              </button>
            )
          })}
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
