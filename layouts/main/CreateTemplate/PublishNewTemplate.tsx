import { Translate } from "next-translate"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { Check } from "phosphor-react"
import { useEffect, useState } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Header } from "../../../components/Header/Header"
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { useDebounce } from "../../../hooks/useDebouce"
import { useCreatePublication } from "../../../services/hooks/usePublication/useCreatePublication"
import { useUpdatePublication } from "../../../services/hooks/usePublication/useUpdatePublication"
import { useCreateTemplate } from "../../../services/hooks/useTemplate/useCreateTemplate"
import { useGenerateTemplateUniqueSlug } from "../../../services/hooks/useTemplate/useGenerateTemplateUniqueSlug"
import { IPage } from "../../../types/Page.type"
import { ITemplate, IUpdateTemplate } from "../../../types/Template.type"
import { pageUrls } from "../../../utils/pagesUrl"
import { ConnectedTemplatesProps } from "../../BlocksConfig/VariablesPanel/VariablesPanelDialog"

type PublishNewTemplateProps = {
  blocks: any[]
  onClose: () => void
  connectedTemplates?: ConnectedTemplatesProps[]
  pageData: IPage | undefined
}

type handleGetTemplateUrlProps = {
  id?: string
  title: string
  page_id: string
}

export const PublishNewTemplate = ({
  blocks,
  onClose,
  pageData,
  connectedTemplates,
}: PublishNewTemplateProps) => {
  const text = useTranslation().t
  const router = useRouter()

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
    shortcutSize?: {
      valid?: boolean
    }
    publicationTitle?: {
      valid?: boolean
    }
  }

  const [formData, setFormData] = useState<FormDataProps>({
    title: {
      valid: false,
    },
    slug: {
      valid: false,
    },
    cover: {
      valid: false,
    },
    shortcutSize: {
      valid: false,
    },
    publicationTitle: {
      valid: false,
    },
  })

  function handleUpdateFormData(newData: FormDataProps) {
    setFormData((state) => {
      return {
        ...state,
        ...newData,
      } as FormDataProps
    })
  }

  const [templateData, setTemplateData] = useState<ITemplate>()
  const [publicationTitle, setPublicationTitle] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  const generateTemplateUniqueSlug = useGenerateTemplateUniqueSlug()

  function handleGetTemplateSlug(data: handleGetTemplateUrlProps) {
    generateTemplateUniqueSlug.mutate(
      { data },
      {
        onSuccess: (slug) => {
          handleUpdateTemplateData({ slug })
        },
      }
    )
    handleUpdateFormData({ slug: { valid: true } })
  }

  const debouncedTemplateName = useDebounce({
    value: templateData?.title,
    delay: 1000 * 1,
  })

  useEffect(() => {
    if (debouncedTemplateName && templateData?.title !== "") {
      handleGetTemplateSlug({
        id: templateData?.id,
        title: debouncedTemplateName,
        page_id: pageData?.id,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTemplateName])

  const handleUpdateTemplateData = (newData: IUpdateTemplate) => {
    setTemplateData((state) => {
      return {
        ...state,
        ...newData,
      } as ITemplate
    })
  }

  const createPublication = useCreatePublication()

  const createTemplate = useCreateTemplate()

  const updatePublication = useUpdatePublication()

  function handlePublishTemplate() {
    if (templateData) {
      createPublication.mutate(
        {
          data: {
            blocks: blocks,
            dependencies: {
              connected_templates:
                connectedTemplates?.map((template) => {
                  return template.templateId
                }) || [],
            },
            page_id: pageData?.id,
            title: publicationTitle,
            published_at: new Date().toISOString(),
          },
        },
        {
          onSuccess: (data) => {
            createTemplate.mutate(
              {
                data: {
                  title: templateData.title,
                  number_of_new_interactions: 0,
                  page_id: pageData?.id,
                  shortcut_image: templateData.shortcut_image,
                  shortcut_size: templateData.shortcut_size,
                  slug: templateData.slug,
                  current_publication_id: data.id,
                  trackers: {},
                  access_config: {},
                },
              },
              {
                onSuccess: (data) => {
                  updatePublication.mutate(
                    {
                      id: data.current_publication_id,
                      data: {
                        template_id: data.id,
                      },
                    },
                    {
                      onSuccess: () => {
                        router.push(
                          pageUrls.pageSettings({ pageSlug: pageData?.slug })
                        )
                      },
                    }
                  )
                },
              }
            )
          },
        }
      )
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
            onClick={handlePublishTemplate}
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
    if (templateData) {
      handlePublishTemplate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  useEffect(() => {
    if (
      formData.title?.valid &&
      formData.slug?.valid &&
      formData.cover?.valid &&
      formData.shortcutSize?.valid &&
      formData.publicationTitle?.valid
    ) {
      handleUpdateIsUpdating(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData])

  return (
    <>
      <PublishNewTemplateHeader
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
                  onChange: (title) =>
                    handleUpdateTemplateData({ title: title }),
                  type: "title",
                  setValid: () =>
                    handleUpdateFormData({ title: { valid: true } }),
                  setInvalid: () =>
                    handleUpdateFormData({ title: { valid: false } }),
                }}
              />
            </Card>
            <Card>
              <CardText label={text("publish:link")} />
              <CardTextInput
                input={{
                  label: "",
                  onChange: (slug) => {
                    handleUpdateTemplateData({ slug: slug })
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
                      handleUpdateTemplateData({ shortcut_image: cover })
                      handleUpdateFormData({ cover: { valid: true } })
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
                  handleUpdateTemplateData({ shortcut_size: "small" })
                  handleUpdateFormData({ shortcutSize: { valid: true } })
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
                  handleUpdateTemplateData({ shortcut_size: "large" })
                  handleUpdateFormData({ shortcutSize: { valid: true } })
                }}
              />
              <CardLine />
            </Card>
            <Card>
              <CardText label={text("centraloptions:visibility")} />
              <CardText
                label={text("centraloptions:public")}
                indicator={{ icon: Check }}
                onClick={() => {}}
              />
              <CardLine />
              <CardText
                label={text("centraloptions:wsmembers")}
                indicator={{
                  icon: Check,
                }}
                onClick={() => router.push(pageUrls.terms())}
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
                    setPublicationTitle(publicationTitle)
                    if (publicationTitle.length > 0) {
                      handleUpdateFormData({
                        publicationTitle: { valid: true },
                      })
                    } else {
                      handleUpdateFormData({
                        publicationTitle: { valid: false },
                      })
                    }
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
      <TabBar isHidden={false} tags={handleTabBar()} />
    </>
  )
}

type PublishNewTemplateHeaderProps = {
  pageData: IPage | undefined
  templateData: ITemplate | undefined
  text: Translate
}

const PublishNewTemplateHeader = ({
  pageData,
  templateData,
  text,
}: PublishNewTemplateHeaderProps) => {
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
