import Image from "next/image";

type ShortcutProps = {
  title: string
  img_url: string
  size: 'small' | 'large'
}

export const Shortcut = (props: ShortcutProps) => {
  return (
    <>
      {props.size === 'small' && 
        <>
          <div className="flex relative w-[11.375rem] h-[13.0625rem] justify-center content-center lg:w-[16.5625rem] lg:h-[19rem]">
            <div className="z-10 absolute flex row justify-center bg-white ml-auto mr-auto left-[0.375rem] 
            right-[0.375rem] rounded-[15px] bottom-[6px] px-[6px] lg:pt-[0.8125rem] lg:pb-[0.875rem] lg:rounded-[25px]">
              <p className="inline-block py-[0.625rem] text-center lg:text-[1.25rem]">{props.title}</p>
            </div>
            <Image className="rounded-[20px] lg:rounded-[30px]" src={props.img_url} fill style={{objectFit:"cover"}} alt={""} />
          </div>
        </>
      }
      {props.size === 'large' &&
        <>
        <div className="flex relative w-[23.375rem] h-[13.0625rem] justify-center content-center lg:w-[35.25rem] lg:h-[19rem]">
          <div className="z-10 absolute flex row justify-center bg-white ml-auto mr-auto left-[0.375rem] 
          right-[0.375rem] rounded-[15px] bottom-[0.375rem] px-[0.375rem] lg:pt-[0.8125rem] lg:pb-[0.875rem] lg:rounded-[25px]">
            <p className="inline-block py-[0.625rem] text-center lg:text-[1.25rem]">{props.title}</p>
          </div>
          <Image className="rounded-[20px] lg:rounded-[30px]" src={props.img_url} fill style={{objectFit:"cover"}} alt={""} />
        </div>
      </>
      }
    </>
  )
}
