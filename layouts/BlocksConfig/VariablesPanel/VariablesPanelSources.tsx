import useTranslation from "next-translate/useTranslation"
import { X } from "phosphor-react"
import { useState } from "react"

type VariablesPanelSourcesProps = {}

const VariablesPanelSources = ({}: VariablesPanelSourcesProps) => {
  const text = useTranslation().t

  const [connectTemplates, setConnectTemplates] = useState([1])

  return (
    <div className="px-3 pb-3 flex flex-col">
      <p className="mb-4">{text("variablespanel:connect_templates")}</p>
      <p className="mb-4">{text("variablespanel:this.template")}</p>

      {connectTemplates
        ? connectTemplates.map((template, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b-2 mb-4"
            >
              <p className="max-w-[70%] mb-4">
                page name - template name - first publication
              </p>
              <X className="w-6 h-6 shrink-0" weight="bold" />
            </div>
          ))
        : null}
    </div>
  )
}

export default VariablesPanelSources
