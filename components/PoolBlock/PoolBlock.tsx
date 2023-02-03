import { PencilSimple } from "phosphor-react"
import { useEffect, useState } from "react"
import { IBlock } from "../../types/Block.types"

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
}

export const PoolBlock = ({ block, isEditable }: PoolBlockProps) => {
  type IAnswer = {
    id: number
    value: string
    selected: boolean
  }

  const [answers, setAnswers] = useState<IAnswer[]>()
  const [selectedAnswers, setSelectedAnswers] = useState(0)

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

  function handleSelect(answer: IAnswer) {
    const tempAnswers = [...(answers as IAnswer[])]

    if (answer.selected) {
      setSelectedAnswers(selectedAnswers - 1)
    } else {
      setSelectedAnswers(selectedAnswers + 1)
    }

    tempAnswers[answer.id].selected = !tempAnswers[answer.id].selected
    setAnswers(tempAnswers)
  }

  const isMaxAchieved = selectedAnswers === (Number(block?.data.max) || 0)
  const isMinAchieved = selectedAnswers >= (Number(block.data.min) || 0)

  return (
    <div className="flex relative justify-end min-w-[100%]">
      {isEditable === true && (
        <div className="z-10 absolute right-0 top-0 rounded-full bg-white border border-slate-100">
          <PencilSimple className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
        </div>
      )}
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
