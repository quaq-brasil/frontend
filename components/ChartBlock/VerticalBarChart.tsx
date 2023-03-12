import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js"
import { Card } from "components/Card/Card"
import { Trash } from "phosphor-react"
import { Bar } from "react-chartjs-2"

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

type VerticalBarChartProps = {
  data: IData
  title: string
  isEditable: boolean
  onDelete?: () => void
}

export function VerticalBarChart({
  data,
  title,
  isEditable,
  onDelete,
}: VerticalBarChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
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
