import useTranslation from "next-translate/useTranslation"
import { BracketsCurly, Check } from "phosphor-react"
import { useState } from "react"
import { Card } from "../../../components/Card/Card"
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "../../../components/Dialog/Dialog"
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { BlocksConfigProps } from "../../../types/BlockConfig.types"

type RedirectConfigProps = {
  size?: "sm" | "md" | "full"
} & BlocksConfigProps

export function RedirectConfig(props: RedirectConfigProps) {
  const text = useTranslation().t

  const [redirectType, setRedirectType] = useState<string>("")

  function handleChangeRedirectType(type: string) {
    setRedirectType(type)
    console.log(type)
  }

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("redirectconfig:back")}
        onClick={() => props.onClose()}
      />,
    ]
  }

  return (
    <>
      <Dialog
        height={props.size}
        isOpen={props.isOpen}
        onClose={() => console.log()}
        title={text("redirectconfig:toptitle")}
      >
        <div className="flex flex-col items-center gap-3 lg:gap-6 scrollbar-hide">
          <Card>
            <CardText label={text("redirectconfig:description")} />
            <CardTextInput
              input={{
                label: text("redirectconfig:descriptionlabel"),
                onChange: (e) => console.log(e),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("redirectconfig:link")} />
            <CardTextInput
              input={{
                label: text("redirectconfig:linklabel"),
                onChange: (e) => console.log(e),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("redirectconfig:type")} />
            <CardLine />
            <CardText
              label={text("redirectconfig:manual")}
              indicator={{
                icon: Check,
                isVisible: redirectType !== "manual",
                // onClick: () => handleChangeRedirectType("manual"),
              }}
            />
            <CardLine />
            <CardText
              label={text("redirectconfig:auto")}
              indicator={{
                icon: Check,
                isVisible: redirectType !== "auto",
                // onClick: () => handleChangeRedirectType("auto"),
              }}
            />
            <CardLine />
          </Card>

          {redirectType === "manual" && (
            <Card>
              <CardText label={text("redirectconfig:coverimage")} />
              <CardImageInput
                imageSelector={
                  <ImageSelector onImageChange={() => console.log()} />
                }
              />
            </Card>
          )}

          <Card>
            <CardText label={text("redirectconfig:saveas")} />
            <CardTextInput
              input={{
                label: text("redirectconfig:saveaslabel"),
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
                {text("redirectconfig:savebutton")}
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
