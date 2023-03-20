import { CardLine } from "components/Card/CardContentVariants/CardLine"
import dynamic from "next/dynamic"
import { useCallback, useEffect, useState } from "react"
import { IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"
import { Option } from "./Option"

const BlockMenu = dynamic(
  () => import("components/BlockMenu/BlockMenu").then((mod) => mod.BlockMenu),
  { ssr: false }
)

interface Options {
  id: number
  value: string
}

interface IData {
  options: Options[]
  max?: string
  min?: string
  description: string
}

interface IPoolBlock extends IBlock {
  data: IData
}

interface PoolBlockProps {
  block: IPoolBlock
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
}

type IAnswer = {
  id: number
  value: string
  selected: boolean
}

type IEvent = Partial<{
  displayedAt: string
  lastInteractionAt: string
  firstInteractionAt: string
  maxAchievedAt: string
  minAchievedAt: string
}>

export const PoolBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: PoolBlockProps) => {
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
    setAnswers(tempAnswers)
  }, [block])

  function handleUpdateEvents(newEvent: IEvent) {
    setEvents((state) => {
      return {
        ...state,
        ...newEvent,
      } as IEvent
    })
  }

  const handleSelect = useCallback(
    (answer: IAnswer) => {
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [answers, events]
  )

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
        id: block.id,
        config: {
          id: block.id,
          save_as: block.save_as,
          type: block.type,
          data: {
            description: block.data.description,
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
    if (answers) {
      const max = Number(block.data.max) || 0
      const min = Number(block.data.min) || 0
      const maxAchieved = selectedAnswers === max
      const minAchieved = selectedAnswers >= min

      const date = new Date().toString()

      if (maxAchieved) {
        handleUpdateEvents({ maxAchievedAt: date })
      }

      if (minAchieved) {
        handleUpdateEvents({ minAchievedAt: date })
      }
      onInteraction()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAnswers, answers])

  return (
    <div className="flex relative justify-end min-w-[100%]">
      {isEditable && <BlockMenu onDelete={onDelete} onEdit={onEdit} />}
      <div
        className="flex flex-col px-3 pt-3 gap-[0.3125rem] justify-center
            min-w-[100%] bg-white rounded-[20px] lg:rounded-[30px] lg:px-[1.125rem]"
      >
        <div>
          <p className="pt-1 pb-2 lg:text-[1.1rem] ">
            {block.data.description}
          </p>
        </div>
        <CardLine />
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
        <CardLine />
        <div className="flex flex-col gap-3 py-3">
          {answers &&
            answers.map((answer) => (
              <>
                <Option
                  key={answer.id}
                  answer={answer}
                  isMaxAchieved={isMaxAchieved}
                  handleSelect={handleSelect}
                />
                <CardLine />
              </>
            ))}
        </div>
      </div>
    </div>
  )
}
