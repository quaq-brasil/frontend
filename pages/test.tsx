import { ArrowLeft, ArrowRight } from "phosphor-react"
import { useEffect, useState } from "react"
import { Card } from "../components/Card/Card"
import { CardLine } from "../components/Card/CardContentVariants/CardLine"
import { CardText } from "../components/Card/CardContentVariants/CardText"
import { Header } from "../components/Header/Header"
import { Tag } from "../components/Tag/Tag"
import { useUserAuth } from "../contexts/userAuth"
import { useMutateVariables } from "../services/hooks/useVariables/useMutateVariables"
import { IBlock } from "../types/Block.types"
import { IVariableResponse } from "../types/Variables.types"

const mockData = {
  creator_id: "63d7195b8efd06bc4047296b",
  blocks: [
    {
      id: "1",
      type: "textentry",
      save_as: "blocoteste",
      data: {
        type: "email",
      },
    },
  ],
  template_id: "63e7cf8388e2141604e1f88f",
  connected_templates: ["63e7cf8388e2141604e1f88f", "63ae050ffbbce66bbc152486"],
}

export type ConnectedTemplatesProps = {
  workspaceId?: string
  workspaceName?: string
  pageId?: string
  pageName?: string
  templateId?: string
  templateName?: string
}

type TestProps = {
  blocks: IBlock[]
}

export default function Test({ blocks }: TestProps) {
  const { user } = useUserAuth()

  const [connectedTemplates, setConnectedTemplates] =
    useState<ConnectedTemplatesProps[]>()

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
    getVariables.mutate(
      {
        data: {
          blocks: mockData.blocks,
          creator_id: mockData.creator_id,
          template_id: mockData.template_id,
          connected_templates: mockData.connected_templates,
        },
      },
      {
        onSuccess: (data) => {
          setVariables(data)
        },
      }
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedTemplates])

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

  function handleRemovePath() {
    const newPath = [...variablesPath]
    newPath.pop()
    setVariablesPath(newPath)
  }

  const [selectedVariablePath, setSelectedVariablePath] = useState<
    string[] | null
  >()

  function handleSelectVariable(key: string) {
    if (selectedVariablePath) {
      if (selectedVariablePath[selectedVariablePath.length - 1] == key) {
        const newSelectedVariablePath = null
        setSelectedVariablePath(newSelectedVariablePath)
      } else {
        const newSelectedVariablePath = [...variablesPath, key]
        setSelectedVariablePath([...newSelectedVariablePath])
      }
    } else {
      const newSelectedVariablePath = [...variablesPath, key]
      setSelectedVariablePath([...newSelectedVariablePath])
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
                  indicator={{
                    icon: ArrowRight,
                    onClick: () => {
                      handleAddPath(key)
                    },
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

  function loadHeader() {
    return (
      <Header
        background_url={
          "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        }
      >
        <Tag variant="txt" text="text" />
      </Header>
    )
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <div className="w-full h-screen bg-slate-100">
        <div
          className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
        >
          <div className="flex flex-col gap-2 md:gap-4 items-center">
            <Card>
              <CardText label="variables" />
              {variablesPath.length > 0 ? (
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
              ) : null}
              {variables && handleRenderOptions()}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
