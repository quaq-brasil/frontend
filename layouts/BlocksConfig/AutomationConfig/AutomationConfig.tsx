import useTranslation from "next-translate/useTranslation"
import { BracketsCurly, Check } from "phosphor-react"
import { useState } from "react"
import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardSwitch } from "../../../components/Card/CardContentVariants/CardSwitch"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"

type AutomationConfigProps = {
  isOpen: boolean
  setIsOpen: () => void
  size?: "sm" | "md" | "full"
}

export function AutomationConfig(props: AutomationConfigProps) {
  const text = useTranslation().t

  const [type, setType] = useState<String>("")

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("automationconfig:back")}
        onClick={() => props.setIsOpen()}
      />,
    ]
  }

  function handleChangeType(newType: string) {
    setType(newType)
  }

  return (
    <>
      <Dialog
        height={props.size}
        isOpen={props.isOpen}
        title={text("automationconfig:toptitle")}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          <Card>
            <CardText label={text("automationconfig:description")} />
            <CardTextInput
              input={{
                label: text("automationconfig:descriptionlabel"),
                onChange: (e) => console.log(e),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>

          <Card>
            <CardSwitch
              onChange={() => console.log()}
              text={text("automationconfig:visibility")}
            />
          </Card>

          <Card>
            <CardText label={text("automationconfig:executeafter")} />
            <CardTextInput
              input={{
                label: text("automationconfig:numberof"),
                onChange: (e) => console.log(e),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
            <CardText
              label={text("automationconfig:weeks")}
              indicator={{
                icon: Check,
                onClick: () => handleChangeType("weeks"),
                isVisible: type === "weeks" ? false : true,
              }}
            />
            <CardLine />
            <CardText
              label={text("automationconfig:days")}
              indicator={{
                icon: Check,
                onClick: () => handleChangeType("days"),
                isVisible: type == "days" ? false : true,
              }}
            />
            <CardLine />
            <CardText
              label={text("automationconfig:hours")}
              indicator={{
                icon: Check,
                onClick: () => handleChangeType("hours"),
                isVisible: type === "hours" ? false : true,
              }}
            />
            <CardLine />
            <CardText
              label={text("automationconfig:minutes")}
              indicator={{
                icon: Check,
                onClick: () => handleChangeType("minutes"),
                isVisible: type === "minutes" ? false : true,
              }}
            />
            <CardLine />
          </Card>

          <Card>
            <CardText label={text("automationconfig:executions")} />
            <CardTextInput
              input={{
                label: text("automationconfig:executionslabel"),
                onChange: (e) => console.log(e),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>

          <Card>
            <CardText label={text("automationconfig:saveas")} />
            <CardTextInput
              input={{
                label: text("automationconfig:saveaslabel"),
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
                {text("automationconfig:savebutton")}
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
