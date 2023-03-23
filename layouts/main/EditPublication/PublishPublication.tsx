import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardImageInput } from "components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { Header } from "components/Header/Header"
import { ImageSelector } from "components/ImageSelector/ImageSelector"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import { useDebounce } from "hooks/useDebouce"
import { Translate } from "next-translate"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { Check } from "phosphor-react"
import { useEffect, useState } from "react"
import { useCreatePublication } from "services/hooks/usePublication/useCreatePublication"
import { usePublication } from "services/hooks/usePublication/usePublication"
import { useUpdatePublication } from "services/hooks/usePublication/useUpdatePublication"
import { useGenerateTemplateUniqueSlug } from "services/hooks/useTemplate/useGenerateTemplateUniqueSlug"

import { useUpdateTemplate } from "services/hooks/useTemplate/useUpdateTemplate"
import { IPage } from "types/Page.type"
import { IPublication } from "types/Publication.type"
import {
  getTemplateBySlugAndPageSlugProps,
  IUpdateTemplate,
} from "types/Template.type"

type PublishPublicationProps = {
  blocks: any[]
  onClose: () => void
  pageData: IPage | undefined
  template: getTemplateBySlugAndPageSlugProps | undefined
}

type handleGetTemplateUrlProps = {
  id?: string
  title: string
  page_id: string
}

