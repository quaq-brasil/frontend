import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { useValidation, validationRules } from "hooks/useValidation"
import useTranslation from "next-translate/useTranslation"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useLogin } from "services/hooks/useUser/useLogin"
import { pageUrls } from "utils/pagesUrl"

const QuickIn = dynamic(
  () => import("components/QuickIn/QuickIn").then((mod) => mod.QuickIn),
  { ssr: false }
)

type LogUserInContentProps = {
  isUpdating: boolean
  handleUpdateRunUpdate: (stat: boolean) => void
  handleUpdateIsUpdating(stat: boolean): void
  runUpdate: boolean
}

export function LogUserInContent({
  handleUpdateRunUpdate,
  isUpdating,
  handleUpdateIsUpdating,
  runUpdate,
}: LogUserInContentProps) {
  const text = useTranslation().t
  const router = useRouter()

  type UserDataProps = {
    email?: string
    password?: string
  }

  const [
    localUserData,
    setLocalUserData,
    localUserDataErrors,
    isLocalUserDataValid,
  ] = useValidation<UserDataProps>({
    email: {
      initialValue: "",
      validators: [validationRules.required(text("validation:required"))],
    },
    password: {
      initialValue: "",
      validators: [validationRules.required(text("validation:required"))],
    },
  })

  const [hasDataChanged, setHasDataChanged] = useState(false)

  const [showError, setShowError] = useState(false)

  const loginUser = useLogin()

  function handleUpdateLocalUserData(newUserData: UserDataProps) {
    setLocalUserData({ ...localUserData, ...newUserData })
  }

  function handleUserLogin() {
    loginUser.mutate(
      {
        email: localUserData.email,
        password: localUserData.password,
      },
      {
        onSuccess: () => {
          router.push(pageUrls.adm())
        },
        onError: () => {
          handleUpdateRunUpdate(false)
          handleUpdateIsUpdating(false)
          setShowError(true)
        },
      }
    )
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
      handleUserLogin()
      setHasDataChanged(true)
      handleUpdateRunUpdate(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
        bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
        md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("login:getemail")} />
            <CardTextInput
              input={{
                label: text("login:inputemail"),
                onChange: (email) =>
                  handleUpdateLocalUserData({ email: email }),
                type: "email",
                errors: hasDataChanged ? localUserDataErrors.email : [],
              }}
            />
          </Card>
          <Card>
            <CardText label={text("login:getpassword")} />
            <CardTextInput
              input={{
                label: text("login:inputpassword"),
                onChange: (password) =>
                  handleUpdateLocalUserData({ password: password }),
                type: "password",
                errors: hasDataChanged ? localUserDataErrors.password : [],
              }}
            />
          </Card>
          {showError && (
            <Card>
              <CardText label={text("login:problem")} />
            </Card>
          )}
          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                block={{
                  data: {
                    color: "bg-black",
                    text: text("login:confirm"),
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
