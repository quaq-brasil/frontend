import useTranslation from "next-translate/useTranslation";
import { BracketsCurly } from "phosphor-react";
import { Card } from "../../../components/Card/Card";

type ExtendedConfigProps = {
  type: string;
};

export function ExtendedConfig(props: ExtendedConfigProps) {
  const text = useTranslation().t;
  return (
    <div className="flex flex-col gap-3 lg:gap-6">
      <>
        {props.type === "manual" && (
          <Card
            variant="tlt-img"
            title={text("redirectconfig:title4")}
            imageSelector
          />
        )}
      </>
      <Card
        variant="tlt-in"
        title={text("redirectconfig:title5")}
        input={{
          label: text("redirectconfig:label5"),
          onChange: (e) => console.log(e),
          onClick: () => console.log("click"),
          indicator: BracketsCurly,
        }}
      />
    </div>
  );
}
