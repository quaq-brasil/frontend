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
import { useDebounce } from "../../../hooks/useDebouce"
import { useGetPageSlug } from "../../../services/hooks/usePage/useGetPageSlug"
import { IUpdatePage } from "../../../types/Page.type"
import { pageUrls } from "../../../utils/pagesUrl"

type GeneralSettingsContent = {
  pageData: IUpdatePage | undefined
  handleUpdatePage: (data: IUpdatePage) => void
  handleUpdatePageData: (newData: IUpdatePage) => void
  handleUpdateIsUpdating: (stat: boolean) => void
  isUpdating: boolean
  runUpdate: boolean
  handleUpdateRunUpdate: (stat: boolean) => void
}

export function GeneralSettingsContent({
  pageData,
  handleUpdatePage,
  handleUpdatePageData,
  handleUpdateIsUpdating,
  isUpdating,
  runUpdate,
  handleUpdateRunUpdate,
}: GeneralSettingsContent) {
  const text = useTranslation().t

  const getPageUrl = useGetPageSlug()

  type IGetPageUrl = {
    name: string
    id: string
  }

  function handleGetPageUrl({ id, name }: IGetPageUrl) {
    getPageUrl.mutate(
      { name, id },
      {
        onSuccess: (slug) => {
          handleUpdatePageData({
            slug,
          })
        },
      }
    )
  }

  const debouncedPageName = useDebounce({
    value: pageData?.title,
    delay: 1000 * 1,
  })

  useEffect(() => {
    if (isUpdating && debouncedPageName && pageData?.title) {
      handleGetPageUrl({ id: pageData.id as string, name: pageData.title })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPageName])

  function onPageUpdate() {
    handleUpdatePage(pageData as IUpdatePage)
    handleUpdateIsUpdating(false)
  }

  useEffect(() => {
    if (runUpdate) {
      onPageUpdate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  const router = useRouter()

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("generalsettings:title")} />
            <CardTextInput
              input={{
                label: text("generalsettings:titlelabel"),
                onChange: (title) => handleUpdatePageData({ title: title }),
                defaultValue: pageData?.title,
                type: "title",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("generalsettings:link")} />
            <CardTextInput
              input={{
                label: text("generalsettings:linklabel"),
                onChange: (link) => handleUpdatePageData({ slug: link }),
                fixedText: "quaq.me/",
                value: pageData?.slug,
              }}
              indicator={{
                icon: Check,
                onClick: () => {},
                bgColor: "green-500",
              }}
            />
            {/* <CardText
              label={text("generalsettings:sharelink")}
              indicator={{ icon: ArrowRight }}
            /> */}
          </Card>
          <Card>
            <CardText label={text("generalsettings:description")} />
            <CardTextInput
              input={{
                label: text("generalsettings:descriptionlabel"),
                onChange: (description) =>
                  handleUpdatePageData({ description: description }),
                defaultValue: pageData?.description,
              }}
            />
          </Card>
          <Card>
            <CardText label={text("generalsettings:profile")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(avatar) =>
                    handleUpdatePageData({ avatar_url: avatar })
                  }
                  url={pageData?.avatar_url}
                />
              }
            />
          </Card>
          <Card>
            <CardText label={text("generalsettings:cover")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(cover) =>
                    handleUpdatePageData({ background_url: cover })
                  }
                  url={pageData?.background_url}
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
                    text: text("generalsettings:confirm"),
                    onClick: () => handleUpdateRunUpdate(true),
                  },
                }}
                isEditable={false}
              />
            </div>
          )}

          {!isUpdating && (
            <Card>
              <CardText label={text("generalsettings:options")} />
              <CardText
                label={text("generalsettings:delete")}
                indicator={{ icon: ArrowRight }}
                onClick={() =>
                  router.push(
                    pageUrls.pageSettings({
                      pageSlug: pageData?.slug || "",
                      pageSettings: "delete",
                    })
                  )
                }
              />
              <CardLine />
              <CardText
                label={text("generalsettings:terms")}
                indicator={{
                  icon: ArrowRight,
                }}
                onClick={() => router.push(pageUrls.terms())}
              />
              <CardLine />
              <CardText
                label={text("generalsettings:trackers")}
                indicator={{ icon: ArrowRight }}
                onClick={() =>
                  router.push(
                    pageUrls.pageSettings({
                      pageSlug: pageData?.slug || "",
                      pageSettings: "trackers",
                    })
                  )
                }
              />
              <CardLine />
            </Card>
          )}

          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
