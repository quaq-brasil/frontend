import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IUpdatePage } from "../../../types/Page.type"
import { GeneralSettingsContent } from "./GeneralSettingsContent"

type GeneralSettingsProps = {
  initialPageData: IUpdatePage
  handleUpdatePage: (data: IUpdatePage) => void
}

export default function GeneralSettings({
  initialPageData,
  handleUpdatePage,
}: GeneralSettingsProps) {
  const text = useTranslation().t

  const [pageData, setPageData] = useState<IUpdatePage>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdatePageData(newData: IUpdatePage) {
    setPageData({
      ...pageData,
      avatar_url: newData.avatar_url || pageData?.avatar_url,
      background_url: newData.background_url || pageData?.background_url,
      url: newData.url || pageData?.url,
      name: newData.name || pageData?.name,
    })
    setIsUpdating(true)
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  useEffect(() => {
    setPageData(initialPageData)
  }, [initialPageData])

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("generalsettings:back")}
          onClick={() => console.log("tab1")}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("generalsettings:update")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("generalsettings:back")}
          onClick={() => console.log("tab1")}
        />,
      ]
    }
  }

  function loadHeader() {
    return (
      <Header background_url={pageData?.background_url || ""}>
        <Tag
          variant="img-txt"
          text={pageData?.name || ""}
          img_url={pageData?.avatar_url || ""}
        />
        <Tag variant="txt" text={text("generalsettings:titletag")} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <GeneralSettingsContent
        pageData={pageData}
        handleUpdatePageData={handleUpdatePageData}
        handleUpdatePage={handleUpdatePage}
        isUpdating={isUpdating}
        handleUpdateIsUpdating={handleUpdateIsUpdating}
        runUpdate={runUpdate}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
