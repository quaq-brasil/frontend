import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { useLogin } from "../../../services/hooks/useUser/useLogin"
import { IUpdateUser } from "../../../types/User.type"

type EmailUpdateContentProps = {
  handleUpdateRunUpdate: (stat: boolean) => void
  handleUpdateUserData: (data: IUpdateUser) => void
  userData: IUpdateUser | undefined
  handleChangeEmail: (data: IUpdateUser) => void
  runUpdate: boolean
  isUpdating: boolean
}

export function EmailUpdateContent({
  handleUpdateRunUpdate,
  handleUpdateUserData,
  userData,
  runUpdate,
  isUpdating,
}: EmailUpdateContentProps) {
  const text = useTranslation().t

  const [password, setPassword] = useState<string>("")
  const [failed, setFailed] = useState(false)

  const userLogin = useLogin()

  function handleUserVerification() {
    userLogin.mutate(
      {
        email: userData?.email || "",
        password: password,
      },
      {
        onSuccess: () => {
          handleUpdateRunUpdate(true)
        },
        onError: () => {
          handleUpdateFailed(true)
        },
      }
    )
  }

  function handleUpdateFailed(stat: boolean) {
    setFailed(stat)
  }

  const handleUpdatePassword = (password: string) => {
    setPassword(password)
  }

  useEffect(() => {
    handleUserVerification()
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
            <CardText label={text("emailupdate:newemail")} />
            <CardTextInput
              input={{
                label: text("emailupdate:inputemail"),
                onChange: (email) => handleUpdateUserData({ email: email }),
                type: "email",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("emailupdate:password")} />
            <CardTextInput
              input={{
                label: text("emailupdate:inputpassword"),
                onChange: (password) => handleUpdatePassword(password),
                type: "password",
              }}
            />
          </Card>
          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                color="slate-900"
                onClick={() => handleUpdateRunUpdate(true)}
                text={text("emailupdate:confirm")}
              />
            </div>
          )}
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
