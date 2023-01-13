import useTranslation from "next-translate/useTranslation";
import { BracketsCurly } from "phosphor-react";
import { Card } from "../../../components/Card/Card";
import { Dialog } from "../../../components/Dialog/Dialog";
import { TabBar } from "../../../components/TabBar/TabBar";

type SwitchConfigProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  size?: "sm" | "md" | "full";
};

export function SwitchConfig(props: SwitchConfigProps) {
  const text = useTranslation().t;

  return (
    <>
      <Dialog
        height={props.size}
        isOpen={props.isOpen}
        title={text("switchconfig:toptitle")}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col gap-3 lg:gap-6 items-center">
          <Card
            variant="tlt-in"
            title={text("switchconfig:title1")}
            input={{
              label: text("switchconfig:label1"),
              onChange: (e) => console.log(e),
              onClick: () => console.log("click"),
              indicator: BracketsCurly,
            }}
          />
          <Card
            variant="tlt-in"
            title={text("switchconfig:title2")}
            input={{
              label: text("switchconfig:label2"),
              onChange: (e) => console.log(e),
              onClick: () => console.log("click"),
              indicator: BracketsCurly,
            }}
          />
          {props.size === "sm" && (
            <button
              className="flex flex-col gap-[0.3125rem] w-[23.375rem] justify-center bg-white 
            rounded-[20px] lg:w-[35.25rem] lg:rounded-[30px]"
            >
              <p className="w-full p-3 lg:text-[1.25rem] lg:p-[1.125rem]">
                {text("switchconfig:savebutton")}
              </p>
            </button>
          )}
        </div>
        <TabBar
          isHidden={props.size === "sm" ? true : false}
          tags={[
            {
              variant: "txt",
              text: text("switchconfig:tab1"),
              onClick: () => console.log("tab1"),
            },
          ]}
        />
      </Dialog>
    </>
  );
}
