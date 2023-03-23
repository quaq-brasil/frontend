import { useEffect, useState } from "react"

type CardColorSelectorProps = {
  onColorSelection: (color: string) => void
  currentColor?: string
}

type ColorButtonProps = {
  color: string
  onClick: () => void
}

const ColorButton: React.FC<ColorButtonProps> = ({ color, onClick }) => (
  <button
    onClick={onClick}
    className={`w-[2.25rem] h-[2.25rem] md:w-[3rem] md:h-[3rem]
    lg:w-[3.75rem] lg:h-[3.75rem] rounded-full shrink-0 ${color}`}
  ></button>
)

export function CardColorSelector({
  onColorSelection,
  currentColor,
}: CardColorSelectorProps) {
  const [color, setColor] = useState<string>("bg-black")

  function handleColorSelection(color: string) {
    setColor(color)
    onColorSelection(color)
  }

  useEffect(() => {
    if (currentColor) {
      handleColorSelection(currentColor)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentColor])

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
    <>
      <span
        className={`w-[4.0625rem] h-[4.0625rem] rounded-full ${color} mb-4`}
      ></span>
      <span className="w-full p-[0.5px] bg-slate-100"></span>
      <div className="w-full px-5 flex flex-row gap-3 pt-3 flex-wrap items-center">
        {colors.map((color, index) => (
          <ColorButton
            key={index}
            color={color}
            onClick={() => handleColorSelection(color)}
          />
        ))}
      </div>
      <span className="w-full p-[0.5px] bg-slate-100"></span>
    </>
  )
}
