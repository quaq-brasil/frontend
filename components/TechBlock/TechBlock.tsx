import useTranslation from "next-translate/useTranslation"
import { EyeSlash, Trash } from "phosphor-react"
import { IBlock } from "../../types/Block.types"

type IWebhook = {
  description?: string
  visibility?: boolean
  parameters?: any
  header?: string
  body?: string
  type?: string
  link?: string
}

type ITechBlock = {
  data: IWebhook
} & IBlock

type TechBlockProps = {
  block: ITechBlock
  isEditable: boolean
  type: string
  isVisible?: boolean
  onDelete?: () => void
}

export const TechBlock = ({
  block,
  isEditable,
  type,
  onDelete,
}: TechBlockProps) => {
  const text = useTranslation().t

  return (
    <div
      className={`flex relative flex-col gap-[0.3125rem] justify-center
            min-w-[100%] bg-white p-[0.75rem] rounded-[20px] lg:rounded-[30px]
            ${
              block.data.visibility === false &&
              isEditable === false &&
              "hidden"
            }
            `}
    >
      {isEditable && (
        <button
          onClick={onDelete}
          className="z-10 absolute shrink-0 flex content-center rounded-full bg-white right-0 top-0"
        >
          <Trash className="w-[1rem] h-[1rem] m-[5px] lg:w-[1.25rem] lg:h-[1.25rem] drop-shadow-md" />
        </button>
      )}
      <div className="flex flex-row gap-3 items-center  mb-[0.5rem]">
        {!block.data.visibility && (
          <div className="w-[1.25rem] h-[1.25rem] lg:w-[1.75rem] lg:h-[1.75rem]">
            <EyeSlash className="w-[1.25rem] h-[1.25rem] lg:w-[1.75rem] lg:h-[1.75rem]" />
          </div>
        )}
        <p
          className={`lg:text-[1.1rem] inline-block w-auto ${
            block.data.visibility ? "pl-2" : ""
          }`}
        >
          {block.data.description}
        </p>
      </div>
      <span className="w-full p-[0.5px] bg-slate-100 mb-[0.5rem] lg:text-[1.1rem]"></span>
      {type === "webhook" && (
        <div>
          <p className="font-semibold">{text("webhookconfig:type")}</p>
          <p className="pl-3 mb-2">{block.data.type}</p>
          <p className="font-semibold">link</p>
          <p className="pl-3 mb-2">{block.data.link}</p>
          <p className="font-semibold">{text("webhookconfig:parameters")}</p>
          <p className="pl-3 mb-2">{block.data.parameters}</p>
          <p className="font-semibold">{text("webhookconfig:saveas")}</p>
          <p className="pl-3 mb-2">{block.saveAs}</p>
        </div>
      )}
    </div>
  )
}
