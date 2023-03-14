import { Card } from "components/Card/Card"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardLog } from "components/Card/CardContentVariants/CardLog"
import { CardText } from "components/Card/CardContentVariants/CardText"
import moment from "moment"
import { useRouter } from "next/router"
import { ArrowRight } from "phosphor-react"
import { useEffect, useState } from "react"
import { useMutateTemplate } from "services/hooks/useTemplate/useMutateTemplate"
import { IUpdatePage } from "types/Page.type"
import { ITemplateLogs, IUpdateTemplate } from "types/Template.type"
import { pageUrls } from "utils/pagesUrl"

type InteractionLogContentProps = {
  templateData: IUpdateTemplate | undefined
  pageData: IUpdatePage | undefined
}

export function InteractionLogContent({
  templateData,
  pageData,
}: InteractionLogContentProps) {
  const [options, setOptions] = useState<ITemplateLogs>()

  const router = useRouter()

  const getLogs = useMutateTemplate()

  useEffect(() => {
    if (templateData?.id) {
      getLogs.mutate(
        {
          id: templateData.id,
        },
        {
          onSuccess: (data) => {
            setOptions(data)
          },
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateData])

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            {options?.Publications ? (
              options.Publications.map((publication) => {
                return (
                  <>
                    <CardText
                      key={publication.id}
                      label={publication.title}
                      indicator={{
                        text: publication.Interaction?.length.toString(),
                      }}
                    />
                    {publication.Interaction &&
                      publication.Interaction.map((interaction) => {
                        return (
                          <>
                            <CardLog
                              key={interaction.id}
                              name={interaction.User.name}
                              date={moment(interaction.updated_at).fromNow()}
                              img_url={interaction.User.avatar_url}
                              icon={ArrowRight}
                              onClick={() => {
                                router.push(
                                  pageUrls.templateCentral({
                                    pageSlug: pageData?.slug,
                                    templateSlug: templateData?.slug,
                                    settings: `logs/${interaction.id}`,
                                  })
                                )
                              }}
                            />
                            <CardLine key={interaction.id} />
                          </>
                        )
                      })}
                  </>
                )
              })
            ) : (
              <></>
            )}
          </Card>
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
