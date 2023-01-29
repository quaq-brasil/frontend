import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IPage, IUpdatePage } from "../../../types/Page.type"
import { ITemplate, IUpdateTemplate } from "../../../types/Template.type"
import { CentralTrackersContent } from "./CentralTrackersContent"

type CentralTrackersProps = {
  handleUpdateTrackers: (data: IUpdateTemplate) => void
  pageData?: IPage
  templateData?: ITemplate
}

export default function CentralTrackers({
  handleUpdateTrackers,
  pageData,
  templateData,
}: CentralTrackersProps) {
  const text = useTranslation().t

  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [page, setPage] = useState<IUpdatePage>()
  const [template, setTemplate] = useState<IUpdateTemplate>()

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdatePage(page: IUpdatePage) {
    setPage(page)
  }

  function handleUpdateTemplate(template: IUpdateTemplate) {
    setTemplate(template)
  }

  useEffect(() => {
    handleUpdatePage(pageData as IUpdatePage)
  }, [pageData])

  useEffect(() => {
    handleUpdateTemplate(templateData as IUpdateTemplate)
  }, [templateData])

  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("centraltrackers:back")}
          onClick={() => console.log()}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("centraltrackers:update")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("centraltrackers:back")}
          onClick={() => console.log()}
        />,
      ]
    }
  }

  function loadHeader() {
    return (
      <Header background_url={page?.background_url || ""}>
        <Tag
          variant="img-txt"
          text={page?.name || ""}
          img_url={page?.avatar_url || ""}
        />
        <Tag
          variant="img-txt"
          text={template?.name || ""}
          img_url={template?.shortcut_image || ""}
        />
        <Tag variant="txt" text={text("centraltrackers:trackers")} />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <CentralTrackersContent
        handleUpdateTrackers={handleUpdateTrackers}
        isUpdating={isUpdating}
        handleUpdateIsUpdating={handleUpdateIsUpdating}
        templateData={template}
        runUpdate={runUpdate}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
