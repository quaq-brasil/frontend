export const Option = ({ answer, isMaxAchieved, handleSelect }: any) => {
  return (
    <button
      className={`...`}
      disabled={answer.selected ? false : isMaxAchieved || false}
      key={answer.id}
      onClick={() => handleSelect(answer)}
    >
      <div className={`...`}></div>
      <p className="w-full text-left lg:text-[1.1rem]">{answer.value}</p>
    </button>
  )
}
