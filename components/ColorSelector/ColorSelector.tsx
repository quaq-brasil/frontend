import { IconProps } from "phosphor-react"
import { ForwardRefExoticComponent, RefAttributes, useState } from "react"

type action = {
  label: string
  indicator?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  indicatorColor?: string
  textIndicator?: string
  onClick: () => void
  onChange: (e: string) => void
}

type ColorSelectorProps = {
  title1: action
  input1: action
  title2: action
  input2: action
  onColorSelection: (color: string) => void
}

export function ColorSelector(props: ColorSelectorProps) {
  const [color, setColor] = useState<string>("bg-black")

  function handleColorSelection(color: string) {
    setColor(color)
    props.onColorSelection(color)
  }

  const colors = [
    "bg-black",
    "bg-red-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
  ]

  return (
    <div className="pb-5 flex flex-col gap-[0.3125rem] w-[23.375rem] justify-center bg-white 
    rounded-[20px] lg:w-[35.25rem] lg:rounded-[30px]">
      <div className="pb-3">
        <div className="flex flex-row justify-between items-center px-3 mt-4 lg:px-[1.125rem]">
          {props.title1.label &&
            <p className="lg:text-[1.25rem]">{props.title1.label}</p>
          }
          
          {props.title1.indicator &&
            <button onClick={() => props.title1.onClick()} >
              <><props.title1.indicator className="w-[1.375rem] h-[1.375rem] m-[0.3125rem] lg:w-[1.5625rem] lg:h-[1.5625rem]"/></>
            </button>
          }
        </div>
      </div>

      <input onChange={(e) => props.input1.onChange(e.target.value)} className="bg-slate-50 w-full h-12 px-3 lg:px-[1.125rem] lg:h-[3.375rem]
    placeholder:text-slate-300 lg:text-[1.25rem] hover:outline-none focus:outline-none" 
      type="text" placeholder={props['input1'].label} />

      <div className="flex justify-end items-end">
        <button onClick={() => props.input1.onClick()} className={`z-10 absolute flex rounded-full mb-[0.625rem] 
        mr-3 lg:mb-[0.8125rem] lg:mr-[1.125rem] border border-slate-100 
        ${props.input1.indicatorColor ? `text-white bg-${props.input1.indicatorColor}` : "bg-white"} `}>
          {props.input1.indicator &&
            <><props.input1.indicator className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]"/></>
          }
        </button>
        
        {props['input1'].textIndicator &&
          <p>{props['input1'].textIndicator}</p>
        }
      </div>
      <div className="pb-3">
        <div className="flex flex-row justify-between items-center px-3 mt-4 lg:px-[1.125rem]">
          {props.title2.label &&
            <p className="lg:text-[1.25rem]">{props.title2.label}</p>
          }
          
          {props['title2'].indicator &&
            <button onClick={() => props.title2.onClick()} >
              <><props.title2.indicator className="w-[1.375rem] h-[1.375rem] m-[0.3125rem] lg:w-[1.5625rem] lg:h-[1.5625rem]"/></>
            </button>
          }
        </div>
      </div>

      <input className="bg-slate-50 w-full h-12 px-3 lg:px-[1.125rem] lg:h-[3.375rem]
    placeholder:text-slate-300 lg:text-[1.25rem] hover:outline-none focus:outline-none" 
      type="text" placeholder={props['input2'].label} />

      <div className="flex justify-end items-end">
        <button onClick={() => props.input2.onClick()} className={`z-10 absolute flex rounded-full mb-[0.625rem] 
        mr-3 lg:mb-[0.8125rem] lg:mr-[1.125rem] border border-slate-100 
        ${props.input2.indicatorColor ? `text-white bg-${props.input2.indicatorColor}` : "bg-white"} `}>
          {props['input2'].indicator &&
            <><props.input2.indicator className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]"/></>
          }
        </button>
        
        {props['input2'].textIndicator &&
          <p>{props['input2'].textIndicator}</p>
        }
      </div>

      <div className="pt-3">
        <div className="w-full flex flex-col justify-start px-3 lg:px-[1.125rem]">
          <span className={`w-[4.0625rem] h-[4.0625rem] rounded-full ${color}`}></span>
        </div>
        <div className="w-full px-5 flex flex-row justify-between pt-5">
            {colors.map((color, index) => {
              return (
                <div className="w-[2.1875rem] h-[2.1875rem] lg:w-[2.8125rem] lg:h-[2.8125rem] rounded-full bg-slate-50" key={index}>
                  <button onClick={() => handleColorSelection(color)} className={`w-[2.1875rem] h-[2.1875rem] lg:w-[2.8125rem] lg:h-[2.8125rem] rounded-full ${color}`}></button>
                </div>
              )
            })
            }
          </div>
      </div>
    </div>
  )
}