import useTranslation from "next-translate/useTranslation"
import { Plus, X } from "phosphor-react"
import { useState } from "react"
import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { VariablesPanelPages } from "./VariablesPanelPages"

type VariablesPanelSourcesProps = {}

export type ConnectTemplatesProps = {
  workspaceId?: string
  workspaceName?: string
  pageId?: string
  pageName?: string
  templateId?: string
  templateName?: string
  publicationId?: string
  publicationName?: string
}

const VariablesPanelSources = ({}: VariablesPanelSourcesProps) => {
  const text = useTranslation().t

  const [pagePanelIsOpen, setPagePanelIsOpen] = useState(false)

  const [connectedTemplates, setConnectedTemplates] = useState<
    ConnectTemplatesProps[]
  >([])

  function handleUpdateConnectedTemplates(data: ConnectTemplatesProps) {
    setConnectedTemplates([
      ...(connectedTemplates as ConnectTemplatesProps[]),
      data,
    ])
  }

  function handleDisconnectSource(data: ConnectTemplatesProps) {
    if (connectedTemplates) {
      const newSources = connectedTemplates.filter(
        (source) => data.publicationId !== source.publicationId
      )
      console.log(newSources)
      setConnectedTemplates([...newSources])
      console.log(connectedTemplates)
    }
  }

  return (
    <>
      <Card>
        <div className="px-3 lg:px-5  flex flex-col">
          <p className="mb-3 lg:text-[1.1rem]">
            {text("variablespanel:connect_templates")}
          </p>
          <p className="my-4 lg:text-[1.1rem]">
            {text("variablespanel:this_template")}
          </p>
          <CardLine />
          {connectedTemplates &&
            connectedTemplates.map((template, index) => (
              <>
                {template && (
                  <>
                    <button
                      key={index}
                      className="flex justify-between items-center my-2"
                      onClick={() => handleDisconnectSource(template)}
                    >
                      <p className="w-fit text-left max-w-[70%] my-2 lg:my-4 lg:text-[1.1rem]">
                        {`${template.workspaceName} - ${template.pageName} - ${template.templateName} - ${template.publicationName}`}
                      </p>
                      <X className="w-6 h-6 shrink-0" weight="bold" />
                    </button>
                    <span className="w-full p-[0.5px] bg-slate-100"></span>
                  </>
                )}
              </>
            ))}

          <button
            className="flex justify-between my-4"
            onClick={() => setPagePanelIsOpen(true)}
          >
            <p className="max-w-[70%] lg:text-[1.1rem]">
              {text("variablespanel:connect_new_template")}
            </p>
            <Plus className="w-6 h-6 shrink-0" weight="bold" />
          </button>
          <CardLine />
        </div>
      </Card>
      {pagePanelIsOpen && (
        <VariablesPanelPages
          isOpen={pagePanelIsOpen}
          onClose={() => setPagePanelIsOpen(false)}
          handleUpdateConnectedTemplates={handleUpdateConnectedTemplates}
          connectedTemplates={connectedTemplates as ConnectTemplatesProps[]}
        />
      )}
    </>
  )
}

export default VariablesPanelSources
