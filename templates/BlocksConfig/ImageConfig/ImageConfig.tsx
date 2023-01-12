import useTranslation from "next-translate/useTranslation";
import { BracketsCurly } from "phosphor-react";
import { Card } from "../../../components/Card/Card";
import { TabBar } from "../../../components/TabBar/TabBar";

export function ImageConfig() {
  const text = useTranslation().t;

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
          variant="tlt-img"
          title={text("redirectconfig:title4")}
          imageSelector
        />
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
