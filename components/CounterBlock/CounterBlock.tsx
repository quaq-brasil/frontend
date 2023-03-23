import { PencilSimple } from "phosphor-react"
import { useState } from "react"

type CounterBlockProps = {
  text: string
  isEditable: boolean
  updateFunc?: (currenValue: number) => void
}

export const CounterBlock = ({
  text,
  isEditable,
  updateFunc,
}: CounterBlockProps) => {
  const [counter, setCounter] = useState(0)

  function handleIncrement() {
    setCounter(counter + 1)
    updateFunc && updateFunc(counter + 1)
  }

  function handleDecrement() {
    if (counter > 0) {
      setCounter(counter - 1)
      updateFunc && updateFunc(counter - 1)
    }
  }

  return (
    <div className="flex relative min-w-[100%] justify-end content-center">
      {isEditable && (
        <div className="z-10 absolute flex justify-start content-center rounded-full bg-white border border-slate-100">
          <PencilSimple className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
        </div>
      )}
      <div className="flex justify-between items-center min-w-[100%] bg-white p-[0.75rem] rounded-[20px] lg:rounded-[30px]">
        <p className="lg:text-[1.1rem]">{text}</p>
        <div className="flex row justify-between items-center border border-slate-100 rounded-full px-3 py-[0.1875rem] w-[7.125rem] lg:w-[11rem]">
          <button
            className="p-[0.3125rem] lg:p-[0.625rem] text-slate-500 lg:text-[1.1rem]"
            onClick={handleDecrement}
          >
            -1
          </button>
          <p className="inline-block mx-[0.625rem] lg:mx-[1.25rem] lg:text-[20px]">
            {counter}
          </p>
          <button
            className="p-[0.3125rem] lg:p-[0.625rem] text-slate-500 lg:text-[1.1rem]"
            onClick={handleIncrement}
          >
            +1
          </button>
        </div>
      </div>
    </div>
  )
}
