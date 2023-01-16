import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Button } from "../../../parts/Button/Button";
import { Card } from "../../../parts/Card/Card";
import { CardImageInput } from "../../../parts/Card/CardContentVariants/CardImageInput";
import { CardText } from "../../../parts/Card/CardContentVariants/CardText";
import { CardTextInput } from "../../../parts/Card/CardContentVariants/CardTextInput";

const QuickIn = dynamic(() => import("../../../parts/QuickIn/QuickIn"), {
  ssr: false,
});

export function WorkspaceSetupContent() {
  const text = useTranslation().t;

  const [finished, setFinished] = useState(false);

  function handleFinishSignUp() {
    setFinished(true);
  }

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:pt-[1.5rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("workspacesetup:firstmessage")} />
          </Card>
          <QuickIn currentUrl={(e) => console.log(e)} />
          <Card>
            <CardText label={text("workspacesetup:secondmessage")} />
          </Card>
          <Card>
            <CardText label={text("workspacesetup:getemail")} />
            <CardTextInput
              input={{
                label: text("workspacesetup:inputemail"),
                onChange: (e) => console.log(e),
                type: "email",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("workspacesetup:getpassword")} />
            <CardTextInput
              input={{
                label: text("workspacesetup:inputpassword"),
                onChange: (e) => console.log(e),
                type: "password",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("workspacesetup:getconfirmation")} />
            <CardTextInput
              input={{
                label: text("workspacesetup:inputconfirmation"),
                onChange: (e) => console.log(e),
                type: "password",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("workspacesetup:uploadimg")} />
            <CardImageInput imageSelector />
          </Card>
          <Button
            color="slate-900"
            onClick={handleFinishSignUp}
            text={text("workspacesetup:confirm")}
          />
          {finished && (
            <Card>
              <CardText label={text("workspacesetup:finished")} />
            </Card>
          )}
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  );
}
