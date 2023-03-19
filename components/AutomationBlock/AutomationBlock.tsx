import { Card } from "components/Card/Card"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { ComparisonType } from "layouts/BlocksConfig/AutomationConfig/AutomationOptions"
import useTranslation from "next-translate/useTranslation"
import dynamic from "next/dynamic"
import { EyeSlash } from "phosphor-react"
import { IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"

const BlockMenu = dynamic(
  () => import("components/BlockMenu/BlockMenu").then((mod) => mod.BlockMenu),
  { ssr: false }
)

export interface IComparison {
  type: ComparisonType
  value: any
  comparativeValue?: any
}

type IData = {
  description: string
  conditionals: IComparison[][]
  blocks: any[]
}

type IAutomationBlock = {
  data: IData
} & IBlock

type AutomationBlockProps = {
  block: IAutomationBlock
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
}

export const AutomationBlock = (props: AutomationBlockProps) => {
  const text = useTranslation().t

  return (
    <div
      className={`flex relative justify-end ${
        props.isEditable ? "" : "hidden"
      }`}
    >
      {props.isEditable === true && (
        <BlockMenu onDelete={props.onDelete} onEdit={props.onEdit} />
      )}
      <Card>
        <div className="flex flex-row items-center">
          <div className="ml-4 w-[1.25rem] h-[1.25rem] lg:w-[1.75rem] lg:h-[1.75rem]">
            <EyeSlash className="w-[1.25rem] h-[1.25rem] lg:w-[1.75rem] lg:h-[1.75rem]" />
          </div>
          <CardText label={props.block.data.description} />
        </div>
        <CardLine />
        {props.block.data.conditionals.map((conditionals, outerIndex) => {
          const triggers = conditionals.map((conditional, innerIndex) => {
            return `${conditional.value} ${conditional.type} ${conditional?.comparativeValue}`
          })
          const joinedTriggers = triggers.join(` ${text("consumerpage:and")} `)
          return (
            <>
              <CardText
                key={joinedTriggers}
                label={`${
                  outerIndex > 0 ? text("consumerpage:or") : ""
                }${joinedTriggers}`}
              />
              <CardLine />
            </>
          )
        })}
      </Card>
    </div>
  )
}
