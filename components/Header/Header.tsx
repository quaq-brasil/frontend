import Image from "next/image"

type HeaderProps = {
  background_url: string
  children: React.ReactNode
  reightContent?: React.ReactNode
}

export const Header = ({
  background_url,
  children,
  reightContent,
}: HeaderProps) => {
  return (
    <header
      className={`flex fixed z-10 top-0 left-0 right-0 bg-image
      justify-between min-h-[6.875rem] pb-[2rem] max-w-[1024px]
      lg:rounded-[2.5rem] mx-auto lg:min-h-[2.5rem] lg:px-10 
      lg:py-10 bg-black lg:mt-[1.5rem] outline outline-2 outline-slate-100`}
    >
      <div className="pl-4 z-10 flex gap-3 overflow-x-auto scrollbar-hide">
        {children}
      </div>
      {reightContent && (
        <div className="pr-4 z-10 flex space-x-3">{reightContent}</div>
      )}

      <Image
        src={background_url}
        className="lg:rounded-[2.5rem] opacity-90"
        fill
        style={{ objectFit: "cover" }}
        alt={""}
      />
    </header>
  )
}
