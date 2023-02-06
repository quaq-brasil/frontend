import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Card } from "../../../components/Card/Card"
import { Shortcut } from "../../../components/Shortcut/Shortcut"
import { ShortcutGrid } from "../../../components/ShortcutGrid/ShortcutGrid"
import { useTerms } from "../../../contexts/useTerms"
import { IPage } from "../../../types/Page.type"
import { ITemplate } from "../../../types/Template.type"
import { pageUrls } from "../../../utils/pagesUrl"

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

  const [shortcuts, setShortcuts] = useState<JSX.Element[]>([])

  function loadShortcuts() {
    if (templatesData) {
      const data = templatesData.map((template, index) => {
        return (
          <Shortcut
            key={index}
            id={template.id || ""}
            img_url={template.shortcut_image || ""}
            index={index || 0}
            size={template.shortcut_size || "small"}
            title={template.name}
            isCreator={false}
            templateData={template}
            pageData={pageData}
          />
        )
      })
      setShortcuts(data)
    }
  }

  useEffect(() => {
    loadShortcuts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templatesData])

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
        <ShortcutGrid onDrag={(e) => console.log(e)}>{shortcuts}</ShortcutGrid>
      </div>
    </div>
  )
}
