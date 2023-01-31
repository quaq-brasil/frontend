import useTranslation from "next-translate/useTranslation"
import { Check } from "phosphor-react"
import { useState } from "react"
import { Card } from "../../../components/Card/Card"
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"

export function CentralOptionsContent() {
  const text = useTranslation().t

  const [size, serSize] = useState<"small" | "large">("small")

  function handleChangeSize(type: "small" | "large") {
    serSize(type)
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
            <CardText label={text("centraloptions:moreoptions")} />
            <CardLine />
            <CardText
              label={text("centraloptions:access")}
              // indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
            <CardLine />
            <CardText
              label={text("centraloptions:edit")}
              // indicator={{ icon: ArrowRight, onClick: () => console.log() }}
            />
            <CardLine />
          </Card>

          <Card>
            <CardText label={text("centraloptions:title")} />
            <CardTextInput
              input={{ label: "", onChange: () => console.log() }}
            />
          </Card>

          <Card>
            <CardText label={text("centraloptions:link")} />
            <CardTextInput
              input={{ label: "", onChange: () => console.log() }}
            />
          </Card>

          <Card>
            <CardText label={text("centraloptions:image")} />
            <CardImageInput
              imageSelector={
                <ImageSelector onImageChange={() => console.log()} />
              }
            />
          </Card>

          <Card>
            <CardText label={text("centraloptions:size")} />
            <CardText
              label={text("centraloptions:small")}
              indicator={{
                icon: Check,
                // onClick: () => handleChangeSize("small"),
                isVisible: size == "small" ? false : true,
              }}
            />
            <CardLine />
            <CardText
              label={text("centraloptions:large")}
              indicator={{
                icon: Check,
                // onClick: () => handleChangeSize("large"),
                isVisible: size == "large" ? false : true,
              }}
            />
            <CardLine />
          </Card>

          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
