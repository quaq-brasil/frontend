import { Card } from "components/Card/Card"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import useTranslation from "next-translate/useTranslation"
import { IUpdateTemplate } from "types/Template.type"

type CentralStatsContentProps = {
  templateData: IUpdateTemplate | undefined
}

export function CentralStatsContent({
  templateData,
}: CentralStatsContentProps) {
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
            <CardText label={text("centralstats:general")} />
            <CardLine />
            <CardText
              label={text("centralstats:accesses")}
              indicator={{ text: "100" }}
            />
            <CardLine />
            <CardText
              label={text("centralstats:depth")}
              indicator={{ text: "89%" }}
            />
            <CardLine />
          </Card>
          <Card>
            <CardText label={text("centralstats:accessbymethods")} />
            <CardLine />
            <CardText label="quaq" indicator={{ text: "67" }} />
            <CardLine />
            <CardText label="whatsapp" indicator={{ text: "33" }} />
            <CardLine />
          </Card>

          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
