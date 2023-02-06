import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js"
import { Trash } from "phosphor-react"
import { Bar } from "react-chartjs-2"
import { Card } from "../Card/Card"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type IDataset = {
  label: string
  data: any[]
  borderColor: string
  backgroundColor: string
}

type IData = {
  labels: any[]
  datasets: IDataset[]
}

type HorizontalBarChartProps = {
  data: IData
  title: string
  isEditable: boolean
  onDelete?: () => void
}

export function HorizontalBarChart({
  data,
  title,
  isEditable,
  onDelete,
}: HorizontalBarChartProps) {
  const options = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
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
        <Bar className="px-2 md:px-6" options={options} data={data} />
      </Card>
    </div>
  )
}
