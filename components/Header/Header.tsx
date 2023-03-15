import Image from "next/image"
import { useEffect, useRef } from "react"

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
  const scrollRef = useRef(null)

  const handleScroll = () => {
    // @ts-ignore
    scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
  }

  useEffect(() => {
    handleScroll()
  }, [scrollRef])

  return (
    <header
      className={`flex fixed z-10 top-0 left-0 right-0 bg-image
      justify-between min-h-[6.875rem] pb-[2rem] max-w-[1024px]
      lg:rounded-[2.5rem] mx-auto lg:min-h-[2.5rem] lg:px-10 
      lg:py-10 lg:mt-[1.5rem] ring-1 ring-slate-100 ${
        background_url ? "bg-black" : "animate-pulse bg-slate-300"
      }`}
    >
      <div
        ref={scrollRef}
        className="px-4 z-10 flex gap-3 overflow-x-auto scrollbar-hide "
      >
        {children}
      </div>
      {reightContent && (
        <div className="pr-4 z-10 flex space-x-3">{reightContent}</div>
      )}

      {background_url ? (
        <Image
          src={background_url}
          className="lg:rounded-[2.5rem] opacity-90 bg-slate-300"
          priority
          fill
          style={{ objectFit: "cover" }}
          alt={""}
        />
      ) : null}
    </header>
  )
}
