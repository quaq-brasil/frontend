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
import { useGetPageSlug } from "services/hooks/usePage/useGetPageSlug"
import { IUpdatePage } from "types/Page.type"
import { pageUrls } from "utils/pagesUrl"

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
    slug?: {
      valid?: boolean
    }
    description?: {
      valid?: boolean
    }
    profile?: {
      valid?: boolean
    }
    cover?: {
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
    description: {
      valid: false,
    },
    profile: {
      valid: false,
    },
    cover: {
      valid: false,
    },
    visibility: {
      valid: true,
    },
  })
  const [isChanging, setIsChanging] = useState(false)
  const [localPageData, setLocalPageData] = useState<IUpdatePage | undefined>()

  useEffect(() => {
    if (pageData && !localPageData) {
      setLocalPageData(initialPageData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPageData])

  function handleUpdateIsChanging(stat: boolean) {
    setIsChanging(stat)
  }

  function handleUpdateFormData(newData: FormDataProps) {
    setFormData((state) => {
      return {
        ...state,
        ...newData,
      } as FormDataProps
    })
  }

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

  function onPageUpdate() {
    handleUpdatePage(pageData)
    handleUpdateIsUpdating(false)
  }

  useEffect(() => {
    if (pageData && localPageData) {
      let isDifferent = false

      for (const key in pageData) {
        if ((pageData as any)[key] !== (localPageData as any)[key]) {
          isDifferent = true
          break
        }
      }

      if (isDifferent) {
        handleUpdateIsChanging(true)
      } else {
        handleUpdateIsChanging(false)
      }
    }
  }, [pageData, localPageData])

  useEffect(() => {
    if (pageData?.title?.length > 1) {
      handleUpdateFormData({ title: { valid: true } })
    } else {
      handleUpdateFormData({ title: { valid: false } })
    }
    if (pageData?.slug) {
      handleUpdateFormData({ slug: { valid: true } })
    } else {
      handleUpdateFormData({ slug: { valid: false } })
    }
    if (pageData?.description?.length > 0) {
      handleUpdateFormData({ description: { valid: true } })
    } else {
      handleUpdateFormData({ description: { valid: false } })
    }
    if (pageData?.avatar_url) {
      handleUpdateFormData({ profile: { valid: true } })
    } else {
      handleUpdateFormData({ profile: { valid: false } })
    }
    if (pageData?.background_url) {
      handleUpdateFormData({ cover: { valid: true } })
    } else {
      handleUpdateFormData({ cover: { valid: false } })
    }
    if (pageData?.visibility) {
      handleUpdateFormData({ cover: { valid: true } })
    } else {
      handleUpdateFormData({ cover: { valid: false } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData])

  useEffect(() => {
    if (debouncedPageTitle && formData.title.valid) {
      handleGetPageSlug({
        id: pageData?.id,
        name: pageData?.title,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPageTitle])

  useEffect(() => {
    if (runUpdate && isUpdating) {
      onPageUpdate()
      handleUpdateRunUpdate(false)
      setIsChanging(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  useEffect(() => {
    if (formData.title?.valid && formData.description?.valid && isChanging) {
      handleUpdateIsUpdating(true)
    } else {
      handleUpdateIsUpdating(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, isChanging])

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
                  handleUpdateIsChanging(true)
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
                fixedText: "quaq.me/",
                value: pageData?.slug,
              }}
              indicator={{
                icon: Check,
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
                  handleUpdateIsChanging(true)
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
                    handleUpdateIsChanging(true)
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
                    handleUpdateIsChanging(true)
                  }}
                  url={pageData?.background_url}
                />
              }
            />
          </Card>

          <Card>
            <CardText label={text("generalsettings:visibility")} />
            <CardText
              label={text("generalsettings:public")}
              indicator={{
                icon: Check,
                isVisible: pageData?.visibility === "workspace" ? true : false,
              }}
              onClick={() => {
                handleUpdateIsChanging(true)
                handleUpdatePageData({ visibility: "public" })
              }}
            />
            <CardLine />
            <CardText
              label={text("generalsettings:wsmembers")}
              indicator={{
                icon: Check,
                isVisible: pageData?.visibility === "public" ? true : false,
              }}
              onClick={() => {
                handleUpdateIsChanging(true)
                handleUpdatePageData({ visibility: "workspace" })
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
                    pageSlug:
                      pageData?.slug != initialPageData.slug
                        ? initialPageData.slug
                        : pageData?.slug,
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
            {/* <CardText
              label={text("generalsettings:trackers")}
              indicator={{ icon: ArrowRight }}
              onClick={() =>
                router.push(
                  pageUrls.pageSettings({
                    pageSlug:
                      pageData?.slug != initialPageData.slug
                        ? initialPageData.slug
                        : pageData?.slug,
                    pageSettings: "trackers",
                  })
                )
              }
            />
            <CardLine /> */}
          </Card>

          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
