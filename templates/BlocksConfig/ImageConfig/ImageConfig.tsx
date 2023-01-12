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
          variant="tlt-img"
          title={text("imageconfig:title1")}
          imageSelector
        />
        <Card
          variant="tlt-in"
          title={text("imageconfig:title2")}
          input={{
            label: text("imageconfig:label2"),
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
            text: text("imageconfig:tab1"),
            onClick: () => console.log("tab1"),
          },
        ]}
      />
    </>
  );
}
