import { EyeSlash, PencilSimple } from "phosphor-react"

type Spec = {
  title: string
  description: string
}

type TechBlockProps = {
  description: string
  specs: Spec[]
  isEditable: boolean
  isVisible: boolean
}

export const TechBlock = (props: TechBlockProps) => {
  return (
    <div
      className={`flex relative flex-col gap-[0.3125rem] justify-center
            min-w-[100%] bg-white p-[0.75rem] rounded-[20px] lg:rounded-[30px]
            ${
              props.isVisible === false &&
              props.isEditable === false &&
              "hidden"
            }
            `}
    >
      {props.isEditable && (
        <div className="z-10 absolute shrink-0 flex content-center rounded-full bg-white right-0 top-0">
          <PencilSimple className="w-[1rem] h-[1rem] m-[5px] lg:w-[1.25rem] lg:h-[1.25rem] drop-shadow-md" />
        </div>
      )}
      <div className="flex flex-row gap-3 items-center  mb-[0.5rem]">
        {!props.isVisible && (
          <div className="w-[1.25rem] h-[1.25rem] lg:w-[1.75rem] lg:h-[1.75rem]">
            <EyeSlash className="w-[1.25rem] h-[1.25rem] lg:w-[1.75rem] lg:h-[1.75rem]" />
          </div>
        )}
        <p className="lg:text-[1.1rem] inline-block w-auto">
          {props.description}
        </p>
      </div>
      <span className="w-full p-[0.5px] bg-slate-100 mb-[0.5rem]"></span>
      {props.specs.map((spec) => (
        <div className="mb-[0.5rem]" key={spec.description}>
          <p className="lg:text-[1.1rem] font-semibold">{spec.title}</p>
          <p className="lg:text-[1.1rem]">{spec.description}</p>
        </div>
      ))}
    </div>
  )
}
