import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { Check } from "phosphor-react"
import { useState } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"
import { IUpdateUser } from "../../../types/User.type"
import { pageUrls } from "../../../utils/pagesUrl"

type SignupContentProps = {
  handleUpdateUserData: (data: IUpdateUser) => void
  handleUpdateIsUpdating: (stat: boolean) => void
  handleUpdateRunUpdate: (stat: boolean) => void
  isUpdating: boolean
  runUpdate: boolean
  userData: IUpdateUser | undefined
}

export function SignupContent({
  handleUpdateIsUpdating,
  handleUpdateRunUpdate,
  handleUpdateUserData,
  isUpdating,
  runUpdate,
  userData,
}: SignupContentProps) {
  const text = useTranslation().t
  const router = useRouter()

  type FormDataProps = {
    name?: {
      valid?: boolean
    }
    profilePicture?: {
      valid?: boolean
    }
    email?: {
      valid?: boolean
    }
    password?: {
      value?: string
      valid?: boolean
    }
    passwordConfirm?: {
      value?: string
      valid?: boolean
    }
    acceptTermsAndConditions?: {
      valid?: boolean
    }
  }

  const [formData, setFormData] = useState<FormDataProps>({
    name: {
      valid: false,
    },
    profilePicture: {
      valid: false,
    },
    email: {
      valid: false,
    },
    password: {
      value: "",
      valid: false,
    },
    passwordConfirm: {
      value: "",
      valid: false,
    },
    acceptTermsAndConditions: {
      valid: true,
    },
  })

  function handleUpdateFormData(newData: FormDataProps) {
    setFormData((state) => {
      return {
        ...state,
        ...newData,
      } as FormDataProps
    })
    if (
      formData.email?.valid &&
      formData.name?.valid &&
      formData.password?.valid &&
      formData.passwordConfirm?.valid &&
      formData.profilePicture?.valid
    ) {
      handleUpdateIsUpdating(true)
    }
  }

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
      >
        <form className="flex flex-col gap-2 md:gap-4 items-center" action="">
          <Card>
            <CardText label={text("signup:intro")} />
          </Card>
          <Card>
            <CardText label={text("signup:name")} />
            <CardTextInput
              input={{
                onChange: (name) => {
                  handleUpdateUserData({ name: name })
                },
                label: text("signup:namelabel"),
                type: "name",
                setValid: () => handleUpdateFormData({ name: { valid: true } }),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("signup:picture")} />
            <div className="w-full flex flex-row justify-between items-center bg-slate-50 my-2 py-3 px-3 lg:px-[1.125rem]">
              <ImageSelector
                onImageChange={(image) => {
                  {
                    handleUpdateUserData({ avatar_url: image })
                    handleUpdateFormData({ profilePicture: { valid: true } })
                  }
                }}
              />
            </div>
          </Card>
          <Card>
            <CardText label={text("signup:email")} />
            <CardTextInput
              input={{
                onChange: (email) => handleUpdateUserData({ email: email }),
                type: "email",
                label: text("signup:emaillabel"),
                setValid: () =>
                  handleUpdateFormData({ email: { valid: true } }),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("signup:password")} />
            <CardTextInput
              input={{
                onChange: (password) => {
                  handleUpdateUserData({ password: password })
                  handleUpdateFormData({ password: { value: password } })
                },
                type: "password",
                label: text("signup:passwordlabel"),
                setValid: () => {
                  if (
                    formData.password?.value === formData.passwordConfirm?.value
                  ) {
                    handleUpdateFormData({
                      password: { valid: true },
                      passwordConfirm: { valid: true },
                    })
                  }
                },
              }}
            />
          </Card>
          <Card>
            <CardText label={text("signup:confirmation")} />
            <CardTextInput
              input={{
                onChange: (confirmation) => {
                  handleUpdateFormData({
                    passwordConfirm: { value: confirmation },
                  })
                },
                type: "password",
                label: text("signup:confirmationlabel"),
                setValid: () => {
                  if (
                    formData.password?.value === formData.passwordConfirm?.value
                  ) {
                    handleUpdateFormData({
                      password: { valid: true },
                      passwordConfirm: { valid: true },
                    })
                  }
                },
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
                isVisible: formData.acceptTermsAndConditions.valid,
                onClick: () =>
                  handleUpdateFormData({
                    acceptTermsAndConditions: { valid: true },
                  }),
              }}
            />
            <CardLine />
            <CardText
              label={text("signup:decline")}
              indicator={{
                icon: Check,
                isVisible: formData.acceptTermsAndConditions.valid,
                onClick: () =>
                  handleUpdateFormData({
                    acceptTermsAndConditions: { valid: false },
                  }),
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
        </form>
      </div>
    </div>
  )
}
