import { Card } from "components/Card/Card"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { Check } from "phosphor-react"
import { IUpdateWorkspace } from "types/Workspace.type"

type HireServicePageContentProps = {
  workspaceData: IUpdateWorkspace | undefined
  serviceData: any
}

export function HireServicePageContent({
  workspaceData,
  serviceData,
}: HireServicePageContentProps) {
  const text = useTranslation().t
  const router = useRouter()

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:pt-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <div className="w-full font-semibold">
              <CardText
                label={`${text("wssettings:about")} - ${serviceData.title}`}
              />
            </div>
            <CardLine />
            <CardText label={serviceData.description} />
            <CardLine />
          </Card>

          {serviceData.options.map((service: any) => {
            return (
              <Card key={service.title}>
                <div className="w-full font-semibold">
                  <CardText label={service.title} />
                </div>
                <CardLine />
                <CardText label={service.description} />
                <CardLine />
                <CardText label={service.price} />
                <CardLine />
                <CardText
                  label={text("wssettings:subscribed")}
                  indicator={{ icon: Check, isVisible: !service.subscribed }}
                />
              </Card>
            )
          })}
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
