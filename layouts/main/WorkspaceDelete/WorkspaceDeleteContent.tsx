import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { Card } from "../../../components/Card/Card";
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine";
import { CardText } from "../../../components/Card/CardContentVariants/CardText";
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput";

const QuickIn = dynamic(() => import("../../../components/QuickIn/QuickIn"), {
  ssr: false,
});

export function WorkspaceDeleteContent() {
  const text = useTranslation().t;

  function handleFinishSignUp() {}

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("wsdelete:title")} />
            <CardLine />
            <CardText label={text("wsdelete:largetext")} />
            <CardLine />
          </Card>
          <Card>
            <CardText label={text("wsdelete:title2")} />
            <CardTextInput
              input={{
                label: text("wsdelete:input"),
                onChange: () => console.log(),
              }}
            />
          </Card>
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  );
}
