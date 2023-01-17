import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { ArrowRight } from "phosphor-react";
import { Card } from "../../../components/Card/Card";
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput";
import { CardText } from "../../../components/Card/CardContentVariants/CardText";
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput";
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector";

const QuickIn = dynamic(() => import("../../../components/QuickIn/QuickIn"), {
  ssr: false,
});

export function WorkspaceSettingsContent() {
  const text = useTranslation().t;

  function handleFinishSignUp() {}

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:pt-[1.5rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("wssettings:wsimage")} />
            <CardImageInput
              imageSelector={
                <ImageSelector onImageChange={(e) => console.log(e)} />
              }
            />
          </Card>

          <Card>
            <CardText label={text("wssettings:wsname")} />
            <CardTextInput
              input={{
                label: text("wssettings:inputwsname"),
                onChange: (e) => console.log(e),
                type: "text",
              }}
            />
          </Card>

          <Card>
            <CardText label={text("wssettings:options")} />
            <CardText
              label={text("wssettings:members")}
              indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
            <CardText
              label={text("wssettings:services")}
              indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
            <CardText
              label={text("wssettings:billing")}
              indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
            <CardText
              label={text("wssettings:advanced")}
              indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
          </Card>

          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  );
}
