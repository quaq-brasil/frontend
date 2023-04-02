import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { useValidation, validationRules } from "hooks/useValidation"
import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { useLogin } from "services/hooks/useUser/useLogin"
import { IUser } from "types/User.type"

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

  type LocalPasswordProps = {
    password?: string
  }

  const [
    localPasswordData,
    setLocalPasswordData,
    localPasswordDataErrors,
    isLocalPasswordDataValid,
  ] = useValidation<LocalPasswordProps>({
    password: {
      initialValue: "",
      validators: [validationRules.required(text("validation:required"))],
    },
  })

  const [passwordNotValid, setPasswordNotValid] = useState(false)

  function handleUpdatePassword(password: string) {
    setLocalPasswordData({ password })
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
        email: userData?.email,
        password: localPasswordData.password,
      },
      {
        onSuccess: () => {
          handleUpdateRunUpdate(true)
          handleUpdateIsUpdating(false)
          handleDeleteUser()
          setPasswordNotValid(false)
        },
        onError: () => {
          setPasswordNotValid(true)
          handleUpdateIsUpdating(false)
          handleUpdateRunUpdate(false)
        },
      }
    )
  }

  useEffect(() => {
    if (isLocalPasswordDataValid) {
      handleUpdateIsUpdating(true)
    } else {
      handleUpdateIsUpdating(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocalPasswordDataValid, localPasswordData])

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
                errors: passwordNotValid
                  ? localPasswordDataErrors.password
                  : [],
              }}
            />
          </Card>
          {passwordNotValid && (
            <Card>
              <CardText label={text("userdelete:failed")} />
            </Card>
          )}
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
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
