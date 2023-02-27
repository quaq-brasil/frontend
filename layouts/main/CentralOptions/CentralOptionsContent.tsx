import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { ArrowRight, Check } from "phosphor-react"
import { useEffect, useState } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"
import { useDebounce } from "../../../hooks/useDebouce"
import { useGenerateTemplateUniqueSlug } from "../../../services/hooks/useTemplate/useGenerateTemplateUniqueSlug"
import { IUpdatePage } from "../../../types/Page.type"
import { IUpdateTemplate } from "../../../types/Template.type"
import { pageUrls } from "../../../utils/pagesUrl"

type CentralOptionsContentProps = {
  templateData: IUpdateTemplate | undefined
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
    link?: {
      valid?: boolean
    }
    cover?: {
      valid?: boolean
    }
    size?: {
      valid?: boolean
    }
  }

  const [formData, setFormData] = useState<FormDataProps>({
    title: {
      valid: false,
    },
    link: {
      valid: false,
    },
    cover: {
      valid: false,
    },
    size: {
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
    if (isUpdating && debouncedTemplateName && templateData?.title) {
      handleGetTemplateUrl({
        id: templateData.id as string,
        title: debouncedTemplateName,
        page_id: pageData?.id as string,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTemplateName])

  useEffect(() => {
    if (
      formData.cover?.valid &&
      formData.link?.valid &&
      formData.size?.valid &&
      formData.title?.valid
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
                  if (title.length > 2) {
                    handleUpdateFormData({
                      title: { valid: true },
                      cover: { valid: true },
                      link: { valid: true },
                      size: { valid: true },
                    })
                  } else {
                    handleUpdateFormData({
                      title: { valid: false },
                      cover: { valid: true },
                      link: { valid: true },
                      size: { valid: true },
                    })
                  }
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
                onChange: (slug) => handleUpdateTemplateData({ slug: slug }),
                value: templateData?.slug,
                fixedText: `quaq.me/${pageData?.slug}/`,
              }}
              indicator={{
                icon: Check,
                bgColor: "green-500",
                onClick: () => {},
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
                    handleUpdateFormData({
                      title: { valid: true },
                      cover: { valid: true },
                      link: { valid: true },
                      size: { valid: true },
                    })
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
                handleUpdateFormData({
                  title: { valid: true },
                  cover: { valid: true },
                  link: { valid: true },
                  size: { valid: true },
                })
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
                handleUpdateFormData({
                  title: { valid: true },
                  cover: { valid: true },
                  link: { valid: true },
                  size: { valid: true },
                })
              }}
            />
            <CardLine />
          </Card>

          {isUpdating && (
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
                    templateSlug: templateData?.slug || "",
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
                    templateSlug: templateData?.slug || "",
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
