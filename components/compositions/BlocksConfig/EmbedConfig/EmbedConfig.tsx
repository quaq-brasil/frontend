import useTranslation from "next-translate/useTranslation";
import { BracketsCurly } from "phosphor-react";
import { Card } from "../../../parts/Card/Card";
import { Dialog } from "../../../parts/Dialog/Dialog";
import { TabBar } from "../../../parts/TabBar/TabBar";

type EmbedConfigProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  size?: "sm" | "md" | "full";
};

export function EmbedConfig(props: EmbedConfigProps) {
  const text = useTranslation().t;

  return (
    <>
      <Dialog
        height={props.size}
        isOpen={props.isOpen}
        title={text("embedconfig:toptitle")}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          <Card
            variant="tlt-in"
            title={text("embedconfig:title1")}
            input={{
              label: text("embedconfig:label1"),
              onChange: (e) => console.log(e),
              onClick: () => console.log("click"),
              indicator: BracketsCurly,
            }}
          />
          <Card
            variant="tlt-in"
            title={text("embedconfig:title2")}
            input={{
              label: text("embedconfig:label2"),
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
                {text("embedconfig:savebutton")}
              </p>
            </button>
          )}
          <TabBar
            isHidden={props.size === "sm" ? true : false}
            tags={[
              {
                variant: "txt",
                text: text("embedconfig:tab1"),
                onClick: () => console.log("tab1"),
              },
            ]}
          />
        </div>
      </Dialog>
    </>
  );
}
