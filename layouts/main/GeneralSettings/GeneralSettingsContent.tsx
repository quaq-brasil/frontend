import useTranslation from "next-translate/useTranslation"
import { ArrowRight } from "phosphor-react"
import { useEffect, useState } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"
import { IUpdatePage } from "../../../types/Page.type"

type GeneralSettingsContent = {
  initialData: IUpdatePage
  handleUpdatePage: (data: IUpdatePage) => void
  handleUpdateAvatar: (value: string) => void
  handleUpdateTitle: (value: string) => void
  handleUpdateCover: (value: string) => void
}

export function GeneralSettingsContent({
  initialData,
  handleUpdatePage,
  handleUpdateAvatar,
  handleUpdateTitle,
  handleUpdateCover,
}: GeneralSettingsContent) {
  const text = useTranslation().t

  const [data, setData] = useState<IUpdatePage>(initialData)

  useEffect(() => {
    setData(initialData)
  }, [initialData])

  const [pageDataChange, setPageDataChange] = useState(false)

  function onChangeName(value: string) {
    setData({ ...data, name: value })
    handleUpdateTitle(value)
    setPageDataChange(true)
  }

  // function onChangeDescription(value: string) {
  //   setData({ ...data, description: value })
  //   setPageDataChange(true)
  // }

  function onChangeUrl(value: string) {
    setData({ ...data, url: value })
    setPageDataChange(true)
  }

  function onChangeBackground(value: string) {
    setData({ ...data, background_url: value })
    handleUpdateCover(value)
    setPageDataChange(true)
  }

  function onChangeAvatar(value: string) {
    setData({ ...data, avatar_url: value })
    handleUpdateAvatar(value)
    setPageDataChange(true)
  }

  function onPageUpdate() {
    const newData = {
      name: data.name,
      url: data.url,
      background_url: data.background_url,
      avatar_url: data.avatar_url,
    }

    handleUpdatePage(newData)

    setPageDataChange(false)
  }

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
                onChange: (e) => onChangeName(e),
                defaultValue: data?.name,
              }}
            />
          </Card>
          <Card>
            <CardText label={text("generalsettings:description")} />
            <CardTextInput
              input={{
                label: text("generalsettings:descriptionlabel"),
                onChange: (e) => console.log(e),
                defaultValue: "description",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("generalsettings:link")} />
            <CardTextInput
              input={{
                label: text("generalsettings:linklabel"),
                onChange: (e) => onChangeUrl(e),
                fixedText: "quaq.me/",
                defaultValue: data?.url,
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
                  onImageChange={(e) => onChangeAvatar(e)}
                  url={data?.avatar_url}
                />
              }
            />
          </Card>
          <Card>
            <CardText label={text("generalsettings:cover")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(e) => onChangeBackground(e)}
                  url={data?.background_url}
                />
              }
            />
          </Card>

          {pageDataChange && (
            <Button
              color="black"
              onClick={onPageUpdate}
              text={text("generalsettings:confirm")}
            />
          )}

          {!pageDataChange && (
            <Card>
              <CardText label={text("generalsettings:options")} />
              <CardText
                label={text("generalsettings:delete")}
                indicator={{ icon: ArrowRight, onClick: () => console.log() }}
              />
              <CardLine />
              <CardText
                label={text("generalsettings:terms")}
                indicator={{ icon: ArrowRight, onClick: () => console.log() }}
              />
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
