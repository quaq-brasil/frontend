import Image from "next/image"
import { CardProps } from "./CardProps"

export const Card = (props: CardProps) => {

  return (
    <div className="flex flex-col gap-[0.3125rem] w-[23.375rem] justify-center bg-white 
    rounded-[20px] lg:w-[35.25rem]">
        <>
          {props.variant === "tlt-in" && 
            <div className="pb-5">
              <p className="p-3 lg:text-[1.25rem] lg:p-[1.125rem]">{props['title']}</p>

              <input onChange={(e) => props.input.onChange(e.target.value)} className="bg-slate-50 w-full h-12 px-3 lg:px-[1.125rem] lg:h-[3.375rem]
            placeholder:text-slate-300 lg:text-[1.25rem] hover:outline-none focus:outline-none" 
              type="text" placeholder={props['input'].label} />

              <div className="flex justify-end items-end">
                <button onClick={() => props.input.onClick()} className={`z-10 absolute flex rounded-full mb-[0.625rem] 
                mr-3 lg:mb-[0.8125rem] lg:mr-[1.125rem] border border-slate-100 
                ${props.input.indicatorColor ? `text-white bg-${props.input.indicatorColor}` : "bg-white"} `}>
                  {props['input'].indicator &&
                    <><props.input.indicator className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]"/></>
                  }
                </button>
                
                {props['input'].textIndicator &&
                  <p>{props['input'].textIndicator}</p>
                }
              </div>
            </div>
          }
          {props.variant === "tlt-in-act" && 
            <div className="pb-5">
              <p className="p-3 lg:text-[1.25rem] lg:p-[1.125rem]">{props['title']}</p>

              <input onChange={(e) => props.input.onChange(e.target.value)} className="bg-slate-50 w-full h-12 px-3 lg:px-[1.125rem] lg:h-[3.375rem]
            placeholder:text-slate-300 lg:text-[1.25rem] hover:outline-none focus:outline-none" 
              type="text" placeholder={props['input'].label} />

              <div className="flex justify-end items-end">
                <button onClick={() => props.input.onClick()} className={`z-10 absolute flex rounded-full mb-[0.625rem] 
                mr-3 lg:mb-[0.8125rem] lg:mr-[1.125rem] border border-slate-100 
                ${props.input.indicatorColor ? `text-white bg-${props.input.indicatorColor}` : "bg-white"} `}>
                  {props['input'].indicator &&
                    <><props.input.indicator className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]"/></>
                  }
                </button>
                
                {props['input'].textIndicator &&
                  <p>{props['input'].textIndicator}</p>
                }
              </div>

              <div>
                <div className="flex flex-row justify-between items-center px-3 mt-4 lg:px-[1.125rem]">
                  {props.actionOption.label &&
                    <p className="lg:text-[1.25rem]">{props.actionOption.label}</p>
                  }
                  
                  {props['actionOption'].indicator &&
                    <button onClick={() => props.actionOption.onClick()} >
                      <><props.actionOption.indicator className="w-[1.375rem] h-[1.375rem] m-[0.3125rem] lg:w-[1.5625rem] lg:h-[1.5625rem]"/></>
                    </button>
                  }
                </div>
              </div>
            </div>
          }
          {props.variant === "tlt-img" && 
            <div className="pb-5">
              <p className="p-3 lg:text-[1.25rem] lg:p-[1.125rem]">{props['title']}</p>
              <div className="bg-slate-50 py-3 px-3 lg:px-[1.125rem]">
                {props.imageSelector}
              </div>
            </div>
          }
          {props.variant === "tlt-actlist" && 
            <div>
              <p className="p-3 lg:text-[1.25rem] lg:p-[1.125rem]">{props['title']}</p>
              <div className="py-3 px-3 lg:px-[1.125rem]">
                {props.actionList && props.actionList.map((action, index) => {
                  return (
                    <div key={index} className="flex flex-col">
                      <div className="flex flex-row justify-between items-center">
                        <p className="lg:text-[1.25rem]">{action.label}</p>
                        {action.indicator &&
                          <button onClick={() => action.onClick && action.onClick()}>
                            <><action.indicator className="w-[1.375rem] h-[1.375rem] m-[0.3125rem] lg:w-[1.5625rem] lg:h-[1.5625rem]"/></>
                          </button>
                        }
                        {action.textIndicator &&
                          <button onClick={() => action.onClick && action.onClick()}>
                            <p className="text-slate-300 lg:text-[1.25rem]">{action.textIndicator}</p>
                          </button>
                        }
                      </div>
                      <span className="w-full p-[0.5px] my-3 bg-slate-100 mb-[0.5rem]"></span>
                    </div>
                  )
                })
                } 
              </div>
            </div>
          }
          {props.variant === "tlt-txt" && 
            <div className="pb-3 px-3 flex flex-col lg:px-[1.125rem]">
              <p className="py-3 lg:text-[1.25rem] lg:py-[1.125rem]">{props['title']}</p>
              <span className="w-full p-[0.5px] bg-slate-100 mb-[0.5rem]"></span>
              <p className="pb-3 lg:text-[1.25rem] lg:pb-[1.125rem] lg:pt-2 text-slate-300">{props.text}</p>
              <span className="w-full p-[0.5px] bg-slate-100 mb-[0.5rem]"></span>
            </div>
          }
          {props.variant === "tlt-img-act" && 
            <div className="pb-3 flex flex-col">
              <p className="py-3 px-3 lg:text-[1.25rem] lg:py-[1.125rem] lg:px-[1.125rem]">{props['title']}</p>
              <div className="flex justify-center bg-slate-50 py-3">
                <div className="flex relative w-[23rem] h-[23rem] justify-end content-center lg:w-[35rem] lg:h-[35rem]">
                  <Image src={props.img_url} fill style={{objectFit:"cover"}} alt={""} />
                </div>
              </div>
              <div>
                <div className="flex flex-row justify-between items-center px-3 mb-1 lg:px-[1.125rem]">
                  {props.actionOption.label &&
                    <p className="lg:text-[1.25rem]">{props.actionOption.label}</p>
                  }
                  
                  {props['actionOption'].indicator &&
                    <button onClick={() => props.actionOption.onClick()} >
                      <><props.actionOption.indicator className="w-[1.375rem] h-[1.375rem] m-[0.3125rem] lg:w-[1.5625rem] lg:h-[1.5625rem]"/></>
                    </button>
                  }
                </div>
              </div>
            </div>
          }
          {props.variant === "acttlt-in" && 
            <div className="pb-5">
              <div className="pb-3">
                <div className="flex flex-row justify-between items-center px-3 mt-4 lg:px-[1.125rem]">
                  {props.title.label &&
                    <p className="lg:text-[1.25rem]">{props.title.label}</p>
                  }
                  
                  {props['title'].indicator &&
                    <button onClick={() => props.title.onClick()} >
                      <><props.title.indicator className="w-[1.375rem] h-[1.375rem] m-[0.3125rem] lg:w-[1.5625rem] lg:h-[1.5625rem]"/></>
                    </button>
                  }
                </div>
              </div>

              <input onChange={(e) => props.input.onChange(e.target.value)} className="bg-slate-50 w-full h-12 px-3 lg:px-[1.125rem] lg:h-[3.375rem]
            placeholder:text-slate-300 lg:text-[1.25rem] hover:outline-none focus:outline-none" 
              type="text" placeholder={props['input'].label} />

              <div className="flex justify-end items-end">
                <button onClick={() => props.input.onClick()} className={`z-10 absolute flex rounded-full mb-[0.625rem] 
                mr-3 lg:mb-[0.8125rem] lg:mr-[1.125rem] border border-slate-100 
                ${props.input.indicatorColor ? `text-white bg-${props.input.indicatorColor}` : "bg-white"} `}>
                  {props['input'].indicator &&
                    <><props.input.indicator className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]"/></>
                  }
                </button>
                
                {props['input'].textIndicator &&
                  <p>{props['input'].textIndicator}</p>
                }
              </div>
            </div>
          }
          {props.variant === "acttlt-txt" && 
            <div className="pb-3">
              <div className="pb-3 lg:pb-5">
                <div className="flex flex-row justify-between items-center px-3 mt-4 lg:px-[1.125rem]">
                  {props.title.label &&
                    <p className="lg:text-[1.25rem]">{props.title.label}</p>
                  }
                  
                  {props['title'].indicator &&
                    <button onClick={() => props.title.onClick()} >
                      <><props.title.indicator className="w-[1.375rem] h-[1.375rem] m-[0.3125rem] lg:w-[1.5625rem] lg:h-[1.5625rem]"/></>
                    </button>
                  }
                </div>
              </div>
              <div className="px-3 flex flex-col lg:px-[1.125rem]">
                <span className="w-full p-[0.5px] bg-slate-100 mb-[0.5rem]"></span>
                <p className="pb-3 lg:text-[1.25rem] lg:pb-[1.125rem] lg:pt-2 text-slate-300">{props.text}</p>
                <span className="w-full p-[0.5px] bg-slate-100 mb-[0.5rem]"></span>
              </div>
            </div>
          }
          {props.variant === "acttlt-in-acttl-in" && 
            <div className="pb-5">
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
            </div>
          }
        </>
    </div>
  )
}