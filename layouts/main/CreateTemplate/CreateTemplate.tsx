import useTranslation from "next-translate/useTranslation"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { IPage } from "types/Page.type"
import { pageUrls } from "utils/pagesUrl"

const Header = dynamic(() =>
  import("components/Header/Header").then((mod) => mod.Header)
)

const CreateTemplateContent = dynamic(() =>
  import("./CreateTemplateContent").then((mod) => mod.CreateTemplateContent)
)
const Tag = dynamic(() => import("components/Tag/Tag").then((mod) => mod.Tag))

type CreateTemplateProps = {
  initialPageData: IPage | undefined
}

type HeaderProps = {
  pageData: IPage
}

const CustomHeader = ({ pageData }: HeaderProps) => {
  const text = useTranslation().t
  const router = useRouter()

  return (
    <Header background_url={pageData.background_url || ""}>
      <Tag
        variant="img-txt"
        text={pageData.title || ""}
        img_url={pageData.avatar_url || ""}
        onClick={() =>
          router.push(pageUrls.pageSettings({ pageSlug: pageData.slug }))
        }
      />
      <Tag variant="txt" text={text("createtemplate:newtemplate")} />
    </Header>
  )
}

export function CreateTemplate({ initialPageData }: CreateTemplateProps) {
  const pageData = initialPageData

  return (
    <div className="bg-slate-100 fixed inset-0">
      <CustomHeader pageData={pageData} />
      <CreateTemplateContent pageData={pageData} />
    </div>
  )
}
