import useTranslation from "next-translate/useTranslation";
import { Card } from "../../../components/Card/Card";
import { CardText } from "../../../components/Card/CardContentVariants/CardText";
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput";
import { Dialog } from "../../../components/Dialog/Dialog";
import { TabBar } from "../../../components/TabBar/TabBar";
import { Tag } from "../../../components/Tag/Tag";

type TrackersProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  size?: "sm" | "md" | "full";
};

export function Trackers(props: TrackersProps) {
  const text = useTranslation().t;

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("trackers:tab1")}
        onClick={() => console.log("tab1")}
      />,
    ];
  }

  return (
    <>
      <Dialog
        height={props.size}
        isOpen={props.isOpen}
        title={text("trackers:toptitle")}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          <Card>
            <CardText label={text("trackers:title1")} />
            <CardTextInput
              input={{
                label: text("trackers:label1"),
                onChange: (e) => console.log(e),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("trackers:title2")} />
            <CardTextInput
              input={{
                label: text("trackers:label2"),
                onChange: (e) => console.log(e),
              }}
            />
          </Card>
          {props.size === "sm" && (
            <button
              className="flex flex-col gap-[0.3125rem] w-[23.375rem] justify-center bg-white
            rounded-[20px] lg:w-[35.25rem] lg:rounded-[30px]"
            >
              <p className="w-full p-3 lg:text-[1.1rem] lg:p-[1.125rem]">
                {text("trackers:")}
              </p>
            </button>
          )}
        </div>
        <TabBar
          isHidden={props.size === "sm" ? true : false}
          tags={handleTabBar()}
        />
      </Dialog>
    </>
  );
}
