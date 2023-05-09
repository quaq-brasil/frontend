import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardImageInput } from "components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "components/ImageSelector/ImageSelector"
import { useDebounce } from "hooks/useDebouce"
import { useValidation, validationRules } from "hooks/useValidation"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { ArrowRight, Check } from "phosphor-react"
import { useEffect } from "react"
import { useGenerateTemplateUniqueSlug } from "services/hooks/useTemplate/useGenerateTemplateUniqueSlug"
import { IUpdatePage } from "types/Page.type"
import { IUpdateTemplate } from "types/Template.type"
import { pageUrls } from "utils/pagesUrl"

type CentralOptionsContentProps = {
  templateData: IUpdateTemplate | undefined
  initialTemplateData: IUpdateTemplate | undefined
  isUpdating: boolean
  pageData: IUpdatePage | undefined
  handleUpdateRunUpdate: (stat: boolean) => void
  handleUpdateIsUpdating: (stat: boolean) => void
  runUpdate: boolean
  handleUpdateTemplate: (templateData: IUpdateTemplate) => void
}

export function CentralOptionsContent({
  isUpdating,
  templateData,
  initialTemplateData,
  pageData,
  handleUpdateRunUpdate,
  handleUpdateIsUpdating,
  runUpdate,
  handleUpdateTemplate,
}: CentralOptionsContentProps) {
  const text = useTranslation().t
  const router = useRouter()

  type LocalTemplateDataProps = {
    title?: string
    slug?: string
    shortcut_image?: string
    shortcut_size?: "small" | "large"
    visibility?: string
  }

  const [
    localTemplateData,
    setLocalTemplateData,
    localTemplateDataErrors,
    isLocalTemplateDataValid,
  ] = useValidation<LocalTemplateDataProps>({
    shortcut_image: {
      initialValue: templateData.shortcut_image || "",
      validators: [validationRules.required(text("validation:required"))],
    },
    shortcut_size: {
      initialValue: templateData.shortcut_size || "small",
      validators: [validationRules.required(text("validation:required"))],
    },
    title: {
      initialValue: templateData.title || "",
      validators: [validationRules.required(text("validation:required"))],
    },
    slug: {
      initialValue: templateData.slug || "",
      validators: [validationRules.required(text("validation:required"))],
    },
    visibility: {
      initialValue: templateData.visibility || "public",
      validators: [validationRules.required(text("validation:required"))],
    },
  })

  const generateTemplateUniqueUrl = useGenerateTemplateUniqueSlug()

  const debouncedTemplateName = useDebounce({
    value: localTemplateData?.title,
    delay: 1000 * 1,
  })

  function handleUpdateLocalTemplateData(
    newTemplateData: LocalTemplateDataProps
  ) {
    setLocalTemplateData({ ...localTemplateData, ...newTemplateData })
  }

  function isTemplateDataDifferent(
    templateData: IUpdateTemplate | undefined,
    localTemplateData: LocalTemplateDataProps
  ) {
    if (!templateData) {
      return false
    }
    return (
      templateData.title !== localTemplateData.title ||
      templateData.shortcut_image !== localTemplateData.shortcut_image ||
      templateData.slug !== localTemplateData.slug ||
      templateData.shortcut_size !== localTemplateData.shortcut_size ||
      templateData.visibility !== localTemplateData.visibility
    )
  }

  useEffect(() => {
    if (debouncedTemplateName) {
      generateTemplateUniqueUrl.mutate(
        {
          data: {
            page_id: pageData.id,
            title: debouncedTemplateName,
            id: templateData.id,
          },
        },
        {
          onSuccess: (slug) => {
            handleUpdateLocalTemplateData({ slug })
          },
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTemplateName])

  useEffect(() => {
    if (
      isLocalTemplateDataValid &&
      isTemplateDataDifferent(templateData, localTemplateData)
    ) {
      handleUpdateIsUpdating(true)
    } else {
      handleUpdateIsUpdating(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocalTemplateDataValid, localTemplateData])

  function onUpdate() {
    handleUpdateIsUpdating(false)
    handleUpdateRunUpdate(false)
    handleUpdateTemplate({
      id: templateData.id,
      shortcut_image: localTemplateData.shortcut_image,
      shortcut_size: localTemplateData.shortcut_size,
      title: localTemplateData.title,
      slug: localTemplateData.slug,
      visibility: localTemplateData.visibility,
    })
  }

  useEffect(() => {
    if (templateData) {
      onUpdate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

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
                  handleUpdateLocalTemplateData({ title })
                },
                value: localTemplateData?.title,
                errors: localTemplateDataErrors?.title,
                label: text("centraloptions:label"),
              }}
            />
          </Card>

          <Card>
            <CardText label={text("centraloptions:link")} />
            <CardTextInput
              input={{
                value: localTemplateData?.slug,
                fixedText: `quaq.me/`,
                errors: localTemplateDataErrors?.slug,
                label: text("centraloptions:label"),
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
                    handleUpdateLocalTemplateData({ shortcut_image: image })
                  }}
                  url={localTemplateData?.shortcut_image}
                />
              }
              errors={localTemplateDataErrors.shortcut_image}
            />
          </Card>

          <Card>
            <CardText label={text("centraloptions:size")} />
            <CardText
              label={text("centraloptions:small")}
              indicator={{
                icon: Check,
                isVisible: localTemplateData?.shortcut_size !== "small",
              }}
              onClick={() => {
                handleUpdateLocalTemplateData({ shortcut_size: "small" })
              }}
            />
            <CardLine />
            <CardText
              label={text("centraloptions:large")}
              indicator={{
                icon: Check,
                isVisible: localTemplateData?.shortcut_size !== "large",
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
                isVisible:
                  localTemplateData?.visibility === "workspace" ? true : false,
              }}
              onClick={() => {
                handleUpdateLocalTemplateData({ visibility: "public" })
              }}
            />
            <CardLine />
            <CardText
              label={text("centraloptions:wsmembers")}
              indicator={{
                icon: Check,
                isVisible:
                  localTemplateData?.visibility === "public" ? true : false,
              }}
              onClick={() => {
                handleUpdateLocalTemplateData({ visibility: "workspace" })
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
