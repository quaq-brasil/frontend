type CardLineProps = {
  full?: boolean
}

export function CardLine({ full }: CardLineProps) {
  return (
    <div className="w-full">
      <div
        className={`w-full flex flex-col justify-start ${
          full ? "px-3 lg:px-[1.125rem]" : ""
        }`}
      >
        <span className="w-full p-[0.5px] bg-slate-100"></span>
      </div>
    </div>
  )
}
