import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardImageInput } from "components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "components/ImageSelector/ImageSelector"
import { useDebounce } from "hooks/useDebouce"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { ArrowRight, Check } from "phosphor-react"
import { useEffect, useState } from "react"
import { useGenerateTemplateUniqueSlug } from "services/hooks/useTemplate/useGenerateTemplateUniqueSlug"
import { IUpdatePage } from "types/Page.type"
import { IUpdateTemplate } from "types/Template.type"
import { pageUrls } from "utils/pagesUrl"

type CentralOptionsContentProps = {
  templateData: IUpdateTemplate | undefined
  initialTemplateData: IUpdateTemplate | undefined
  isUpdating: boolean
  handleUpdateTemplateData: (data: IUpdateTemplate) => void
  pageData: IUpdatePage | undefined
  handleUpdateRunUpdate: (stat: boolean) => void
  handleUpdateIsUpdating: (stat: boolean) => void
}

export function CentralOptionsContent({
  handleUpdateTemplateData,
  isUpdating,
  templateData,
  initialTemplateData,
  pageData,
  handleUpdateRunUpdate,
  handleUpdateIsUpdating,
}: CentralOptionsContentProps) {
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
    size?: {
      valid?: boolean
    }
    visibility?: {
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
    size: {
      valid: false,
    },
    visibility: {
      valid: false,
    },
  })
  const [secondValidation, setSecondValidation] = useState(false)

  function handleUpdateFormData(newData: FormDataProps) {
    setFormData((state) => {
      return {
        ...state,
        ...newData,
      } as FormDataProps
    })
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
  }

  const debouncedTemplateName = useDebounce({
    value: templateData?.title,
    delay: 1000 * 1,
  })

  useEffect(() => {
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
    if (templateData.visibility) {
      handleUpdateFormData({ visibility: { valid: true } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateData])

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
    if (
      formData.cover?.valid &&
      formData.slug?.valid &&
      formData.size?.valid &&
      formData.title?.valid &&
      formData.visibility?.valid
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
            <CardText label={text("centraloptions:title")} />
            <CardTextInput
              input={{
                onChange: (title) => {
                  handleUpdateTemplateData({ title: title })
                  setSecondValidation(true)
                },
                inputValue: templateData?.title,
                type: "title",
              }}
            />
          </Card>

          <Card>
            <CardText label={text("centraloptions:link")} />
            <CardTextInput
              input={{
                onChange: (slug) => {
                  handleUpdateTemplateData({ slug: slug })
                  setSecondValidation(true)
                },
                value: templateData?.slug,
                fixedText: `quaq.me/${pageData?.slug}/`,
              }}
              indicator={{
                icon: Check,
                bgColor: "green-500",
              }}
            />
          </Card>

          <Card>
            <CardText label={text("centraloptions:image")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(image) => {
                    handleUpdateTemplateData({ shortcut_image: image })
                    setSecondValidation(true)
                  }}
                  url={templateData?.shortcut_image}
                />
              }
            />
          </Card>

          <Card>
            <CardText label={text("centraloptions:size")} />
            <CardText
              label={text("centraloptions:small")}
              indicator={{
                icon: Check,
                isVisible: templateData?.shortcut_size !== "small",
              }}
              onClick={() => {
                handleUpdateTemplateData({ shortcut_size: "small" })
                setSecondValidation(true)
              }}
            />
            <CardLine />
            <CardText
              label={text("centraloptions:large")}
              indicator={{
                icon: Check,
                isVisible: templateData?.shortcut_size !== "large",
              }}
              onClick={() => {
                handleUpdateTemplateData({ shortcut_size: "large" })
                setSecondValidation(true)
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
              onClick={() => {
                handleUpdateTemplateData({ visibility: "public" })
                setSecondValidation(true)
              }}
            />
            <CardLine />
            <CardText
              label={text("centraloptions:wsmembers")}
              indicator={{
                icon: Check,
                isVisible: templateData?.visibility === "public" ? true : false,
              }}
              onClick={() => {
                handleUpdateTemplateData({ visibility: "workspace" })
                setSecondValidation(true)
              }}
            />
            <CardLine />
          </Card>

          {isUpdating && secondValidation && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                block={{
                  data: {
                    color: "bg-black",
                    text: text("centraloptions:confirm"),
                    onClick: () => handleUpdateRunUpdate(true),
                  },
                }}
                isEditable={false}
              />
            </div>
          )}
          <Card>
            <CardText label={text("centraloptions:moreoptions")} />
            <CardLine />
            <CardText
              label={text("accesscontrol:setuptrackers")}
              indicator={{ icon: ArrowRight }}
              onClick={() =>
                router.push(
                  pageUrls.templateCentral({
                    pageSlug: pageData?.slug || "",
                    templateSlug:
                      templateData?.slug != initialTemplateData.slug
                        ? initialTemplateData.slug
                        : templateData?.slug,
                    settings: "trackers",
                  })
                )
              }
            />
            <CardLine />
            <CardText
              label={text("centraloptions:edit")}
              indicator={{ icon: ArrowRight }}
              onClick={() =>
                router.push(
                  pageUrls.templateCentral({
                    pageSlug: pageData?.slug || "",
                    templateSlug:
                      templateData?.slug != initialTemplateData.slug
                        ? initialTemplateData.slug
                        : templateData?.slug,
                    settings: "edit",
                  })
                )
              }
            />
            <CardLine />
          </Card>

          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
