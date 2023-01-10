import { PencilSimple } from "phosphor-react"
import { useState } from "react"

type CounterBlockProps = {
  text: string
  isEditable: boolean
  updateFunc?: (currenValue: number) => void
}

export const CounterBlock = (props: CounterBlockProps) => {
  let [counter, setCounter] = useState(0)
  
  function handleIncrement() {
    setCounter(counter + 1)
    props.updateFunc && props.updateFunc(counter + 1)
  }

  function handleDecrement() {
    if (counter > 0) {
      setCounter(counter - 1)
      props.updateFunc && props.updateFunc(counter - 1)
    }
  }

  return (
    <>
        {(props.isEditable === false) &&
        <>
          <div className="flex col w-[23.375rem] justify-between items-center bg-white 
          p-[12px] rounded-[20px] lg:w-[35.25rem]">
            <p className="lg:text-[20px]">{props.text}</p>
            <div className="flex row justify-between items-center border border-slate-100 rounded-full px-3 py-[3px] w-[7.125rem] lg:w-[11rem]">
              <button className="rounded-[20px] p-[5px] lg:p-[10px] text-slate-500 lg:text-[20px]" onClick={() => handleDecrement()}>-1</button>
              <p className="inline-block mx-[10px] lg:mx-[20px] lg:text-[20px]">{counter}</p>
              <button className="-[20px] p-[5px] lg:p-[10px] text-slate-500 lg:text-[20px]" onClick={() => handleIncrement()}>+1</button>
            </div>
          </div>
        </>
        }
        {(props.isEditable === true) &&
        <div className="flex col relative w-[23.375rem] justify-end content-center lg:w-[35.25rem]">
          <div className="z-10 absolute flex justify-start content-center rounded-full bg-white">
              <PencilSimple className="w-[1rem] h-[1rem] m-[5px] lg:w-[1.25rem] lg:h-[1.25rem]"/>
          </div>
          <div className="flex col w-[23.375rem] justify-between items-center bg-white 
          p-[12px] rounded-[20px] lg:w-[35.25rem]">
            <p className="lg:text-[20px]">{props.text}</p>
            <div className="flex row justify-between items-center border border-slate-100 rounded-full px-3 py-[3px] w-[7.125rem] lg:w-[11rem]">
              <button className="rounded-[20px] p-[5px] lg:p-[10px] text-slate-500 lg:text-[20px]" onClick={() => setCounter(counter - 1)}>-1</button>
              <p className="inline-block mx-[10px] lg:mx-[20px] lg:text-[20px]">{counter}</p>
              <button className="-[20px] p-[5px] lg:p-[10px] text-slate-500 lg:text-[20px]" onClick={() => setCounter(counter + 1)}>+1</button>
            </div>
          </div>
        </div>
        }
    </>
  )
}