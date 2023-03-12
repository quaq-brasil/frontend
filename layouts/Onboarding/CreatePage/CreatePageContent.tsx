import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardImageInput } from "components/Card/CardContentVariants/CardImageInput"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "components/ImageSelector/ImageSelector"
import { useDebounce } from "hooks/useDebouce"
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
}

export function CreatePageContent({
  handleUpdatePageData,
  handleUpdateRunUpdate,
  isUpdating,
  pageData,
  handleUpdateIsUpdating,
}: CreatePageContentProps) {
  const text = useTranslation().t

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
    avatar?: {
      valid?: boolean
    }
    cover?: {
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
    avatar: {
      valid: false,
    },
    cover: {
      valid: false,
    },
  })

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

  const debouncedPageName = useDebounce({
    value: pageData?.title,
    delay: 1000 * 1,
  })

  useEffect(() => {
    if (debouncedPageName && pageData?.title) {
      handleGetPageSlug({ id: pageData.id, name: pageData.title })
      handleUpdateFormData({ slug: { valid: true } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPageName])

  useEffect(() => {
    if (
      formData.avatar?.valid &&
      formData.cover?.valid &&
      formData.description?.valid &&
      formData.slug?.valid &&
      formData.title?.valid
    ) {
      handleUpdateIsUpdating(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData])

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
                onChange: (title) => handleUpdatePageData({ title: title }),
                type: "title",
                setValid: () =>
                  handleUpdateFormData({ title: { valid: true } }),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("createpage:pagelink")} />
            <CardTextInput
              input={{
                label: text("createpage:inputpagelink"),
                onChange: (link) => handleUpdatePageData({ slug: link }),
                type: "text",
                fixedText: "quaq.me/",
                value: pageData?.slug,
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
                setValid: () =>
                  handleUpdateFormData({ description: { valid: true } }),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("createpage:pagepicture")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(picture) => {
                    handleUpdatePageData({ avatar_url: picture })
                    handleUpdateFormData({ avatar: { valid: true } })
                  }}
                />
              }
            />
          </Card>
          <Card>
            <CardText label={text("createpage:pagecover")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(cover) => {
                    handleUpdatePageData({ background_url: cover })
                    handleUpdateFormData({ cover: { valid: true } })
                  }}
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
