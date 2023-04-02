import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { useValidation, validationRules } from "hooks/useValidation"
import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { IUpdateUser } from "types/User.type"

type PasswordUpdateContentProps = {
  handleUpdateUser: (data: IUpdateUser) => void
  handleUpdateIsUpdating: (stat: boolean) => void
  handleUpdateRunUpdate: (stat: boolean) => void
  runUpdate: boolean
  isUpdating: boolean
}

export function PasswordUpdateContent({
  handleUpdateIsUpdating,
  handleUpdateRunUpdate,
  handleUpdateUser,
  isUpdating,
  runUpdate,
}: PasswordUpdateContentProps) {
  const text = useTranslation().t

  type UpdatePasswordProps = {
    password?: string
    confirmPassword?: string
  }

  const [
    localPasswordData,
    setLocalPasswordData,
    localPasswordDataErrors,
    isLocalPasswordDataValid,
  ] = useValidation<UpdatePasswordProps>({
    password: {
      initialValue: "",
      validators: [
        validationRules.required(text("validation:required")),
        validationRules.strongPassword(text("validation:validpassword")),
      ],
    },
    confirmPassword: {
      initialValue: "",
      validators: [
        validationRules.required(text("validation:required")),
        validationRules.passwordConfirmation(
          text("validation:passwordmatch"),
          () => password
        ),
      ],
    },
  })

  const [password, setPassword] = useState("")

  const [hasDataBeenUpdated, setHasDataBeenUpdated] = useState(false)

  function handleUpdateLocalPasswordData(newPasswordData: UpdatePasswordProps) {
    setLocalPasswordData({ ...localPasswordData, ...newPasswordData })
    setHasDataBeenUpdated(true)
  }

  useEffect(() => {
    setPassword(localPasswordData.password)
  }, [localPasswordData])

  useEffect(() => {
    if (isLocalPasswordDataValid) {
      handleUpdateIsUpdating(true)
    } else {
      handleUpdateIsUpdating(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocalPasswordDataValid])

  useEffect(() => {
    if (runUpdate) {
      handleUpdateUser({
        password: localPasswordData.password,
      })
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
            <CardText label={text("pwupdate:getpassword")} />
            <CardTextInput
              input={{
                label: text("pwupdate:inputpassword"),
                onChange: (password) =>
                  handleUpdateLocalPasswordData({ password: password }),
                type: "password",
                errors: hasDataBeenUpdated
                  ? localPasswordDataErrors.password
                  : [],
              }}
            />
          </Card>
          <Card>
            <CardText label={text("pwupdate:getconfirmation")} />
            <CardTextInput
              input={{
                label: text("pwupdate:inputconfirmation"),
                onChange: (confirmPassword) =>
                  handleUpdateLocalPasswordData({
                    confirmPassword: confirmPassword,
                  }),
                type: "password",
                errors: hasDataBeenUpdated
                  ? localPasswordDataErrors.confirmPassword
                  : [],
              }}
            />
          </Card>
          {isUpdating && hasDataBeenUpdated && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                block={{
                  data: {
                    color: "bg-black",
                    text: text("pwupdate:confirm"),
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
