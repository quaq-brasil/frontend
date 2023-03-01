import useTranslation from "next-translate/useTranslation"
import { BracketsCurly } from "phosphor-react"
import { Card } from "../../../components/Card/Card"
import { CardSwitch } from "../../../components/Card/CardContentVariants/CardSwitch"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { BlocksConfigProps } from "../../../types/BlockConfig.types"

type JsonConfigProps = {
  size?: "sm" | "md" | "full"
} & BlocksConfigProps

export function JsonConfig(props: JsonConfigProps) {
  const text = useTranslation().t

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("jsonconfig:tab1")}
        onClick={() => props.onClose()}
      />,
    ]
  }

  return (
    <>
      <Dialog
        height={props.size}
        isOpen={props.isOpen}
        title={text("jsonconfig:toptitle")}
      >
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          <Card>
            <CardText label={text("jsonconfig:title1")} />
            <CardTextInput
              input={{
                label: text("jsonconfig:label1"),
              }}
              indicator={{
                icon: BracketsCurly,
              }}
            />
          </Card>
          <Card>
            <CardText label={text("jsonconfig:title2")} />
            <CardTextInput
              input={{
                label: text("jsonconfig:label2"),
              }}
              indicator={{
                icon: BracketsCurly,
              }}
            />
          </Card>
          <Card>
            <CardSwitch text={text("jsonconfig:switch1")} />
          </Card>
          <Card>
            <CardText label={text("jsonconfig:title3")} />
            <CardTextInput
              input={{
                label: text("jsonconfig:label3"),
              }}
              indicator={{
                icon: BracketsCurly,
              }}
            />
          </Card>
          {props.size === "sm" && (
            <button
              className="flex flex-col gap-[0.3125rem] w-[23.375rem] justify-center bg-white
            rounded-[20px] lg:w-[35.25rem] lg:rounded-[30px]"
            >
              <p className="w-full p-3 lg:text-[1.1rem] lg:p-[1.125rem]">
                {text("jsonconfig:savebutton")}
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
