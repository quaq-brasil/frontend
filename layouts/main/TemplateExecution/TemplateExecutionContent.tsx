import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BlockReader } from "../../../components/BlockReader/BlockReader"
import { Card } from "../../../components/Card/Card"
import { useUserAuth } from "../../../contexts/userAuth"
import { useTerms } from "../../../contexts/useTerms"
import { useCreateInteraction } from "../../../services/hooks/useInteraction/useCreateInteraction"
import { useUpdateInteraction } from "../../../services/hooks/useInteraction/useUpdateInteraction"
import { IInteractionData } from "../../../types/Interaction.type"
import { getTemplateByUrlAndPageUrlProps } from "../../../types/Template.type"
import { pageUrls } from "../../../utils/pagesUrl"

type TemplateExecutionContentProps = {
  initialData: getTemplateByUrlAndPageUrlProps | undefined
}

export function TemplateExecutionContent({
  initialData,
}: TemplateExecutionContentProps) {
  const text = useTranslation().t
  const { isCookiesAccepted } = useTerms()
  const router = useRouter()

  const blocks: any = initialData?.publication?.blocks || {}

  const [interactions, setInteractions] = useState<IInteractionData[]>([])
  const [interactionId, setInteractionId] = useState<string | null>(null)

  const createInteraction = useCreateInteraction()
  const updateInteraction = useUpdateInteraction()

  const { user } = useUserAuth()

  function handleUpdateInteractions(interaction: any) {
    setInteractions((state) => {
      const ints = state.filter((int) => {
        console.log("int", int)
        if (int?.config.id !== interaction.id) {
          return int
        }
      })

      return [...ints, interaction]
    })
  }

  useEffect(() => {
    if (user?.id && interactions.length > 0) {
      if (interactionId) {
        updateInteraction.mutate({
          id: interactionId,
          data: {
            blocks: Object.keys(blocks).map((key) => blocks[key]),
            data: interactions,
            events: [],
            template_id: initialData?.id as string,
            publication_id: initialData?.publication.id as string,
            page_id: initialData?.Page.id as string,
            user_id: user.id,
          },
        })
      } else {
        createInteraction.mutate(
          {
            blocks: Object.keys(blocks).map((key) => blocks[key]),
            data: interactions,
            events: [],
            template_id: initialData?.id as string,
            publication_id: initialData?.publication.id as string,
            page_id: initialData?.Page.id as string,
            user_id: user.id,
          },
          {
            onSuccess: (data) => {
              setInteractionId(data?.id || null)
            },
          }
        )
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactions])

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
      >
        {!isCookiesAccepted && (
          <div className="mb-2 md:mb-4 lg:mb-6">
            <Card>
              <p className="w-full text-left lg:text-[1.1rem] px-5 py-2">
                {text("consumerpage:firstaccess")}
                <span
                  className="lg:text-[1.1rem] text-blue-500 cursor-pointer"
                  onClick={() => router.push(pageUrls.terms())}
                >
                  {text("consumerpage:learnmore")}
                </span>
              </p>
            </Card>
          </div>
        )}
        {blocks ? (
          <div className="flex flex-col gap-2 mb-2 md:gap-4 md:mb-4">
            {Object.keys(blocks).map((key) => {
              return (
                <BlockReader
                  key={blocks[key].id || key}
                  block={blocks[key]}
                  handleUpdateInteractions={handleUpdateInteractions}
                />
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
  )
}
