import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { Card } from "../Card/Card"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

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

type LineChartProps = {
  data: IData
  title: string
}

export function LineChart({ data, title }: LineChartProps) {
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
      <Line className="px-2 md:px-6" options={options} data={data} />
    </Card>
  )
}
