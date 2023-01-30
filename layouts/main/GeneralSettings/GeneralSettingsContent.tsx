import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import { ArrowRight } from "phosphor-react"
import { useEffect } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"
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
                onChange: (title) => handleUpdatePageData({ name: title }),
                defaultValue: pageData?.name,
              }}
            />
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
            <CardText label={text("generalsettings:link")} />
            <CardTextInput
              input={{
                label: text("generalsettings:linklabel"),
                onChange: (link) => handleUpdatePageData({ url: link }),
                fixedText: "quaq.me/",
                defaultValue: pageData?.url,
              }}
            />
            <CardText
              label={text("generalsettings:sharelink")}
              indicator={{ icon: ArrowRight, onClick: () => console.log() }}
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
                color="black"
                onClick={() => handleUpdateRunUpdate(true)}
                text={text("generalsettings:confirm")}
              />
            </div>
          )}

          {!isUpdating && (
            <Card>
              <CardText label={text("generalsettings:options")} />
              <CardText
                label={text("generalsettings:delete")}
                indicator={{ icon: ArrowRight, onClick: () => console.log() }}
              />
              <CardLine />
              <Link
                href={pageUrls.terms()}
                className="w-full h-fit flex flex-col justify-center"
              >
                <CardText
                  label={text("generalsettings:terms")}
                  indicator={{
                    icon: ArrowRight,
                    onClick: () => console.log(),
                  }}
                />
              </Link>
              <CardLine />
              <CardText
                label={text("generalsettings:trackers")}
                indicator={{ icon: ArrowRight, onClick: () => console.log() }}
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
