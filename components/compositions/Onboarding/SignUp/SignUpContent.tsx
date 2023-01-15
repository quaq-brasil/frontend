import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { Button } from "../../../parts/Button/Button";
import { Card } from "../../../parts/Card/Card";
import { CardImageInput } from "../../../parts/Card/CardContentVariants/CardImageInput";
import { CardText } from "../../../parts/Card/CardContentVariants/CardText";
import { CardTextInput } from "../../../parts/Card/CardContentVariants/CardTextInput";

const QuickIn = dynamic(() => import("../../../parts/QuickIn/QuickIn"), {
  ssr: false,
});

export function SignUpContent() {
  const text = useTranslation().t;

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:pt-[1.5rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("signup:firstmessage")} />
          </Card>
          <QuickIn currentUrl={(e) => console.log(e)} />
          <Card>
            <CardText label={text("signup:secondmessage")} />
          </Card>
          <Card>
            <CardText label={text("signup:getemail")} />
            <CardTextInput
              input={{
                label: text("signup:inputemail"),
                onChange: (e) => console.log(e),
                type: "email",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("signup:getpassword")} />
            <CardTextInput
              input={{
                label: text("signup:inputpassword"),
                onChange: (e) => console.log(e),
                type: "password",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("signup:getconfirmation")} />
            <CardTextInput
              input={{
                label: text("signup:inputconfirmation"),
                onChange: (e) => console.log(e),
                type: "password",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("signup:uploadimg")} />
            <CardImageInput imageSelector />
          </Card>
          <Button
            color="slate-900"
            onClick={() => {}}
            text={text("signup:confirm")}
          />
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  );
}
