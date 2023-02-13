import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { IBlock } from "../../types/Block.types"
import { IInteractionData } from "../../types/Interaction.type"
const BlockMenu = dynamic(
  () => import("../BlockMenu/BlockMenu").then((mod) => mod.default),
  { ssr: false }
)

type options = {
  id: number
  value: string
}

type IData = {
  options: options[]
  max?: string
  min?: string
  title: string
}

type IPoolBlock = {
  data: IData
} & IBlock

type PoolBlockProps = {
  block: IPoolBlock
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
}

export const PoolBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
}: PoolBlockProps) => {
  type IEvent = {
    displayedAt?: string
    lastInteractionAt?: string
    firstInteractionAt?: string
    maxAchievedAt?: string
    minAchievedAt?: string
  }

  type IAnswer = {
    id: number
    value: string
    selected: boolean
  }

  const [events, setEvents] = useState<IEvent>()
  const [answers, setAnswers] = useState<IAnswer[]>()
  const [selectedAnswers, setSelectedAnswers] = useState(0)
  const isMaxAchieved = selectedAnswers === (Number(block?.data.max) || 0)
  const isMinAchieved = selectedAnswers >= (Number(block.data.min) || 0)

  useEffect(() => {
    const tempAnswers: IAnswer[] = block.data.options.map((option) => {
      return {
        id: option.id,
        selected: false,
        value: option.value,
      }
    })
    setAnswers(tempAnswers as IAnswer[])
  }, [block])

  function handleUpdateEvents(newEvent: IEvent) {
    setEvents({
      displayedAt: newEvent.displayedAt || events?.displayedAt,
      firstInteractionAt:
        newEvent.firstInteractionAt || events?.firstInteractionAt,
      lastInteractionAt:
        newEvent.lastInteractionAt || events?.lastInteractionAt,
      maxAchievedAt: newEvent.maxAchievedAt || events?.maxAchievedAt,
      minAchievedAt: newEvent.minAchievedAt || events?.minAchievedAt,
    })
  }

  function handleSelect(answer: IAnswer) {
    if (events?.firstInteractionAt) {
      const firstAndLast = new Date().toString()
      handleUpdateEvents({
        firstInteractionAt: firstAndLast,
        lastInteractionAt: firstAndLast,
      })
    } else {
      const lastInteractionAt = new Date().toString()
      handleUpdateEvents({ lastInteractionAt: lastInteractionAt })
    }

    const tempAnswers = [...(answers as IAnswer[])]

    if (answer.selected) {
      setSelectedAnswers(selectedAnswers - 1)
    } else {
      setSelectedAnswers(selectedAnswers + 1)
    }

    tempAnswers[answer.id].selected = !tempAnswers[answer.id].selected
    setAnswers(tempAnswers)
  }

  useEffect(() => {
    if (!events?.displayedAt) {
      const displayedAt = new Date().toString()
      handleUpdateEvents({ displayedAt: displayedAt })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onInteraction = () => {
    handleUpdateInteractions &&
      handleUpdateInteractions({
        id: block.id as string,
        config: {
          id: block.id as string,
          save_as: block.save_as as string,
          type: block.type as string,
          data: {
            title: block.data.title,
            min: block.data.min,
            max: block.data.max,
            options: block.data.options.map((option) => option.value),
          },
        },
        output: {
          events: events,
          data: {
            options: answers,
          },
        },
      })
  }

  useEffect(() => {
    onInteraction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAnswers])

  useEffect(() => {
    if (isMaxAchieved) {
      const maxAchievedAt = new Date().toString()
      handleUpdateEvents({ maxAchievedAt: maxAchievedAt })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMaxAchieved])

  useEffect(() => {
    if (isMaxAchieved) {
      const minAchievedAt = new Date().toString()
      handleUpdateEvents({ minAchievedAt: minAchievedAt })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMinAchieved])

  return (
    <div className="flex relative justify-end min-w-[100%]">
      {isEditable === true && <BlockMenu />}
      <div
        className="flex flex-col px-2 pt-3 gap-[0.3125rem] justify-center
            min-w-[100%] bg-white 
            rounded-[20px] lg:rounded-[30px] lg-px[1.125rem]"
      >
        <div>
          <p className="pt-3 pb-3 px-1 font-semibold lg:text-[1.1rem] lg:px-[1.125rem]">
            {block.data.title}
          </p>
        </div>
        <span className="w-full p-[0.5px] bg-slate-100"></span>
        {block.data.min && (
          <div
            className={`w-full text-center lg:text-[1.1rem] ${
              isMaxAchieved || isMinAchieved ? "" : "text-rose-500"
            }`}
          >
            <p>
              {selectedAnswers}/{block.data.min || block.data.max}
            </p>
          </div>
        )}
        <span className="w-full p-[0.5px] bg-slate-100"></span>
        <div className="py-1">
          {answers &&
            answers.map((answer, index) => (
              <button
                className={`flex flex-row justify-between items-center py-3 gap-3 rounded-[0.9375rem] px-3 mb-2 w-full lg:rounded-[1.25rem]
                    ${
                      answer.selected ? "bg-slate-900 text-white" : "bg-white"
                    }`}
                disabled={answer.selected ? false : isMaxAchieved || false}
                key={index}
                onClick={() => handleSelect(answer)}
              >
                <div
                  className={`rounded-full w-[1.5625rem] h-[1.5625rem] border-[0.1875rem] shrink-0
                        ${
                          answer.selected ? "border-white" : "border-slate-500"
                        }`}
                ></div>
                <p className="w-full text-left lg:text-[1.1rem]">
                  {answer.value}
                </p>
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}
