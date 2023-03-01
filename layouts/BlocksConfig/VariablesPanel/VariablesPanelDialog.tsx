import useTranslation from "next-translate/useTranslation"
import { ArrowLeft, ArrowRight } from "phosphor-react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { useUserAuth } from "../../../contexts/userAuth"
import { useMutateVariables } from "../../../services/hooks/useVariables/useMutateVariables"
import { IBlock } from "../../../types/Block.types"
import { ITemplate } from "../../../types/Template.type"
import { IVariableResponse } from "../../../types/Variables.types"
import VariablesPanelSources from "./VariablesPanelSources"

export type ConnectedTemplatesProps = {
  workspaceId?: string
  workspaceName?: string
  pageId?: string
  pageName?: string
  templateId?: string
  templateName?: string
}

type VariablesPanelDialogProps = {
  isOpen: boolean
  blocks: IBlock[]
  onClose: () => void
  handleInsertVariable?: (variable: any) => void
  isAbleToAddExternalVariables?: boolean
  isAbleToAddDefaultValue?: boolean
  initialTemplateData?: ITemplate
  connectedTemplates?: ConnectedTemplatesProps[]
  setConnectedTemplates: Dispatch<
    SetStateAction<ConnectedTemplatesProps[] | undefined>
  >
}

export const VariablesPanelDialog = ({
  isOpen,
  blocks,
  onClose,
  handleInsertVariable,
  isAbleToAddExternalVariables = true,
  isAbleToAddDefaultValue = true,
  initialTemplateData,
  setConnectedTemplates,
  connectedTemplates,
}: VariablesPanelDialogProps) => {
  const text = useTranslation().t
  const { user } = useUserAuth()

  const [templateData, setTemplateData] = useState<ITemplate>()

  useEffect(() => {
    if (initialTemplateData) {
      setTemplateData(initialTemplateData)
    }
  }, [initialTemplateData])

  function handleAddConnectedTemplate(
    newConnectedTemplate: ConnectedTemplatesProps
  ) {
    if (connectedTemplates && connectedTemplates.length > 0) {
      setConnectedTemplates([...connectedTemplates, newConnectedTemplate])
    } else {
      setConnectedTemplates([newConnectedTemplate])
    }
  }

  function handleDisconnectSource(disconnectTemplate: ConnectedTemplatesProps) {
    if (connectedTemplates) {
      const newSources = connectedTemplates.filter(
        (source) => disconnectTemplate.templateId !== source.templateId
      )
      setConnectedTemplates([...newSources])
    }
  }

  const [variables, setVariables] = useState<IVariableResponse>()

  const getVariables = useMutateVariables()

  useEffect(() => {
    if (user) {
      getVariables.mutate(
        {
          data: {
            blocks: blocks,
            creator_id: user?.id,
            template_id: templateData ? templateData.id : "",
            connected_templates: connectedTemplates
              ? connectedTemplates.map((template) => {
                  return template.templateId
                })
              : [],
          },
        },
        {
          onSuccess: (data) => {
            setVariables(data)
          },
        }
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedTemplates, user, templateData?.id, blocks])

  const [currentData, setCurrentData] = useState<any>()
  const [variablesPath, setVariablesPath] = useState<string[]>([])

  useEffect(() => {
    if (variables) {
      setCurrentData(variables)
    }
  }, [variables])

  useEffect(() => {
    handleSetCurrentData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variablesPath])

  function handleSetCurrentData() {
    let newCurrentData = { ...variables }
    let tempPath = [...variablesPath]
    while (tempPath && tempPath.length > 0 && newCurrentData) {
      newCurrentData =
        newCurrentData[tempPath[0] as keyof typeof newCurrentData]
      tempPath.shift()
    }
    setCurrentData(newCurrentData)
  }

  function handleAddPath(key: string) {
    setVariablesPath([...variablesPath, key])
  }

  const [selectedVariablePath, setSelectedVariablePath] = useState<
    string[] | null
  >()

  const [changeTabBar, setChangeTabBar] = useState(false)
  const [option, setOption] = useState("available_variables")

  function handleUpdateOption(newOption: string) {
    setOption(newOption)
  }

  function handleRemovePath() {
    const newPath = [...variablesPath]
    newPath.pop()
    setVariablesPath(newPath)
    setSelectedVariablePath(null)
  }

  function handleSelectVariable(key: string) {
    if (selectedVariablePath) {
      if (selectedVariablePath[selectedVariablePath.length - 1] == key) {
        const newSelectedVariablePath: SetStateAction<string[]> = null
        setSelectedVariablePath(newSelectedVariablePath)
        setChangeTabBar(false)
      } else {
        const newSelectedVariablePath = [...variablesPath, key]
        setSelectedVariablePath([...newSelectedVariablePath])
        setChangeTabBar(true)
      }
    } else {
      const newSelectedVariablePath = [...variablesPath, key]
      setSelectedVariablePath([...newSelectedVariablePath])
      setChangeTabBar(true)
    }
  }

  function handleRenderOptions() {
    const dataType = typeof currentData
    switch (dataType) {
      case "object":
        return Object.keys(currentData).map((key) => {
          return (
            <>
              {typeof currentData[key] == "object" ? (
                <CardText
                  key={key}
                  label={key.replace("_", " ")}
                  onClick={() => {
                    handleAddPath(key)
                  }}
                  indicator={{
                    icon: ArrowRight,
                  }}
                />
              ) : (
                <div
                  className={`h-fit ${
                    selectedVariablePath &&
                    selectedVariablePath[selectedVariablePath.length - 1] ===
                      key
                      ? "bg-slate-50"
                      : ""
                  }`}
                >
                  <CardText
                    key={key}
                    label={key.replace("_", " ")}
                    onClick={() => handleSelectVariable(key)}
                    indicator={{ text: currentData[key] }}
                  />
                </div>
              )}
              <CardLine />
            </>
          )
        })
      case "string":
        return (
          <p className="flex flex-row justify-between items-center px-3">
            {currentData}
          </p>
        )
    }
  }

  function handleAddVariable() {
    if (selectedVariablePath) {
      let formattedVariable = selectedVariablePath.join(".")
      formattedVariable = `{{${formattedVariable}}}`
      handleInsertVariable && handleInsertVariable(formattedVariable)
      onClose()
      setSelectedVariablePath(null)
      setVariablesPath([])
      setChangeTabBar(false)
    }
  }

  const tags = [
    <Tag variant="txt" text="cancel" key={1} onClick={onClose} />,
    <Tag
      variant="txt"
      text={text("variablespanel:available")}
      key={2}
      isSelected={option === "available_variables"}
      onClick={() => handleUpdateOption("available_variables")}
    />,
    <Tag
      variant="txt"
      text={text("variablespanel:sources")}
      key={3}
      isSelected={option === "sources"}
      onClick={() => handleUpdateOption("sources")}
    />,
  ]

  const tagsForSelection = [
    <Tag
      variant="txt"
      text={text("variablespanel:cancel")}
      key={1}
      onClick={() => {
        setChangeTabBar(false)
        setSelectedVariablePath(null)
      }}
    />,
    <Tag
      variant="txt"
      text={text("variablespanel:value")}
      key={2}
      onClick={() => {
        if (selectedVariablePath && handleInsertVariable) {
          handleInsertVariable(
            currentData[selectedVariablePath[selectedVariablePath.length - 1]]
          )
          onClose()
          setSelectedVariablePath(null)
          setVariablesPath([])
          setChangeTabBar(false)
        }
      }}
    />,
    <Tag
      variant="txt"
      text={text("variablespanel:path")}
      key={3}
      onClick={handleAddVariable}
    />,
  ]

  function handleRenderPageContent() {
    return variables ? (
      <Card>
        {variablesPath.length > 0 && (
          <>
            <CardLine />
            <button
              onClick={handleRemovePath}
              className="flex flex-row gap-3 px-3 items-center lg:text-[1.1rem] text-left"
            >
              <ArrowLeft className="w-[1.375rem] h-[1.375rem] m-[0.3125rem] lg:w-[1.5625rem] lg:h-[1.5625rem]" />
              {variablesPath[variablesPath.length - 1].replace("_", " ")}
            </button>
            <CardLine />
          </>
        )}
        {variables && handleRenderOptions()}
      </Card>
    ) : (
      <Card>
        <div className="w-full h-fit text-slate-300">
          <CardText label="no variables" />
        </div>
        <CardLine />
      </Card>
    )
  }

  return (
    <Dialog
      isOpen={isOpen}
      title={text("variablespanel:variables")}
      onClose={onClose}
    >
      {option === "available_variables" ? (
        handleRenderPageContent()
      ) : (
        <VariablesPanelSources
          connectedTemplates={connectedTemplates as ConnectedTemplatesProps[]}
          handleAddConnectedTemplate={handleAddConnectedTemplate}
          handleDisconnectSource={handleDisconnectSource}
        />
      )}

      <TabBar
        shiftLayoutOnXl={false}
        tags={changeTabBar ? tagsForSelection : tags}
      />
    </Dialog>
  )
}
