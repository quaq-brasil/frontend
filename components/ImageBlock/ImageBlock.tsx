import Image from "next/image";
import { PencilSimple } from "phosphor-react";

type ImageBlockProps = {
  img_url: string
  isEditable: boolean
}

export const ImageBlock = (props: ImageBlockProps) => {
  return (
    <>
        {(props.isEditable === false) &&
        <>
          <div className="flex col relative w-[23.375rem] h-[13.0625rem] justify-center content-center lg:w-[35.25rem] lg:h-[19rem]">
            <Image className="rounded-[20px] lg:rounded-[30px]" src={props.img_url} fill style={{objectFit:"cover"}} alt={""} />
          </div>
        </>
        }
        {(props.isEditable === true) &&
        <>
          <div className="flex col relative w-[23.375rem] h-[13.0625rem] justify-end content-center lg:w-[35.25rem] lg:h-[19rem]">
            <div className="z-10 absolute flex justify-start content-center rounded-full bg-white">
              <PencilSimple className="w-[1rem] h-[1rem] m-[5px] lg:w-[1.25rem] lg:h-[1.25rem]"/>
            </div>
            <Image className="rounded-[20px] lg:rounded-[30px]" src={props.img_url} fill style={{objectFit:"cover"}} alt={""} />
          </div>
        </>
        }
    </>
  )
}