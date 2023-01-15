import useTranslation from "next-translate/useTranslation";
import { BracketsCurly } from "phosphor-react";
import { Card } from "../../../parts/Card/Card";
import { CardText } from "../../../parts/Card/CardContentVariants/CardText";
import { CardTextInput } from "../../../parts/Card/CardContentVariants/CardTextInput";
import { Dialog } from "../../../parts/Dialog/Dialog";
import { TabBar } from "../../../parts/TabBar/TabBar";

type CounterConfigProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  size?: "sm" | "md" | "full";
};

export function CounterConfig(props: CounterConfigProps) {
  const text = useTranslation().t;

  return (
    <>
      <Dialog
        height={props.size}
        isOpen={props.isOpen}
        title={text("counterconfig:toptitle")}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          <Card>
            <CardText label={text("counterconfig:title1")} />
            <CardTextInput
              input={{
                label: text("counterconfig:label1"),
                onChange: (e) => console.log(e),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("counterconfig:title2")} />
            <CardTextInput
              input={{
                label: text("counterconfig:label2"),
                onChange: (e) => console.log(e),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("counterconfig:title3")} />
            <CardTextInput
              input={{
                label: text("counterconfig:label3"),
                onChange: (e) => console.log(e),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>
          {props.size === "sm" && (
            <button
              className="flex flex-col gap-[0.3125rem] w-[23.375rem] justify-center bg-white 
            rounded-[20px] lg:w-[35.25rem] lg:rounded-[30px]"
            >
              <p className="w-full p-3 lg:text-[1.25rem] lg:p-[1.125rem]">
                {text("counterconfig:savebutton")}
              </p>
            </button>
          )}
          <TabBar
            isHidden={props.size === "sm" ? true : false}
            tags={[
              {
                variant: "txt",
                text: text("counterconfig:tab1"),
                onClick: () => console.log("tab1"),
              },
            ]}
          />
        </div>
      </Dialog>
    </>
  );
}