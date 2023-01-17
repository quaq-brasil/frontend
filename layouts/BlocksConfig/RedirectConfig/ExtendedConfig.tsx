import useTranslation from "next-translate/useTranslation";
import { BracketsCurly } from "phosphor-react";
import { Card } from "../../../components/Card/Card";
import { CardText } from "../../../components/Card/CardContentVariants/CardText";
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput";

type ExtendedConfigProps = {
  type: string;
};

export function ExtendedConfig(props: ExtendedConfigProps) {
  const text = useTranslation().t;

  if (props.type === "manual") {
    return (
      <Card>
        <CardText label={text("redirectconfig:title4")} />
      </Card>
    );
  } else {
    return (
      <Card>
        <CardText label={text("redirectconfig:title5")} />
        <CardTextInput
          input={{
            label: text("redirectconfig:label5"),
            onChange: (e) => console.log(e),
          }}
          indicator={{
            icon: BracketsCurly,
            onClick: () => console.log("click"),
          }}
        />
      </Card>
    );
  }
}
