import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { Dialog } from "../../../components/Dialog/Dialog"
import { Header } from "../../../components/Header/Header"
import { Tag } from "../../../components/Tag/Tag"
import { useCreateTemplate } from "../../../services/hooks/useTemplate/useCreateTemplate"
import { IPage } from "../../../types/Page.type"
import { ITemplate, IUpdateTemplate } from "../../../types/Template.type"
import { PublishTemplateContent } from "./PublishTemplateContent"

type PublishTemplateProps = {
  initialPageData: IPage | undefined
  blocks: any[]
  isOpen: boolean
  onClose: () => void
}

export default function PublishTemplate({
  initialPageData,
  blocks,
  isOpen,
  onClose,
}: PublishTemplateProps) {
  const text = useTranslation().t

  const [pageData, setPageData] = useState<IPage>()
  const [templateData, setTemplateData] = useState<IUpdateTemplate>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  const createTemplate = useCreateTemplate()

  const handleCreateTemplate = (data: ITemplate) => {
    createTemplate.mutate(
      {
        data,
      },
      {
        onSuccess: (data) => {
          setTemplateData(data)
        },
      }
    )
  }

  useEffect(() => {
    setPageData(initialPageData)
  }, [initialPageData])

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleUpdateTemplateData(newData: IUpdateTemplate) {
    setTemplateData({
      ...templateData,
      name: newData.name || templateData?.name,
      shortcut_image: newData.shortcut_image || templateData?.shortcut_image,
      shortcut_size: newData.shortcut_size || templateData?.shortcut_size,
      current_publication_id:
        newData.current_publication_id || templateData?.current_publication_id,
      url: newData.url || templateData?.url,
    })
    handleUpdateIsUpdating(true)
  }

  function loadHeader() {
    return (
      <Header background_url={pageData?.background_url || ""}>
        <Tag
          variant="img-txt"
          text={pageData?.name || ""}
          img_url={pageData?.avatar_url || ""}
        />
        {!templateData?.name && !templateData?.shortcut_image && (
          <Tag variant="txt" text={text("publish:titletag")} />
        )}
        {templateData?.name && !templateData?.shortcut_image && (
          <Tag variant="txt" text={templateData.name} />
        )}
        {templateData?.name && templateData?.shortcut_image && (
          <Tag
            variant="img-txt"
            text={templateData.name}
            img_url={templateData.shortcut_image}
          />
        )}
      </Header>
    )
  }

  return (
    <Dialog
      height={"full"}
      isOpen={isOpen}
      title={text("publish:titletag")}
      onClose={onClose}
    >
      <div className="bg-slate-100 fixed inset-0">
        {/* {loadHeader()} */}
        <PublishTemplateContent
          handleCreateTemplate={handleCreateTemplate}
          isUpdating={isUpdating}
          runUpdate={runUpdate}
          handleUpdateRunUpdate={handleUpdateRunUpdate}
          templateData={templateData}
          handleUpdateTemplateData={handleUpdateTemplateData}
          pageData={pageData}
          handleUpdateIsUpdating={handleUpdateIsUpdating}
          blocks={blocks}
          onClose={onClose}
        />
      </div>
    </Dialog>
  )
}
