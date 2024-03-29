import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"
import { HorizontalBarChart } from "./HorizontalBarChart"
import { LineChart } from "./LineChart"
import { PieChart } from "./PieChart"
import { ScatterChart } from "./ScatterChart"
import { VerticalBarChart } from "./VerticalBarChart"
const BlockMenu = dynamic(
  () => import("components/BlockMenu/BlockMenu").then((mod) => mod.BlockMenu),
  { ssr: false }
)

type IDataSet = {
  label: string
  data: any[]
  borderColor: string
  backgroundColor: string
}

type IDataSet2 = {
  label: string
  data: any[]
  borderColor: string[]
  backgroundColor: string[]
  borderWidth: number
}
type IDataSet3 = {
  label: string
  data: number[][]
  backgroundColor: string
}

type IData = {
  labels?: string[]
  dataset?: IDataSet[] | IDataSet2[] | IDataSet3[]
}

type IChartBlock = {
  data: IData
  title?: string
  type?: string
} & IBlock

type ChartBlockProps = {
  block: IChartBlock
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
}

export const ChartBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: ChartBlockProps) => {
  type IEvent = {
    displayedAt: string
  }

  const [events, setEvents] = useState<IEvent>()

  useEffect(() => {
    if (!events?.displayedAt) {
      const event = {
        displayedAt: new Date().toString(),
      }
      setEvents(event)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onInteraction = () => {
    handleUpdateInteractions &&
      handleUpdateInteractions({
        id: block.id,
        config: {
          id: block.id,
          save_as: block.save_as,
          type: block.type,
          data: block.data,
        },
        output: {
          events: events,
        },
      })
  }

  useEffect(() => {
    onInteraction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  function renderChart(type: string) {
    switch (type) {
      case "line":
        return (
          <LineChart
            data={{
              datasets: block.data.dataset as IDataSet[],
              labels: block.data.labels,
            }}
            title={block.title}
            onDelete={onDelete}
            isEditable={isEditable}
          />
        )
      case "horizontalbar":
        return (
          <HorizontalBarChart
            data={{
              datasets: block.data.dataset as IDataSet[],
              labels: block.data.labels,
            }}
            title={block.title}
            onDelete={onDelete}
            isEditable={isEditable}
          />
        )
      case "verticalbar":
        return (
          <VerticalBarChart
            data={{
              datasets: block.data.dataset as IDataSet[],
              labels: block.data.labels,
            }}
            title={block.title}
            onDelete={onDelete}
            isEditable={isEditable}
          />
        )
      case "pie":
        return (
          <PieChart
            data={{
              datasets: block.data.dataset as IDataSet2[],
              labels: block.data.labels,
            }}
            title={block.title}
            onDelete={onDelete}
            isEditable={isEditable}
          />
        )
      case "scatter":
        return (
          <ScatterChart
            data={{ datasets: block.data.dataset as IDataSet3[] }}
            title={block.title}
            onDelete={onDelete}
            isEditable={isEditable}
          />
        )
    }
  }

  return (
    <div className="flex relative justify-end">
      {isEditable && <BlockMenu onDelete={onDelete} onEdit={onEdit} />}
      <div
        className="flex flex-col w-full justify-center items-center bg-white 
          p-[0.75rem] rounded-[20px] lg:rounded-[30px]"
      >
        {block.type && renderChart(block.type)}
      </div>
    </div>
  )
}
