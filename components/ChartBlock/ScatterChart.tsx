import {
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js"
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
}

export function ScatterChart({ data, title }: ScatterChartProps) {
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
    <Card>
      <Scatter className="px-2 md:px-6" options={options} data={data} />
    </Card>
  )
}
