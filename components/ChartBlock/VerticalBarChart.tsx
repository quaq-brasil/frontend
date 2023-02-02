import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js"
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

type VerticalBarChartProps = {
  data: IData
  title: string
}

export function VerticalBarChart({ data, title }: VerticalBarChartProps) {
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
      <Bar className="px-2 md:px-6" options={options} data={data} />
    </Card>
  )
}
