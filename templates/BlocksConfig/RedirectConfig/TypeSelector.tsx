import useTranslation from "next-translate/useTranslation";
import { Check } from "phosphor-react";
import { useState } from "react";
import { Card } from "../../../components/Card/Card";

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

  return (
    <>
      {embedType === "" && (
        <Card
          variant="tlt-actlist"
          title={text("redirectconfig:title3")}
          actionList={[
            {
              label: text("redirectconfig:label3a"),
              onClick: () => handleChangeEmbedType("auto"),
              onChange: (e) => console.log(e),
            },
            {
              label: text("redirectconfig:label3b"),
              onClick: () => handleChangeEmbedType("manual"),
              onChange: (e) => console.log(e),
            },
          ]}
        />
      )}
      {embedType === "auto" && (
        <Card
          variant="tlt-actlist"
          title={text("redirectconfig:title3")}
          actionList={[
            {
              label: text("redirectconfig:label3a"),
              onClick: () => handleChangeEmbedType(""),
              onChange: (e) => console.log(e),
              indicator: Check,
            },
            {
              label: text("redirectconfig:label3b"),
              onClick: () => handleChangeEmbedType("manual"),
              onChange: (e) => console.log(e),
            },
          ]}
        />
      )}
      {embedType === "manual" && (
        <Card
          variant="tlt-actlist"
          title={text("redirectconfig:title3")}
          actionList={[
            {
              label: text("redirectconfig:label3a"),
              onClick: () => handleChangeEmbedType("auto"),
              onChange: (e) => console.log(e),
            },
            {
              label: text("redirectconfig:label3b"),
              onClick: () => handleChangeEmbedType(""),
              onChange: (e) => console.log(e),
              indicator: Check,
            },
          ]}
        />
      )}
    </>
  );
}
