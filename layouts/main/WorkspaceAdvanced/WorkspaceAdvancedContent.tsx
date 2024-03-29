import { Card } from "components/Card/Card"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { ArrowRight } from "phosphor-react"
import { IUpdateWorkspace } from "types/Workspace.type"
import { pageUrls } from "utils/pagesUrl"

type WorkspaceAdvancedContentProps = {
  workspaceData: IUpdateWorkspace | undefined
}

export function WorkspaceAdvancedContent({
  workspaceData,
}: WorkspaceAdvancedContentProps) {
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
            <CardText label={text("wsadvanced:options")} />
            <CardText
              label={text("wsadvanced:delete")}
              indicator={{ icon: ArrowRight }}
              onClick={() =>
                router.push(
                  pageUrls.workspaceSettings({
                    settings: "delete",
                    workspaceSlug: workspaceData?.slug,
                  })
                )
              }
            />
            <CardLine />
          </Card>
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
