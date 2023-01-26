import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"

type CentralTrackersContentProps = {
  handleUpdateTrackers: (face?: string, google?: string) => void
}

export function CentralTrackersContent({
  handleUpdateTrackers,
}: CentralTrackersContentProps) {
  const text = useTranslation().t

  const [facePixel, setFacePixel] = useState<string>()
  const [googlePixel, setGooglePixel] = useState<string>()

  function onChangeFacePixel(value: string) {
    setFacePixel(value)
  }

  function onChangeGooglePixel(value: string) {
    setGooglePixel(value)
  }

  function onUpdateTrackers() {
    handleUpdateTrackers(facePixel, googlePixel)
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
            <CardText label={text("centraltrackers:facebook")} />
            <CardTextInput
              input={{
                label: text("centraltrackers:facebooklabel"),
                onChange: (e) => onChangeFacePixel(e),
              }}
            />
          </Card>

          <Card>
            <CardText label={text("centraltrackers:google")} />
            <CardTextInput
              input={{
                label: text("centraltrackers:googlelabel"),
                onChange: (e) => onChangeGooglePixel(e),
              }}
            />
          </Card>

          {(facePixel || googlePixel) && (
            <Button
              color="black"
              onClick={onUpdateTrackers}
              text={text("centraltrackers:confirm")}
            />
          )}

          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
