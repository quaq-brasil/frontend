import useTranslation from "next-translate/useTranslation";
import { BracketsCurly } from "phosphor-react";
import { useState } from "react";
import { Card } from "../../../components/Card/Card";
import { Dialog } from "../../../components/Dialog/Dialog";
import { TabBar } from "../../../components/TabBar/TabBar";
import { ExtendedConfig } from "./ExtendedConfig";
import { TypeSelector } from "./TypeSelector";

type RedirectConfigProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  size?: "sm" | "md" | "full";
};

export function RedirectConfig(props: RedirectConfigProps) {
  const text = useTranslation().t;

  const [redirectType, setRedirectType] = useState<string>("");

  function handleChangeRedirectType(type: string) {
    setRedirectType(type);
  }

  return (
    <>
      <Dialog
        height={props.size}
        isOpen={props.isOpen}
        onClose={() => console.log()}
        title={text("redirectconfig:toptitle")}
      >
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          <Card
            variant="tlt-in"
            title={text("redirectconfig:title1")}
            input={{
              label: text("redirectconfig:label1"),
              onChange: (e) => console.log(e),
              onClick: () => console.log("click"),
              indicator: BracketsCurly,
            }}
          />
          <Card
            variant="tlt-in"
            title={text("redirectconfig:title2")}
            input={{
              label: text("redirectconfig:label2"),
              onChange: (e) => console.log(e),
              onClick: () => console.log("click"),
              indicator: BracketsCurly,
            }}
          />
          <TypeSelector changeRedirectType={handleChangeRedirectType} />
          <>{redirectType != "" && <ExtendedConfig type={redirectType} />}</>
          {props.size === "sm" && (
            <button
              className="flex flex-col gap-[0.3125rem] w-[23.375rem] justify-center bg-white 
            rounded-[20px] lg:w-[35.25rem] lg:rounded-[30px]"
            >
              <p className="w-full p-3 lg:text-[1.25rem] lg:p-[1.125rem]">
                {text("redirectconfig:savebutton")}
              </p>
            </button>
          )}
        </div>
      </Dialog>
      <TabBar
        isHidden
        tags={[
          {
            variant: "txt",
            text: text("redirectconfig:tab1"),
            onClick: () => console.log("tab1"),
          },
        ]}
      />
    </>
  );
}