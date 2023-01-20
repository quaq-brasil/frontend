import useTranslation from "next-translate/useTranslation"
import { BracketsCurly } from "phosphor-react"
import { Card } from "../../../components/Card/Card"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"

type ToggleConfigProps = {
  isOpen: boolean
  setIsOpen: () => void
  size?: "sm" | "md" | "full"
}

export function ToggleConfig(props: ToggleConfigProps) {
  const text = useTranslation().t

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("toggleconfig:tab1")}
        onClick={() => props.setIsOpen()}
      />,
    ]
  }

  return (
    <>
      <Dialog
        height={props.size}
        isOpen={props.isOpen}
        title={text("toggleconfig:toptitle")}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col gap-3 lg:gap-6 items-center">
          <Card>
            <CardText label={text("toggleconfig:title1")} />
            <CardTextInput
              input={{
                label: text("toggleconfig:label1"),
                onChange: (e) => console.log(e),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("toggleconfig:title2")} />
            <CardTextInput
              input={{
                label: text("toggleconfig:label2"),
                onChange: (e) => console.log(e),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>
          {props.size === "sm" && (
            <button
              className="flex flex-col gap-[0.3125rem] w-[23.375rem] justify-center bg-white
            rounded-[20px] lg:w-[35.25rem] lg:rounded-[30px]"
            >
              <p className="w-full p-3 lg:text-[1.1rem] lg:p-[1.125rem]">
                {text("toggleconfig:savebutton")}
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
