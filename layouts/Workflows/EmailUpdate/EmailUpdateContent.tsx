import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"

type EmailUpdateContentProps = {
  handleChangeEmail: (email: string) => void
}

export function EmailUpdateContent({
  handleChangeEmail,
}: EmailUpdateContentProps) {
  const text = useTranslation().t

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleUpdate() {
    handleChangeEmail(email)
  }

  const onChangeEmail = (value: string) => {
    setEmail(value)
  }

  const onChangePassword = (value: string) => {
    setPassword(value)
  }

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
                onChange: (value) => onChangeEmail(value),
                type: "email",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("emailupdate:password")} />
            <CardTextInput
              input={{
                label: text("emailupdate:inputpassword"),
                onChange: (value) => onChangePassword(value),
                type: "password",
              }}
            />
          </Card>
          <Button
            color="slate-900"
            onClick={handleUpdate}
            text={text("emailupdate:confirm")}
          />

          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
