import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardImageInput } from "components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "components/ImageSelector/ImageSelector"
import { useDebounce } from "hooks/useDebounce"
import { useValidation, validationRules } from "hooks/useValidation"
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
  handleUpdateIsUpdating: (stat: boolean) => void
  isUpdating: boolean
  runUpdate: boolean
  handleUpdateRunUpdate: (stat: boolean) => void
}

export function GeneralSettingsContent({
  pageData,
  handleUpdatePage,
  handleUpdateIsUpdating,
  isUpdating,
  runUpdate,
  handleUpdateRunUpdate,
}: GeneralSettingsContentProps) {
  const text = useTranslation().t
  const router = useRouter()

  type LocalPageProps = {
    title?: string
    description?: string
    slug?: string
    profilePicture?: string
    coverPicture?: string
    visibility?: "public" | "workspace"
  }

  const [
    localPageData,
    setLocalPageData,
    localPageDataErrors,
    isLocalPageDataValid,
  ] = useValidation<LocalPageProps>({
    title: {
      initialValue: pageData?.title || "",
      validators: [validationRules.required(text("validation:required"))],
    },
    description: {
      initialValue: pageData?.description || "",
      validators: [validationRules.required(text("validation:required"))],
    },
    slug: {
      initialValue: pageData?.slug || "",
      validators: [validationRules.required(text("validation:required"))],
    },
    profilePicture: {
      initialValue: pageData?.avatar_url || "",
      validators: [validationRules.required(text("validation:required"))],
    },
    coverPicture: {
      initialValue: pageData?.background_url || "",
      validators: [validationRules.required(text("validation:required"))],
    },
    visibility: {
      initialValue: pageData?.visibility || "public",
      validators: [validationRules.required(text("validation:required"))],
    },
  })

  const [hasDataChanged, setHasDataChanged] = useState(false)

  function handleUpdateLocalPageData(newPageData: LocalPageProps) {
    setLocalPageData({ ...localPageData, ...newPageData })
  }

  function isPageDataDifferent(
    pageData: IUpdatePage | undefined,
    localPageData: LocalPageProps
  ) {
    if (!pageData) {
      return false
    }
    return (
      pageData.title !== localPageData.title ||
      pageData.description !== localPageData.description ||
      pageData.slug !== localPageData.slug ||
      pageData.avatar_url !== localPageData.profilePicture ||
      pageData.background_url !== localPageData.coverPicture ||
      pageData.visibility !== localPageData.visibility
    )
  }

  const getPageSlug = useGetPageSlug()

  const debouncedPageTitle = useDebounce({
    value: localPageData.title,
    delay: 1000 * 1,
  })

  function onPageUpdate() {
    handleUpdatePage({
      avatar_url: localPageData.profilePicture,
      background_url: localPageData.coverPicture,
      description: localPageData.description,
      id: pageData?.id,
      slug: localPageData.slug,
      title: localPageData.title,
      visibility: localPageData.visibility,
    })
    handleUpdateIsUpdating(false)
    setHasDataChanged(false)
  }

  useEffect(() => {
    if (pageData) {
      setLocalPageData({
        coverPicture: pageData.background_url,
        description: pageData.description,
        profilePicture: pageData.avatar_url,
        slug: pageData.slug,
        title: pageData.title,
        visibility: pageData.visibility,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData])

  useEffect(() => {
    if (debouncedPageTitle && debouncedPageTitle !== pageData?.title) {
      getPageSlug.mutate(
        { name: debouncedPageTitle, id: pageData?.id },
        {
          onSuccess: (slug) => {
            handleUpdateLocalPageData({ slug })
          },
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPageTitle])

  useEffect(() => {
    const isDifferent = isPageDataDifferent(pageData, localPageData)

    setHasDataChanged(isDifferent)

    if (isLocalPageDataValid && isDifferent) {
      handleUpdateIsUpdating(true)
    } else {
      handleUpdateIsUpdating(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocalPageDataValid, pageData, localPageData])

  useEffect(() => {
    if (runUpdate && isUpdating) {
      onPageUpdate()
      handleUpdateRunUpdate(false)
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
            <CardText label={text("generalsettings:title")} />
            <CardTextInput
              input={{
                label: text("generalsettings:titlelabel"),
                onChange: (title) => handleUpdateLocalPageData({ title }),
                value: localPageData.title,
                errors: hasDataChanged ? localPageDataErrors.title : [],
              }}
            />
          </Card>
          <Card>
            <CardText label={text("generalsettings:link")} />
            <CardTextInput
              input={{
                label: text("generalsettings:linklabel"),
                fixedText: "quaq.me/",
                value: localPageData.slug,
                errors: hasDataChanged ? localPageDataErrors.slug : [],
              }}
              indicator={{
                icon: Check,
                bgColor: "green-500",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("generalsettings:description")} />
            <CardTextInput
              input={{
                label: text("generalsettings:descriptionlabel"),
                onChange: (description) =>
                  handleUpdateLocalPageData({ description }),
                value: localPageData.description,
                errors: hasDataChanged ? localPageDataErrors.description : [],
              }}
            />
          </Card>
          <Card>
            <CardText label={text("generalsettings:profile")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(image) =>
                    handleUpdateLocalPageData({ profilePicture: image })
                  }
                  url={localPageData.profilePicture}
                />
              }
              errors={hasDataChanged ? localPageDataErrors.profilePicture : []}
            />
          </Card>
          <Card>
            <CardText label={text("generalsettings:cover")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(image) =>
                    handleUpdateLocalPageData({ coverPicture: image })
                  }
                  url={localPageData.coverPicture}
                />
              }
              errors={hasDataChanged ? localPageDataErrors.coverPicture : []}
            />
          </Card>

          <Card>
            <CardText label={text("generalsettings:visibility")} />
            <CardText
              label={text("generalsettings:public")}
              indicator={{
                icon: Check,
                isVisible:
                  localPageData.visibility === "workspace" ? true : false,
              }}
              onClick={() => {
                handleUpdateLocalPageData({ visibility: "public" })
              }}
            />
            <CardLine />
            <CardText
              label={text("generalsettings:wsmembers")}
              indicator={{
                icon: Check,
                isVisible: localPageData.visibility === "public" ? true : false,
              }}
              onClick={() => {
                handleUpdateLocalPageData({ visibility: "workspace" })
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
                    pageSlug: pageData?.slug,
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
