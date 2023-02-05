import useTranslation from "next-translate/useTranslation"
import { Plus, X } from "phosphor-react"
import { useState } from "react"
import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { VariablesPanelPages } from "./VariablesPanelPages"

type VariablesPanelSourcesProps = {}

export type ConnectTemplatesProps = {
  workspaceId: string
  workspaceName: string
  pageId: string
  pageName: string
  templateId: string
  templateName: string
  publicationId: string
  publicationName: string
}

const VariablesPanelSources = ({}: VariablesPanelSourcesProps) => {
  const text = useTranslation().t

  const [pagePanelIsOpen, setPagePanelIsOpen] = useState(false)

  const [connectedTemplates, setConnectedTemplates] = useState<
    ConnectTemplatesProps[]
  >([])

  function handleUpdateConnectedTemplates(data: ConnectTemplatesProps) {
    setConnectedTemplates([...connectedTemplates, data])
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
          {connectedTemplates
            ? connectedTemplates.map((template, index) => (
                <>
                  <div
                    key={index}
                    className="flex justify-between items-center my-4"
                  >
                    <p className="max-w-[70%] my-4 lg:text-[1.1rem]">
                      {`${template.workspaceName} - ${template.pageName} - ${template.templateName} - ${template.publicationName}`}
                    </p>
                    <X className="w-6 h-6 shrink-0" weight="bold" />
                  </div>
                  <CardLine full={true} />
                </>
              ))
            : null}

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
        />
      )}
    </>
  )
}

export default VariablesPanelSources
