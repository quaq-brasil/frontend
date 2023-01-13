import useTranslation from "next-translate/useTranslation";
import { BracketsCurly } from "phosphor-react";
import { Card } from "../../../components/Card/Card";
import { Dialog } from "../../../components/Dialog/Dialog";
import { TabBar } from "../../../components/TabBar/TabBar";

type TextEntryConfigProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  size?: "sm" | "md" | "full";
};

export function TextEntryConfig(props: TextEntryConfigProps) {
  const text = useTranslation().t;

  return (
    <>
      <Dialog
        height={props.size}
        isOpen={props.isOpen}
        title={text("textentryconfig:toptitle")}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          <Card
            variant="tlt-in"
            title={text("textentryconfig:title1")}
            input={{
              label: text("textentryconfig:label1"),
              onChange: (e) => console.log(e),
              onClick: () => console.log("click"),
              indicator: BracketsCurly,
            }}
          />
          <Card
            variant="tlt-in"
            title={text("textentryconfig:title2")}
            input={{
              label: text("textentryconfig:label2"),
              onChange: (e) => console.log(e),
              onClick: () => console.log("click"),
              indicator: BracketsCurly,
            }}
          />
          <Card
            variant="tlt-actlist"
            title={text("textentryconfig:title3")}
            actionList={[
              {
                label: "",
                onChange: (e) => console.log(e),
                onClick: () => console.log("click"),
                options: [
                  text("textentryconfig:option1"),
                  text("textentryconfig:option2"),
                  text("textentryconfig:option3"),
                  text("textentryconfig:option4"),
                  text("textentryconfig:option5"),
                  text("textentryconfig:option6"),
                  text("textentryconfig:option7"),
                  text("textentryconfig:option8"),
                  text("textentryconfig:option9"),
                ],
              },
            ]}
          />
          <Card
            variant="tlt-in"
            title={text("textentryconfig:title4")}
            input={{
              label: text("textentryconfig:label4"),
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
                {text("textentryconfig:savebutton")}
              </p>
            </button>
          )}
        </div>
        <TabBar
          isHidden={props.size === "sm" ? true : false}
          tags={[
            {
              variant: "txt",
              text: text("textentryconfig:tab1"),
              onClick: () => console.log("tab1"),
            },
          ]}
        />
      </Dialog>
    </>
  );
}
