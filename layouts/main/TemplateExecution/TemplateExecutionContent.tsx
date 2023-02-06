import useTranslation from "next-translate/useTranslation"
import { BlockReader } from "../../../components/BlockReader/BlockReader"
import { Card } from "../../../components/Card/Card"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { getTemplateByUrlAndPageUrlProps } from "../../../types/Template.type"

type TemplateExecutionContentProps = {
  initialData: getTemplateByUrlAndPageUrlProps | undefined
}

export function TemplateExecutionContent({
  initialData,
}: TemplateExecutionContentProps) {
  const text = useTranslation().t

  const blocks: any = initialData?.publication?.blocks || {}

  console.log(initialData)

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center mb-2">
          <Card>
            <CardText label={text("terms:title")} />
            <CardText label={text("terms:terms")} />
          </Card>
        </div>

        {blocks ? (
          <div className="flex flex-col gap-2 mb-2 md:gap-4 md:mb-4">
            {Object.keys(blocks).map((key) => {
              return (
                <BlockReader key={blocks[key].id || key} block={blocks[key]} />
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
  )
}
