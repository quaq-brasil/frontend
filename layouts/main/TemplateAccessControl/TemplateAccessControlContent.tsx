import useTranslation from "next-translate/useTranslation"
import { Check } from "phosphor-react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { IUpdateTemplate } from "../../../types/Template.type"

type TemplateAccessControlContentProps = {
  templateData: IUpdateTemplate | undefined
}

export function TemplateAccessControlContent({
  templateData,
}: TemplateAccessControlContentProps) {
  const text = useTranslation().t

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("accesscontrol:title")} />
            <CardLine />
            <CardText label={text("accesscontrol:longtext")} />
            <CardLine />
          </Card>
          <Card>
            <CardText label={text("accesscontrol:link")} />
            <CardTextInput
              input={{
                label: text("accesscontrol:linklabel"),
                onChange: () => console.log(),
                value: templateData?.url,
                fixedText: "quaq.me/",
              }}
              indicator={{
                icon: Check,
                onClick: () => console.log(),
                bgColor: "green-500",
              }}
            />
            <CardText
              label={text("accesscontrol:share")}
              // indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
          </Card>
          <Card>
            <CardText label={text("accesscontrol:trackers")} />
            <CardLine />
            <CardText
              label={text("accesscontrol:setuptrackers")}
              // indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
            <CardLine />
          </Card>
          <div className="hidden w-full h-fit xl:block">
            <Button
              color="black"
              onClick={() => console.log()}
              text={text("accesscontrol:confirm")}
            />
          </div>
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
