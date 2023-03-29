export const Option = ({ answer, isMaxAchieved, handleSelect }: any) => {
  return (
    <button
      className={`flex flex-row w-full gap-2 lg:gap-3 justify-center items-center`}
      disabled={answer.selected ? false : isMaxAchieved || false}
      key={answer.id}
      onClick={() => handleSelect(answer)}
    >
      <div
        className={`w-[1rem] h-[1rem] lg:w-[1.5rem] lg:h-[1.5rem] shrink-0 rounded-full ring-2 
        ring-slate-200 ${answer.selected ? "ring-slate-900 bg-slate-900" : ""}`}
      ></div>
      <p className="w-full text-left lg:text-[1.1rem]">{answer.value}</p>
    </button>
  )
}
