import useTranslation from "next-translate/useTranslation"
import { Check } from "phosphor-react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"

type PublishTemplateContentProps = {
  handleCreate: () => void
  isUpdating: boolean
  handleUpdateTemplateTitle: (value: string) => void
  handleUpdateTemplateLink: (value: string) => void
  handleUpdateTemplateCover: (value: string) => void
  handleUpdateTemplateSize: (value: string) => void
  handleUpdatePublicationTitle: (value: string) => void
  size: string
}

export function PublishTemplateContent({
  handleCreate,
  isUpdating,
  handleUpdateTemplateTitle,
  handleUpdateTemplateLink,
  handleUpdateTemplateCover,
  handleUpdateTemplateSize,
  handleUpdatePublicationTitle,
  size,
}: PublishTemplateContentProps) {
  const text = useTranslation().t

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("publish:title")} />
            <CardTextInput
              input={{
                label: text("publish:titlelabel"),
                onChange: (e) => handleUpdateTemplateTitle(e),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("publish:link")} />
            <CardTextInput
              input={{
                label: text("publish:linklabel"),
                onChange: (e) => handleUpdateTemplateLink(e),
                fixedText: "quaq.me/",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("publish:cover")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(e) => handleUpdateTemplateCover(e)}
                />
              }
            />
          </Card>

          <Card>
            <CardText label={text("publish:size")} />
            <CardText
              label={text("publish:small")}
              indicator={{
                icon: Check,
                onClick: () => handleUpdateTemplateSize("small"),
                isVisible: size == "small" ? false : true,
              }}
            />
            <CardLine />
            <CardText
              label={text("publish:large")}
              indicator={{
                icon: Check,
                onClick: () => handleUpdateTemplateSize("large"),
                isVisible: size == "large" ? false : true,
              }}
            />
            <CardLine />
          </Card>
          <Card>
            <CardText label={text("publish:publishas")} />
            <CardTextInput
              input={{
                label: text("publish:publishaslabel"),
                onChange: (e) => handleUpdatePublicationTitle(e),
              }}
            />
          </Card>
          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                color="black"
                onClick={handleCreate}
                text={text("publish:confirm")}
              />
            </div>
          )}
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
