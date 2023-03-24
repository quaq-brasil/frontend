import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardImageInput } from "components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "components/ImageSelector/ImageSelector"
import { Popover } from "components/Popover/Popover"
import { useUserAuth } from "contexts/userAuth"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { ArrowRight } from "phosphor-react"
import { useEffect, useState } from "react"
import { IUpdateUser } from "types/User.type"
import { pageUrls } from "utils/pagesUrl"

type ProfileContentProps = {
  handleUpdateUserData: (data: IUpdateUser) => void
  userData: IUpdateUser | undefined
  handleUpdateRunUpdate: (stat: boolean) => void
  handleUpdateIsUpdating: (stat: boolean) => void
  isUpdating: boolean
}

export function ProfileContent({
  handleUpdateRunUpdate,
  handleUpdateUserData,
  handleUpdateIsUpdating,
  isUpdating,
  userData,
}: ProfileContentProps) {
  const text = useTranslation().t
  const router = useRouter()

  const { signOut } = useUserAuth()

  type FormDataProps = {
    image?: {
      valid?: boolean
    }
    name?: {
      valid?: boolean
    }
  }

  const [formData, setFormData] = useState<FormDataProps>({
    image: { valid: false },
    name: { valid: false },
  })
  const [logout, setLogout] = useState(false)
  const [isChanging, setIsChanging] = useState(false)
  const [localUserData, setLocalUserData] = useState<IUpdateUser | undefined>()

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

  function handleUpdateLogout(stat: boolean) {
    setLogout(stat)
  }

  function handleLogout() {
    setLogout(false)
    signOut()
    router.push(pageUrls.home())
  }

  useEffect(() => {
    if (userData && !localUserData) {
      setLocalUserData(userData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  useEffect(() => {
    if (userData && localUserData) {
      let isDifferent = false

      for (const key in userData) {
        if ((userData as any)[key] !== (localUserData as any)[key]) {
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
  }, [userData, localUserData])

  useEffect(() => {
    if (userData?.name?.length > 1) {
      handleUpdateFormData({ name: { valid: true } })
    } else {
      handleUpdateFormData({ name: { valid: false } })
    }
    if (userData?.avatar_url) {
      handleUpdateFormData({ image: { valid: true } })
    } else {
      handleUpdateFormData({ image: { valid: false } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, localUserData])

  useEffect(() => {
    if (formData?.image.valid && formData?.name.valid && isChanging) {
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
            <CardText label={text("profile:photo")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(image) => {
                    handleUpdateUserData({ avatar_url: image })
                  }}
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
                onChange: (name) => {
                  handleUpdateUserData({ name: name })
                },
                type: "name",
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
