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
import { Check } from "phosphor-react"
import { useEffect, useState } from "react"
import { useGetPageSlug } from "services/hooks/usePage/useGetPageSlug"
import { IUpdatePage } from "types/Page.type"

type CreatePageContentProps = {
  handleUpdatePageData: (data: IUpdatePage) => void
  isUpdating: boolean
  handleUpdateRunUpdate: (stat: boolean) => void
  pageData: IUpdatePage | undefined
  handleUpdateIsUpdating: (stat: boolean) => void
  handleCreatePage: (data: IUpdatePage) => void
  runUpdate: boolean
}

export function CreatePageContent({
  handleUpdatePageData,
  handleUpdateRunUpdate,
  isUpdating,
  pageData,
  handleUpdateIsUpdating,
  handleCreatePage,
  runUpdate,
}: CreatePageContentProps) {
  const text = useTranslation().t

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

  const getPageSlug = useGetPageSlug()

  const debouncedPageTitle = useDebounce({
    value: localPageData.title,
    delay: 1000 * 1,
  })

  function handleUpdateLocalPageData(newPageData: LocalPageProps) {
    setLocalPageData({ ...localPageData, ...newPageData })
  }

  type IGetPageSlug = {
    name: string
    id: string
  }

  function handleGetPageSlug({ id, name }: IGetPageSlug) {
    getPageSlug.mutate(
      { name, id },
      {
        onSuccess: (slug) => {
          handleUpdateLocalPageData({
            slug,
          })
        },
      }
    )
  }

  useEffect(() => {
    if (debouncedPageTitle) {
      handleGetPageSlug({ id: pageData?.id, name: debouncedPageTitle })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPageTitle])

  useEffect(() => {
    if (isLocalPageDataValid) {
      handleUpdateIsUpdating(true)
    } else {
      handleUpdateIsUpdating(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocalPageDataValid, localPageData])

  useEffect(() => {
    if (runUpdate) {
      handleCreatePage({
        avatar_url: localPageData.profilePicture,
        background_url: localPageData.coverPicture,
        description: localPageData.description,
        slug: localPageData.slug,
        title: localPageData.title,
        visibility: localPageData.visibility,
      })
      setHasDataChanged(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

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
                onChange: (title) =>
                  handleUpdateLocalPageData({ title: title }),
                errors: hasDataChanged ? localPageDataErrors.title : [],
              }}
            />
          </Card>
          <Card>
            <CardText label={text("createpage:pagelink")} />
            <CardTextInput
              input={{
                label: text("createpage:inputpagelink"),
                type: "text",
                fixedText: "quaq.me/",
                value: localPageData?.slug,
                errors: hasDataChanged ? localPageDataErrors.slug : [],
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
                  handleUpdateLocalPageData({ description: description }),
                errors: hasDataChanged ? localPageDataErrors.description : [],
              }}
            />
          </Card>
          <Card>
            <CardText label={text("createpage:pagepicture")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(picture) => {
                    handleUpdateLocalPageData({ profilePicture: picture })
                  }}
                />
              }
              errors={hasDataChanged ? localPageDataErrors.profilePicture : []}
            />
          </Card>
          <Card>
            <CardText label={text("createpage:pagecover")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(cover) => {
                    handleUpdateLocalPageData({ coverPicture: cover })
                  }}
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
