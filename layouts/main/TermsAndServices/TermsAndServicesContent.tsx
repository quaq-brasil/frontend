import { Card } from "components/Card/Card"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import useTranslation from "next-translate/useTranslation"
import { ArrowRight } from "phosphor-react"

export function TermsAndServicesContent() {
  const text = useTranslation().t

  function handleSendToLink(link: string) {
    window.location.href = link
  }

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("terms:policies")} />
            <CardText
              label={text("terms:policieslabel")}
              indicator={{ icon: ArrowRight }}
              onClick={() => handleSendToLink(text("terms:policieslink"))}
            />
            <CardLine />
          </Card>
          <Card>
            <CardText label={text("terms:terms")} />
            <CardText
              label={text("terms:termslabel")}
              indicator={{ icon: ArrowRight }}
              onClick={() => handleSendToLink(text("terms:termslink"))}
            />
            <CardLine />
          </Card>
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
