import { Header } from "components/Header/Header"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import Script from "next/script"
import { useEffect, useState } from "react"
import { getTemplateBySlugAndPageSlugProps } from "types/Template.type"

import { pageUrls } from "utils/pagesUrl"
import { TemplateExecutionContent } from "./TemplateExecutionContent"

type TemplateExecutionContent = {
  initialData: getTemplateBySlugAndPageSlugProps | undefined
  isLoggedIn: boolean
}

export function TemplateExecution({
  initialData,
  isLoggedIn,
}: TemplateExecutionContent) {
  const text = useTranslation().t

  const [pageAndTemplateData, setPageAndTemplateData] =
    useState<getTemplateBySlugAndPageSlugProps>(initialData)

  useEffect(() => {
    setPageAndTemplateData(initialData)
  }, [initialData])

  const router = useRouter()

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("profile:back")}
        onClick={() => router.back()}
      />,
      <Tag
        key={2}
        variant="txt"
        text={pageAndTemplateData?.Page.title}
        onClick={() =>
          router.push(pageUrls.page(pageAndTemplateData?.Page.slug || ""))
        }
      />,
    ]
  }

  function loadHeader() {
    return (
      <Header background_url={pageAndTemplateData?.Page.background_url || ""}>
        <Tag
          variant="img-txt"
          text={pageAndTemplateData?.Page.title || ""}
          img_url={pageAndTemplateData?.Page.avatar_url || ""}
          onClick={() =>
            router.push(pageUrls.page(pageAndTemplateData?.Page.slug || ""))
          }
        />
        <Tag
          variant="img-txt"
          text={pageAndTemplateData?.title || ""}
          img_url={pageAndTemplateData?.shortcut_image || ""}
        />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {pageAndTemplateData?.trackers?.google && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${pageAndTemplateData?.trackers?.google}`}
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${pageAndTemplateData?.trackers?.google}');
        `}
          </Script>
        </>
      )}

      {loadHeader()}
      <TemplateExecutionContent
        setTemplateData={setPageAndTemplateData}
        pageAndTemplateData={pageAndTemplateData}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
