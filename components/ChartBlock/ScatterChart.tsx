import {
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js"
import { Trash } from "phosphor-react"
import { Scatter } from "react-chartjs-2"
import { Card } from "../Card/Card"

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

type IDataset = {
  label: string
  data: number[][]
  backgroundColor: string
}

type IData = {
  datasets: IDataset[]
}

type ScatterChartProps = {
  data: IData
  title: string
  isEditable: boolean
  onDelete?: () => void
}

export function ScatterChart({
  data,
  title,
  isEditable,
  onDelete,
}: ScatterChartProps) {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  }

  return (
    <div className="flex relative justify-end w-full">
      {isEditable === true && (
        <button
          onClick={onDelete}
          className="z-10 absolute right-0 top-0 rounded-full bg-white border border-slate-100"
        >
          <Trash className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
        </button>
      )}
      <Card>
        <Scatter className="px-2 md:px-6" options={options} data={data} />
      </Card>
    </div>
  )
}
