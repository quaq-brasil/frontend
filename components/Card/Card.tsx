import { CardProps } from "./CardProps";
import { CardActtltIn } from "./CardVariants/CardActtltIn";
import { CardActtltInActtlIn } from "./CardVariants/CardActtltInActtlIn";
import { CardActtltTxt } from "./CardVariants/CardActtltTxt";
import { CardTltActlist } from "./CardVariants/CardTltActlist";
import { CardTltImg } from "./CardVariants/CardTltImg";
import { CardTltImgAct } from "./CardVariants/CardTltImgAct";
import { CardTltIn } from "./CardVariants/CardTltIn";
import { CardTltInAct } from "./CardVariants/CardTltInAct";
import { CardTltTxt } from "./CardVariants/CardTltTxt";

export const Card = (props: CardProps) => {
  return (
    <div>
      <div
        className="flex flex-col gap-[0.3125rem] w-[23.375rem] justify-center bg-white 
      rounded-[20px] lg:w-[35.25rem] lg:rounded-[30px]"
      >
        <>
          {props.variant === "tlt-in" && (
            <CardTltIn input={props.input} title={props.title} />
          )}
          {props.variant === "tlt-in-act" && (
            <CardTltInAct
              actionOption={props.actionOption}
              input={props.input}
              title={props.title}
            />
          )}
          {props.variant === "tlt-img" && (
            <CardTltImg
              imageSelector={props.imageSelector}
              title={props.title}
            />
          )}
          {props.variant === "tlt-actlist" && (
            <CardTltActlist actionList={props.actionList} title={props.title} />
          )}
          {props.variant === "tlt-txt" && (
            <CardTltTxt text={props.text} title={props.title} />
          )}
          {props.variant === "tlt-img-act" && (
            <CardTltImgAct
              actionOption={props.actionOption}
              img_url={props.img_url}
              title={props.title}
            />
          )}
          {props.variant === "acttlt-in" && (
            <CardActtltIn input={props.input} title={props.title} />
          )}
          {props.variant === "acttlt-txt" && (
            <CardActtltTxt text={props.text} title={props.title} />
          )}
          {props.variant === "acttlt-in-acttl-in" && (
            <CardActtltInActtlIn
              input1={props.input1}
              input2={props.input2}
              title1={props.title1}
              title2={props.title2}
            />
          )}
        </>
      </div>
    </div>
  );
};
