import useTranslation from "next-translate/useTranslation";
import { BracketsCurly } from "phosphor-react";
import { Card } from "../../../components/Card/Card";
import { TabBar } from "../../../components/TabBar/TabBar";

export function SwitchConfig() {
  const text = useTranslation().t;

  return (
    <>
      <div className="flex flex-col gap-3 lg:gap-6">
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
      </div>
      <TabBar
        isHidden
        tags={[
          {
            variant: "txt",
            text: text("switchconfig:tab1"),
            onClick: () => console.log("tab1"),
          },
        ]}
      />
    </>
  );
}
