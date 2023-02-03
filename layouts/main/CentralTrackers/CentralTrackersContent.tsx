import useTranslation from "next-translate/useTranslation"
import { useEffect } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { IUpdateTemplate } from "../../../types/Template.type"

type CentralTrackersContentProps = {
  handleUpdateTrackers: (data: IUpdateTemplate) => void
  isUpdating: boolean
  templateData: IUpdateTemplate | undefined
  runUpdate: boolean
  handleUpdateRunUpdate: (stat: boolean) => void
  handleUpdateTemplateData: (data: IUpdateTemplate) => void
}

export function CentralTrackersContent({
  handleUpdateTrackers,
  isUpdating,
  handleUpdateTemplateData,
  templateData,
  runUpdate,
  handleUpdateRunUpdate,
}: CentralTrackersContentProps) {
  const text = useTranslation().t

  useEffect(() => {
    if (runUpdate) {
      handleUpdateTrackers({
        trackers: { ...templateData?.trackers },
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
            <CardText label={text("centraltrackers:facebook")} />
            <CardTextInput
              input={{
                label: text("centraltrackers:facebooklabel"),
                onChange: (pixel) =>
                  handleUpdateTemplateData({
                    trackers: {
                      ...templateData?.trackers,
                      facebook: pixel,
                    },
                  }),
                defaultValue: templateData?.trackers?.facebook,
              }}
            />
          </Card>

          <Card>
            <CardText label={text("centraltrackers:google")} />
            <CardTextInput
              input={{
                label: text("centraltrackers:googlelabel"),
                onChange: (id) =>
                  handleUpdateTemplateData({
                    trackers: {
                      ...templateData?.trackers,
                      google: id,
                    },
                  }),
                defaultValue: templateData?.trackers?.google,
              }}
            />
          </Card>

          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                block={{
                  data: {
                    color: "bg-black",
                    text: text("centraltrackers:confirm"),
                    onClick: () => handleUpdateRunUpdate(true),
                  },
                }}
                isEditable={false}
              />
            </div>
          )}

          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
