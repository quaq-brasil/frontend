import { IconProps } from "phosphor-react";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

export type action = {
  label: string;
  indicator?: ForwardRefExoticComponent<
    IconProps & RefAttributes<SVGSVGElement>
  >;
  indicatorColor?: string;
  textIndicator?: string;
  onClick: () => void;
  onChange: (e: string) => void;
  options?: string[];
};

export type CardProps =
  | {
      variant: "tlt-in";
      title: string;
      input: action;
    }
  | {
      variant: "tlt-in-act";
      title: string;
      input: action;
      actionOption: action;
    }
  | {
      variant: "tlt-img";
      title: string;
      imageSelector: ReactNode;
    }
  | {
      variant: "tlt-actlist";
      title: string;
      actionList: action[];
    }
  | {
      variant: "tlt-txt";
      title: string;
      text: string;
    }
  | {
      variant: "tlt-img-act";
      title: string;
      img_url: string;
      actionOption: action;
    }
  | {
      variant: "acttlt-in";
      title: action;
      input: action;
    }
  | {
      variant: "acttlt-txt";
      title: action;
      text: string;
    }
  | {
      variant: "acttlt-in-acttl-in";
      title1: action;
      input1: action;
      title2: action;
      input2: action;
    };
