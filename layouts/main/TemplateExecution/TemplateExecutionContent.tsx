// import { BlockReader } from "components/BlockReader/BlockReader"
import { Card } from "components/Card/Card"
import { useUserAuth } from "contexts/userAuth"
import { useTerms } from "contexts/useTerms"
import { useDebounce } from "hooks/useDebouce"
import useTranslation from "next-translate/useTranslation"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useCreateInteraction } from "services/hooks/useInteraction/useCreateInteraction"
import { useUpdateInteraction } from "services/hooks/useInteraction/useUpdateInteraction"
import { IInteractionData } from "types/Interaction.type"
import { getTemplateBySlugAndPageSlugProps } from "types/Template.type"
import { pageUrls } from "utils/pagesUrl"

type TemplateExecutionContentProps = {
  pageAndTemplateData: getTemplateBySlugAndPageSlugProps | undefined
  setTemplateData: (data: any) => void
}

const BlockReader = dynamic(
  () =>
    import("components/BlockReader/BlockReader").then((mod) => mod.BlockReader),
  {
    ssr: true,
  }
)

export function TemplateExecutionContent({
  pageAndTemplateData,
  setTemplateData,
}: TemplateExecutionContentProps) {
  const text = useTranslation().t
  const { isCookiesAccepted } = useTerms()
  const router = useRouter()

  const [blocks, setBlocks] = useState<any>(
    pageAndTemplateData?.publication?.blocks || {}
  )

  useEffect(() => {
    setBlocks(pageAndTemplateData?.publication?.blocks)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageAndTemplateData?.publication?.blocks])

  const [interactions, setInteractions] = useState<IInteractionData[]>([])
  const [interactionId, setInteractionId] = useState<string | null>(null)

  const createInteraction = useCreateInteraction()
  const updateInteraction = useUpdateInteraction()

  const { user } = useUserAuth()

  function handleUpdateInteractions(interaction: any) {
    setInteractions((state) => {
      const ints = state.filter((int) => {
        if (int?.config.id !== interaction.id) {
          return int
        }
      })

      return [...ints, interaction]
    })
  }

  const debouncedInteractions = useDebounce({
    value: interactions,
    delay: 1000 * 1,
  })

  useEffect(() => {
    const handleSaveInteractions = async () => {
      if (
        user?.id &&
        debouncedInteractions.length > 0 &&
        interactionId !== "loading"
      ) {
        if (interactionId) {
          updateInteraction.mutate(
            {
              id: interactionId,
              data: {
                blocks: Object.keys(blocks).map((key) => blocks[key]),
                data: debouncedInteractions,
                events: [],
                template_id: pageAndTemplateData?.id,
                publication_id: pageAndTemplateData?.publication.id,
                page_id: pageAndTemplateData?.Page.id,
                user_id: user.id,
              },
            },
            {
              onSuccess: (data) => {
                setTemplateData(data)
              },
            }
          )
        } else if (interactionId !== "loading") {
          setInteractionId("loading")

          createInteraction.mutate(
            {
              blocks: Object.keys(blocks).map((key) => blocks[key]),
              data: debouncedInteractions,
              events: [],
              template_id: pageAndTemplateData?.id,
              publication_id: pageAndTemplateData?.publication.id,
              page_id: pageAndTemplateData?.Page.id,
              user_id: user.id,
            },
            {
              onSuccess: (data) => {
                setInteractionId(data?.interaction_id)
                setTemplateData(data)
              },
            }
          )
        }
      }
    }

    handleSaveInteractions()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInteractions])

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
            <span className="w-full h-[4rem]"></span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
