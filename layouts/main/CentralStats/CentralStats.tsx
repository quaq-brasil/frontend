import { Header } from "components/Header/Header"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IUpdatePage } from "types/Page.type"
import { IUpdateTemplate } from "types/Template.type"
import { pageUrls } from "utils/pagesUrl"
import { CentralStatsContent } from "./CentralStatsContent"

type CentralStatsProps = {
  initialPageData: IUpdatePage | undefined
  initialTemplateData: IUpdateTemplate | undefined
}

export function CentralStats({
  initialPageData,
  initialTemplateData,
}: CentralStatsProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [pageData, setPageData] = useState<IUpdatePage>(initialPageData)
  const [templateData, setTemplateData] =
    useState<IUpdateTemplate>(initialTemplateData)

  useEffect(() => {
    setPageData(initialPageData)
  }, [initialPageData])

  useEffect(() => {
    setTemplateData(initialTemplateData)
  }, [initialTemplateData])

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("centralstats:back")}
        onClick={() => {
          router.push(
            pageUrls.pageSettings({
              pageSlug: pageData?.slug || pageUrls.home(),
            })
          )
        }}
      />,
      <Tag
        key={2}
        variant="txt"
        text={text("centralstats:options")}
        onClick={() =>
          router.push(
            pageUrls.templateCentral({
              pageSlug: pageData?.slug,
              settings: "central",
              templateSlug:
                templateData?.slug != initialTemplateData.slug
                  ? initialTemplateData.slug
                  : templateData?.slug,
            })
          )
        }
        isSeparated
      />,
      <Tag
        key={3}
        variant="txt"
        text={text("centralstats:logs")}
        onClick={() =>
          router.push(
            pageUrls.templateCentral({
              pageSlug: pageData?.slug,
              settings: "logs",
              templateSlug:
                templateData?.slug != initialTemplateData.slug
                  ? initialTemplateData.slug
                  : templateData?.slug,
            })
          )
        }
      />,
      <Tag
        key={4}
        variant="txt"
        text={text("centralstats:stats")}
        onClick={() =>
          router.push(
            pageUrls.templateCentral({
              pageSlug: pageData?.slug,
              settings: "stats",
              templateSlug:
                templateData?.slug != initialTemplateData.slug
                  ? initialTemplateData.slug
                  : templateData?.slug,
            })
          )
        }
        isSelected
      />,
    ]
  }

  function loadHeader() {
    return (
      <Header background_url={pageData?.background_url || ""}>
        <Tag
          variant="img-txt"
          text={pageData?.title || ""}
          img_url={pageData?.avatar_url || ""}
          onClick={() =>
            router.push(
              pageUrls.pageSettings({
                pageSlug: pageData?.slug || pageUrls.home(),
              })
            )
          }
        />
        <Tag
          variant="img-txt"
          text={templateData?.title || ""}
          img_url={templateData?.shortcut_image || ""}
        />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <CentralStatsContent templateData={templateData} />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
