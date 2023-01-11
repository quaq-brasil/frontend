import { PencilSimple, Star } from "phosphor-react"
import { useState } from "react"

type ReviewBlockProps = {
  onSelect: (option: number) => void
  isEditable: boolean
}

export const ReviewBlock = (props: ReviewBlockProps) => {
  const [selected, setSelected] = useState(0)

  function handleOnClick(option: number) {
    setSelected(option)
    props.onSelect(option)
  }

  return (
    <>
      {(!props.isEditable) && 
        <>
          <div className="flex w-[23.375rem] justify-center items-center bg-white 
          p-[0.75rem] rounded-[20px] lg:w-[35.25rem]">
            <div className="flex flex-row gap-1 items-center">
              <button onClick={() => handleOnClick(1)}>
                <Star className={`w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] ${(selected > 0) ? "text-yellow-500" : "text-slate-500"}`}/>
              </button>
              <button onClick={() => handleOnClick(2)}>
                <Star className={`w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] ${(selected > 1) ? "text-yellow-500" : "text-slate-500"}`}/>
              </button>
              <button onClick={() => handleOnClick(3)}>
                <Star className={`w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] ${(selected > 2) ? "text-yellow-500" : "text-slate-500"}`}/>
              </button>
              <button onClick={() => handleOnClick(4)}>
                <Star className={`w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] ${(selected > 3) ? "text-yellow-500" : "text-slate-500"}`}/>
              </button>
              <button onClick={() => handleOnClick(5)}>
                <Star className={`w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] ${(selected > 4) ? "text-yellow-500" : "text-slate-500"}`}/>
              </button>
            </div>
          </div>
        </>
      }
      {(props.isEditable) && 
        <div className='flex relative justify-end'>
          <div className="z-10 absolute flex justify-start content-center rounded-full bg-white border border-slate-100">
              <PencilSimple className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]"/>
          </div>
          <div className="flex w-[23.375rem] justify-center items-center bg-white 
          p-[0.75rem] rounded-[20px] lg:w-[35.25rem]">
            <div className="flex flex-row gap-1 items-center">
              <button onClick={() => handleOnClick(1)}>
                <Star className={`w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] ${(selected > 0) ? "text-yellow-500" : "text-slate-500"}`}/>
              </button>
              <button onClick={() => handleOnClick(2)}>
                <Star className={`w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] ${(selected > 1) ? "text-yellow-500" : "text-slate-500"}`}/>
              </button>
              <button onClick={() => handleOnClick(3)}>
                <Star className={`w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] ${(selected > 2) ? "text-yellow-500" : "text-slate-500"}`}/>
              </button>
              <button onClick={() => handleOnClick(4)}>
                <Star className={`w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] ${(selected > 3) ? "text-yellow-500" : "text-slate-500"}`}/>
              </button>
              <button onClick={() => handleOnClick(5)}>
                <Star className={`w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] ${(selected > 4) ? "text-yellow-500" : "text-slate-500"}`}/>
              </button>
            </div>
          </div>
        </div>
      }
    </>
  )
}