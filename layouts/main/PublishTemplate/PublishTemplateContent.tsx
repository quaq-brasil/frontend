import useTranslation from "next-translate/useTranslation";
import { Check } from "phosphor-react";
import { useState } from "react";
import { Card } from "../../../components/Card/Card";
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput";
import { CardText } from "../../../components/Card/CardContentVariants/CardText";
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput";
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector";

export function PublishTemplateContent() {
  const text = useTranslation().t;

  const [size, serSize] = useState<"small" | "large">("small");

  function handleChangeSize(type: "small" | "large") {
    serSize(type);
  }

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("publish:title")} />
            <CardTextInput
              input={{
                label: text("publish:label"),
                onChange: () => console.log(),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("publish:title2")} />
            <CardTextInput
              input={{
                label: text("publish:label2"),
                onChange: () => console.log(),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("publish:title3")} />
            <CardImageInput
              imageSelector={
                <ImageSelector onImageChange={() => console.log()} />
              }
            />
          </Card>

          <Card>
            <CardText label={text("publish:size")} />
            <CardText
              label={text("publish:small")}
              indicator={{
                icon: Check,
                onClick: () => handleChangeSize("small"),
                isVisible: size == "small" ? false : true,
              }}
            />
            <CardText
              label={text("publish:large")}
              indicator={{
                icon: Check,
                onClick: () => handleChangeSize("large"),
                isVisible: size == "large" ? false : true,
              }}
            />
          </Card>

          <Card>
            <CardText label={text("publish:title4")} />
            <CardTextInput
              input={{
                label: text("publish:label4"),
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
