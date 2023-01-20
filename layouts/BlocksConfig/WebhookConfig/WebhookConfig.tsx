import useTranslation from "next-translate/useTranslation"
import { BracketsCurly, Check } from "phosphor-react"
import { useState } from "react"
import { Card } from "../../../components/Card/Card"
import { CardSwitch } from "../../../components/Card/CardContentVariants/CardSwitch"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "../../../components/Dialog/Dialog"
import { JsonEditor } from "../../../components/JsonEditor/JsonEditor"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"

type WebhookConfigProps = {
  isOpen: boolean
  setIsOpen: () => void
  size?: "sm" | "md" | "full"
}

export function WebhookConfig(props: WebhookConfigProps) {
  const text = useTranslation().t

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("webhookconfig:tab1")}
        onClick={() => props.setIsOpen()}
      />,
    ]
  }

  const [type, setType] = useState<"GET" | "POST" | "DELETE" | "PATCH" | "">("")

  function handleChangeType(type: "GET" | "POST" | "DELETE" | "PATCH" | "") {
    setType(type)
  }

  return (
    <>
      <Dialog
        height={props.size}
        isOpen={props.isOpen}
        title={text("webhookconfig:toptitle")}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          <Card>
            <CardText label={text("webhookconfig:description")} />
            <CardTextInput
              input={{
                label: text("webhookconfig:descriptioninput"),
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
              onChange={(e) => console.log()}
              text={text("webhookconfig:switch")}
              showStatus={true}
            />
          </Card>

          <Card>
            <CardText label={text("webhookconfig:parameters")} />
            <CardTextInput
              input={{
                label: text("webhookconfig:parametersinput"),
                onChange: (e) => console.log(e),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>

          <Card>
            <CardText label={text("webhookconfig:header")} />
            <JsonEditor json={{}} name="header" />
          </Card>

          <Card>
            <CardText label={text("webhookconfig:body")} />
            <JsonEditor json={{}} name="body" />
          </Card>

          <Card>
            <CardText label={text("webhookconfig:type")} />
            <CardText
              label={text("webhookconfig:get")}
              indicator={{
                icon: Check,
                onClick: () => handleChangeType("GET"),
                isVisible: type == "GET" ? false : true,
              }}
            />
            <CardText
              label={text("webhookconfig:post")}
              indicator={{
                icon: Check,
                onClick: () => handleChangeType("POST"),
                isVisible: type == "POST" ? false : true,
              }}
            />
            <CardText
              label={text("webhookconfig:patch")}
              indicator={{
                icon: Check,
                onClick: () => handleChangeType("PATCH"),
                isVisible: type == "PATCH" ? false : true,
              }}
            />
            <CardText
              label={text("webhookconfig:delete")}
              indicator={{
                icon: Check,
                onClick: () => handleChangeType("DELETE"),
                isVisible: type == "DELETE" ? false : true,
              }}
            />
          </Card>

          <Card>
            <CardText label={text("webhookconfig:link")} />
            <CardTextInput
              input={{
                label: text("webhookconfig:linkinput"),
                onChange: (e) => console.log(e),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>

          <Card>
            <CardText label={text("webhookconfig:saveas")} />
            <CardTextInput
              input={{
                label: text("webhookconfig:saveasinput"),
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
                {text("webhookconfig:savebutton")}
              </p>
            </button>
          )}
        </div>
        <TabBar isHidden={true} tags={handleTabBar()} />
      </Dialog>
    </>
  )
}
