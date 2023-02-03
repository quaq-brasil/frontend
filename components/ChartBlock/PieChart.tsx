import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js"
import { Pie } from "react-chartjs-2"
import { Card } from "../Card/Card"

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
}

export function PieChart({ data, title }: PieChartProps) {
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
    <Card>
      <Pie className="px-2 md:px-6" data={data} options={options} />
    </Card>
  )
}
