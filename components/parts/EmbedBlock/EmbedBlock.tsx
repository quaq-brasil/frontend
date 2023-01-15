import dynamic from "next/dynamic";
import { PencilSimple } from "phosphor-react";
const Embed = dynamic(() => import("react-embed"), {
  ssr: false,
});

type EmbedBlockProps = {
  url: string;
  isEditable: boolean;
};

export const EmbedBlock = (props: EmbedBlockProps) => {
  return (
    <div
      className="flex relative justify-between items-center
        min-w-[100%] bg-white 
        p-[0.75rem] rounded-[20px] lg:rounded-[30px]"
    >
      {props.isEditable === true && (
        <div className="z-10 absolute right-0 top-0 rounded-full bg-white border border-slate-100">
          <PencilSimple className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
        </div>
      )}
      {props.url && <Embed url={props.url} />}
    </div>
  );
};
