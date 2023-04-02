import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { useValidation, validationRules } from "hooks/useValidation"
import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { useLogin } from "services/hooks/useUser/useLogin"
import { IUpdateUser } from "types/User.type"

type EmailUpdateContentProps = {
  handleUpdateRunUpdate: (stat: boolean) => void
  handleUpdateIsUpdating: (stat: boolean) => void
  userData: IUpdateUser | null
  handleChangeEmail: (data: IUpdateUser) => void
  runUpdate: boolean
  isUpdating: boolean
}

export function EmailUpdateContent({
  handleUpdateRunUpdate,
  handleChangeEmail,
  userData,
  runUpdate,
  isUpdating,
  handleUpdateIsUpdating,
}: EmailUpdateContentProps) {
  const text = useTranslation().t

  type EmailUpdateProps = {
    email?: string
    password?: string
  }

  const [
    localUserData,
    setLocalUserData,
    localUserDataErrors,
    isLocalUserDataValid,
  ] = useValidation<EmailUpdateProps>({
    email: {
      initialValue: "",
      validators: [
        validationRules.required(text("validation:required")),
        validationRules.email(text("validation:validemail")),
      ],
    },
    password: {
      initialValue: "",
      validators: [validationRules.required(text("validation:required"))],
    },
  })

  const [hasAnyUpdateBeenMade, setHasAnyUpdateBeenMade] = useState(false)

  const [_failed, setFailed] = useState(false)

  const userLogin = useLogin()

  function handleUpdateLocalUserData(newUserData: EmailUpdateProps) {
    setLocalUserData({ ...localUserData, ...newUserData })
  }

  function handleRunUpdate() {
    handleUpdateIsUpdating(false)
    handleUpdateRunUpdate(false)
    setHasAnyUpdateBeenMade(false)
    handleChangeEmail({ ...userData, email: localUserData.email })
  }

  function handleUserVerification() {
    userLogin.mutate(
      {
        email: userData?.email,
        password: localUserData?.password,
      },
      {
        onSuccess: () => {
          handleRunUpdate()
        },
        onError: () => {
          handleUpdateFailed(true)
          handleUpdateIsUpdating(false)
          handleUpdateRunUpdate(false)
          setHasAnyUpdateBeenMade(true)
        },
      }
    )
  }

  function handleUpdateFailed(stat: boolean) {
    setFailed(stat)
  }

  useEffect(() => {
    if (isLocalUserDataValid) {
      handleUpdateIsUpdating(true)
    } else {
      handleUpdateIsUpdating(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocalUserDataValid, localUserData])

  useEffect(() => {
    if (runUpdate) {
      handleUserVerification()
    }
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
                onChange: (email) =>
                  handleUpdateLocalUserData({ email: email }),
                errors: hasAnyUpdateBeenMade ? localUserDataErrors.email : [],
              }}
            />
          </Card>
          <Card>
            <CardText label={text("emailupdate:password")} />
            <CardTextInput
              input={{
                label: text("emailupdate:inputpassword"),
                onChange: (password) =>
                  handleUpdateLocalUserData({ password: password }),
                errors: hasAnyUpdateBeenMade
                  ? localUserDataErrors.password
                  : [],
              }}
            />
          </Card>
          {hasAnyUpdateBeenMade && _failed && (
            <Card>
              <CardText label={text("emailupdate:failed")} />
            </Card>
          )}
          {isUpdating && hasAnyUpdateBeenMade && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                block={{
                  data: {
                    color: "bg-black",
                    text: text("emailupdate:confirm"),
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
