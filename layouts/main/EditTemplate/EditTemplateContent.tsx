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
import { useDebounce } from "../../../hooks/useDebouce"
import { useCreatePublication } from "../../../services/hooks/usePublication/useCreatePublication"
import { useUpdatePublication } from "../../../services/hooks/usePublication/useUpdatePublication"
import { useGenerateTemplateUniqueSlug } from "../../../services/hooks/useTemplate/useGenerateTemplateUniqueSlug"
import { IUpdatePage } from "../../../types/Page.type"
import { IPublication } from "../../../types/Publication.type"
import { IUpdateTemplate } from "../../../types/Template.type"

type EditTemplateContentProps = {
  templateData: IUpdateTemplate | undefined
  pageData: IUpdatePage | undefined
  handleUpdateTemplateData: (data: IUpdateTemplate) => void
  handleUpdateTemplate: (data: IUpdateTemplate) => void
  isUpdating: boolean
  handleUpdateIsUpdating: (stat: boolean) => void
  runUpdate: boolean
  handleUpdateRunUpdate: (stat: boolean) => void
}

export function EditTemplateContent({
  templateData,
  pageData,
  handleUpdateTemplateData,
  handleUpdateTemplate,
  isUpdating,
  handleUpdateIsUpdating,
  runUpdate,
  handleUpdateRunUpdate,
}: EditTemplateContentProps) {
  const text = useTranslation().t

  type FormDataProps = {
    title?: {
      valid?: boolean
    }
    slug?: {
      valid?: boolean
    }
    cover?: {
      valid?: boolean
    }
    size?: {
      valid?: boolean
    }
    publication?: {
      valid?: boolean
    }
  }

  async function onTemplateUpdate() {
    handleCreatePublication()
  }

  useEffect(() => {
    if (templateData?.current_publication_id) {
      getCurrentPublication()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateData])

  useEffect(() => {
    if (runUpdate) {
      onTemplateUpdate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  const [formData, setFormData] = useState<FormDataProps>({
    cover: {
      valid: false,
    },
    publication: {
      valid: false,
    },
    size: {
      valid: false,
    },
    slug: {
      valid: false,
    },
    title: {
      valid: false,
    },
  })
  const [createNewPublication, setCreateNewPublication] = useState(false)
  const [newPublicationTitle, setNewPublicationTitle] = useState("")
  const [publicationId, setPublicationId] = useState<string>()
  const [currentPublicationTitle, setCurrentPublicationTitle] = useState("")

  function handleUpdateFormData(newData: FormDataProps) {
    setFormData((state) => {
      return {
        ...state,
        ...newData,
      } as FormDataProps
    })
  }

  function handleValidation() {
    if (templateData.title.length > 1) {
      handleUpdateFormData({ title: { valid: true } })
    } else {
      handleUpdateFormData({ title: { valid: false } })
    }
    if (templateData.slug) {
      handleUpdateFormData({ slug: { valid: true } })
    } else {
      handleUpdateFormData({ title: { valid: false } })
    }
    if (templateData.shortcut_image) {
      handleUpdateFormData({ cover: { valid: true } })
    } else {
      handleUpdateFormData({ cover: { valid: false } })
    }
    if (templateData.shortcut_size) {
      handleUpdateFormData({ size: { valid: true } })
    } else {
      handleUpdateFormData({ size: { valid: false } })
    }
    if (currentPublicationTitle.length > 1) {
      handleUpdateFormData({ publication: { valid: true } })
    } else {
      handleUpdateFormData({ publication: { valid: false } })
    }
  }

  const createPublication = useCreatePublication()

  function handleCreatePublication() {
    createPublication.mutate(
      {
        data: {
          title: newPublicationTitle,
          blocks: [],
          page_id: pageData?.id || "",
          template_id: templateData?.id || "",
        },
      },
      {
        onSuccess: (data: IPublication) => {
          setPublicationId(data.id)
        },
      }
    )
    setCreateNewPublication(false)
  }

  const getPublication = useUpdatePublication()

  function getCurrentPublication() {
    getPublication.mutate(
      {
        id: templateData?.current_publication_id,
        data: {},
      },
      {
        onSuccess: (data: IPublication) => {
          setCurrentPublicationTitle(data.title)
        },
      }
    )
  }

  function handleCurrentPublicationUpdate(title: string) {
    handleUpdateIsUpdating(true)
    setNewPublicationTitle(title)
    if (title === "") {
      handleUpdateIsUpdating(false)
    }
  }

  const generateTemplateUniqueUrl = useGenerateTemplateUniqueSlug()

  type handleGetTemplateUrlProps = {
    id: string
    title: string
    page_id: string
  }

  function handleGetTemplateUrl(data: handleGetTemplateUrlProps) {
    generateTemplateUniqueUrl.mutate(
      { data },
      {
        onSuccess: (slug) => {
          handleUpdateTemplateData({ slug })
        },
      }
    )
    handleValidation()
  }

  const debouncedTemplateName = useDebounce({
    value: templateData?.title,
    delay: 1000 * 1,
  })

  useEffect(() => {
    if (debouncedTemplateName && formData.title.valid) {
      handleGetTemplateUrl({
        id: templateData.id,
        title: debouncedTemplateName,
        page_id: pageData?.id,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTemplateName])

  useEffect(() => {
    if (publicationId) {
      handleUpdateTemplate({
        ...templateData,
        current_publication_id: publicationId,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicationId])

  useEffect(() => {
    if (
      (formData.cover.valid,
      formData.publication.valid,
      formData.size.valid,
      formData.slug.valid,
      formData.title.valid)
    ) {
      handleUpdateIsUpdating(true)
    } else {
      handleUpdateIsUpdating(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData])

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
                onChange: (title) => {
                  handleUpdateTemplateData({ title: title })
                  handleValidation()
                },
                defaultValue: templateData?.title,
                label: text("edittemplate:titlelabel"),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("edittemplate:link")} />
            <CardTextInput
              input={{
                onChange: (link) => handleUpdateTemplateData({ slug: link }),
                fixedText: "quaq.me/",
                value: templateData?.slug,
                label: text("edittemplate:linklabel"),
              }}
              indicator={{
                icon: Check,
                bgColor: "green-500",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("edittemplate:cover")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(avatar) =>
                    handleUpdateTemplateData({ shortcut_image: avatar })
                  }
                  url={templateData?.shortcut_image}
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
                onClick: () =>
                  handleUpdateTemplateData({ shortcut_size: "small" }),
                isVisible:
                  templateData?.shortcut_size == "small" ? false : true,
              }}
            />
            <CardLine />
            <CardText
              label={text("edittemplate:large")}
              indicator={{
                icon: Check,
                onClick: () =>
                  handleUpdateTemplateData({ shortcut_size: "large" }),
                isVisible:
                  templateData?.shortcut_size == "large" ? false : true,
              }}
            />
            <CardLine />
          </Card>
          <Card>
            {!createNewPublication && (
              <>
                <CardText label={text("edittemplate:publishas")} />
                <span className="w-full h-0 lg:hidden"></span>
                <CardLine />
                <span className="w-full h-0 lg:hidden"></span>
                <CardText label={currentPublicationTitle} />
                <span className="w-full h-0 lg:hidden"></span>
                <CardLine />
                <CardText
                  label={text("edittemplate:newpublication")}
                  indicator={{
                    icon: Plus,
                    // onClick: () => handleCreateNewPublication(true),
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
                    // onClick: () => handleCreateNewPublication(false),
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
                block={{
                  data: {
                    color: "bg-black",
                    text: text("edittemplate:confirm"),
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
