type CardProps = {
  children: React.ReactNode
}

export function Card(props: CardProps) {
  return (
    <div
      className="flex flex-col justify-center gap-[0.375rem] h-fit py-3
    bg-white min-w-[100%] rounded-[20px] lg:rounded-[30px] lg:gap-[0.75rem] lg:py-4"
    >
      {props.children}
    </div>
  )
}
