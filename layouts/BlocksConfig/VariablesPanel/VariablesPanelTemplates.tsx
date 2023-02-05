import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { Dialog } from "../../../components/Dialog/Dialog"
import { Shortcut } from "../../../components/Shortcut/Shortcut"
import { ShortcutGrid } from "../../../components/ShortcutGrid/ShortcutGrid"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { useMutateTemplatesByPageId } from "../../../services/hooks/useTemplate/useMutateTemplatesByPageId"
import { ITemplate } from "../../../types/Template.type"
import { VariablesPanelPublications } from "./VariablesPanelPublications"
import { ConnectTemplatesProps } from "./VariablesPanelSources"

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
  handleUpdateConnectedTemplates: (data: ConnectTemplatesProps) => void
}

export const VariablesPanelTemplates = ({
  isOpen,
  onClose,
  initialData,
  handleUpdateConnectedTemplates,
}: VariablesPanelTemplatesProps) => {
  const text = useTranslation().t

  const [shortcuts, setShortcuts] = useState<JSX.Element[]>([])
  const [template, setTemplate] = useState<ITemplate>()
  const [openPublications, setOpenPublications] = useState(false)

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
                  key={index}
                  id={template.id || ""}
                  img_url={template.shortcut_image || ""}
                  index={index || 0}
                  size={template.shortcut_size || "small"}
                  title={template.name}
                  isCreator={false}
                  templateData={template}
                  pageData={undefined}
                  onClick={() => {
                    setTemplate(template)
                    setOpenPublications(true)
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
      onClick={onClose}
    />,
  ]

  return (
    <Dialog
      isOpen={isOpen}
      title={initialData.pageData.pageName}
      onClose={onClose}
    >
      <ShortcutGrid onDrag={(e) => console.log(e)}>{shortcuts}</ShortcutGrid>
      <TabBar shiftLayoutOnXl={false} tags={tabbarPages} />
      {openPublications && (
        <VariablesPanelPublications
          handleUpdateConnectedTemplates={handleUpdateConnectedTemplates}
          initialData={{
            pageData: initialData.pageData,
            workspaceData: initialData.workspaceData,
            templateData: {
              templateId: template?.id as string,
              templateName: template?.name as string,
            },
          }}
          isOpen={openPublications}
          onClose={() => setOpenPublications(false)}
        />
      )}
    </Dialog>
  )
}
