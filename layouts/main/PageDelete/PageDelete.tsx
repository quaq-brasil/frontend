import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IUserPayload } from "../../../types/Auth.types"
import { IPage } from "../../../types/Page.type"
import { pageUrls } from "../../../utils/pagesUrl"
import { PageDeleteContent } from "./PageDeleteContent"

type PageDeleteProps = {
  initialPageData: IPage | undefined
  initialUserData: IUserPayload | undefined
  handleDeletePage: () => void
}

export default function PageDelete({
  handleDeletePage,
  initialPageData,
  initialUserData,
}: PageDeleteProps) {
  const text = useTranslation().t

  const [userData, setUserData] = useState<IUserPayload>(initialUserData)
  const [pageData, setPageData] = useState<IPage>(initialPageData)
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  useEffect(() => {
    setUserData(initialUserData)
  }, [initialUserData])

  useEffect(() => {
    setPageData(initialPageData)
  }, [initialPageData])

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  const router = useRouter()

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("pagedelete:back")}
          onClick={() =>
            router.push(
              pageUrls.pageSettings({
                pageSlug: pageData?.title || "",
                pageSettings: "general",
              })
            )
          }
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("pagedelete:delete")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("pagedelete:back")}
          onClick={() =>
            router.push(
              pageUrls.pageSettings({
                pageSlug: pageData?.title || "",
                pageSettings: "general",
              })
            )
          }
        />,
      ]
    }
  }

  function handleHeader() {
    return (
      <Header background_url={pageData?.background_url || ""}>
        <Tag
          variant="img-txt"
          text={pageData?.title || ""}
          img_url={pageData?.avatar_url || ""}
          onClick={() =>
            router.push(
              pageUrls.pageSettings({ pageSlug: pageData?.title || "" })
            )
          }
        />
        <Tag
          variant="txt"
          text={text("pagedelete:general")}
          onClick={() =>
            router.push(
              pageUrls.pageSettings({
                pageSlug: pageData?.title || "",
                pageSettings: "general",
              })
            )
          }
        />
        <Tag variant="txt" text={text("pagedelete:delete")} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      <>{handleHeader()}</>
      <PageDeleteContent
        handleDeletePage={handleDeletePage}
        userData={userData}
        isUpdating={isUpdating}
        runUpdate={runUpdate}
        handleUpdateIsUpdating={handleUpdateIsUpdating}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
