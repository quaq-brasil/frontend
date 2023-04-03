import { Button } from "components/Button/Button"
import useTranslation from "next-translate/useTranslation"
import { BracketsCurly, Check, X } from "phosphor-react"
import { useEffect, useState } from "react"

import { Card } from "components/Card/Card"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "components/Dialog/Dialog"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import { useValidation, validationRules } from "hooks/useValidation"
import { BlocksConfigProps } from "types/BlockConfig.types"

export function ChartConfig({
  handleAddBlock,
  isOpen,
  onClose,
  handleOpenVariablePanel,
  setFunctionHandleAddVariable,
  handleCheckSaveAs,
  blockData,
}: BlocksConfigProps) {
  const text = useTranslation().t

  type DatasetsProps = {
    label?: string
    data?: string
    backgroundColor?: string
    borderColor?: string
    borderWidth?: string
  }

  type ChartProps = {
    chartType?: string
    data?: {
      datasets?: DatasetsProps[]
      labels?: string
    }
    title?: string
    save_as?: string
  }

  const [
    localBlockData,
    setLocalBlockData,
    LocalBlockDataErrors,
    isLocalBlockDataValid,
  ] = useValidation<ChartProps>({
    save_as: {
      initialValue: "",
      validators: [
        validationRules.required(text("validation:required")),
        validationRules.custom(
          text("createtemplate:saveas"),
          handleCheckSaveAs,
          [blockData?.save_as]
        ),
      ],
    },
  })

  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)
  const [hasDataChanged, setHasDataChanged] = useState(false)

  function handleUpdateLocalBlockData(newBlockData: ChartProps) {
    setLocalBlockData({ ...localBlockData, ...newBlockData })
  }

  type IUpdateDatasets = {
    id?: number
    type: string
    newData?: DatasetsProps
  }

  function handleUpdateDatasets({ id, type, newData }: IUpdateDatasets) {
    switch (type) {
      case "add":
        handleUpdateLocalBlockData({
          data: {
            datasets: [
              ...localBlockData.data.datasets,
              {
                backgroundColor: "",
                data: "",
                label: "",
                borderColor: "",
                borderWidth: "",
              },
            ],
          },
        })
        break
      case "update":
        if (newData) {
          const updateDatasets = [...localBlockData.data.datasets]
          updateDatasets[id] = {
            backgroundColor:
              newData.backgroundColor || updateDatasets[id].backgroundColor,
            data: newData.data || updateDatasets[id].data,
            label: newData.label || updateDatasets[id].label,
            borderColor: newData.borderColor || updateDatasets[id].borderColor,
            borderWidth: newData.borderWidth || updateDatasets[id].borderWidth,
          }
          handleUpdateLocalBlockData({
            data: { datasets: [...updateDatasets] },
          })
        }
        break
      case "delete":
        const newDatasets = [
          ...(localBlockData.data.datasets as DatasetsProps[]),
        ]
        newDatasets.splice(id, 1)
        if (newDatasets.length === 0) {
          handleUpdateLocalBlockData({
            data: {
              datasets: [
                {
                  backgroundColor: "",
                  borderColor: "",
                  borderWidth: "",
                  data: "",
                  label: "",
                },
              ],
            },
          })
        } else {
          handleUpdateLocalBlockData({ data: { datasets: [...newDatasets] } })
        }
    }
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function checkIfDataHasChanged() {
    if (blockData) {
      let hasDataChanged = false
      if (blockData?.data?.chartType !== localBlockData?.chartType) {
        hasDataChanged = true
      }
      if (blockData?.data?.data !== localBlockData?.data) {
        hasDataChanged = true
      }
      if (blockData?.data?.title !== localBlockData?.title) {
        hasDataChanged = true
      }
      if (blockData?.save_as !== localBlockData?.save_as) {
        hasDataChanged = true
      }
      return hasDataChanged
    } else {
      return false
    }
  }

  function handleClosing() {
    setLocalBlockData({
      chartType: "",
      data: {
        datasets: [
          {
            backgroundColor: "",
            borderColor: "",
            borderWidth: "",
            data: "",
            label: "",
          },
        ],
        labels: "",
      },
      save_as: "",
    })
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
    setHasDataChanged(false)
    onClose()
  }

  function onAddBlock() {
    handleAddBlock({
      id: blockData?.id || undefined,
      type: "chart",
      save_as: localBlockData.save_as,
      data: {
        chartType: localBlockData.chartType,
        datasets: localBlockData.data.datasets,
        labels: localBlockData.data.labels,
        title: localBlockData.title,
      },
    })
    handleClosing()
  }

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
            text={
              blockData ? text("chartconfig:update") : text("chartconfig:add")
            }
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
        handleUpdateLocalBlockData({
          title: localBlockData?.title
            ? `${localBlockData?.title}${variable}`
            : variable,
        })
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
        handleUpdateLocalBlockData({
          data: {
            labels: localBlockData?.data?.labels
              ? `${localBlockData?.data?.labels}${variable}`
              : variable,
          },
        })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForSaveAs = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateLocalBlockData({
          save_as: localBlockData.save_as
            ? `${localBlockData.save_as}${variable}`
            : variable,
        })
      })
    handleOpenVariablePanel()
  }

  useEffect(() => {
    if (blockData) {
      setLocalBlockData({
        chartType: blockData.data.chartType,
        data: {
          datasets: blockData.data.datasets,
          labels: blockData.data.labels,
        },
        title: blockData.data.title,
        save_as: blockData.save_as,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockData])

  useEffect(() => {
    if (runUpdate && isLocalBlockDataValid) {
      if (!blockData) {
        onAddBlock()
      } else {
        if (checkIfDataHasChanged()) {
          onAddBlock()
        }
      }
    } else if (runUpdate && !isLocalBlockDataValid) {
      setHasDataChanged(true)
      handleUpdateRunUpdate(false)
      handleUpdateIsUpdating(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  useEffect(() => {
    if (blockData) {
      if (checkIfDataHasChanged() && isLocalBlockDataValid) {
        handleUpdateIsUpdating(true)
      } else {
        handleUpdateIsUpdating(false)
      }
    } else {
      if (isLocalBlockDataValid) {
        handleUpdateIsUpdating(true)
      } else {
        handleUpdateIsUpdating(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localBlockData, isLocalBlockDataValid])

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
                onChange: (title) => {
                  handleUpdateLocalBlockData({ title: title })
                },
                value: localBlockData?.title,
                errors: hasDataChanged ? LocalBlockDataErrors.title : [],
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
                isVisible: localBlockData?.chartType !== "line",
              }}
              onClick={() => {
                handleUpdateLocalBlockData({ chartType: "line" })
              }}
            />
            <CardLine />
            <CardText
              label={text("chartconfig:verticalbar")}
              indicator={{
                icon: Check,
                isVisible: localBlockData?.chartType !== "verticalbar",
              }}
              onClick={() => {
                handleUpdateLocalBlockData({ chartType: "verticalbar" })
              }}
            />
            <CardLine />
            <CardText
              label={text("chartconfig:horizontalbar")}
              indicator={{
                icon: Check,
                isVisible: localBlockData?.chartType !== "horizontalbar",
              }}
              onClick={() => {
                handleUpdateLocalBlockData({ chartType: "horizontalbar" })
              }}
            />
            <CardLine />
            <CardText
              label={text("chartconfig:scatter")}
              indicator={{
                icon: Check,
                isVisible: localBlockData?.chartType !== "scatter",
              }}
              onClick={() => {
                handleUpdateLocalBlockData({ chartType: "scatter" })
              }}
            />
            <CardLine />
            <CardText
              label={text("chartconfig:pie")}
              indicator={{
                icon: Check,
                isVisible: localBlockData?.chartType !== "pie",
              }}
              onClick={() => {
                handleUpdateLocalBlockData({ chartType: "pie" })
              }}
            />
          </Card>

          {localBlockData?.chartType === "pie" && (
            <Card>
              <CardText label={text("chartconfig:labels")} />
              <CardTextInput
                input={{
                  label: text("chartconfig:labelslabel"),
                  onChange: (labels) =>
                    handleUpdateLocalBlockData({ data: { labels: labels } }),
                  value: localBlockData?.data?.labels?.toString() || "",
                }}
                indicator={{
                  icon: BracketsCurly,
                  onClick: handleOpenVariablePanelForLabels,
                }}
              />
            </Card>
          )}

          {localBlockData.data.datasets?.map((dataset, index) => {
            return (
              <Card key={dataset.data}>
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
                    value: dataset.label,
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
                    value: dataset.data,
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
                    value: dataset.backgroundColor,
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
                {localBlockData?.chartType !== "scatter" && (
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
                        value: dataset.borderColor,
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
                    {localBlockData?.chartType === "pie" && (
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
                            value: dataset.borderWidth,
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
                onChange: (value) =>
                  handleUpdateLocalBlockData({ save_as: value }),
                value: localBlockData.save_as,
                errors: localBlockData.save_as
                  ? LocalBlockDataErrors.save_as
                  : [],
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
                    text: blockData
                      ? text("chartconfig:updateblock")
                      : text("chartconfig:addblock"),
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
