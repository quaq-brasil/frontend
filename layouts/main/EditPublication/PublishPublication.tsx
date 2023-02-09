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
import { useGenerateTemplateUniqueUrl } from "../../../services/hooks/useTemplate/useGenerateTemplateUniqueUrl"
import { IPage } from "../../../types/Page.type"
import {
  getTemplateByUrlAndPageUrlProps,
  IUpdateTemplate,
} from "../../../types/Template.type"

type PublishPublicationProps = {
  blocks: any[]
  onClose: () => void
  pageData: IPage | undefined
  template: getTemplateByUrlAndPageUrlProps | undefined
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

  const [publicationTitle, setPublicationTitle] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()
  const [templateData, setTemplateData] =
    useState<getTemplateByUrlAndPageUrlProps>()

  useEffect(() => {
    setTemplateData(template)
  }, [template])

  const generateTemplateUniqueUrl = useGenerateTemplateUniqueUrl()

  function handleGetTemplateUrl(data: handleGetTemplateUrlProps) {
    generateTemplateUniqueUrl.mutate(
      { data },
      {
        onSuccess: (url) => {
          handleUpdateTemplateData({ url })
        },
      }
    )
  }

  const debouncedTemplateName = useDebounce({
    value: templateData?.name,
    delay: 1000 * 1,
  })

  useEffect(() => {
    if (isUpdating && debouncedTemplateName) {
      handleGetTemplateUrl({
        id: templateData?.id,
        title: debouncedTemplateName,
        page_id: pageData?.id as string,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTemplateName])

  const handleUpdateTemplateData = (newData: IUpdateTemplate) => {
    setTemplateData((state) => {
      return {
        ...state,
        ...newData,
      } as getTemplateByUrlAndPageUrlProps
    })
    setIsUpdating(true)
  }

  const createPublication = useCreatePublication()

  function handleCreatePublication() {
    if (templateData?.id) {
      createPublication.mutate(
        {
          data: {
            title: publicationTitle,
            blocks,
            template_id: templateData.id,
            page_id: pageData?.id as string,
          },
        },
        {
          onSuccess: () => {
            router.push(`/adm/${pageData?.url}`)
          },
        }
      )
    }
  }

  function handleTabBar() {
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
  }

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
                  defaultValue: templateData?.name,
                  onChange: (title) =>
                    handleUpdateTemplateData({ name: title }),
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
                    url={templateData?.shortcut_image}
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
                  defaultValue: publicationTitle,
                  onChange: (publicationTitle) =>
                    setPublicationTitle(publicationTitle),
                }}
              />
            </Card>
            <div className="w-full h-fit hidden xl:block">
              <Button
                block={{
                  data: {
                    color: "bg-black",
                    text: text("publish:publish"),
                    onClick: () => handleCreatePublication,
                  },
                }}
                isEditable={false}
              />
            </div>
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
  templateData: getTemplateByUrlAndPageUrlProps | undefined
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
        text={pageData?.name || ""}
        img_url={pageData?.avatar_url || ""}
      />
      {!templateData?.name && !templateData?.shortcut_image && (
        <Tag variant="txt" text={text("publish:titletag")} />
      )}
      {templateData?.name && !templateData?.shortcut_image && (
        <Tag variant="txt" text={templateData.name} />
      )}
      {templateData?.name && templateData?.shortcut_image && (
        <Tag
          variant="img-txt"
          text={templateData.name}
          img_url={templateData.shortcut_image}
        />
      )}
    </Header>
  )
}
