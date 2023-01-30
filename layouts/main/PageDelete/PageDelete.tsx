import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IPage } from "../../../types/Page.type"
import { IUser } from "../../../types/User.type"
import { PageDeleteContent } from "./PageDeleteContent"

type PageDeleteProps = {
  initialPageData: IPage | undefined
  initialUserData: IUser | undefined
  handleDeletePage: () => void
}

export default function PageDelete({
  handleDeletePage,
  initialPageData,
  initialUserData,
}: PageDeleteProps) {
  const text = useTranslation().t

  const [userData, setUserData] = useState<IUser>()
  const [pageData, setPageData] = useState<IPage>()
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

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("pagedelete:back")}
          onClick={() => console.log("tab1")}
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
          onClick={() => console.log("tab1")}
        />,
      ]
    }
  }

  function handleHeader() {
    return (
      <Header background_url={pageData?.background_url || ""}>
        <Tag
          variant="img-txt"
          text={pageData?.name || ""}
          img_url={pageData?.avatar_url || ""}
        />
        <Tag variant="txt" text={text("pagedelete:general")} />
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
