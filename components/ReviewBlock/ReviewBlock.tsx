import { Star, Trash } from "phosphor-react"
import { useEffect, useState } from "react"
import { IBlock } from "../../types/Block.types"
import { IInteractionData } from "../../types/Interaction.type"
import { CardLine } from "../Card/CardContentVariants/CardLine"

type IData = {
  description: string
}

type IReviewBlock = {
  data: IData
} & IBlock

type ReviewBlockProps = {
  block: IReviewBlock
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
}

export const ReviewBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
}: ReviewBlockProps) => {
  const [selected, setSelected] = useState(0)

  function handleOnClick(option: number) {
    setSelected(option)
  }

  const onInteraction = () => {
    handleUpdateInteractions &&
      handleUpdateInteractions({
        id: block.id as string,
        saveAs: block.saveAs as string,
        type: block.type as string,
        data: {
          description: block.data.description,
          answer: selected,
        },
      })
  }

  useEffect(() => {
    onInteraction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <div className="flex relative justify-end">
      {isEditable === true && (
        <button
          onClick={onDelete}
          className="z-10 absolute right-0 top-0 rounded-full bg-white border border-slate-100"
        >
          <Trash className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
        </button>
      )}
      <div
        className="flex flex-col w-full justify-center items-center bg-white 
          p-[0.75rem] rounded-[20px] lg:rounded-[30px]"
      >
        <p className="pb-3 px-1 font-semibold lg:text-[1.1rem] lg:px-[1.125rem]">
          {block.data.description}
        </p>
        <CardLine />
        <div className="flex flex-row justify-between pt-3 pb-2 w-full px-[20%] md:px-[25%] ">
          <button onClick={() => handleOnClick(1)}>
            <Star
              className={`w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] ${
                selected > 0 ? "text-yellow-500" : "text-slate-500"
              }`}
            />
          </button>
          <button onClick={() => handleOnClick(2)}>
            <Star
              className={`w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] ${
                selected > 1 ? "text-yellow-500" : "text-slate-500"
              }`}
            />
          </button>
          <button onClick={() => handleOnClick(3)}>
            <Star
              className={`w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] ${
                selected > 2 ? "text-yellow-500" : "text-slate-500"
              }`}
            />
          </button>
          <button onClick={() => handleOnClick(4)}>
            <Star
              className={`w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] ${
                selected > 3 ? "text-yellow-500" : "text-slate-500"
              }`}
            />
          </button>
          <button onClick={() => handleOnClick(5)}>
            <Star
              className={`w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] ${
                selected > 4 ? "text-yellow-500" : "text-slate-500"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
