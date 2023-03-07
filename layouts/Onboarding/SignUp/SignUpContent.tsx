import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { Check } from "phosphor-react"
import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"
import { IUpdateUser } from "../../../types/User.type"
import { pageUrls } from "../../../utils/pagesUrl"

type SignUpContentProps = {
  handleUpdateUserData: (data: IUpdateUser) => void
  handleUpdateIsUpdating: (stat: boolean) => void
  handleUpdateRunUpdate: (stat: boolean) => void
  isUpdating: boolean
  runUpdate: boolean
  userData: IUpdateUser | undefined
}

export function SignUpContent({
  handleUpdateIsUpdating,
  handleUpdateRunUpdate,
  handleUpdateUserData,
  isUpdating,
  runUpdate,
  userData,
}: SignUpContentProps) {
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

  const [temporaryData, setTemporaryData] = useState<TemporaryDataProps>()

  function handleUpdateTemporaryData(newData: TemporaryDataProps) {
    setTemporaryData((state) => {
      return {
        ...state,
        ...newData,
      } as TemporaryDataProps
    })
  }

  type FormDataProps = {
    name?: {
      valid?: boolean
    }
    picture?: {
      valid?: boolean
    }
    email?: {
      valid?: boolean
    }
    password?: {
      valid?: boolean
    }
    accept?: {
      valid?: boolean
    }
  }

  const [formData, setFormData] = useState<FormDataProps>({
    name: {
      valid: false,
    },
    picture: {
      valid: false,
    },
    email: {
      valid: false,
    },
    password: {
      valid: false,
    },
    accept: {
      valid: false,
    },
  })

  function handleUpdateFormData(newData: FormDataProps) {
    setFormData((state) => {
      return {
        ...state,
        ...newData,
      } as FormDataProps
    })
  }

  useEffect(() => {
    if (
      formData.accept.valid &&
      formData.email.valid &&
      formData.name.valid &&
      formData.password.valid &&
      formData.picture.valid
    ) {
      handleUpdateIsUpdating(true)
      handleUpdateUserData({
        avatar_url: temporaryData.picture,
        email: temporaryData.email,
        name: temporaryData.name,
        password: temporaryData.password,
      })
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
            <CardText label={text("signup:intro")} />
          </Card>
          <Card>
            <CardText label={text("signup:name")} />
            <CardTextInput
              input={{
                onChange: (name) => {
                  handleUpdateTemporaryData({ name: name })
                  if (name && name.length > 1) {
                    handleUpdateFormData({ name: { valid: true } })
                  } else {
                    handleUpdateFormData({ name: { valid: false } })
                  }
                },
                label: text("signup:namelabel"),
                type: "name",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("signup:picture")} />
            <div className="w-full flex flex-row justify-between items-center bg-slate-50 my-2 py-3 px-3 lg:px-[1.125rem]">
              <ImageSelector
                onImageChange={(image) => {
                  handleUpdateTemporaryData({ picture: image })
                  if (image) {
                    handleUpdateFormData({ picture: { valid: true } })
                  } else {
                    handleUpdateFormData({ picture: { valid: false } })
                  }
                }}
              />
            </div>
          </Card>
          <Card>
            <CardText label={text("signup:email")} />
            <CardTextInput
              input={{
                onChange: (email) => {
                  handleUpdateTemporaryData({ email: email })
                  if (email && email.length > 4) {
                    handleUpdateFormData({ email: { valid: true } })
                  } else {
                    handleUpdateFormData({ email: { valid: false } })
                  }
                },
                type: "email",
                label: text("signup:emaillabel"),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("signup:password")} />
            <CardTextInput
              input={{
                onChange: (password) => {
                  handleUpdateTemporaryData({ password: password })
                  if (
                    password &&
                    password.length > 8 &&
                    password === temporaryData.passwordConfirmation
                  ) {
                    handleUpdateFormData({ password: { valid: true } })
                  } else {
                    handleUpdateFormData({ password: { valid: false } })
                  }
                },
                type: "password",
                label: text("signup:passwordlabel"),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("signup:confirmation")} />
            <CardTextInput
              input={{
                onChange: (confirmation) => {
                  handleUpdateTemporaryData({
                    passwordConfirmation: confirmation,
                  })
                  if (
                    confirmation &&
                    confirmation.length > 8 &&
                    confirmation === temporaryData.password
                  ) {
                    handleUpdateFormData({ password: { valid: true } })
                  } else {
                    handleUpdateFormData({ password: { valid: false } })
                  }
                },
                type: "password",
                label: text("signup:confirmationlabel"),
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
                isVisible: !temporaryData?.accept,
              }}
              onClick={() => {
                handleUpdateTemporaryData({ accept: true })
                handleUpdateFormData({ accept: { valid: true } })
              }}
            />
            <CardLine />
            <CardText
              label={text("signup:decline")}
              indicator={{
                icon: Check,
                isVisible: temporaryData?.accept,
              }}
              onClick={() => {
                handleUpdateTemporaryData({ accept: false })
                handleUpdateFormData({ accept: { valid: false } })
              }}
            />
            <CardLine />
          </Card>
          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <button
                className="flex justify-between items-center font-semibold
            p-[0.75rem] md:p-[1rem] lg:p-[1.5rem] min-w-[100%]
            rounded-[20px] lg:rounded-[30px] bg-black text-white"
                type="submit"
                onClick={() => handleUpdateRunUpdate(true)}
              >
                <p className="lg:text-[1.1rem] text-center w-full">
                  {text("signup:confirm")}
                </p>
              </button>
            </div>
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
