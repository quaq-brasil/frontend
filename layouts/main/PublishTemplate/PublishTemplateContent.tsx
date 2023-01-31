import useTranslation from "next-translate/useTranslation"
import { Check } from "phosphor-react"
import { useEffect, useState } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"
import useDebounce from "../../../hooks/useDebouce"
import { useCreatePublication } from "../../../services/hooks/usePublication/useCreatePublication"
import { useGetTemplateUrl } from "../../../services/hooks/useTemplate/useGetTemplateUrl"
import { IPage } from "../../../types/Page.type"
import { IPublication } from "../../../types/Publication.type"
import { ITemplate, IUpdateTemplate } from "../../../types/Template.type"

type PublishTemplateContentProps = {
  handleCreateTemplate: (data: ITemplate) => void
  isUpdating: boolean
  runUpdate: boolean
  handleUpdateRunUpdate: (stat: boolean) => void
  templateData: IUpdateTemplate | undefined
  handleUpdateTemplateData: (data: IUpdateTemplate) => void
  pageData: IPage | undefined
  handleUpdateIsUpdating: (stat: boolean) => void
}

export function PublishTemplateContent({
  handleCreateTemplate,
  isUpdating,
  runUpdate,
  handleUpdateRunUpdate,
  templateData,
  handleUpdateTemplateData,
  pageData,
  handleUpdateIsUpdating,
}: PublishTemplateContentProps) {
  const text = useTranslation().t

  const getTemplateUrl = useGetTemplateUrl()

  type handleGetTemplateUrlProps = {
    name: string
    pageId: string
  }

  function handleGetTemplateUrl(data: handleGetTemplateUrlProps) {
    getTemplateUrl.mutate(data, {
      onSuccess: (url) => {
        handleUpdateTemplateData({ url })
      },
    })
  }

  const debouncedTemplateName = useDebounce({
    value: templateData?.name,
    delay: 1000 * 1,
  })

  useEffect(() => {
    if (debouncedTemplateName && debouncedTemplateName !== "") {
      handleGetTemplateUrl({
        name: debouncedTemplateName,
        pageId: pageData?.id as string,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTemplateName])

  useEffect(() => {
    if (runUpdate) {
      handleCreatePublication()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  const [newPublicationTitle, setNewPublicationTitle] = useState("")
  const [publicationId, setPublicationId] = useState<string>()

  const createPublication = useCreatePublication()

  function handleCreatePublication() {
    createPublication.mutate(
      {
        data: {
          title: newPublicationTitle,
          blocks: [],
          page_id: pageData?.id || "",
        },
      },
      {
        onSuccess: (data: IPublication) => {
          setPublicationId(data.id as string)
        },
      }
    )
  }

  function handleUpdateNewPublicationTitle(title: string) {
    handleUpdateIsUpdating(true)
    setNewPublicationTitle(title)
    if (title === "") {
      handleUpdateIsUpdating(false)
    }
  }

  useEffect(() => {
    if (publicationId) {
      handleCreateTemplate({
        current_publication_id: publicationId,
        name: templateData?.name || "",
        page_id: pageData?.id || "",
        number_of_new_interactions: 0,
        shortcut_image: templateData?.shortcut_image || "",
        shortcut_size: templateData?.shortcut_size || "small",
        url: templateData?.url || "",
        trackers: {
          facebook: undefined,
          google: undefined,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicationId])

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
                onChange: (title) => handleUpdateTemplateData({ name: title }),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("publish:link")} />
            <CardTextInput
              input={{
                label: "",
                onChange: (link) => handleUpdateTemplateData({ url: link }),
                fixedText: `quaq.me/${pageData?.url}/`,
                value: templateData?.url,
              }}
              indicator={{
                icon: Check,
                bgColor: "green-500",
                onClick: () => {},
              }}
            />
          </Card>
          <Card>
            <CardText label={text("publish:cover")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(cover) =>
                    handleUpdateTemplateData({ shortcut_image: cover })
                  }
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
                // onClick: () =>
                //   handleUpdateTemplateData({ shortcut_size: "small" }),
                isVisible:
                  templateData?.shortcut_size == "small" ? false : true,
              }}
            />
            <CardLine />
            <CardText
              label={text("publish:large")}
              indicator={{
                icon: Check,
                // onClick: () =>
                //   handleUpdateTemplateData({ shortcut_size: "large" }),
                isVisible:
                  templateData?.shortcut_size == "large" ? false : true,
              }}
            />
            <CardLine />
          </Card>
          <Card>
            <CardText label={text("publish:publishas")} />
            <CardTextInput
              input={{
                label: text("publish:publishaslabel"),
                onChange: (title) => handleUpdateNewPublicationTitle(title),
              }}
            />
          </Card>
          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                color="black"
                onClick={() => handleUpdateRunUpdate(true)}
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
