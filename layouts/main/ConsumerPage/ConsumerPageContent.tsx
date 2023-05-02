import { Card } from "components/Card/Card"
import { SimpleShortcut } from "components/Shortcut/SimpleShortcut"
import { ShortcutGrid } from "components/ShortcutGrid/ShortcutGrid"
import { useTerms } from "contexts/useTerms"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { IPage } from "types/Page.type"
import { ITemplate } from "types/Template.type"
import { pageUrls } from "utils/pagesUrl"

type ConsumerPageContentProps = {
  templatesData: ITemplate[] | undefined
  pageData: IPage | undefined
}

export function ConsumerPageContent({
  templatesData,
  pageData,
}: ConsumerPageContentProps) {
  const text = useTranslation().t
  const { isCookiesAccepted } = useTerms()
  const router = useRouter()

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2 bg-slate-100
      lg:rounded-none lg:top-[156px]"
      >
        {!isCookiesAccepted && (
          <div className="lg:px-5 lg:mt-2 lg:mb-0 mb-2">
            <Card>
              <p className="w-full text-left lg:text-[1.1rem] px-5 py-2">
                {text("consumerpage:firstaccess")}
                <span
                  className="lg:text-[1.1rem] text-blue-500 cursor-pointer"
                  onClick={() => router.push(pageUrls.terms())}
                >
                  {text("consumerpage:learnmore")}
                </span>
              </p>
            </Card>
          </div>
        )}
        <ShortcutGrid>
          {templatesData.map((template, index) => {
            return (
              <SimpleShortcut
                key={index}
                id={template.id || ""}
                img_url={template.shortcut_image || ""}
                index={index || 0}
                size={template.shortcut_size || "small"}
                title={template.title}
                templateData={template}
                pageData={pageData}
              />
            )
          })}
        </ShortcutGrid>
        <span className="w-full h-[4rem]"></span>
      </div>
    </div>
  )
}
