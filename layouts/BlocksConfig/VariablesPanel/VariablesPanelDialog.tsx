import useTranslation from "next-translate/useTranslation"
import { ArrowRight } from "phosphor-react"
import { useEffect, useState } from "react"
import { Card } from "../../../components/Card/Card"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IBlock } from "../../../types/Block.types"
import VariablesPanelSources from "./VariablesPanelSources"

type VariablesPanelDialogProps = {
  isOpen: boolean
  blocks: IBlock[]
  onClose: () => void
  handleInsertVariable?: (variable: any) => void
  isAbleToAddExternalVariables?: boolean
  isAbleToAddDefaultValue?: boolean
}

type VariableProps = {
  name: string
  path: string
  from: string
  type?: string
  value?: any
  data?: any
  selectedVariable: SelectedVariableProps | null
  setSelectedVariable: (data: SelectedVariableProps | null) => void
}

type SelectedVariableProps = {
  path: string
  value?: any
}

const BLOCKS_TYPES_HAS_VARIABLES = ["textentry", "pool"]

export const VariablesPanelDialog = ({
  isOpen,
  blocks,
  onClose,
  handleInsertVariable,
  isAbleToAddExternalVariables = true,
  isAbleToAddDefaultValue = true,
}: VariablesPanelDialogProps) => {
  const text = useTranslation().t

  const [variablesBlocks, setVariablesBlocks] = useState<IBlock[]>([])
  const [variablesPath, setVariablesPath] = useState<string[]>([])
  const [selectedVariable, setSelectedVariable] =
    useState<SelectedVariableProps | null>(null)
  const [page, setPage] = useState("available_variables")

  useEffect(() => {
    setVariablesBlocks(
      blocks.filter((block) =>
        BLOCKS_TYPES_HAS_VARIABLES.includes(block.type || "")
      )
    )
  }, [blocks])

  const variableFormat = (variablePath: string) => `{{${variablePath}}}`

  const onAddVariable = ({
    variable,
    mode,
    defaultValue,
  }: {
    variable: SelectedVariableProps
    mode: "path" | "path_with_default_value" | "value"
    defaultValue?: any
  }) => {
    if (handleInsertVariable) {
      switch (mode) {
        case "path":
          const path = `${variablesPath
            .map((variablePath) => variablePath)
            .join(".")}${variable.path}`

          handleInsertVariable(variableFormat(path))
          break
        case "path_with_default_value":
          const pathWithDefaultValue = `${variablesPath
            .map((variablePath) => variablePath)
            .join(".")}${variable.path} || ${defaultValue}`

          handleInsertVariable(variableFormat(pathWithDefaultValue))
          break
        case "value":
          handleInsertVariable(variable?.value || "")
          break
      }
    }
    onClose()
  }

  const handleBack = () => {
    const newVariablesPath = [...variablesPath]
    newVariablesPath.pop()
    setVariablesPath(newVariablesPath)
  }

  const tabbarPages = [
    <Tag
      key={1}
      variant="txt"
      text={
        variablesPath.length > 0
          ? text("variablespanel:back")
          : text("variablespanel:cancel")
      }
      onClick={variablesPath.length > 0 ? handleBack : onClose}
    />,
    isAbleToAddExternalVariables ? (
      <Tag
        key={2}
        variant="txt"
        text={text("variablespanel:available")}
        onClick={() => setPage("available_variables")}
        isSelected={page === "available_variables" ? true : false}
      />
    ) : null,
    isAbleToAddExternalVariables ? (
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

    selectedVariable?.value ? (
      <Tag
        key={2}
        variant="txt"
        text={text("variablespanel:value")}
        onClick={() =>
          onAddVariable({
            mode: "value",
            variable: selectedVariable as SelectedVariableProps,
          })
        }
      />
    ) : null,
    <Tag
      key={3}
      variant="txt"
      text={text("variablespanel:path")}
      onClick={() =>
        onAddVariable({
          mode: "path",
          variable: selectedVariable as SelectedVariableProps,
        })
      }
    />,
    isAbleToAddDefaultValue ? (
      <Tag
        key={4}
        variant="txt"
        text={text("variablespanel:path_and_fallback")}
        onClick={() =>
          onAddVariable({
            mode: "path_with_default_value",
            variable: selectedVariable as SelectedVariableProps,
          })
        }
      />
    ) : null,
  ]

  return (
    <Dialog
      isOpen={isOpen}
      title={text("variablespanel:variables")}
      onClose={onClose}
    >
      {page === "available_variables" ? (
        <>
          {variablesBlocks.length > 0 ? (
            <Card>
              {variablesBlocks.map((block, index) => {
                return (
                  <VariableOption
                    key={block.id || index}
                    name={block?.saveAs || ""}
                    path={block?.saveAs || ""}
                    from="this template"
                    selectedVariable={selectedVariable}
                    setSelectedVariable={setSelectedVariable}
                  />
                )
              })}
            </Card>
          ) : null}
        </>
      ) : (
        <VariablesPanelSources />
      )}

      <TabBar
        shiftLayoutOnXl={false}
        tags={selectedVariable ? tabbarAddOptions : tabbarPages}
      />
    </Dialog>
  )
}

const VariableOption = ({
  name,
  from,
  path,
  type,
  value,
  data,
  selectedVariable,
  setSelectedVariable,
}: VariableProps) => {
  return (
    <div className="border-b-[1px]  border-slate-100 flex items-center justify-between">
      <div
        className={`px-5 py-3 w-full cursor-pointer ${
          selectedVariable?.path === path && selectedVariable.value === value
            ? "bg-slate-100"
            : ""
        }`}
        onClick={() => setSelectedVariable({ path, value })}
      >
        <h4>{name}</h4>
        <p>{from}</p>

        <div className="flex items-center gap-4">
          {value || type ? (
            <p onClick={() => setSelectedVariable({ path, value })}>
              {value || type}
            </p>
          ) : null}

          {data ? (
            <ArrowRight className="cursor-pointer" weight="bold" size={20} />
          ) : null}
        </div>
      </div>
    </div>
  )
}
