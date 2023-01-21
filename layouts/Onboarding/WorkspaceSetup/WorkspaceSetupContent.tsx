import useTranslation from "next-translate/useTranslation"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"

export function WorkspaceSetupContent() {
  const text = useTranslation().t

  function handleFinishSignUp() {}

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:pt-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("wssetup:firstmessage")} />
          </Card>
          <Card>
            <CardText label={text("wssetup:getwsname")} />
            <CardTextInput
              input={{
                label: text("wssetup:inputwsname"),
                onChange: (e) => console.log(e),
                type: "text",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("wssetup:uploadimg")} />
            <CardImageInput
              imageSelector={
                <ImageSelector onImageChange={(e) => console.log(e)} />
              }
            />
          </Card>
          <Button
            color="slate-900"
            onClick={handleFinishSignUp}
            text={text("wssetup:confirm")}
          />
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
