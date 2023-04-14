export const Option = ({ answer, handleSelect }: any) => {
  return (
    <button
      className={`flex flex-row w-full gap-2 lg:gap-3 justify-center items-center ring-2 ring-slate-100 rounded-2xl p-2 ${
        answer.selected ? "bg-slate-50" : ""
      } hover:bg-slate-50 shrink-0`}
      key={answer.id}
      onClick={() => handleSelect(answer)}
    >
      <div
        className={`w-[1rem] h-[1rem] lg:w-[1.25rem] lg:h-[1.25rem] shrink-0 rounded-full ring-2 
        ring-slate-200 ${answer.selected ? "ring-slate-900 bg-slate-900" : ""}`}
      ></div>
      <p className="w-full text-left lg:text-[1.1rem]">{answer.value}</p>
    </button>
  )
}
