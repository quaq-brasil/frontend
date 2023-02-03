import useTranslation from "next-translate/useTranslation"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"

export function PasswordRecoveryContent() {
  const text = useTranslation().t

  function handleFinishSignUp() {}

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:pt-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("pwrecovery:getpassword")} />
            <CardTextInput
              input={{
                label: text("pwrecovery:inputpassword"),
                onChange: (e) => console.log(e),
                type: "password",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("pwrecovery:getconfirmation")} />
            <CardTextInput
              input={{
                label: text("pwrecovery:inputconfirmation"),
                onChange: (e) => console.log(e),
                type: "password",
              }}
            />
          </Card>
          <Button
            block={{
              data: {
                color: "bg-black",
                text: text("pwrecovery:confirm"),
                onClick: () => handleFinishSignUp(),
              },
            }}
            isEditable={false}
          />
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
