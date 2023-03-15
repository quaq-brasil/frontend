import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IPage } from "types/Page.type"
import { ITemplate, IUpdateTemplate } from "types/Template.type"

type SimpleShortcutProps = {
  title: string
  img_url: string
  size: "small" | "large"
  index: number
  id: string
  templateData: ITemplate
  pageData: IPage | undefined
}

export const SimpleShortcut = (props: SimpleShortcutProps) => {
  const router = useRouter()

  const [contentData, setContentData] = useState<IUpdateTemplate>()

  function handleClick() {
    router.push(`/${props.pageData?.slug}/${props.templateData.slug}`)
  }

  useEffect(() => {
    if (props.templateData) {
      setContentData(props.templateData)
    }
  }, [props.templateData])

  return (
    <>
      <div
        className={`flex relative min-w-[100%] max-w-[100%] overflow-hidden rounded-[20px] h-[13.0625rem] justify-center content-center lg:h-[16rem] lg:rounded-[30px] cursor-pointer ${
          contentData?.shortcut_size === "large"
            ? "col-span-2  max-w-[100%]"
            : "col-span-1  md:max-w-[100%]"
        }
        `}
      >
        <div
          className={`z-10 absolute flex row justify-center bg-white ml-auto mr-auto left-[0.375rem]
          right-[0.375rem] rounded-[15px] bottom-[6px] px-[6px] lg:rounded-[25px] `}
          onClick={handleClick}
        >
          <p className="inline-block py-[0.625rem] text-center lg:text-[1.1rem]">
            {contentData?.title || ""}
          </p>
        </div>
        {props.img_url ? (
          <Image
            className={`rounded-[20px] lg:rounded-[30px]`}
            src={contentData?.shortcut_image || ""}
            fill
            style={{ objectFit: "cover" }}
            alt={""}
            onClick={handleClick}
          />
        ) : (
          <div className="min-w-full min-h-full bg-slate-300 animate-pulse rounded-[20px] lg:rounded-[30px]"></div>
        )}
      </div>
    </>
  )
}
