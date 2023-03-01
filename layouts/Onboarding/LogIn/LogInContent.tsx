import useTranslation from "next-translate/useTranslation"
import dynamic from "next/dynamic"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { IUserLogin } from "../../../types/User.type"

const QuickIn = dynamic(() => import("../../../components/QuickIn/QuickIn"), {
  ssr: false,
})

type LoginContentProps = {
  isUpdating: boolean
  handleUpdateUserData: (data: IUserLogin) => void
  handleUpdateRunUpdate: (stat: boolean) => void
}

export function LoginContent({
  handleUpdateRunUpdate,
  handleUpdateUserData,
  isUpdating,
}: LoginContentProps) {
  const text = useTranslation().t

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
                onChange: (email) => handleUpdateUserData({ email: email }),
                type: "email",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("login:getpassword")} />
            <CardTextInput
              input={{
                label: text("login:inputpassword"),
                validate: false,
                onChange: (password) =>
                  handleUpdateUserData({ password: password }),
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
