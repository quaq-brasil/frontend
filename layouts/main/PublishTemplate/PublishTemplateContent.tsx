import useTranslation from "next-translate/useTranslation"
import { Check } from "phosphor-react"
import { useEffect, useState } from "react"
import { Card } from "../../../components/Card/Card"
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"
import { usePublication } from "../../../services/hooks/usePublication/usePublication"
import { IPage } from "../../../types/Page.type"
import { ITemplate } from "../../../types/Template.type"

type PublishTemplateContentProps = {
  handleCreateTemplate: (pageData: ITemplate) => void
  pageData: IPage
  isUpdating: boolean
  handleIsUpdating: (stat: boolean) => void
}

export function PublishTemplateContent({
  handleCreateTemplate,
  pageData,
  isUpdating,
  handleIsUpdating,
}: PublishTemplateContentProps) {
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
    handleCurrentPublicationUpdate(getPubliation?.data.title || "")
  }, [getPubliation])

  const [createNewPublication, setCreateNewPublication] = useState(false)

  function handleCreateNewPublication() {
    setCreateNewPublication(!createNewPublication)
  }

  function handleCreate() {
    const newData: ITemplate = {
      current_publication_id: "",
      name: "",
      number_of_new_interactions: 1,
      page_id: "",
      shortcut_image: "",
      shortcut_size: "",
      url: "",
      facebook_pixel_id: "",
      google_analytics_id: "",
    }
    handleCreateTemplate(newData)
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
            <CardText label={text("publish:title")} />
            <CardTextInput
              input={{
                label: text("publish:label"),
                onChange: () => console.log(),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("publish:title2")} />
            <CardTextInput
              input={{
                label: text("publish:label2"),
                onChange: () => console.log(),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("publish:title3")} />
            <CardImageInput
              imageSelector={
                <ImageSelector onImageChange={() => console.log()} />
              }
            />
          </Card>

          <Card>
            <CardText label={text("publish:size")} />
            <CardText
              label={text("publish:small")}
              indicator={{
                icon: Check,
                onClick: () => handleUpdateSize("small"),
                isVisible: size == "small" ? false : true,
              }}
            />
            <CardLine />
            <CardText
              label={text("publish:large")}
              indicator={{
                icon: Check,
                onClick: () => handleUpdateSize("large"),
                isVisible: size == "large" ? false : true,
              }}
            />
            <CardLine />
          </Card>
          <Card>
            <CardText label={text("publish:title4")} />
            <CardTextInput
              input={{
                label: text("publish:label4"),
                onChange: () => console.log(),
              }}
            />
          </Card>
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
