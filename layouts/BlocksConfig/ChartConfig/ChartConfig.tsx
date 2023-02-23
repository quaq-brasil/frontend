import useTranslation from "next-translate/useTranslation"
import { BracketsCurly, Check, X } from "phosphor-react"
import { useEffect, useState } from "react"
import { v4 } from "uuid"
import { Button } from "../../../components/Button/Button"

import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { BlocksConfigProps } from "../../../types/BlockConfig.types"

export default function ChartConfig({
  handleAddBlock,
  isOpen,
  onClose,
  handleOpenVariablePanel,
  setFunctionHandleAddVariable,
}: BlocksConfigProps) {
  const text = useTranslation().t

  type IDatasets = {
    label?: string
    data?: string
    backgroundColor?: string
    borderColor?: string
    borderWidth?: string
  }

  type IChart = {
    chartType?: string
    data?: {
      datasets?: IDatasets[]
      labels?: string
    }
    title?: string
  }

  const [content, setContent] = useState<IChart>()
  const [saveAs, setSaveAs] = useState<string>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)
  const [datasets, setDatasets] = useState<IDatasets[]>([
    {
      backgroundColor: "",
      borderColor: "",
      borderWidth: "",
      data: "",
      label: "",
    },
  ])

  function handleUpdateContent(newData: IChart) {
    setContent((state) => {
      return {
        ...state,
        ...newData,
      } as IChart
    })
    setIsUpdating(true)
  }

  type IUpdateDatasets = {
    id?: number
    type: string
    newData?: IDatasets
  }

  function handleUpdateDatasets({ id, type, newData }: IUpdateDatasets) {
    switch (type) {
      case "add":
        setDatasets([
          ...datasets,
          {
            backgroundColor: "",
            data: "",
            label: "",
            borderColor: "",
            borderWidth: "",
          },
        ])
        handleUpdateContent({ data: { datasets: datasets } })
        break
      case "update":
        if (newData) {
          const updateDatasets = [...datasets]
          updateDatasets[id as number] = {
            backgroundColor:
              newData.backgroundColor ||
              updateDatasets[id as number].backgroundColor,
            data: newData.data || updateDatasets[id as number].data,
            label: newData.label || updateDatasets[id as number].label,
            borderColor:
              newData.borderColor || updateDatasets[id as number].borderColor,
            borderWidth:
              newData.borderWidth || updateDatasets[id as number].borderWidth,
          }
          setDatasets([...updateDatasets])
          handleUpdateContent({ data: { datasets: updateDatasets } })
        }
        break
      case "delete":
        const keptDatasets = [...datasets]
        keptDatasets.splice(id as number, 1)
        if (keptDatasets) {
          setDatasets([...keptDatasets])
          handleUpdateContent({ data: { datasets: keptDatasets } })
        }
    }
  }

  function handleUpdateSaveAs(value: string) {
    setSaveAs(value)
    handleUpdateIsUpdating(true)
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleClosing() {
    handleUpdateContent({})
    setSaveAs(undefined)
    setDatasets([
      {
        backgroundColor: "",
        borderColor: "",
        borderWidth: "",
        data: "",
        label: "",
      },
    ])
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
    onClose()
  }

  function onAddBlock() {
    handleAddBlock({
      id: v4(),
      type: "chart",
      save_as: saveAs,
      data: content,
    })
    handleClosing()
  }

  useEffect(() => {
    if (content && saveAs) {
      onAddBlock()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("chartconfig:cancel")}
          onClick={() => handleClosing()}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("chartconfig:add")}
            onClick={() => onAddBlock()}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("chartconfig:cancel")}
          onClick={() => handleClosing()}
        />,
      ]
    }
  }

  const handleOpenVariablePanelForTitle = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateContent({ title: `${content?.title}${variable}` })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForLabel = ({ id, type }: IUpdateDatasets) => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateDatasets({ id, type, newData: { label: variable } })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForData = ({ id, type }: IUpdateDatasets) => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateDatasets({ id, type, newData: { data: variable } })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForBgColor = ({ id, type }: IUpdateDatasets) => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateDatasets({
          id,
          type,
          newData: { backgroundColor: variable },
        })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForBorderColor = ({
    id,
    type,
  }: IUpdateDatasets) => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateDatasets({
          id,
          type,
          newData: { borderColor: variable },
        })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForBorderWidth = ({
    id,
    type,
  }: IUpdateDatasets) => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateDatasets({
          id,
          type,
          newData: { borderWidth: variable },
        })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForLabels = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateContent({
          data: { labels: `${content?.data?.labels}${variable}` },
        })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForSaveAs = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateSaveAs(`${saveAs}${variable}`)
      })
    handleOpenVariablePanel()
  }

  return (
    <>
      <Dialog
        isOpen={isOpen}
        title={text("chartconfig:toptitle")}
        onClose={() => {}}
      >
        <div className="flex flex-col items-center gap-3">
          <Card>
            <CardText label={text("chartconfig:title")} />
            <CardTextInput
              input={{
                label: text("chartconfig:titlelabel"),
                onChange: (title) => handleUpdateContent({ title: title }),
                inputValue: content?.title,
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: handleOpenVariablePanelForTitle,
              }}
            />
          </Card>

          <Card>
            <CardText label={text("chartconfig:type")} />
            <CardText
              label={text("chartconfig:line")}
              indicator={{
                icon: Check,
                isVisible: content?.chartType !== "line",
              }}
              onClick={() => handleUpdateContent({ chartType: "line" })}
            />
            <CardLine />
            <CardText
              label={text("chartconfig:verticalbar")}
              indicator={{
                icon: Check,
                isVisible: content?.chartType !== "verticalbar",
              }}
              onClick={() => handleUpdateContent({ chartType: "verticalbar" })}
            />
            <CardLine />
            <CardText
              label={text("chartconfig:horizontalbar")}
              indicator={{
                icon: Check,
                isVisible: content?.chartType !== "horizontalbar",
              }}
              onClick={() =>
                handleUpdateContent({ chartType: "horizontalbar" })
              }
            />
            <CardLine />
            <CardText
              label={text("chartconfig:scatter")}
              indicator={{
                icon: Check,
                isVisible: content?.chartType !== "scatter",
              }}
              onClick={() => handleUpdateContent({ chartType: "scatter" })}
            />
            <CardLine />
            <CardText
              label={text("chartconfig:pie")}
              indicator={{
                icon: Check,
                isVisible: content?.chartType !== "pie",
              }}
              onClick={() => handleUpdateContent({ chartType: "pie" })}
            />
          </Card>

          {content?.chartType === "pie" && (
            <Card>
              <CardText label={text("chartconfig:labels")} />
              <CardTextInput
                input={{
                  label: text("chartconfig:labelslabel"),
                  onChange: (labels) =>
                    handleUpdateContent({ data: { labels: labels } }),
                  inputValue: content?.data?.labels?.toString() || "",
                }}
                indicator={{
                  icon: BracketsCurly,
                  onClick: handleOpenVariablePanelForLabels,
                }}
              />
            </Card>
          )}

          {datasets?.map((dataset, index) => {
            return (
              <Card key={index}>
                <CardText
                  label={`${text("chartconfig:dataset")} ${index + 1}`}
                  indicator={{ icon: X }}
                  onClick={() =>
                    handleUpdateDatasets({ id: index, type: "delete" })
                  }
                />
                <CardLine />
                <CardText label={text("chartconfig:label")} />
                <CardTextInput
                  input={{
                    onChange: (label) =>
                      handleUpdateDatasets({
                        id: index,
                        type: "update",
                        newData: { label: label },
                      }),
                    inputValue: dataset.label,
                    label: text("chartconfig:labellabel"),
                  }}
                  indicator={{
                    icon: BracketsCurly,
                    onClick: () =>
                      handleOpenVariablePanelForLabel({
                        id: index,
                        type: "update",
                      }),
                  }}
                />
                <CardText label={text("chartconfig:data")} />
                <CardTextInput
                  input={{
                    onChange: (data) =>
                      handleUpdateDatasets({
                        id: index,
                        type: "update",
                        newData: { data: data },
                      }),
                    inputValue: dataset.data,
                    label: text("chartconfig:datalabel"),
                  }}
                  indicator={{
                    icon: BracketsCurly,
                    onClick: () =>
                      handleOpenVariablePanelForData({
                        id: index,
                        type: "update",
                      }),
                  }}
                />
                <CardText label={text("chartconfig:bgcolor")} />
                <CardTextInput
                  input={{
                    onChange: (color) =>
                      handleUpdateDatasets({
                        id: index,
                        type: "update",
                        newData: { backgroundColor: color },
                      }),
                    inputValue: dataset.backgroundColor,
                    label: text("chartconfig:bgcolorlabel"),
                  }}
                  indicator={{
                    icon: BracketsCurly,
                    onClick: () =>
                      handleOpenVariablePanelForBgColor({
                        id: index,
                        type: "update",
                      }),
                  }}
                />
                {content?.chartType !== "scatter" && (
                  <>
                    <CardText label={text("chartconfig:bordercolor")} />
                    <CardTextInput
                      input={{
                        onChange: (color) =>
                          handleUpdateDatasets({
                            id: index,
                            type: "update",
                            newData: { borderColor: color },
                          }),
                        inputValue: dataset.borderColor,
                        label: text("chartconfig:bordercolorlabel"),
                      }}
                      indicator={{
                        icon: BracketsCurly,
                        onClick: () =>
                          handleOpenVariablePanelForBorderColor({
                            id: index,
                            type: "update",
                          }),
                      }}
                    />
                    {content?.chartType === "pie" && (
                      <>
                        <CardText label={text("chartconfig:borderwidth")} />
                        <CardTextInput
                          input={{
                            onChange: (width) =>
                              handleUpdateDatasets({
                                id: index,
                                type: "update",
                                newData: { borderWidth: width },
                              }),
                            inputValue: dataset.borderWidth,
                            label: text("chartconfig:borderwidthlabel"),
                          }}
                          indicator={{
                            icon: BracketsCurly,
                            onClick: () =>
                              handleOpenVariablePanelForBorderWidth({
                                id: index,
                                type: "update",
                              }),
                          }}
                        />
                      </>
                    )}
                  </>
                )}
              </Card>
            )
          })}
          <Tag
            variant="txt"
            text={text("chartconfig:newdataset")}
            onClick={() => handleUpdateDatasets({ type: "add" })}
          />

          <Card>
            <CardText label={text("chartconfig:saveas")} />
            <CardTextInput
              input={{
                label: text("chartconfig:saveaslabel"),
                onChange: (value) => handleUpdateSaveAs(value),
                inputValue: saveAs,
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: handleOpenVariablePanelForSaveAs,
              }}
            />
          </Card>

          <div className="w-full h-fit hidden xl:block">
            <Button
              block={{
                data: {
                  color: "bg-white",
                  text: text("chartconfig:cancel"),
                  onClick: () => handleClosing(),
                },
              }}
              isEditable={false}
            />
          </div>
          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                block={{
                  data: {
                    color: "bg-white",
                    text: text("chartconfig:addblock"),
                    onClick: () => handleUpdateRunUpdate(true),
                  },
                }}
                isEditable={false}
              />
            </div>
          )}
        </div>
        <TabBar isHidden={true} tags={handleTabBar()} />
      </Dialog>
    </>
  )
}
