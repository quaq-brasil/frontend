import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"

type CreatePageContentProps = {
  handleCreatePage: (
    name: string,
    url: string,
    workspace_id: string,
    avatar_url: string,
    background_url: string
  ) => void
  handleChangePageTitle: (title: string) => void
  handleChangePagePicture: (url: string) => void
  handleChangePageCover: (url: string) => void
}

export function CreatePageContent({
  handleCreatePage,
  handleChangePageTitle,
  handleChangePagePicture,
  handleChangePageCover,
}: CreatePageContentProps) {
  const text = useTranslation().t

  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")
  const [profile, setProfile] = useState("")
  const [cover, setCover] = useState("")

  function handleUpdate() {
    handleCreatePage(title, url, description, profile, cover)
  }

  const onChangeTitle = (value: string) => {
    setTitle(value)
    handleChangePageTitle(value)
  }

  const onChangeUrl = (value: string) => {
    setUrl(value)
  }

  const onChangeDescription = (value: string) => {
    setDescription(value)
  }

  const onChangeProfile = (value: string) => {
    setProfile(value)
    handleChangePagePicture(value)
  }

  const onChangeCover = (value: string) => {
    setCover(value)
    handleChangePageCover(value)
  }

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:pt-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("createpage:firstmessage")} />
          </Card>
          <Card>
            <CardText label={text("createpage:pagetitle")} />
            <CardTextInput
              input={{
                label: text("createpage:inputpagetitle"),
                onChange: (e) => onChangeTitle(e),
                type: "text",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("createpage:pagepicture")} />
            <CardImageInput
              imageSelector={
                <ImageSelector onImageChange={(e) => onChangeProfile(e)} />
              }
            />
          </Card>
          <Card>
            <CardText label={text("createpage:pagecover")} />
            <CardImageInput
              imageSelector={
                <ImageSelector onImageChange={(e) => onChangeCover(e)} />
              }
            />
          </Card>
          <Card>
            <CardText label={text("createpage:pagelink")} />
            <CardTextInput
              input={{
                label: text("createpage:inputpagelink"),
                onChange: (e) => onChangeUrl(e),
                type: "text",
                fixedText: "quaq.me/",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("createpage:pagedescription")} />
            <CardTextInput
              input={{
                label: text("createpage:inputpagedescription"),
                onChange: (e) => onChangeDescription(e),
                type: "text",
              }}
            />
          </Card>
          <Button
            color="slate-900"
            onClick={handleUpdate}
            text={text("createpage:confirm")}
          />
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
