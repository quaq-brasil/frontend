import useTranslation from "next-translate/useTranslation"
import { BracketsCurly } from "phosphor-react"
import { Card } from "../../../components/Card/Card"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { BlocksConfigProps } from "../../../types/BlockConfig.types"

type CounterConfigProps = {
  size?: "sm" | "md" | "full"
} & BlocksConfigProps

export function CounterConfig(props: CounterConfigProps) {
  const text = useTranslation().t

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("counterconfig:tab1")}
        onClick={() => props.onClose()}
      />,
    ]
  }

  return (
    <>
      <Dialog
        height={props.size}
        isOpen={props.isOpen}
        title={text("counterconfig:toptitle")}
        onClose={() => "closed"}
      >
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          <Card>
            <CardText label={text("counterconfig:title1")} />
            <CardTextInput
              input={{
                label: text("counterconfig:label1"),
                onChange: (e) => e,
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => "click",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("counterconfig:title2")} />
            <CardTextInput
              input={{
                label: text("counterconfig:label2"),
                onChange: (e) => e,
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => "click",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("counterconfig:title3")} />
            <CardTextInput
              input={{
                label: text("counterconfig:label3"),
                onChange: (e) => e,
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => "click",
              }}
            />
          </Card>
          {props.size === "sm" && (
            <button
              className="flex flex-col gap-[0.3125rem] w-[23.375rem] justify-center bg-white
            rounded-[20px] lg:w-[35.25rem] lg:rounded-[30px]"
            >
              <p className="w-full p-3 lg:text-[1.1rem] lg:p-[1.125rem]">
                {text("counterconfig:savebutton")}
              </p>
            </button>
          )}
          <TabBar
            isHidden={props.size === "sm" ? true : false}
            tags={handleTabBar()}
          />
        </div>
      </Dialog>
    </>
  )
}
