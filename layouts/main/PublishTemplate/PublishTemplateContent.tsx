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
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import useDebounce from "../../../hooks/useDebouce"
import { useCreatePublication } from "../../../services/hooks/usePublication/useCreatePublication"
import { useGetTemplateUrl } from "../../../services/hooks/useTemplate/useGetTemplateUrl"
import { IPage } from "../../../types/Page.type"
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
  blocks: any[]
  onClose: () => void
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
  blocks,
  onClose,
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
    handleCreatePublication()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateData])

  const [newPublicationTitle, setNewPublicationTitle] = useState("")

  const createPublication = useCreatePublication()

  const router = useRouter()

  function handleCreatePublication() {
    if (templateData?.id) {
      createPublication.mutate(
        {
          data: {
            title: newPublicationTitle,
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

  function handleUpdateNewPublicationTitle(title: string) {
    handleUpdateIsUpdating(true)
    setNewPublicationTitle(title)
    if (title === "") {
      handleUpdateIsUpdating(false)
    }
  }

  const onCreateTemplate = () => {
    handleCreateTemplate({
      current_publication_id: "63e00c3ca62ce469e303482d",
      name: templateData?.name || "",
      page_id: pageData?.id || "",
      number_of_new_interactions: 0,
      shortcut_image:
        "https://images.unsplash.com/photo-1674225636667-0e12bccc2b4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      shortcut_size: templateData?.shortcut_size || "small",
      url: templateData?.url || "",
      trackers: {
        facebook: undefined,
        google: undefined,
      },
    })
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
            onClick={onCreateTemplate}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("publish:back")}
          onClick={() => console.log("tab1")}
        />,
      ]
    }
  }

  return (
    <>
      <div className="w-full h-screen bg-slate-100">
        <div
          className="fixed z-20 bottom-0 left-0 right-0 top-[50px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
        >
          <div className="flex flex-col gap-2 md:gap-4 items-center">
            <Card>
              <CardText label={text("publish:title")} />
              <CardTextInput
                input={{
                  label: text("publish:titlelabel"),
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
                  block={{
                    data: {
                      color: "bg-black",
                      text: text("publish:confirm"),
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
