import useTranslation from "next-translate/useTranslation";
import { BracketsCurly, X } from "phosphor-react";
import { useState } from "react";
import { Card } from "../../../components/Card/Card";
import { CardText } from "../../../components/Card/CardContentVariants/CardText";
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput";
import { Dialog } from "../../../components/Dialog/Dialog";
import { TabBar } from "../../../components/TabBar/TabBar";
import { Tag } from "../../../components/Tag/Tag";

type PoolConfigProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  size?: "sm" | "md" | "full";
};

export function PoolConfig(props: PoolConfigProps) {
  const text = useTranslation().t;

  const [options, setOptions] = useState([{ id: 0, value: "" }]);

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("poolconfig:tab1")}
        onClick={() => console.log("tab1")}
      />,
    ];
  }

  function handleAddOption() {
    const newOption = { id: options.length, value: "" };
    setOptions([...options, newOption]);
    console.log(options);
  }

  function handleRemoveOption(id: number) {
    const newOptions = options.filter((option) => option.id !== id);
    setOptions(newOptions);
  }

  return (
    <>
      <Dialog
        height={props.size}
        isOpen={props.isOpen}
        title={text("poolconfig:toptitle")}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          <Card>
            <CardText label={text("poolconfig:title1")} />
            <CardTextInput
              input={{
                label: text("poolconfig:label1"),
                onChange: (e) => console.log(e),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("poolconfig:title2")} />
            <CardTextInput
              input={{
                label: text("poolconfig:label2"),
                onChange: (e) => console.log(e),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>
          <>
            {options.map((option, index) => (
              <Card key={option.id}>
                <CardText
                  label={`${text("poolconfig:title3")} ${index + 1}`}
                  indicator={{
                    icon: X,
                    onClick: () => handleRemoveOption(option.id),
                  }}
                />
                <CardTextInput
                  input={{
                    label: text("poolconfig:label3"),
                    onChange: (e) => console.log(e),
                  }}
                  indicator={{
                    icon: BracketsCurly,
                    onClick: () => console.log("click"),
                  }}
                />
              </Card>
            ))}
          </>

          <Tag
            variant="txt"
            text={text("poolconfig:addoption")}
            onClick={handleAddOption}
          />

          <Card>
            <CardText label={text("poolconfig:title4")} />
            <CardTextInput
              input={{
                label: text("poolconfig:label4"),
                onChange: (e) => console.log(e),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>

          {props.size === "sm" && (
            <button
              className="flex flex-col gap-[0.3125rem] w-[23.375rem] justify-center bg-white
            rounded-[20px] lg:w-[35.25rem] lg:rounded-[30px]"
            >
              <p className="w-full p-3 lg:text-[1.1rem] lg:p-[1.125rem]">
                {text("poolconfig:savebutton")}
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
