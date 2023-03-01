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
import { useGetPageSlug } from "../../../services/hooks/usePage/useGetPageSlug"
import { IUpdatePage } from "../../../types/Page.type"
import { pageUrls } from "../../../utils/pagesUrl"

type GeneralSettingsContentProps = {
  pageData: IUpdatePage | undefined
  handleUpdatePage: (data: IUpdatePage) => void
  handleUpdatePageData: (newData: IUpdatePage) => void
  handleUpdateIsUpdating: (stat: boolean) => void
  isUpdating: boolean
  runUpdate: boolean
  handleUpdateRunUpdate: (stat: boolean) => void
  initialPageData: IUpdatePage | undefined
}

export function GeneralSettingsContent({
  pageData,
  handleUpdatePage,
  handleUpdatePageData,
  handleUpdateIsUpdating,
  isUpdating,
  runUpdate,
  handleUpdateRunUpdate,
  initialPageData,
}: GeneralSettingsContentProps) {
  const text = useTranslation().t
  const router = useRouter()

  type FormDataProps = {
    title?: {
      valid?: boolean
    }
    description?: {
      valid?: boolean
    }
  }

  function handleUpdateFormData(newData: FormDataProps) {
    setFormData((state) => {
      return {
        ...state,
        ...newData,
      } as FormDataProps
    })
  }

  const [formData, setFormData] = useState<FormDataProps>({
    description: {
      valid: false,
    },
    title: {
      valid: false,
    },
  })

  const getPageSlug = useGetPageSlug()

  type IGetPageSlug = {
    name: string
    id: string
  }

  function handleGetPageSlug({ id, name }: IGetPageSlug) {
    getPageSlug.mutate(
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

  const debouncedPageTitle = useDebounce({
    value: pageData?.title,
    delay: 1000 * 1,
  })

  useEffect(() => {
    if (
      debouncedPageTitle !== initialPageData?.title &&
      pageData?.title !== initialPageData?.title &&
      pageData?.id
    ) {
      handleGetPageSlug({
        id: pageData?.id,
        name: pageData?.title,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPageTitle])

  function onPageUpdate() {
    handleUpdatePage(pageData as IUpdatePage)
    handleUpdateIsUpdating(false)
  }

  useEffect(() => {
    if (runUpdate) {
      onPageUpdate()
      handleUpdateRunUpdate(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  useEffect(() => {
    if (formData.title?.valid && formData.description?.valid) {
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
            <CardText label={text("generalsettings:title")} />
            <CardTextInput
              input={{
                label: text("generalsettings:titlelabel"),
                onChange: (title) => {
                  handleUpdatePageData({ title: title })
                  if (title.length > 0) {
                    handleUpdateFormData({
                      title: { valid: true },
                      description: { valid: true },
                    })
                  } else {
                    handleUpdateFormData({ title: { valid: false } })
                  }
                },
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
                onChange: () => {},
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
                onChange: (description) => {
                  handleUpdatePageData({ description: description })
                  if (description.length > 0) {
                    handleUpdateFormData({
                      description: { valid: true },
                      title: { valid: true },
                    })
                  } else {
                    handleUpdateFormData({ description: { valid: false } })
                  }
                },
                defaultValue: pageData?.description,
              }}
            />
          </Card>
          <Card>
            <CardText label={text("generalsettings:profile")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(avatar) => {
                    handleUpdatePageData({ avatar_url: avatar })
                    handleUpdateIsUpdating(true)
                  }}
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
                  onImageChange={(cover) => {
                    handleUpdatePageData({ background_url: cover })
                    handleUpdateIsUpdating(true)
                  }}
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

          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
