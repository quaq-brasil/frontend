import Image from "next/image"
import { useRouter } from "next/router"
import { PencilSimple } from "phosphor-react"
import { useEffect } from "react"

type RedirectBlockProps = {
  destination_url: string
  isEditable: boolean
  isManual: boolean
  isVisible: boolean
  img_url?: string
  description?: string
  save_as?: string
  redirectNow?: boolean
}

export const RedirectBlock = (props: RedirectBlockProps) => {
  const router = useRouter()

  useEffect(() => {
    if (props.redirectNow) {
      router.push(props.destination_url)
    }
  }, [props.redirectNow, props.destination_url, router])

  return (
    <>
      {props.isManual === false && (
        <div
          className={`rounded-[20px] lg:rounded-[30px] ${
            props.isVisible ? "" : "hidden"
          }`}
        >
          {/* <TechBlock
            isEditable={props.isEditable}
            isVisible={props.isVisible}
            specs={[
              {
                title: "link",
                description: props.destination_url,
              },
              {
                title: "save as",
                description: props.save_as || "missing value",
              },
            ]}
          /> */}
        </div>
      )}
      {props.isManual === true && (
        <>
          <a href={props.destination_url}>
            <div className="flex relative min-w-[100%] h-[13.0625rem] justify-center content-center lg:h-[19rem] lg:rounded-[30px]">
              {props.isEditable && (
                <div className="z-10 absolute shrink-0 flex content-center rounded-full bg-white right-0 top-0">
                  <PencilSimple className="w-[1rem] h-[1rem] m-[5px] lg:w-[1.25rem] lg:h-[1.25rem] drop-shadow-md" />
                </div>
              )}
              <div
                className="z-10 absolute flex row justify-center bg-white ml-auto mr-auto left-[0.375rem] 
                right-[0.375rem] rounded-[15px] bottom-[0.375rem] px-[0.375rem] lg:pt-[0.8125rem] lg:pb-[0.875rem] lg:rounded-[25px]"
              >
                <div className="flex flex-col gap-1">
                  {props.description && (
                    <p className="inline-block pt-[0.625rem] text-center md:text-[1.1rem]">
                      {props.description}
                    </p>
                  )}
                  <p className="inline-block pb-[0.625rem] text-center text-slate-500 text-[0.875rem] lg:text-[1rem]">
                    {props.destination_url}
                  </p>
                </div>
              </div>
              {props.img_url && (
                <Image
                  className="rounded-[20px] lg:rounded-[30px]"
                  src={props.img_url}
                  fill
                  style={{ objectFit: "cover" }}
                  alt={""}
                />
              )}
            </div>
          </a>
        </>
      )}
    </>
  )
}
