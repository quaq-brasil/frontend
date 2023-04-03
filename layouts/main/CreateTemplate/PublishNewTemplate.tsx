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
import { useValidation, validationRules } from "hooks/useValidation"
import { ConnectedTemplatesProps } from "layouts/BlocksConfig/VariablesPanel/VariablesPanelDialog"
import { Translate } from "next-translate"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { Check } from "phosphor-react"
import { useEffect, useState } from "react"
import { useCreatePublication } from "services/hooks/usePublication/useCreatePublication"
import { useUpdatePublication } from "services/hooks/usePublication/useUpdatePublication"
import { useCreateTemplate } from "services/hooks/useTemplate/useCreateTemplate"
import { useGenerateTemplateUniqueSlug } from "services/hooks/useTemplate/useGenerateTemplateUniqueSlug"
import { IPage } from "types/Page.type"
import { pageUrls } from "utils/pagesUrl"

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

type LocalTemplateDataProps = {
  title?: string
  slug?: string
  cover?: string
  shortcut_size?: "small" | "large"
  publication_title?: string
  visibility?: string
}

export const PublishNewTemplate = ({
  blocks,
  onClose,
  pageData,
  connectedTemplates,
}: PublishNewTemplateProps) => {
  const text = useTranslation().t
  const router = useRouter()

  const [
    localTemplateData,
    setLocalTemplateData,
    localTemplateDataErrors,
    isLocalTemplateDataValid,
  ] = useValidation<LocalTemplateDataProps>({
    title: {
      initialValue: "",
      validators: [validationRules.required(text("validation:required"))],
    },
    slug: {
      initialValue: "",
      validators: [validationRules.required(text("validation:required"))],
    },
    cover: {
      initialValue: "",
      validators: [validationRules.required(text("validation:required"))],
    },
    shortcut_size: {
      initialValue: "small",
      validators: [validationRules.required(text("validation:required"))],
    },
    publication_title: {
      initialValue: "",
      validators: [validationRules.required(text("validation:required"))],
    },
    visibility: {
      initialValue: "anyone",
      validators: [validationRules.required(text("validation:required"))],
    },
  })

  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)
  const [hasDataChanged, setHasDataChanged] = useState(false)

  const generateTemplateUniqueSlug = useGenerateTemplateUniqueSlug()

  const createPublication = useCreatePublication()

  const createTemplate = useCreateTemplate()

  const updatePublication = useUpdatePublication()

  function handleUpdateLocalTemplateData(
    newTemplateData: LocalTemplateDataProps
  ) {
    setLocalTemplateData({ ...localTemplateData, ...newTemplateData })
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleGetTemplateSlug(data: handleGetTemplateUrlProps) {
    generateTemplateUniqueSlug.mutate(
      { data },
      {
        onSuccess: (slug) => {
          handleUpdateLocalTemplateData({ slug })
        },
      }
    )
  }

  const debouncedTemplateName = useDebounce({
    value: localTemplateData?.title,
    delay: 1000 * 1,
  })

  function handlePublishTemplate() {
    if (localTemplateData) {
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
            title: localTemplateData.publication_title,
            published_at: new Date().toISOString(),
          },
        },
        {
          onSuccess: (data) => {
            createTemplate.mutate(
              {
                data: {
                  title: localTemplateData.title,
                  number_of_new_interactions: 0,
                  page_id: pageData?.id,
                  shortcut_image: localTemplateData.cover,
                  shortcut_size: localTemplateData.shortcut_size,
                  slug: localTemplateData.slug,
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
    if (debouncedTemplateName) {
      handleGetTemplateSlug({
        title: debouncedTemplateName,
        page_id: pageData?.id,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTemplateName])

  useEffect(() => {
    if (runUpdate) {
      if (isLocalTemplateDataValid) {
        handlePublishTemplate()
      } else {
        handleUpdateRunUpdate(false)
        setHasDataChanged(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  useEffect(() => {
    if (hasDataChanged) {
      handleUpdateIsUpdating(isLocalTemplateDataValid)
    } else {
      handleUpdateIsUpdating(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localTemplateData, isLocalTemplateDataValid])

  return (
    <>
      <PublishNewTemplateHeader
        pageData={pageData}
        templateData={localTemplateData}
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
                  value: localTemplateData?.title,
                  onChange: (title) =>
                    handleUpdateLocalTemplateData({ title: title }),
                  errors: hasDataChanged ? localTemplateDataErrors?.title : [],
                }}
              />
            </Card>
            <Card>
              <CardText label={text("publish:link")} />
              <CardTextInput
                input={{
                  label: "",
                  onChange: (slug) => {
                    handleUpdateLocalTemplateData({ slug: slug })
                  },
                  fixedText: `quaq.me/${pageData?.slug}/`,
                  value: localTemplateData?.slug,
                  errors: hasDataChanged ? localTemplateDataErrors?.slug : [],
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
                    url={localTemplateData?.cover}
                    onImageChange={(cover) => {
                      handleUpdateLocalTemplateData({ cover })
                    }}
                  />
                }
                errors={hasDataChanged ? localTemplateDataErrors?.cover : []}
              />
            </Card>
            <Card>
              <CardText label={text("publish:size")} />
              <CardText
                label={text("publish:small")}
                indicator={{
                  icon: Check,
                  isVisible: localTemplateData?.shortcut_size != "small",
                }}
                onClick={() => {
                  handleUpdateLocalTemplateData({ shortcut_size: "small" })
                }}
              />
              <CardLine />
              <CardText
                label={text("publish:large")}
                indicator={{
                  icon: Check,
                  isVisible: localTemplateData?.shortcut_size != "large",
                }}
                onClick={() => {
                  handleUpdateLocalTemplateData({ shortcut_size: "large" })
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
                  isVisible: localTemplateData?.visibility != "public",
                }}
                onClick={() =>
                  handleUpdateLocalTemplateData({ visibility: "public" })
                }
              />
              <CardLine />
              <CardText
                label={text("centraloptions:wsmembers")}
                indicator={{
                  icon: Check,
                  isVisible: localTemplateData?.visibility != "workspace",
                }}
                onClick={() =>
                  handleUpdateLocalTemplateData({ visibility: "workspace" })
                }
              />
              <CardLine />
            </Card>
            <Card>
              <CardText label={text("publish:publishas")} />
              <CardTextInput
                input={{
                  label: text("publish:publishaslabel"),
                  value: localTemplateData.publication_title,
                  onChange: (publication_title) => {
                    handleUpdateLocalTemplateData({ publication_title })
                  },
                  errors: hasDataChanged
                    ? localTemplateDataErrors?.publication_title
                    : [],
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
  templateData: LocalTemplateDataProps | undefined
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
      {!templateData?.title && !templateData?.cover && (
        <Tag variant="txt" text={text("publish:titletag")} />
      )}
      {templateData?.title && !templateData?.cover && (
        <Tag variant="txt" text={templateData.title} />
      )}
      {templateData?.title && templateData?.cover && (
        <Tag
          variant="img-txt"
          text={templateData.title}
          img_url={templateData.cover}
        />
      )}
    </Header>
  )
}
