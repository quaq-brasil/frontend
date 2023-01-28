import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { IUpateTemplate } from "../../../types/Template.type"

type CentralTrackersContentProps = {
  handleUpdateTrackers: (data: IUpateTemplate) => void
  isUpdating: boolean
  handleUpdateIsUpdating: (stat: boolean) => void
  templateData: IUpateTemplate | undefined
  runUpdate: boolean
  handleUpdateRunUpdate: (stat: boolean) => void
}

export function CentralTrackersContent({
  handleUpdateTrackers,
  isUpdating,
  handleUpdateIsUpdating,
  templateData,
  runUpdate,
  handleUpdateRunUpdate,
}: CentralTrackersContentProps) {
  const text = useTranslation().t

  const [template, setTemplate] = useState<IUpateTemplate>()

  function handleUpdateFacebookPixel(pixel: string) {
    setTemplate({ ...template, facebook_pixel_id: pixel })
    handleUpdateIsUpdating(true)
  }

  function handleUpdateGoogleAnalytics(tag: string) {
    setTemplate({ ...template, google_analytics_id: tag })
    handleUpdateIsUpdating(true)
  }

  useEffect(() => {
    setTemplate(templateData)
  }, [templateData])

  function onUpdateTrackers() {
    if (template) {
      const newData = {
        current_publication_id: template.current_publication_id,
        facebook_pixel_id: template.facebook_pixel_id,
        google_analytics_id: template.google_analytics_id,
      }
      handleUpdateTrackers(newData)
    }
    handleUpdateIsUpdating(false)
  }

  useEffect(() => {
    onUpdateTrackers()
    handleUpdateRunUpdate(false)
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
                onChange: (e) => handleUpdateFacebookPixel(e),
                defaultValue: template?.facebook_pixel_id,
              }}
            />
          </Card>

          <Card>
            <CardText label={text("centraltrackers:google")} />
            <CardTextInput
              input={{
                label: text("centraltrackers:googlelabel"),
                onChange: (e) => handleUpdateGoogleAnalytics(e),
                defaultValue: template?.google_analytics_id,
              }}
            />
          </Card>

          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                color="black"
                onClick={onUpdateTrackers}
                text={text("centraltrackers:confirm")}
              />
            </div>
          )}

          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
