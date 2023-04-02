import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardImageInput } from "components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "components/ImageSelector/ImageSelector"
import { useValidation, validationRules } from "hooks/useValidation"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { Check } from "phosphor-react"
import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { IUpdateUser } from "types/User.type"
import { pageUrls } from "utils/pagesUrl"

type SignUserUpContentProps = {
  handleUpdateIsUpdating: (stat: boolean) => void
  handleUpdateRunUpdate: (stat: boolean) => void
  isUpdating: boolean
  runUpdate: boolean
  handleCreateUser: (data: IUpdateUser) => void
}

export function SignUserUpContent({
  handleUpdateIsUpdating,
  handleUpdateRunUpdate,
  isUpdating,
  runUpdate,
  handleCreateUser,
}: SignUserUpContentProps) {
  const text = useTranslation().t
  const router = useRouter()

  type TemporaryDataProps = {
    name?: string
    picture?: string
    email?: string
    password?: string
    passwordConfirmation?: string
    accept?: boolean
  }

  const [
    localUserData,
    setLocalUserData,
    localUserDataErrors,
    isLocalUserDataValid,
  ] = useValidation<TemporaryDataProps>({
    name: {
      initialValue: "",
      validators: [validationRules.required(text("validation:required"))],
    },
    picture: {
      initialValue: "",
      validators: [validationRules.required(text("validation:required"))],
    },
    email: {
      initialValue: "",
      validators: [
        validationRules.required(text("validation:required")),
        validationRules.email(text("validation:email")),
      ],
    },
    password: {
      initialValue: "",
      validators: [
        validationRules.required(text("validation:required")),
        validationRules.strongPassword(text("validation:validpassword")),
      ],
    },
    passwordConfirmation: {
      initialValue: "",
      validators: [
        validationRules.required(text("validation:required")),
        validationRules.passwordConfirmation(
          text("validation:passwordmatch"),
          () => password
        ),
      ],
    },
    accept: {
      initialValue: false,
      validators: [validationRules.required(text("validation:required"))],
    },
  })

  const [password, setPassword] = useState("")

  const [hasDataChanged, setHasDataChanged] = useState(false)

  function handleUpdateLocalUserData(newUserData: TemporaryDataProps) {
    setLocalUserData({ ...localUserData, ...newUserData })
  }

  useEffect(() => {
    setPassword(localUserData.password)
  }, [localUserData.password])

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
      handleCreateUser({
        avatar_url: localUserData.picture,
        email: localUserData.email,
        name: localUserData.name,
        password: localUserData.password,
      })
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
            <CardText label={text("signup:intro")} />
          </Card>
          <Card>
            <CardText label={text("signup:name")} />
            <CardTextInput
              input={{
                onChange: (name) => {
                  handleUpdateLocalUserData({ name: name })
                },
                label: text("signup:namelabel"),
                errors: hasDataChanged ? localUserDataErrors.name : [],
              }}
            />
          </Card>
          <Card>
            <CardText label={text("signup:picture")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(image) => {
                    handleUpdateLocalUserData({ picture: image })
                  }}
                  url={localUserData.picture}
                />
              }
              errors={hasDataChanged ? localUserDataErrors.picture : []}
            />
          </Card>
          <Card>
            <CardText label={text("signup:email")} />
            <CardTextInput
              input={{
                onChange: (email) => {
                  handleUpdateLocalUserData({ email: email })
                },
                type: "email",
                label: text("signup:emaillabel"),
                errors: hasDataChanged ? localUserDataErrors.email : [],
              }}
            />
          </Card>
          <Card>
            <CardText label={text("signup:password")} />
            <CardTextInput
              input={{
                onChange: (password) => {
                  handleUpdateLocalUserData({ password: password })
                },
                type: "password",
                label: text("signup:passwordlabel"),
                errors: localUserData.password
                  ? localUserDataErrors.password
                  : [],
              }}
            />
          </Card>
          <Card>
            <CardText label={text("signup:confirmation")} />
            <CardTextInput
              input={{
                onChange: (confirmation) => {
                  handleUpdateLocalUserData({
                    passwordConfirmation: confirmation,
                  })
                },
                type: "password",
                label: text("signup:confirmationlabel"),
                errors: localUserData.passwordConfirmation
                  ? localUserDataErrors.passwordConfirmation
                  : [],
              }}
            />
          </Card>
          <Card>
            <p className="w-full text-left lg:text-[1.1rem] px-3 lg:px-[1.125rem]">
              {text("signup:acceptterms1")}
              <button
                type="button"
                className="text-blue-500"
                onClick={() => router.push(pageUrls.terms())}
              >
                {text("signup:acceptterms2")}
              </button>
              ?
            </p>
            <CardText
              label={text("signup:accept")}
              indicator={{
                icon: Check,
                isVisible: !localUserData?.accept,
              }}
              onClick={() => {
                handleUpdateLocalUserData({ accept: true })
              }}
            />
            <CardLine />
            <CardText
              label={text("signup:decline")}
              indicator={{
                icon: Check,
                isVisible: localUserData?.accept,
              }}
              onClick={() => {
                handleUpdateLocalUserData({ accept: false })
              }}
            />
            <CardLine />
          </Card>
          {isUpdating && (
            <Button
              block={{
                data: {
                  color: "bg-black",
                  text: text("signup:confirm"),
                  onClick: () => handleUpdateRunUpdate(true),
                },
              }}
              isEditable={false}
            />
          )}
          <span className="w-full h-[4rem]"></span>
          <div className="absolute z-30">
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  )
}
