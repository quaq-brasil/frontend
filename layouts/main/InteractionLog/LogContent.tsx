import { Card } from "components/Card/Card"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { Header } from "components/Header/Header"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { ArrowLeft, ArrowRight } from "phosphor-react"
import { SetStateAction, useEffect, useState } from "react"
import { useMutateVariables } from "services/hooks/useVariables/useMutateVariables"
import { IInteraction } from "types/Interaction.type"
import { IPage } from "types/Page.type"
import { ITemplate } from "types/Template.type"
import { IVariableResponse } from "types/Variables.types"
import { pageUrls } from "utils/pagesUrl"

type LogContentProps = {
  initialLogData: IInteraction | undefined
  initialPageData: IPage | undefined
  initialTemplateData: ITemplate | undefined
}

export function LogContent({
  initialLogData,
  initialPageData,
  initialTemplateData,
}: LogContentProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [logData, setLogData] = useState<IInteraction>(initialLogData)
  const [pageData, setPageData] = useState<IPage>(initialPageData)
  const [templateData, setTemplateData] =
    useState<ITemplate>(initialTemplateData)

  useEffect(() => {
    if (initialLogData) {
      setLogData(initialLogData)
    }
  }, [initialLogData])

  useEffect(() => {
    if (initialPageData) {
      setPageData(initialPageData)
    }
  }, [initialPageData])

  useEffect(() => {
    if (initialTemplateData) {
      setTemplateData(initialTemplateData)
    }
  }, [initialTemplateData])

  const [variables, setVariables] = useState<IVariableResponse>()

  const getVariables = useMutateVariables()

  useEffect(() => {
    if (logData) {
      getVariables.mutate(
        {
          data: {
            blocks: logData.blocks,
            template_id: logData?.Template?.id,
            creator_id: "",
            connected_templates: logData?.Publication?.dependencies
              ?.connected_templates
              ? logData?.Publication?.dependencies?.connected_templates
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
  }, [logData])

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

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("centraloptions:back")}
        onClick={() =>
          router.push(
            pageUrls.templateCentral({
              pageSlug: pageData?.slug,
              templateSlug: templateData?.slug,
              settings: "logs",
            })
          )
        }
      />,
    ]
  }

  function loadHeader() {
    return (
      <Header background_url={pageData?.background_url || ""}>
        <Tag
          variant="img-txt"
          text={pageData?.title || ""}
          img_url={pageData?.avatar_url || ""}
          onClick={() =>
            router.push(
              pageUrls.pageSettings({
                pageSlug: pageData?.slug || pageUrls.home(),
              })
            )
          }
        />
        <Tag
          variant="img-txt"
          text={templateData?.title || ""}
          img_url={templateData?.shortcut_image || ""}
          onClick={() =>
            router.push(
              pageUrls.templateCentral({
                pageSlug: pageData?.slug,
                templateSlug: templateData?.slug,
                settings: "logs",
              })
            )
          }
        />
        <Tag
          variant="img-txt"
          img_url={logData?.User?.avatar_url || ""}
          text={logData?.User?.name as ""}
        />
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
            {handleRenderPageContent()}
          </div>
        </div>
      </div>
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
