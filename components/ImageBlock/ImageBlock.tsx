import Image from "next/image";
import { PencilSimple } from "phosphor-react";

type ImageBlockProps = {
  img_url: string;
  isEditable: boolean;
};

export const ImageBlock = (props: ImageBlockProps) => {
  return (
    <>
      {props.isEditable === false && (
        <>
          <div
            className="flex relative justify-center content-center
            min-w-[100%] 
            h-[13.0625rem]  lg:h-[19rem]"
          >
            <Image
              className="rounded-[20px] lg:rounded-[30px]"
              src={props.img_url}
              fill
              style={{ objectFit: "cover" }}
              alt={""}
            />
          </div>
        </>
      )}
      {props.isEditable === true && (
        <>
          <div
            className="flex relative justify-center content-center
            w-[23.5rem] md:w-[35rem] lg:w-[45rem] 
            h-[13.0625rem]  lg:h-[19rem]"
          >
            <div className="z-10 absolute flex justify-start content-center rounded-full bg-white border border-slate-100">
              <PencilSimple className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
            </div>
            <Image
              className="rounded-[20px] lg:rounded-[30px]"
              src={props.img_url}
              fill
              style={{ objectFit: "cover" }}
              alt={""}
            />
          </div>
        </>
      )}
    </>
  );
};
