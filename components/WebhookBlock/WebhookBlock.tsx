import useTranslation from "next-translate/useTranslation"
import dynamic from "next/dynamic"
import { EyeSlash } from "phosphor-react"
import { IBlock } from "../../types/Block.types"
const BlockMenu = dynamic(
  () => import("../BlockMenu/BlockMenu").then((mod) => mod.default),
  { ssr: false }
)

type IData = {
  description?: string
  visibility?: boolean
  parameters?: any
  header?: string
  body?: string
  type?: string
  link?: string
}

type IWebhookBlock = {
  data: IData
} & IBlock

type WebhookBlockProps = {
  block: IWebhookBlock
  isEditable: boolean
  isVisible?: boolean
  onDelete?: () => void
}

export const WebhookBlock = ({
  block,
  isEditable,
  onDelete,
}: WebhookBlockProps) => {
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
      {isEditable && <BlockMenu onDelete={onDelete} />}
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
      <div>
        <p className="font-semibold">{text("webhookconfig:type")}</p>
        <p className="pl-3 mb-2">{block.data.type}</p>
        <p className="font-semibold">link</p>
        <p className="pl-3 mb-2">{block.data.link}</p>
        <p className="font-semibold">{text("webhookconfig:parameters")}</p>
        <p className="pl-3 mb-2">{block.data.parameters}</p>
        <p className="font-semibold">{text("webhookconfig:saveas")}</p>
        <p className="pl-3 mb-2">{block.save_as}</p>
      </div>
    </div>
  )
}