export const PublishPublication = ({
  blocks,
  onClose,
  pageData,
  template,
}: PublishPublicationProps) => {
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
    visibility?: {
      valid?: boolean
    }
  }

  const [formData, setFormData] = useState<FormDataProps>({
    title: {
      valid: true,
    },
    slug: {
      valid: true,
    },
    cover: {
      valid: true,
    },
    size: {
      valid: true,
    },
    publication: {
      valid: true,
    },
    visibility: {
      valid: true,
    },
  })
  const [publicationTitle, setPublicationTitle] = useState("")
  const [currentPublication, setCurrentPublication] = useState<IPublication>()
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()
  const [templateData, setTemplateData] =
    useState<getTemplateBySlugAndPageSlugProps>()

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
    if (publicationTitle.length > 1) {
      handleUpdateFormData({ publication: { valid: true } })
    } else {
      handleUpdateFormData({ publication: { valid: false } })
    }
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  const getCurrentPublication = usePublication({
    id: templateData?.current_publication_id,
  })

  const generateTemplateUniqueSlug = useGenerateTemplateUniqueSlug()

  function handleGetTemplateUrl(data: handleGetTemplateUrlProps) {
    generateTemplateUniqueSlug.mutate(
      { data },
      {
        onSuccess: (slug) => {
          handleUpdateTemplateData({ slug })
        },
      }
    )
  }

  const debouncedTemplateName = useDebounce({
    value: templateData?.title,
    delay: 1000 * 1,
  })

  const handleUpdateTemplateData = (newData: IUpdateTemplate) => {
    setTemplateData((state) => {
      return {
        ...state,
        ...newData,
      } as getTemplateBySlugAndPageSlugProps
    })
  }

  const createPublication = useCreatePublication()

  const updateCurrentPublication = useUpdatePublication()

  const updateTemplate = useUpdateTemplate()

  function handleCreatePublication() {
    if (currentPublication?.title !== publicationTitle) {
      if (templateData?.id) {
        createPublication.mutate(
          {
            data: {
              title: publicationTitle,
              blocks,
              template_id: templateData.id,
              page_id: pageData?.id,
              published_at: new Date().toISOString(),
            },
          },
          {
            onSuccess: (data) => {
              updateTemplate.mutate(
                {
                  id: templateData.id,
                  data: {
                    current_publication_id: data.id,
                    title: templateData.title,
                    slug: templateData.slug,
                    shortcut_image: templateData.shortcut_image,
                    shortcut_size: templateData.shortcut_size,
                  },
                },
                {
                  onSuccess: () => {
                    router.push(`/adm/${pageData?.slug}`)
                  },
                }
              )
            },
          }
        )
      }
    } else {
      if (templateData?.id) {
        if (currentPublication.id) {
          updateCurrentPublication.mutate(
            {
              id: currentPublication.id,
              data: {
                title: publicationTitle,
                blocks,
                template_id: templateData.id,
                page_id: pageData?.id,
              },
            },
            {
              onSuccess: () => {
                updateTemplate.mutate(
                  {
                    id: templateData.id,
                    data: {
                      title: templateData.title,
                      slug: templateData.slug,
                      shortcut_image: templateData.shortcut_image,
                      shortcut_size: templateData.shortcut_size,
                    },
                  },
                  {
                    onSuccess: () => {
                      router.push(`/adm/${pageData?.slug}`)
                    },
                  }
                )
              },
            }
          )
        }
      }
    }
  }

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("publish:back")}
          onClick={onClose}
        />,
        <div key={2} className={`w-fit h-fit xl:hidden`}>
          <Tag
            variant="txt"
            text={text("publish:publish")}
            onClick={handleCreatePublication}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("publish:back")}
          onClick={onClose}
        />,
      ]
    }
  }

  useEffect(() => {
    if (getCurrentPublication) {
      setPublicationTitle(getCurrentPublication.data.title)
      setCurrentPublication(getCurrentPublication.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCurrentPublication])

  useEffect(() => {
    setTemplateData(template)
  }, [template])

  useEffect(() => {
    if (debouncedTemplateName && formData.title.valid) {
      handleGetTemplateUrl({
        id: templateData?.id,
        title: debouncedTemplateName,
        page_id: pageData?.id,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTemplateName])

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
  }, [formData])

  return (
    <>
      <PublishPublicationHeader
        pageData={pageData}
        templateData={templateData}
        text={text}
      />
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
                  defaultValue: templateData?.title,
                  onChange: (title) => {
                    handleValidation()
                    handleUpdateTemplateData({ title: title })
                  },
                }}
              />
            </Card>
            <Card>
              <CardText label={text("publish:link")} />
              <CardTextInput
                input={{
                  label: "",
                  onChange: (link) => {
                    handleValidation()
                    handleUpdateTemplateData({ slug: link })
                  },
                  fixedText: `quaq.me/${pageData?.slug}/`,
                  value: templateData?.slug,
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
                    url={templateData?.shortcut_image}
                    onImageChange={(cover) => {
                      handleValidation()
                      handleUpdateTemplateData({ shortcut_image: cover })
                    }}
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
                  isVisible: templateData?.shortcut_size != "small",
                }}
                onClick={() => {
                  handleValidation()
                  handleUpdateTemplateData({ shortcut_size: "small" })
                }}
              />
              <CardLine />
              <CardText
                label={text("publish:large")}
                indicator={{
                  icon: Check,
                  isVisible: templateData?.shortcut_size != "large",
                }}
                onClick={() => {
                  handleValidation()
                  handleUpdateTemplateData({ shortcut_size: "large" })
                }}
              />
              <CardLine />
            </Card>
            <Card>
              <CardText label={text("centraloptions:visibility")} />
              <CardText
                label={text("centraloptions:public")}
                indicator={{
                  icon: Check,
                  isVisible:
                    templateData?.visibility === "workspace" ? true : false,
                }}
                onClick={() =>
                  handleUpdateTemplateData({ visibility: "public" })
                }
              />
              <CardLine />
              <CardText
                label={text("centraloptions:wsmembers")}
                indicator={{
                  icon: Check,
                  isVisible:
                    templateData?.visibility === "public" ? true : false,
                }}
                onClick={() =>
                  handleUpdateTemplateData({ visibility: "workspace" })
                }
              />
              <CardLine />
            </Card>
            <Card>
              <CardText label={text("publish:publishas")} />
              <CardTextInput
                input={{
                  label: text("publish:publishaslabel"),
                  defaultValue: publicationTitle,
                  onChange: (publicationTitle) => {
                    handleValidation()
                    setPublicationTitle(publicationTitle)
                  },
                }}
              />
            </Card>
            {isUpdating && (
              <div className="w-full h-fit hidden xl:block">
                <Button
                  block={{
                    data: {
                      color: "bg-black",
                      text: text("publish:publish"),
                      onClick: handleCreatePublication,
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
      <TabBar isHidden={false} tags={handleTabBar()} />
    </>
  )
}

type PublishPublicationHeaderProps = {
  pageData: IPage | undefined
  templateData: getTemplateBySlugAndPageSlugProps | undefined
  text: Translate
}

const PublishPublicationHeader = ({
  pageData,
  templateData,
  text,
}: PublishPublicationHeaderProps) => {
  return (
    <Header background_url={pageData?.background_url || ""}>
      <Tag
        variant="img-txt"
        text={pageData?.title || ""}
        img_url={pageData?.avatar_url || ""}
      />
      {!templateData?.title && !templateData?.shortcut_image && (
        <Tag variant="txt" text={text("publish:titletag")} />
      )}
      {templateData?.title && !templateData?.shortcut_image && (
        <Tag variant="txt" text={templateData.title} />
      )}
      {templateData?.title && templateData?.shortcut_image && (
        <Tag
          variant="img-txt"
          text={templateData.title}
          img_url={templateData.shortcut_image}
        />
      )}
    </Header>
  )
}
