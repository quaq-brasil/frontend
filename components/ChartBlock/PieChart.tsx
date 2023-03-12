import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js"
import { Card } from "components/Card/Card"
import { Trash } from "phosphor-react"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

type IDataset = {
  label: string
  data: any[]
  borderColor: string[]
  backgroundColor: string[]
  borderWidth: number
}

type IData = {
  datasets: IDataset[]
  labels?: string[]
}

type PieChartProps = {
  data: IData
  title: string
  isEditable: boolean
  onDelete?: () => void
}

export function PieChart({ data, title, isEditable, onDelete }: PieChartProps) {
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
        <Pie className="px-2 md:px-6" data={data} options={options} />
      </Card>
    </div>
  )
}
