import { ReactNode } from "react";

type CardTltImgProps = {
  title: string;
  imageSelector: ReactNode;
};

export function CardTltImg(props: CardTltImgProps) {
  return (
    <div className="pb-5">
      <p className="p-3 lg:text-[1.25rem] lg:p-[1.125rem]">{props["title"]}</p>
      <div className="bg-slate-50 py-3 px-3 lg:px-[1.125rem]">
        {props.imageSelector}
      </div>
    </div>
  );
}
