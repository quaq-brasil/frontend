import { PencilSimple } from "phosphor-react"
import { IBlock } from "../../types/Block.types"
import { HorizontalBarChart } from "./HorizontalBarChart"
import { LineChart } from "./LineChart"
import { PieChart } from "./PieChart"
import { ScatterChart } from "./ScatterChart"
import { VerticalBarChart } from "./VerticalBarChart"

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
}

export const ChartBlock = ({ block, isEditable }: ChartBlockProps) => {
  function renderChart(type: string) {
    switch (type) {
      case "line":
        return (
          <LineChart
            data={{
              datasets: block.data.dataset as IDataSet[],
              labels: block.data.labels as string[],
            }}
            title={block.title as string}
          />
        )
      case "horizontalbar":
        return (
          <HorizontalBarChart
            data={{
              datasets: block.data.dataset as IDataSet[],
              labels: block.data.labels as string[],
            }}
            title={block.title as string}
          />
        )
      case "verticalbar":
        return (
          <VerticalBarChart
            data={{
              datasets: block.data.dataset as IDataSet[],
              labels: block.data.labels as string[],
            }}
            title={block.title as string}
          />
        )
      case "pie":
        return (
          <PieChart
            data={{
              datasets: block.data as IDataSet2[],
              labels: block.data.labels as string[],
            }}
            title={block.title as string}
          />
        )
      case "scatter":
        return (
          <ScatterChart
            data={{ datasets: block.data as IDataSet3[] }}
            title={block.title as string}
          />
        )
    }
  }

  return (
    <div className="flex relative justify-end">
      {isEditable === true && (
        <div className="z-10 absolute right-0 top-0 rounded-full bg-white border border-slate-100">
          <PencilSimple className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
        </div>
      )}
      <div
        className="flex flex-col w-full justify-center items-center bg-white 
          p-[0.75rem] rounded-[20px] lg:rounded-[30px]"
      >
        {block.type && renderChart(block.type)}
      </div>
    </div>
  )
}
