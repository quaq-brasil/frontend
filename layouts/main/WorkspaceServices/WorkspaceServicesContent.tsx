import { Card } from "components/Card/Card"
import { CardText } from "components/Card/CardContentVariants/CardText"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { ArrowRight } from "phosphor-react"
import { useState } from "react"
import { IUpdateWorkspace } from "types/Workspace.type"

type WorkspaceServicesContentProps = {
  workspaceData: IUpdateWorkspace | undefined
}

export function WorkspaceServicesContent({
  workspaceData,
}: WorkspaceServicesContentProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [workspaceServices, setWorkspaceServices] = useState(["omni-quaq"])
  const [workspaceServicesHired, setWorkspaceServicesHired] = useState([])

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:pt-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("wssettings:services.available")} />
            {workspaceServices.map((service) => (
              <CardText
                label={service}
                key={service}
                indicator={{ icon: ArrowRight }}
                onClick={() => {}}
              />
            ))}
          </Card>

          <Card>
            <CardText label={text("wssettings:services.hired")} />
            {workspaceServicesHired.length === 0 ? (
              <CardText label={text("wssettings:services.hired.none")} />
            ) : (
              workspaceServicesHired.map((service) => (
                <CardText label={service} key={service} />
              ))
            )}
          </Card>
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
