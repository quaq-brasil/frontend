import useTranslation from "next-translate/useTranslation"
import { ArrowRight } from "phosphor-react"
import { useEffect, useState } from "react"
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

  function resetSelection() {
    setSelectedVariable(null)
  }

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
    resetSelection()
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

  const VariableOption = ({
    name,
    from,
    path,
    type,
    value,
    data,
  }: VariableProps) => {
    return (
      <div className="flex items-center justify-between">
        <div
          className={`px-2 w-full mx-1 lg:mx-2 rounded-[12px] lg:rounded-[18px] cursor-pointer ${
            selectedVariable?.path === path && selectedVariable.value === value
              ? "bg-slate-50"
              : ""
          }`}
          onClick={() => setSelectedVariable({ path, value })}
        >
          <h4>{name}</h4>
          <p className="mt-1 mb-2 text-[0.8rem] text-slate-500">{from}</p>

          <div className="flex items-center">
            {value || type ? (
              <p onClick={() => setSelectedVariable({ path, value })}>
                {value || type}
              </p>
            ) : null}

            {data ? (
              <ArrowRight className="cursor-pointer" weight="bold" size={20} />
            ) : null}
          </div>
          {selectedVariable?.path === path &&
          selectedVariable.value === value ? (
            <div className={"w-full flex flex-col justify-start"}>
              <span className="w-full p-[0.5px] bg-white"></span>
            </div>
          ) : (
            <div className={"w-full flex flex-col justify-start"}>
              <span className="w-full p-[0.5px] bg-slate-100"></span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <Dialog
      isOpen={isOpen}
      title={text("variablespanel:variables")}
      onClose={onClose}
    >
      {page === "available_variables" ? (
        <>
          {variablesBlocks.length > 0 ? (
            <div
              className="flex flex-col justify-center gap-[0.375rem] h-fit py-2
          bg-white min-w-[100%] rounded-[20px] lg:rounded-[30px] lg:gap-[0.75rem] lg:py-3"
            >
              {variablesBlocks.map((block, index) => {
                return (
                  <VariableOption
                    key={index}
                    name={block?.saveAs || ""}
                    path={block?.saveAs || ""}
                    from="this template"
                  />
                )
              })}
            </div>
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
