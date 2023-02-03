import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { useLogin } from "../../../services/hooks/useUser/useLogin"
import { IUser } from "../../../types/User.type"
import { pageUrls } from "../../../utils/pagesUrl"

type UserDeleteContentProps = {
  handleDeleteUser: () => void
  userData: IUser | undefined
  isUpdating: boolean
  runUpdate: boolean
  handleUpdateIsUpdating: (stat: boolean) => void
  handleUpdateRunUpdate: (stat: boolean) => void
}

export function UserDeleteContent({
  handleDeleteUser,
  handleUpdateIsUpdating,
  handleUpdateRunUpdate,
  isUpdating,
  runUpdate,
  userData,
}: UserDeleteContentProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [password, setPassword] = useState<string>()
  const [passwordNotValid, setPasswordNotValid] = useState(false)

  function handleUpdatePassword(password: string) {
    setPassword(password)
    handleUpdateIsUpdating(true)
    setPasswordNotValid(false)
  }

  useEffect(() => {
    if (runUpdate) {
      handleVerifyUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  const getUser = useLogin()

  function handleVerifyUser() {
    getUser.mutate(
      {
        email: userData?.email || "",
        password: password || "",
      },
      {
        onSuccess: () => {
          handleUpdateRunUpdate(true)
          handleUpdateIsUpdating(false)
          handleDeleteUser()
          router.push(pageUrls.home())
        },
        onError: () => {
          setPasswordNotValid(true)
          handleUpdateIsUpdating(false)
          handleUpdateRunUpdate(false)
        },
      }
    )
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
            <CardText label={text("userdelete:title")} />
            <CardLine />
            <CardText label={text("userdelete:longtext")} />
            <CardLine />
          </Card>
          <Card>
            <CardText label={text("userdelete:password")} />
            <CardTextInput
              input={{
                label: text("userdelete:passwordinput"),
                onChange: (password) => handleUpdatePassword(password),
                type: "password",
              }}
            />
          </Card>
          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                block={{
                  data: {
                    color: "bg-black",
                    text: text("userdelete:confirm"),
                    onClick: () => handleUpdateRunUpdate(true),
                  },
                }}
                isEditable={false}
              />
            </div>
          )}
          {passwordNotValid && (
            <Card>
              <CardText label={text("userdelete:failed")} />
            </Card>
          )}
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
