import useTranslation from "next-translate/useTranslation"
import { HorizontalBarChart } from "../components/ChartBlock/HorizontalBarChart"
import { LineChart } from "../components/ChartBlock/LineChart"
import { PieChart } from "../components/ChartBlock/PieChart"
import { ScatterChart } from "../components/ChartBlock/ScatterChart"
import { VerticalBarChart } from "../components/ChartBlock/VerticalBarChart"
import { Header } from "../components/Header/Header"
import { TabBar } from "../components/TabBar/TabBar"
import { Tag } from "../components/Tag/Tag"

export default function TestPage() {
  const text = useTranslation().t

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("profile:back")}
        onClick={() => console.log("tab1")}
      />,
    ]
  }

  function loadHeader() {
    return (
      <Header
        background_url={
          "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        }
      >
        <Tag variant="txt" text={"testing"} />
      </Header>
    )
  }

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ]

  const datasets = [
    {
      label: "Dataset 1",
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ]

  const datasets2 = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const datasets3 = {
    datasets: [
      {
        label: "A dataset",
        data: [
          [1, 2],
          [4, 6],
          [2, 3],
          [0, 1],
          [6, 9],
        ],
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <div className="w-full h-screen bg-slate-100">
        <div
          className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
        >
          <div className="flex flex-col gap-2 md:gap-4 items-center">
            <LineChart
              data={{ datasets: datasets, labels: labels }}
              title="title"
              isEditable={true}
            />
            <VerticalBarChart
              data={{ datasets: datasets, labels: labels }}
              title="title"
            />
            <HorizontalBarChart
              data={{ datasets: datasets, labels: labels }}
              title="title"
            />
            <PieChart data={datasets2} title="tile" />
            <ScatterChart data={datasets3} title="title" />
            <span className="w-full h-[4rem]"></span>
          </div>
        </div>
      </div>
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
