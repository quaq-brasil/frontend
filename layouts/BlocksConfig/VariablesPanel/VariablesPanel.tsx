import { Card } from "components/Card/Card"
import { Dialog } from "components/Dialog/Dialog"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { ArrowRight } from "phosphor-react"
import { useEffect, useState } from "react"

export type Variable = {
  name: string
  key: string
  type: string
  value?: any
  index?: number
  data?: Variable[]

  defaultValue?: any
}

type handleSelectVariableProps =
  | {
      path: (string | number | (string | number)[])[]
    }
  | {
      path: (string | number | (string | number)[])[]
      defaultValue: string | number | true
    }
  | {
      value: any
    }

type VariablesPanelProps = {
  variables: Variable[]
  handleAddVariable?: (data: handleSelectVariableProps) => void
  isAbleToAddDefaultVariable?: boolean
  isOpen: boolean
  onClose: () => void
  size?: "sm" | "md" | "full"
  isMultiPages?: boolean
}

export const VariablesPanel = ({
  variables,
  handleAddVariable,
  isAbleToAddDefaultVariable,
  isOpen,
  onClose,
  size,
  isMultiPages = false,
}: VariablesPanelProps) => {
  const text = useTranslation().t

  const [visibleVariables, setVisibleVariables] = useState(variables)
  const [variablePath, setVariablePath] = useState<Variable[]>([])
  const [selectedVariable, setSelectedVariable] = useState<Variable | null>(
    null
  )
  const [page, setPage] = useState("available_variables")

  const handleEnterVariable = ({
    variable,
    index,
  }: {
    variable: Variable
    index?: number
  }) => {
    if (variable.data) {
      setVariablePath([...variablePath, { ...variable, index }])
    }
  }

  const handleBack = () => {
    const newVariablePath = [...variablePath]
    newVariablePath.pop()
    setVariablePath(newVariablePath)
  }

  const onAddVariable = ({
    variable,
    mode,
    defaultValue,
  }: {
    variable: Variable
    mode: "path" | "path_with_default_value" | "value"
    defaultValue?: any
  }) => {
    if (handleAddVariable) {
      switch (mode) {
        case "path":
          const newVariablePath = {
            path: [
              variablePath.map((variable) => variable.index || variable.key),
              variable?.index || variable.key,
            ],
          }
          handleAddVariable(newVariablePath)
          break
        case "path_with_default_value":
          const variablePathWithDefaultValue = {
            path: [
              variablePath.map((variable) => variable.index || variable.key),
              variable?.index || variable.key,
            ],
            defaultValue: defaultValue || "",
          }
          handleAddVariable(variablePathWithDefaultValue)
          break
        case "value":
          handleAddVariable({ value: variable.value })
          break
      }
    }
  }

  useEffect(() => {
    if (variablePath.length > 0) {
      const lastVariable = variablePath[variablePath.length - 1]
      setVisibleVariables(lastVariable.data || [])
    } else {
      setVisibleVariables(variables)
    }
  }, [variables, variablePath])

  const tabbarPages = [
    <Tag
      key={1}
      variant="txt"
      text={
        variablePath.length > 0
          ? text("variablespanel:back")
          : text("variablespanel:cancel")
      }
      onClick={variablePath.length > 0 ? handleBack : onClose}
    />,
    isMultiPages ? (
      <Tag
        key={2}
        variant="txt"
        text={text("variablespanel:available")}
        onClick={() => setPage("available_variables")}
        isSelected={page === "available_variables" ? true : false}
      />
    ) : null,
    isMultiPages ? (
      <Tag
        key={3}
        variant="txt"
        text={text("variablespanel:sources")}
        onClick={() => setPage("sources_variables")}
        isSelected={page === "sources_variables" ? true : false}
      />
    ) : null,
  ]

  const tabbarAddOptions = [
    <Tag
      key={1}
      variant="txt"
      text={text("variablespanel:cancel")}
      onClick={() => setSelectedVariable(null)}
    />,
    <Tag
      key={2}
      variant="txt"
      text={text("variablespanel:value")}
      onClick={() =>
        onAddVariable({ mode: "value", variable: selectedVariable as Variable })
      }
    />,
    <Tag
      key={3}
      variant="txt"
      text={text("variablespanel:path")}
      onClick={() =>
        onAddVariable({ mode: "path", variable: selectedVariable as Variable })
      }
    />,
    isAbleToAddDefaultVariable ? (
      <Tag
        key={4}
        variant="txt"
        text={text("variablespanel:path and fallback")}
        onClick={() =>
          onAddVariable({
            mode: "path_with_default_value",
            variable: selectedVariable as Variable,
          })
        }
      />
    ) : null,
  ]

  return (
    <Dialog
      height={size}
      isOpen={isOpen}
      title={text("variablespanel:variables")}
    >
      <TabBar
        isHidden={false}
        tags={selectedVariable ? tabbarAddOptions : tabbarPages}
      />

      <Card>
        {page === "available_variables" ? (
          <div className="px-2 flex flex-col ">
            {visibleVariables.map((variable, index) => (
              <div
                className={`py-3 px-5 rounded-3xl  ${
                  JSON.stringify(selectedVariable) === JSON.stringify(variable)
                    ? "bg-slate-100"
                    : ""
                } border-b-[1px] border-slate-100 flex items-center justify-between `}
                key={index}
              >
                <div
                  className="w-full cursor-pointer"
                  onClick={() => setSelectedVariable(variable)}
                >
                  <h4>{variable.name}</h4>
                  <p>{variable.key}</p>
                </div>

                <div className="flex items-center gap-4">
                  <p onClick={() => setSelectedVariable(variable)}>
                    {variable.type}
                  </p>

                  {variable.data ? (
                    <ArrowRight
                      className="cursor-pointer"
                      weight="bold"
                      size={20}
                      onClick={() => handleEnterVariable({ variable, index })}
                    />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </Card>
    </Dialog>
  )
}
