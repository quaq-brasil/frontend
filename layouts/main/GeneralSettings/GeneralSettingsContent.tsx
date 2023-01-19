import useTranslation from "next-translate/useTranslation";
import { ArrowRight } from "phosphor-react";
import { Card } from "../../../components/Card/Card";
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput";
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine";
import { CardText } from "../../../components/Card/CardContentVariants/CardText";
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput";
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector";

export function GeneralSettingsContent() {
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
            <CardText label={text("generalsettings:title")} />
            <CardTextInput
              input={{
                label: text("generalsettings:titlelabel"),
                onChange: () => console.log(),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("generalsettings:description")} />
            <CardTextInput
              input={{
                label: text("generalsettings:descriptionlabel"),
                onChange: () => console.log(),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("generalsettings:link")} />
            <CardTextInput
              input={{
                label: text("generalsettings:linklabel"),
                onChange: () => console.log(),
              }}
            />
            <CardText
              label={text("generalsettings:sharelink")}
              indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
          </Card>
          <Card>
            <CardText label={text("generalsettings:profile")} />
            <CardImageInput
              imageSelector={
                <ImageSelector onImageChange={() => console.log()} />
              }
            />
          </Card>
          <Card>
            <CardText label={text("generalsettings:cover")} />
            <CardImageInput
              imageSelector={
                <ImageSelector onImageChange={() => console.log()} />
              }
            />
          </Card>
          <Card>
            <CardText label={text("generalsettings:options")} />
            <CardText
              label={text("generalsettings:delete")}
              indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
            <CardLine />
            <CardText
              label={text("generalsettings:terms")}
              indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
            <CardLine />
            <CardText
              label={text("generalsettings:trackers")}
              indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
            <CardLine />
          </Card>
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  );
}
