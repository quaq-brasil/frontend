type CardFileInputProps = {
  fileSelector: React.ReactNode
  errors?: string[] | null
}

export function CardFileInput(props: CardFileInputProps) {
  return (
    <>
      <div className="flex flex-row justify-between items-center bg-slate-50 my-2 px-3 lg:px-[1.125rem] py-3">
        {props.fileSelector}
      </div>
      {props.errors &&
        props.errors.length > 0 &&
        props.errors.map((error) => (
          <p
            key={error}
            className="text-red-500 lg:text-[1.1rem] px-3 lg:pl-[1.125rem] text-left"
          >
            {error}
          </p>
        ))}
    </>
  )
}
