import Image from "next/image";
import { action } from "../CardProps";

type CardTltImgActProps = {
  title: string;
  img_url: string;
  actionOption: action;
};

export function CardTltImgAct(props: CardTltImgActProps) {
  return (
    <div className="pb-3 flex flex-col">
      <p className="py-3 px-3 lg:text-[1.25rem] lg:py-[1.125rem] lg:px-[1.125rem]">
        {props["title"]}
      </p>
      <div className="flex justify-center bg-slate-50 py-3">
        <div className="flex relative w-[23rem] h-[23rem] justify-end content-center lg:w-[35rem] lg:h-[35rem]">
          <Image
            src={props.img_url}
            fill
            style={{ objectFit: "cover" }}
            alt={""}
          />
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-between items-center px-3 mb-1 lg:px-[1.125rem]">
          {props.actionOption.label && (
            <p className="lg:text-[1.25rem]">{props.actionOption.label}</p>
          )}

          {props["actionOption"].indicator && (
            <button onClick={() => props.actionOption.onClick()}>
              <>
                <props.actionOption.indicator className="w-[1.375rem] h-[1.375rem] m-[0.3125rem] lg:w-[1.5625rem] lg:h-[1.5625rem]" />
              </>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
