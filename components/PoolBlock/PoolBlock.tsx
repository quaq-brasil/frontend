import { PencilSimple } from "phosphor-react"
import { useState } from "react"

type option = {
  text: string
  isSelected: boolean
  index: number
}

type PoolBlockProps = {
  title: string
  options: option[]
  onSelect: (answers: option[]) => void
  maxAnswers?: number
  minAnswers?: number
  isEditable?: boolean
}

export const PoolBlock = (props: PoolBlockProps) => {
  const [answers, setAnswers] = useState([...props.options])
  const [selectedAnswers, setSelectedAnswers] = useState(0)

  function handleSelect(answer: option) {
    const tempAnswers = [...answers]

    if (answer.isSelected) {
      setSelectedAnswers(selectedAnswers - 1)
    } else {
      setSelectedAnswers(selectedAnswers + 1)
    }

    tempAnswers[answer.index].isSelected = !tempAnswers[answer.index].isSelected
    setAnswers(tempAnswers)
    props.onSelect(tempAnswers)
  }

  const isMaxAchieved = selectedAnswers === props.maxAnswers
  const isMinAchieved = selectedAnswers >= (props.minAnswers || 0)

  return (
    <div className="flex relative justify-end min-w-[100%]">
      {props.isEditable === true && (
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
            {props.title}
          </p>
        </div>
        <span className="w-full p-[0.5px] bg-slate-100"></span>
        {props.minAnswers && (
          <div
            className={`w-full text-center lg:text-[1.1rem] ${
              isMaxAchieved || isMinAchieved ? "" : "text-rose-500"
            }`}
          >
            <p>
              {selectedAnswers}/{props.minAnswers || props.maxAnswers}
            </p>
          </div>
        )}
        <span className="w-full p-[0.5px] bg-slate-100"></span>
        <div className="py-1">
          {answers.map((answer, index) => (
            <button
              className={`flex flex-row justify-between items-center py-3 gap-3 rounded-[0.9375rem] px-3 mb-2 w-full lg:rounded-[1.25rem]
                  ${
                    answer.isSelected ? "bg-slate-900 text-white" : "bg-white"
                  }`}
              disabled={answer.isSelected ? false : isMaxAchieved || false}
              key={index}
              onClick={() => handleSelect(answer)}
            >
              <div
                className={`rounded-full w-[1.5625rem] h-[1.5625rem] border-[0.1875rem] shrink-0
                      ${
                        answer.isSelected ? "border-white" : "border-slate-500"
                      }`}
              ></div>
              <p className="w-full text-left lg:text-[1.1rem]">{answer.text}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
