import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { ArrowRight, Check } from "phosphor-react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { IUpdatePage } from "../../../types/Page.type"
import { IUpdateTemplate } from "../../../types/Template.type"
import { pageUrls } from "../../../utils/pagesUrl"

type TemplateAccessControlContentProps = {
  templateData: IUpdateTemplate | undefined
  pageData: IUpdatePage | undefined
}

export function TemplateAccessControlContent({
  templateData,
  pageData,
}: TemplateAccessControlContentProps) {
  const text = useTranslation().t

  const router = useRouter()

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("accesscontrol:link")} />
            <CardTextInput
              input={{
                label: text("accesscontrol:linklabel"),
                onChange: () => console.log(),
                value: templateData?.url,
                fixedText: `quaq.me/${pageData?.url}/`,
              }}
              indicator={{
                icon: Check,
                onClick: () => console.log(),
                bgColor: "green-500",
              }}
            />
            <CardText
              label={text("accesscontrol:share")}
              indicator={{ icon: ArrowRight }}
            />
          </Card>
          <Card>
            <CardText label={text("accesscontrol:trackers")} />
            <CardLine />
            <CardText
              label={text("accesscontrol:setuptrackers")}
              indicator={{ icon: ArrowRight }}
              onClick={() =>
                router.push(
                  pageUrls.templateCentral({
                    pageSlug: pageData?.url || "",
                    templateSlug: templateData?.url || "",
                    settings: "trackers",
                  })
                )
              }
            />
            <CardLine />
          </Card>
          <div className="hidden w-full h-fit xl:block">
            <Button
              block={{
                data: {
                  color: "bg-black",
                  text: text("accesscontrol:confirm"),
                  onClick: () =>
                    router.push(
                      pageUrls.pageSettings({ pageSlug: pageData?.url || "" })
                    ),
                },
              }}
              isEditable={false}
            />
          </div>
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
