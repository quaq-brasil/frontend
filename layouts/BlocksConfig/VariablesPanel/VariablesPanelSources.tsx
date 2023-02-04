import useTranslation from "next-translate/useTranslation"
import { Plus, X } from "phosphor-react"
import { useState } from "react"
import { useUserAuth } from "../../../contexts/userAuth"

type VariablesPanelSourcesProps = {}

type ConnectTemplatesProps = {
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

  const [connectTemplates, setConnectTemplates] = useState<
    ConnectTemplatesProps[]
  >([])

  const { user } = useUserAuth()

  return (
    <div className="px-3  flex flex-col">
      <p className="mb-4">{text("variablespanel:connect_templates")}</p>
      <p className="mb-4">{text("variablespanel:this_template")}</p>

      {connectTemplates
        ? connectTemplates.map((template, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b-2 mb-4"
            >
              <p className="max-w-[70%] mb-4">
                {`${template.workspaceName} - ${template.pageName} - ${template.templateName} - ${template.publicationName}`}
              </p>
              <X className="w-6 h-6 shrink-0" weight="bold" />
            </div>
          ))
        : null}

      <div className="flex justify-between border-b-2 mb-4">
        <p className="max-w-[70%] mb-4">
          {text("variablespanel:connect_new_template")}
        </p>
        <Plus className="w-6 h-6 shrink-0" weight="bold" />
      </div>
    </div>
  )
}

export default VariablesPanelSources
