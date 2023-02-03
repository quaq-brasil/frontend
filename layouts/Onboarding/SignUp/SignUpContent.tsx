import useTranslation from "next-translate/useTranslation"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Card } from "../../../components/Card/Card"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"
import { IUpdateUser } from "../../../types/User.type"

type SignupContentProps = {
  handleUpdateUserData: (data: IUpdateUser) => void
  handleUpdateIsUpdating: (stat: boolean) => void
  handleUpdateRunUpdate: (stat: boolean) => void
  isUpdating: boolean
  runUpdate: boolean
}

export function SignupContent({
  handleUpdateIsUpdating,
  handleUpdateRunUpdate,
  handleUpdateUserData,
  isUpdating,
  runUpdate,
}: SignupContentProps) {
  const text = useTranslation().t

  const notify = () => toast("test")

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
            <div className="w-full flex flex-row justify-between items-center bg-slate-50 my-2">
              <input
                className="bg-slate-50 border-0 w-full h-12 lg:h-[3.375rem] placeholder:text-slate-300
                   lg:text-[1.1rem] hover:outline-none focus:outline-none px-3 lg:px-[1.125rem]"
                type="text"
                placeholder={text("signup:namelabel")}
                maxLength={12}
                minLength={2}
                onChange={(name) =>
                  handleUpdateUserData({ name: name.target.value })
                }
              />
            </div>
          </Card>
          <Card>
            <CardText label={text("signup:picture")} />
            <div className="w-full flex flex-row justify-between items-center bg-slate-50 my-2 py-3 px-3 lg:px-[1.125rem]">
              <ImageSelector
                onImageChange={(image) => {
                  {
                    handleUpdateUserData({ avatar_url: image })
                  }
                }}
              />
            </div>
          </Card>
          <Card>
            <CardText label={text("signup:email")} />
            <div className="w-full flex flex-row justify-between items-center bg-slate-50 my-2">
              <input
                className="bg-slate-50 border-0 w-full h-12 lg:h-[3.375rem] placeholder:text-slate-300
                   lg:text-[1.1rem] hover:outline-none focus:outline-none px-3 lg:px-[1.125rem]"
                type="email"
                placeholder={text("signup:emaillabel")}
                minLength={5}
                onChange={(email) =>
                  handleUpdateUserData({ email: email.target.value })
                }
              />
            </div>
          </Card>
          <Card>
            <CardText label={text("signup:password")} />
            <div className="w-full flex flex-row justify-between items-center bg-slate-50 my-2">
              <input
                className="bg-slate-50 border-0 w-full h-12 lg:h-[3.375rem] placeholder:text-slate-300
                   lg:text-[1.1rem] hover:outline-none focus:outline-none px-3 lg:px-[1.125rem]"
                type="password"
                placeholder={text("signup:passwordlabel")}
                maxLength={32}
                minLength={8}
                onChange={(password) =>
                  handleUpdateUserData({ password: password.target.value })
                }
              />
            </div>
          </Card>
          <Card>
            <CardText label={text("signup:confirmation")} />
            <div className="w-full flex flex-row justify-between items-center bg-slate-50 my-2">
              <input
                className="bg-slate-50 border-0 w-full h-12 lg:h-[3.375rem] placeholder:text-slate-300
                   lg:text-[1.1rem] hover:outline-none focus:outline-none px-3 lg:px-[1.125rem]"
                type="password"
                placeholder={text("signup:confirmationlabel")}
                maxLength={32}
                minLength={8}
              />
            </div>
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
