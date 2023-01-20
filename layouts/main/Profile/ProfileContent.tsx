import useTranslation from "next-translate/useTranslation";
import { ArrowRight } from "phosphor-react";
import { Card } from "../../../components/Card/Card";
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput";
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine";
import { CardText } from "../../../components/Card/CardContentVariants/CardText";
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput";
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector";

export function ProfileContent() {
  const text = useTranslation().t;

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("profile:photo")} />
            <CardImageInput
              imageSelector={
                <ImageSelector onImageChange={(e) => console.log(e)} />
              }
            />
          </Card>
          <Card>
            <CardText label={text("profile:name")} />
            <CardTextInput
              input={{
                label: text("profile:inputname"),
                onChange: (e) => console.log(e),
                type: "text",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("profile:options")} />
            <CardText
              label={text("profile:logout")}
              indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
            <CardLine />
            <CardText
              label={text("profile:email")}
              indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
            <CardLine />
            <CardText
              label={text("profile:password")}
              indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
            <CardLine />
            <CardText
              label={text("profile:terms")}
              indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
            <CardLine />
            <CardText
              label={text("profile:more")}
              indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
          </Card>
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  );
}