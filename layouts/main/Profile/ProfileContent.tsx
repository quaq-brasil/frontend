import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { ArrowRight } from "phosphor-react"
import { useState } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"
import { Popover } from "../../../components/Popover/Popover"
import { IUpdateUser } from "../../../types/User.type"
import { pageUrls } from "../../../utils/pagesUrl"

type ProfileContentProps = {
  handleUpdateUserdata: (data: IUpdateUser) => void
  userData: IUpdateUser | undefined
  handleUpdateRunUpdate: (stat: boolean) => void
  isUpdating: boolean
}

export function ProfileContent({
  handleUpdateRunUpdate,
  handleUpdateUserdata,
  isUpdating,
  userData,
}: ProfileContentProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [logout, setLogout] = useState(false)

  function handleUpdateLogout(stat: boolean) {
    setLogout(stat)
    console.log(stat)
  }

  function handleLogout() {
    setLogout(false)
    console.log("logout", logout)
    router.push(pageUrls.home())
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
            <CardText label={text("profile:photo")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(image) =>
                    handleUpdateUserdata({ avatar_url: image })
                  }
                  url={userData?.avatar_url || ""}
                />
              }
            />
          </Card>
          <Card>
            <CardText label={text("profile:name")} />
            <CardTextInput
              input={{
                label: text("profile:inputname"),
                onChange: (name) => handleUpdateUserdata({ name: name }),
                type: "text",
                defaultValue: userData?.name || "",
              }}
            />
          </Card>
          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                block={{
                  data: {
                    color: "bg-black",
                    text: text("profile:confirm"),
                    onClick: () => handleUpdateRunUpdate(true),
                  },
                }}
                isEditable={false}
              />
            </div>
          )}
          <Card>
            <CardText label={text("profile:options")} />
            <CardText
              label={text("profile:logout")}
              indicator={{ icon: ArrowRight }}
              onClick={() => handleUpdateLogout(true)}
            />
            <CardLine />
            <CardText
              label={text("profile:email")}
              indicator={{ icon: ArrowRight }}
              onClick={() => router.push(pageUrls.meSettings("email-update"))}
            />
            <CardLine />
            <CardText
              label={text("profile:password")}
              indicator={{ icon: ArrowRight }}
              onClick={() =>
                router.push(pageUrls.meSettings("password-update"))
              }
            />
            <CardLine />
            <CardText
              label={text("profile:terms")}
              indicator={{ icon: ArrowRight }}
              onClick={() => router.push(pageUrls.terms())}
            />
            <CardLine />
            <CardText
              label={text("profile:more")}
              indicator={{ icon: ArrowRight }}
              onClick={() => router.push(pageUrls.meSettings("advanced"))}
            />
          </Card>
          <Popover
            description={text("profile:logoutdescription")}
            isOpen={logout}
            declineButton={text("profile:logoutdecline")}
            title={text("profile:logouttitle")}
            acceptButton={text("profile:logoutaccepet")}
            acceptFunc={handleLogout}
            declineFunc={() => handleUpdateLogout(false)}
          />
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
