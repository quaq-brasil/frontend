import classNames from "classnames"
import dynamic from "next/dynamic"
import { useLayoutEffect, useRef } from "react"

const Image = dynamic(() => import("next/image").then((mod) => mod.default))

type HeaderProps = {
  background_url: string
  children: React.ReactNode
  rightContent?: React.ReactNode
}

export const Header = ({
  background_url,
  children,
  rightContent,
}: HeaderProps) => {
  const scrollRef = useRef(null)

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
    }
  }

  useLayoutEffect(() => {
    handleScroll()
  }, [scrollRef])

  const containerClasses = classNames(
    "flex fixed z-10 top-0 left-0 right-0 bg-image justify-between min-h-[6.875rem] pb-[2rem] max-w-[1024px] lg:rounded-[2.5rem] mx-auto lg:min-h-[2.5rem] lg:px-10 lg:py-10 lg:mt-[1.5rem] ring-1 ring-slate-100",
    {
      "bg-black": background_url,
      "animate-pulse bg-slate-300": !background_url,
    }
  )

  return (
    <header className={containerClasses}>
      <div
        ref={scrollRef}
        className="px-4 z-10 flex gap-3 overflow-x-auto scrollbar-hide "
      >
        {children}
      </div>
      {rightContent && (
        <div className="pr-4 z-10 flex space-x-3">{rightContent}</div>
      )}

      {background_url ? (
        <Image
          src={background_url}
          className="lg:rounded-[2.5rem] opacity-90 bg-slate-300"
          quality={50}
          loading="lazy"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 80vw,
              70vw"
          alt={""}
        />
      ) : null}
    </header>
  )
}
