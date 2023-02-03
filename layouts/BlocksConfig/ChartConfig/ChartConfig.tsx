import useTranslation from "next-translate/useTranslation"
import { BracketsCurly, Check } from "phosphor-react"
import { useEffect, useState } from "react"
import { BlockProps } from "../../../components/BlockReader/BlockReader"
import { Button } from "../../../components/Button/Button"

import { Card } from "../../../components/Card/Card"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"

type ChartConfigProps = {
  isOpen: boolean
  setIsOpen: () => void
  handleAddBlock: (block: BlockProps) => void
}

export function ChartConfig({
  handleAddBlock,
  isOpen,
  setIsOpen,
}: ChartConfigProps) {
  const text = useTranslation().t

  type IDatasets = {
    label: string
    data: any[]
    backgroundColor: string
    borderColor?: string
    borderWidth?: number
  }

  type IChart = {
    chartType?: string
    data?: {
      datasets?: IDatasets[]
      labels?: string[]
    }
    title?: string
  }

  const [content, setContent] = useState<IChart>()
  const [saveas, setSaveas] = useState<string>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateConent(newData: IChart) {
    setContent({
      ...content,
      chartType: newData.chartType || content?.chartType,
      data: {
        datasets: newData.data?.datasets || content?.data?.datasets,
        labels: newData.data?.labels || content?.data?.labels,
      },
      title: newData.title || content?.title,
    })
    handleUpdateIsUpdating(true)
  }

  function handleUpdateSaveas(value: string) {
    setSaveas(value)
    handleUpdateIsUpdating(true)
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleClosing() {
    handleUpdateConent({})
    setSaveas(undefined)
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
    setIsOpen()
  }

  function onAddBlock() {
    handleAddBlock({
      type: "chart",
      saveAs: saveas,
      data: { content },
    })
    handleClosing()
  }

  useEffect(() => {
    if (content && saveas) {
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

  return (
    <>
      <Dialog
        isOpen={isOpen}
        title={text("chartconfig:toptitle")}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col items-center gap-3">
          <Card>
            <CardText label={text("chartconfig:title")} />
            <CardTextInput
              input={{
                label: text("chartconfig:titlelabel"),
                onChange: (title) => handleUpdateConent({ title: title }),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>

          <Card>
            <CardText label={text("chartconfig:type")} />
            <CardText
              label={text("chartconfig:line")}
              indicator={{
                icon: Check,
                isVisible: content?.chartType == "line",
              }}
              onClick={() => handleUpdateConent({ chartType: "line" })}
            />
            <CardText
              label={text("chartconfig:verticalbar")}
              indicator={{
                icon: Check,
                isVisible: content?.chartType == "verticalbar",
              }}
              onClick={() => handleUpdateConent({ chartType: "verticalbar" })}
            />
            <CardText
              label={text("chartconfig:horizontalbar")}
              indicator={{
                icon: Check,
                isVisible: content?.chartType == "horizontalbar",
              }}
              onClick={() => handleUpdateConent({ chartType: "horizontalbar" })}
            />
            <CardText
              label={text("chartconfig:scatter")}
              indicator={{
                icon: Check,
                isVisible: content?.chartType == "scatter",
              }}
              onClick={() => handleUpdateConent({ chartType: "scatter" })}
            />
            <CardText
              label={text("chartconfig:pie")}
              indicator={{
                icon: Check,
                isVisible: content?.chartType == "pie",
              }}
              onClick={() => handleUpdateConent({ chartType: "pie" })}
            />
          </Card>

          <Card>
            <CardText label={text("chartconfig:labels")} />
            <CardTextInput
              input={{
                label: text("chartconfig:labelslabel"),
                onChange: (labels) => {},
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
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
