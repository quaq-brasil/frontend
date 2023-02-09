import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IUpdatePage } from "../../../types/Page.type"
import { IUpdateTemplate } from "../../../types/Template.type"
import { pageUrls } from "../../../utils/pagesUrl"
import { CentralOptionsContent } from "./CentralOptionsContent"

type CentralOptionsProps = {
  initialPageData: IUpdatePage | undefined
  initialTemplateData: IUpdateTemplate | undefined
  handleUpdateTemplate: (data: IUpdateTemplate) => void
}

export default function CentralOptions({
  initialPageData,
  initialTemplateData,
  handleUpdateTemplate,
}: CentralOptionsProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [pageData, setPageData] = useState<IUpdatePage>()
  const [templateData, setTemplateData] = useState<IUpdateTemplate>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleUpdateTemplateData(newData: IUpdateTemplate) {
    const newTamplateData = { ...templateData }

    if (newData.name || newData.name === "") {
      newTamplateData.name = newData.name
    } else if (newData.url || newData.url === "") {
      newTamplateData.url = newData.url
    } else if (newData.shortcut_image || newData.shortcut_image === "") {
      newTamplateData.shortcut_image = newData.shortcut_image
    } else if (newData.shortcut_size || newData.shortcut_size === "") {
      newTamplateData.shortcut_size = newData.shortcut_size
    }

    setTemplateData(newTamplateData)

    handleUpdateIsUpdating(true)
  }

  useEffect(() => {
    setPageData(initialPageData)
  }, [initialPageData])

  useEffect(() => {
    setTemplateData(initialTemplateData)
  }, [initialTemplateData])

  function onUpdate() {
    handleUpdateIsUpdating(false)
    handleUpdateRunUpdate(false)
    handleUpdateTemplate(templateData as IUpdateTemplate)
  }

  useEffect(() => {
    if (templateData) {
      onUpdate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("centraloptions:back")}
          onClick={() =>
            router.push(
              pageUrls.pageSettings({
                pageSlug: pageData?.url || pageUrls.home(),
              })
            )
          }
        />,
        // <Tag
        //   key={2}
        //   variant="txt"
        //   text={text("centraloptions:options")}
        //   onClick={() => console.log()}
        //   isSelected
        //   isSeparated
        // />,
        // <Tag
        //   key={3}
        //   variant="txt"
        //   text={text("centraloptions:logs")}
        //   onClick={() => console.log()}
        // />,
        // <Tag
        //   key={4}
        //   variant="txt"
        //   text={text("centraloptions:stats")}
        //   onClick={() => console.log()}
        // />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("centraloptions:update")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("centraloptions:back")}
          onClick={() =>
            router.push(
              pageUrls.pageSettings({
                pageSlug: pageData?.url || pageUrls.home(),
              })
            )
          }
        />,
        // <Tag
        //   key={2}
        //   variant="txt"
        //   text={text("centraloptions:options")}
        //   onClick={() => console.log()}
        //   isSelected
        //   isSeparated
        // />,
        // <Tag
        //   key={3}
        //   variant="txt"
        //   text={text("centraloptions:logs")}
        //   onClick={() => console.log()}
        // />,
        // <Tag
        //   key={4}
        //   variant="txt"
        //   text={text("centraloptions:stats")}
        //   onClick={() => console.log()}
        // />,
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
          onClick={() =>
            router.push(
              pageUrls.pageSettings({
                pageSlug: pageData?.url || pageUrls.home(),
              })
            )
          }
        />
        <Tag
          variant="img-txt"
          text={templateData?.name || ""}
          img_url={templateData?.shortcut_image || ""}
        />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <CentralOptionsContent
        templateData={templateData}
        isUpdating={isUpdating}
        handleUpdateTemplateData={handleUpdateTemplateData}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
        pageData={pageData}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
