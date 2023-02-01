import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { ArrowRight, Check } from "phosphor-react"
import { useEffect } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"
import useDebounce from "../../../hooks/useDebouce"
import { useGetTemplateUrl } from "../../../services/hooks/useTemplate/useGetTemplateUrl"
import { IUpdatePage } from "../../../types/Page.type"
import { IUpdateTemplate } from "../../../types/Template.type"
import { pageUrls } from "../../../utils/pagesUrl"

type CentralOptionsContentProps = {
  templateData: IUpdateTemplate | undefined
  isUpdating: boolean
  handleUpdateTemplateData: (data: IUpdateTemplate) => void
  pageData: IUpdatePage | undefined
  handleUpdateRunUpdate: (stat: boolean) => void
}

export function CentralOptionsContent({
  handleUpdateTemplateData,
  isUpdating,
  templateData,
  pageData,
  handleUpdateRunUpdate,
}: CentralOptionsContentProps) {
  const text = useTranslation().t
  const router = useRouter()

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
                label: text("centraloptions:titlelabel"),
                onChange: (title) => handleUpdateTemplateData({ name: title }),
                defaultValue: templateData?.url,
                type: "text",
              }}
            />
          </Card>

          <Card>
            <CardText label={text("centraloptions:link")} />
            <CardTextInput
              input={{
                label: text("centraloptions:linklabel"),
                onChange: (url) => handleUpdateTemplateData({ url: url }),
                value: templateData?.url,
                fixedText: `quaq.me/${pageData?.url}/`,
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
                  onImageChange={(image) =>
                    handleUpdateTemplateData({ shortcut_image: image })
                  }
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
                isVisible: templateData?.shortcut_size == "small",
              }}
              onClick={() =>
                handleUpdateTemplateData({ shortcut_size: "small" })
              }
            />
            <CardLine />
            <CardText
              label={text("centraloptions:large")}
              indicator={{
                icon: Check,
                isVisible: templateData?.shortcut_size == "large",
              }}
              onClick={() =>
                handleUpdateTemplateData({ shortcut_size: "large" })
              }
            />
            <CardLine />
          </Card>

          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                color="black"
                text={text("centraloptions:confirm")}
                onClick={() => handleUpdateRunUpdate(true)}
              />
            </div>
          )}

          <Card>
            <CardText label={text("centraloptions:moreoptions")} />
            <CardLine />
            <CardText
              label={text("centraloptions:access")}
              indicator={{ icon: ArrowRight }}
              onClick={() =>
                router.push(
                  pageUrls.templateCentral({
                    pageSlug: pageData?.url || "",
                    templateSlug: templateData?.url || "",
                    settings: "access-control",
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
                    pageSlug: pageData?.url || "",
                    templateSlug: templateData?.url || "",
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
