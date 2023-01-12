import useTranslation from "next-translate/useTranslation";
import { BracketsCurly } from "phosphor-react";
import { Card } from "../../../components/Card/Card";
import { Dialog } from "../../../components/Dialog/DIalog";
import { TabBar } from "../../../components/TabBar/TabBar";

type ImageConfigProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function ImageConfig(props: ImageConfigProps) {
  const text = useTranslation().t;

  return (
    <>
      <Dialog
        height="full"
        isOpen={props.isOpen}
        title={text("imageconfig:toptitle")}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col items-center gap-3 lg:gap-6">
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
      </Dialog>
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
