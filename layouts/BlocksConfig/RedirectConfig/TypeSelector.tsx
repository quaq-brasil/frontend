import useTranslation from "next-translate/useTranslation";
import { Check } from "phosphor-react";
import { useState } from "react";
import { Card } from "../../../components/Card/Card";
import { CardText } from "../../../components/Card/CardContentVariants/CardText";

type TypeSelectorProps = {
  changeRedirectType: (type: string) => void;
};

export function TypeSelector(props: TypeSelectorProps) {
  const text = useTranslation().t;

  const [embedType, setEmbedType] = useState("");

  function handleChangeEmbedType(type: string) {
    setEmbedType(type);
    props.changeRedirectType(type);
  }

  if (embedType === "manual") {
    return (
      <Card>
        <CardText label={text("redirectconfig:title3")} />
        <CardText
          label={text("redirectconfig:title3a")}
          indicator={{
            icon: Check,
            onClick: () => handleChangeEmbedType(""),
          }}
        />
        <CardText
          label={text("redirectconfig:title3b")}
          indicator={{
            icon: Check,
            onClick: () => handleChangeEmbedType("auto"),
          }}
        />
      </Card>
    );
  } else if (embedType === "auto") {
    return (
      <Card>
        <CardText label={text("redirectconfig:title3")} />
        <CardText
          label={text("redirectconfig:title3a")}
          indicator={{
            icon: Check,
            onClick: () => handleChangeEmbedType("manual"),
          }}
        />
        <CardText
          label={text("redirectconfig:title3b")}
          indicator={{
            icon: Check,
            onClick: () => handleChangeEmbedType(""),
          }}
        />
      </Card>
    );
  } else {
    return (
      <Card>
        <CardText label={text("redirectconfig:title3")} />
        <CardText
          label={text("redirectconfig:title3a")}
          indicator={{
            icon: Check,
            onClick: () => handleChangeEmbedType("manual"),
          }}
        />
        <CardText
          label={text("redirectconfig:title3b")}
          indicator={{
            icon: Check,
            onClick: () => handleChangeEmbedType("auto"),
          }}
        />
      </Card>
    );
  }
}
