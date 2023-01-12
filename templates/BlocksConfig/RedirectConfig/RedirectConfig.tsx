import useTranslation from "next-translate/useTranslation";
import { BracketsCurly } from "phosphor-react";
import { useState } from "react";
import { Card } from "../../../components/Card/Card";
import { TabBar } from "../../../components/TabBar/TabBar";
import { ExtendedConfig } from "./ExtendedConfig";
import { TypeSelector } from "./TypeSelector";

export function RedirectConfig() {
  const text = useTranslation().t;

  const [redirectType, setRedirectType] = useState<string>("");

  function handleChangeRedirectType(type: string) {
    setRedirectType(type);
  }

  return (
    <>
      <div className="flex flex-col gap-3 lg:gap-6">
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
      </div>
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
