import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { Button } from "../../../parts/Button/Button";
import { Card } from "../../../parts/Card/Card";

const QuickIn = dynamic(() => import("../../../parts/QuickIn/QuickIn"), {
  ssr: false,
});

export function SignUpContent() {
  const text = useTranslation().t;

  return (
    <div className="w-full h-screen bg-slate-200">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-200 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:py-[50px]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card variant="txt" text={text("signup:firstmessage")} />
          <QuickIn currentUrl={(e) => console.log(e)} />
          <Card variant="txt" text={text("signup:secondmessage")} />
          <Card
            variant="tlt-in"
            title={text("signup:getemail")}
            input={{
              label: text("signup:inputemail"),
              onChange: (e) => console.log(e),
              onClick: () => console.log(),
            }}
          />
          <Card
            variant="tlt-in"
            title={text("signup:getpassword")}
            input={{
              label: text("signup:inputpassword"),
              onChange: (e) => console.log(e),
              onClick: () => console.log(),
            }}
          />
          <Card
            variant="tlt-in"
            title={text("signup:getconfirmation")}
            input={{
              label: text("signup:inputconfirmation"),
              onChange: (e) => console.log(e),
              onClick: () => console.log(),
            }}
          />
          <Card
            variant="tlt-img"
            imageSelector
            title={text("signup:uploadimg")}
          />
          <Card
            variant="tlt-img"
            imageSelector
            title={text("signup:uploadimg")}
          />
          <Card
            variant="tlt-img"
            imageSelector
            title={text("signup:uploadimg")}
          />
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
