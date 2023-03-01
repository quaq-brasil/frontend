import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { Dialog } from "../../../components/Dialog/Dialog"
import { Shortcut } from "../../../components/Shortcut/Shortcut"
import { ShortcutGrid } from "../../../components/ShortcutGrid/ShortcutGrid"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { useMutateTemplatesByPageId } from "../../../services/hooks/useTemplate/useMutateTemplatesByPageId"
import { ConnectedTemplatesProps } from "./VariablesPanelDialog"

type VariablesPanelTemplatesProps = {
  isOpen: boolean
  onClose: () => void
  initialData: {
    workspaceData: {
      workspaceId: string
      workspaceName: string
    }
    pageData: {
      pageId: string
      pageName: string
    }
  }
  handleAddConnectedTemplate: (data: ConnectedTemplatesProps) => void
  onBack: () => void
  connectedTemplates: ConnectedTemplatesProps[]
}

export const VariablesPanelTemplates = ({
  isOpen,
  onClose,
  initialData,
  handleAddConnectedTemplate,
  onBack,
  connectedTemplates,
}: VariablesPanelTemplatesProps) => {
  const text = useTranslation().t

  const [shortcuts, setShortcuts] = useState<JSX.Element[]>([])

  const getTemplates = useMutateTemplatesByPageId()

  useEffect(() => {
    if (initialData) {
      getTemplates.mutate(
        {
          id: initialData.pageData.pageId,
        },
        {
          onSuccess: (data) => {
            const tempShortcuts = data.map((template, index) => {
              return (
                <Shortcut
                  key={template.id}
                  id={template.id || ""}
                  img_url={template.shortcut_image || ""}
                  index={index || 0}
                  size={template.shortcut_size || "small"}
                  title={template.title}
                  isCreator={false}
                  templateData={template}
                  pageData={undefined}
                  onClick={() => {
                    handleAddConnectedTemplate({
                      workspaceId: initialData.workspaceData.workspaceId,
                      workspaceName: initialData.workspaceData.workspaceName,
                      pageId: initialData.pageData.pageId,
                      pageName: initialData.pageData.pageName,
                      templateId: template.id,
                      templateName: template.title,
                    })
                    onClose()
                  }}
                />
              )
            })
            setShortcuts(tempShortcuts)
          },
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData])

  const tabbarPages = [
    <Tag
      key={1}
      variant="txt"
      text={text("variablespanel:back")}
      onClick={onBack}
    />,
  ]

  return (
    <Dialog
      isOpen={isOpen}
      title={initialData.pageData.pageName}
      onClose={onClose}
    >
      <ShortcutGrid>{shortcuts}</ShortcutGrid>
      <TabBar shiftLayoutOnXl={false} tags={tabbarPages} />
    </Dialog>
  )
}
