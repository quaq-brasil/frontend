import useTranslation from "next-translate/useTranslation"
import { Check } from "phosphor-react"
import { useEffect } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"
import { useDebounce } from "../../../hooks/useDebouce"
import { useGetPageUrl } from "../../../services/hooks/usePage/useGetPageUrl"
import { IUpdatePage } from "../../../types/Page.type"

type CreatePageContentProps = {
  handleUpdatePageData: (data: IUpdatePage) => void
  isUpdating: boolean
  handleUpdateRunUpdate: (stat: boolean) => void
  pageData: IUpdatePage | undefined
}

export function CreatePageContent({
  handleUpdatePageData,
  handleUpdateRunUpdate,
  isUpdating,
  pageData,
}: CreatePageContentProps) {
  const text = useTranslation().t

  const getPageUrl = useGetPageUrl()

  type IGetPageUrl = {
    name: string
    id: string
  }

  function handleGetPageUrl({ id, name }: IGetPageUrl) {
    getPageUrl.mutate(
      { name, id },
      {
        onSuccess: (url) => {
          handleUpdatePageData({
            url,
          })
        },
      }
    )
  }

  const debouncedPageName = useDebounce({
    value: pageData?.name,
    delay: 1000 * 1,
  })

  useEffect(() => {
    if (isUpdating && debouncedPageName && pageData?.name) {
      handleGetPageUrl({ id: pageData.id as string, name: pageData.name })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPageName])

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:pt-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("createpage:pagetitle")} />
            <CardTextInput
              input={{
                label: text("createpage:inputpagetitle"),
                onChange: (title) => handleUpdatePageData({ name: title }),
                type: "text",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("createpage:pagelink")} />
            <CardTextInput
              input={{
                label: text("createpage:inputpagelink"),
                onChange: (link) => handleUpdatePageData({ url: link }),
                type: "text",
                fixedText: "quaq.me/",
                value: pageData?.url,
              }}
              indicator={{
                icon: Check,
                onClick: () => {},
                bgColor: "green-500",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("createpage:pagedescription")} />
            <CardTextInput
              input={{
                label: text("createpage:inputpagedescription"),
                onChange: (description) =>
                  handleUpdatePageData({ description: description }),
                type: "text",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("createpage:pagepicture")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(picture) =>
                    handleUpdatePageData({ avatar_url: picture })
                  }
                />
              }
            />
          </Card>
          <Card>
            <CardText label={text("createpage:pagecover")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(cover) =>
                    handleUpdatePageData({ background_url: cover })
                  }
                />
              }
            />
          </Card>
          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                block={{
                  data: {
                    color: "bg-black",
                    text: text("createpage:confirm"),
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
