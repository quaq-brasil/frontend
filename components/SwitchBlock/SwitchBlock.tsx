import { PencilSimple } from "phosphor-react"
import { useState } from 'react'
import { Switch } from '@headlessui/react'

type SwitchBlockProps = {
  text: string
  isEditable: boolean
  onSwitch: () => void
}

export const SwitchBlock = (props: SwitchBlockProps) => {
  const [enabled, setEnabled] = useState(false)

  function handleSwitch() {
    setEnabled(!enabled)
    props.onSwitch()
  }

  return (
    <>
        {(props.isEditable === false) &&
        <>
          <div className="flex w-[23.375rem] justify-between items-center bg-white 
          p-[0.75rem] rounded-[20px] lg:w-[35.25rem]">
            <p className="lg:text-[1.25rem]">{props.text}</p>
            <div>
              <Switch
                checked={enabled}
                onChange={handleSwitch}
                className={`${enabled ? 'bg-teal-400' : 'bg-slate-500'}
                  relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
                    pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
          </div>
        </>
        }
        {(props.isEditable === true) &&
        <div className="flex relative w-[23.375rem] justify-end content-center lg:w-[35.25rem]">
          <div className="z-10 absolute flex justify-start content-center rounded-full bg-white border border-slate-100">
              <PencilSimple className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]"/>
          </div>
          <div className="flex w-[23.375rem] justify-between items-center bg-white 
          p-[0.75rem] rounded-[20px] lg:w-[35.25rem]">
            <p className="lg:text-[1.25rem]">{props.text}</p>
            <div>
              <Switch
                checked={enabled}
                onChange={handleSwitch}
                className={`${enabled ? 'bg-teal-900' : 'bg-teal-700'}
                  relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
                    pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
          </div>
        </div>
        }
    </>
  )
}