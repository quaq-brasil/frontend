import useTranslation from "next-translate/useTranslation"
import { Check, Plus, X } from "phosphor-react"
import { useEffect, useState } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"
import { usePublication } from "../../../services/hooks/usePublication/usePublication"
import { ITemplate, IUpateTemplate } from "../../../types/Template.type"

type EditTemplateContentProps = {
  templateData: ITemplate
  handleUpdateTemplate: (data: IUpateTemplate) => void
  handleIsUpdating: (stats: boolean) => void
  isUpdating: boolean
}

export function EditTemplateContent({
  templateData,
  handleUpdateTemplate,
  handleIsUpdating,
  isUpdating,
}: EditTemplateContentProps) {
  const text = useTranslation().t

  const [title, setTitle] = useState<string>("")
  const [link, setLink] = useState<string>("")
  const [avatar, setAvatar] = useState<string>("")
  const [size, setSize] = useState<string>("")
  const [publicationId, setPublicationId] = useState<string>("")
  const [currentPublication, setCurrentPublication] = useState<string>("")

  function handleUpdateTitle(title: string) {
    setTitle(title)
    handleIsUpdating(true)
  }

  function handleUpdateLink(link: string) {
    setLink(link)
    handleIsUpdating(true)
  }

  function handleUpdateAvatar(avatar: string) {
    setAvatar(avatar)
    handleIsUpdating(true)
  }

  function handleUpdateSize(size: string) {
    setSize(size)
    handleIsUpdating(true)
  }

  const getPubliation = usePublication({
    id: publicationId,
  })

  function handleCurrentPublicationUpdate(pub: string) {
    setCurrentPublication(pub)
    handleIsUpdating(false)
  }

  useEffect(() => {
    setTitle(templateData?.name || "")
    setLink(templateData?.url || "")
    setAvatar(templateData?.shortcut_image || "")
    setSize(templateData?.shortcut_size || "")
    setPublicationId(templateData?.current_publication_id || "")
  }, [templateData])

  useEffect(() => {
    handleCurrentPublicationUpdate(getPubliation?.data.title || "")
  }, [getPubliation])

  const [createNewPublication, setCreateNewPublication] = useState(false)

  function handleCreateNewPublication() {
    setCreateNewPublication(!createNewPublication)
  }

  function handleUpdate() {
    const newData: IUpateTemplate = {
      name: title,
      url: link,
      shortcut_image: avatar,
      shortcut_size: size,
    }
    handleUpdateTemplate(newData)
    handleIsUpdating(false)
  }

  useEffect(() => {
    if (isUpdating) {
      handleUpdate()
    }
  }, [isUpdating])

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("edittemplate:title")} />
            <CardTextInput
              input={{
                onChange: (e) => handleUpdateTitle(e),
                defaultValue: title,
              }}
            />
          </Card>
          <Card>
            <CardText label={text("edittemplate:title2")} />
            <CardTextInput
              input={{
                onChange: (e) => handleUpdateLink(e),
                fixedText: "quaq.me/",
                defaultValue: link,
              }}
            />
          </Card>
          <Card>
            <CardText label={text("edittemplate:title3")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(e) => handleUpdateAvatar(e)}
                  url={avatar}
                />
              }
            />
          </Card>

          <Card>
            <CardText label={text("edittemplate:size")} />
            <CardText
              label={text("edittemplate:small")}
              indicator={{
                icon: Check,
                onClick: () => handleUpdateSize("small"),
                isVisible: size == "small" ? false : true,
              }}
            />
            <CardLine />
            <CardText
              label={text("edittemplate:large")}
              indicator={{
                icon: Check,
                onClick: () => handleUpdateSize("large"),
                isVisible: size == "large" ? false : true,
              }}
            />
            <CardLine />
          </Card>
          <Card>
            {!createNewPublication && (
              <>
                <CardText label={text("edittemplate:title4")} />
                <CardLine />
                <CardText label={currentPublication} />
                <CardLine />
                <CardText
                  label={text("edittemplate:title5")}
                  indicator={{
                    icon: Plus,
                    onClick: () => handleCreateNewPublication(),
                  }}
                />
              </>
            )}
            {createNewPublication && (
              <>
                <CardText
                  label={text("edittemplate:cancelnewpub")}
                  indicator={{
                    icon: X,
                    onClick: () => handleCreateNewPublication(),
                  }}
                />
                <CardTextInput
                  input={{
                    label: text("edittemplate:newpublabel"),
                    onChange: (e) => handleCurrentPublicationUpdate(e),
                  }}
                />
              </>
            )}
          </Card>

          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                color="black"
                onClick={handleUpdate}
                text={text("edittemplate:confirm")}
              />
            </div>
          )}
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
