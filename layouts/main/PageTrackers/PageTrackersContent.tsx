import useTranslation from "next-translate/useTranslation"
import { useEffect } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { IUpdatePage } from "../../../types/Page.type"

type PageTrackersContentProps = {
  pageData: IUpdatePage | undefined
  handleUpdateTrackers: (data: IUpdatePage) => void
  isUpdating: boolean
  handleUpdateIsUpdating: (stat: boolean) => void
  runUpdate: boolean
  handleUpdateRunUpdate: (stat: boolean) => void
  handleUpdatePageData: (data: IUpdatePage) => void
}

export function PageTrackersContent({
  pageData,
  handleUpdateTrackers,
  isUpdating,
  runUpdate,
  handleUpdateRunUpdate,
  handleUpdatePageData,
}: PageTrackersContentProps) {
  const text = useTranslation().t

  useEffect(() => {
    if (runUpdate) {
      handleUpdateTrackers({
        trackers: { ...pageData?.trackers },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("pagetrackers:facebook")} />
            <CardTextInput
              input={{
                label: text("pagetrackers:facebooklabel"),
                onChange: (pixel) =>
                  handleUpdatePageData({
                    trackers: {
                      ...pageData?.trackers,
                      facebook: pixel,
                    },
                  }),
                defaultValue: pageData?.trackers?.facebook,
              }}
            />
          </Card>

          <Card>
            <CardText label={text("pagetrackers:google")} />
            <CardTextInput
              input={{
                label: text("pagetrackers:googlelabel"),
                onChange: (id) =>
                  handleUpdatePageData({
                    trackers: {
                      ...pageData?.trackers,
                      google: id,
                    },
                  }),
                defaultValue: pageData?.trackers?.google,
              }}
            />
          </Card>

          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                color="black"
                onClick={() => handleUpdateRunUpdate(true)}
                text={text("pagetrackers:confirm")}
              />
            </div>
          )}

          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
