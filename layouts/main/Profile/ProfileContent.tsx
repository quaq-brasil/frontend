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
import { IUserUpdate } from "../../../types/User.type"

type ProfileContentProps = {
  userData: IUserUpdate
  isUpdating: boolean
  handleIsUpdating: (stat: boolean) => void
  handleUserUpdate: (userData: IUserUpdate) => void
}

export function ProfileContent({
  userData,
  isUpdating,
  handleIsUpdating,
  handleUserUpdate,
}: ProfileContentProps) {
  const text = useTranslation().t

  const [name, setName] = useState("")
  const [avatar, setAvatar] = useState("")

  function handleUpdateName(name: string) {
    setName(name)
    handleIsUpdating(true)
  }

  function handleUpdateAvatar(avatar: string) {
    setAvatar(avatar)
    handleIsUpdating(true)
  }

  useEffect(() => {
    setName(userData?.name || "")
    setAvatar(userData?.avatar_url || "")
  }, [userData])

  function handleUpdate() {
    const newData = {
      name: name,
      avatar_url: avatar,
    }
    handleUserUpdate(newData)
    handleIsUpdating(false)
  }

  useEffect(() => {
    if (isUpdating) {
      handleUpdate()
    }
  }, [isUpdating])

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("profile:photo")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(e) => handleUpdateAvatar(e)}
                  url={avatar}
                />
              }
            />
          </Card>
          <Card>
            <CardText label={text("profile:name")} />
            <CardTextInput
              input={{
                label: text("profile:inputname"),
                onChange: (e) => handleUpdateName(e),
                type: "text",
                defaultValue: name,
              }}
            />
          </Card>
          {isUpdating && (
            <Button
              color="black"
              onClick={handleUpdate}
              text={text("profile:confirm")}
            />
          )}
          <Card>
            <CardText label={text("profile:options")} />
            <CardText
              label={text("profile:logout")}
              indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
            <CardLine />
            <CardText
              label={text("profile:email")}
              indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
            <CardLine />
            <CardText
              label={text("profile:password")}
              indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
            <CardLine />
            <CardText
              label={text("profile:terms")}
              indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
            <CardLine />
            <CardText
              label={text("profile:more")}
              indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
          </Card>
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
