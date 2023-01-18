import useTranslation from "next-translate/useTranslation";
import {
  ArrowCounterClockwise,
  Article,
  BracketsCurly,
  CheckSquare,
  CodeSimple,
  FileArrowDown,
  FileArrowUp,
  FlowArrow,
  ImageSquare,
  Plus,
  PlusMinus,
  RadioButton,
  Robot,
  ShuffleSimple,
  Star,
  TextAa,
  Textbox,
  TextIndent,
  ToggleLeft,
  X,
} from "phosphor-react";
import { useState } from "react";
import { Tag } from "../Tag/Tag";

export function BlockSelector() {
  const text = useTranslation().t;

  const [selected, setSelected] = useState(false);

  const [options, setOptions] = useState<"content" | "entry" | "action">(
    "content"
  );

  function handleSelectorOpening() {
    setSelected(!selected);
  }

  function handleBlockOptions(type: string) {
    switch (type) {
      case "content":
        return (
          <>
            <Tag
              variant="icn-txt"
              icon={ArrowCounterClockwise}
              text={text("blockselector:creations")}
              isSelected={false}
              hasOutline={true}
            />
            <Tag
              variant="icn-txt"
              icon={ImageSquare}
              text={text("blockselector:image")}
              isSelected={false}
              hasOutline={true}
            />
            <Tag
              variant="icn-txt"
              icon={TextAa}
              text={text("blockselector:text")}
              isSelected={false}
              hasOutline={true}
            />
            <Tag
              variant="icn-txt"
              icon={CodeSimple}
              text={text("blockselector:embed")}
              isSelected={false}
              hasOutline={true}
            />
            <Tag
              variant="icn-txt"
              icon={FileArrowUp}
              text={text("blockselector:file")}
              isSelected={false}
              hasOutline={true}
            />
          </>
        );
      case "entry":
        return (
          <>
            <Tag
              variant="icn-txt"
              icon={Textbox}
              text={text("blockselector:textentry")}
              hasOutline={true}
            />
            <Tag
              variant="icn-txt"
              icon={FileArrowDown}
              text={text("blockselector:fileentry")}
              hasOutline={true}
            />
            <Tag
              variant="icn-txt"
              icon={CheckSquare}
              text={text("blockselector:pool")}
              hasOutline={true}
            />
            <Tag
              variant="icn-txt"
              icon={RadioButton}
              text={text("blockselector:button")}
              hasOutline={true}
            />
            <Tag
              variant="icn-txt"
              icon={ToggleLeft}
              text={text("blockselector:toggle")}
              hasOutline={true}
            />
            <Tag
              variant="icn-txt"
              icon={Star}
              text={text("blockselector:review")}
              hasOutline={true}
            />
            <Tag
              variant="icn-txt"
              icon={BracketsCurly}
              text={text("blockselector:json")}
              hasOutline={true}
            />
            <Tag
              variant="icn-txt"
              icon={PlusMinus}
              text={text("blockselector:counter")}
              hasOutline={true}
            />
          </>
        );
      case "action":
        return (
          <>
            <Tag
              variant="icn-txt"
              icon={Robot}
              text={text("blockselector:automation")}
              hasOutline={true}
            />
            <Tag
              variant="icn-txt"
              icon={ShuffleSimple}
              text={text("blockselector:redirect")}
              hasOutline={true}
            />
          </>
        );
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      {selected && (
        <div
          className="h-[190px] w-[17.5rem] bg-white shrink-0 mb-3 rounded-[20px] lg:rounded-[30px]
         md:mb-[18px] md:w-[360px] flex flex-col items-center justify-center"
        >
          <div className="flex flex-row w-full justify-between h-full p-3">
            <div className="flex flex-col gap-2 items-star">
              <Tag
                variant="icn-txt"
                icon={Article}
                text={text("blockselector:content")}
                isSelected={options == "content"}
                onClick={() => setOptions("content")}
                hasOutline={!(options == "content")}
              />
              <Tag
                variant="icn-txt"
                icon={TextIndent}
                text={text("blockselector:entry")}
                isSelected={options == "entry"}
                onClick={() => setOptions("entry")}
                hasOutline={!(options == "entry")}
              />
              <Tag
                variant="icn-txt"
                icon={FlowArrow}
                text={text("blockselector:action")}
                isSelected={options == "action"}
                onClick={() => setOptions("action")}
                hasOutline={!(options == "action")}
              />
            </div>
            <span className="h-full p-[0.5px] bg-slate-100"></span>
            <div className="w-fit overflow-x-auto scrollbar-hide">
              <div className="flex flex-col gap-3 items-end pt-[1px]">
                <>{handleBlockOptions(options)}</>
              </div>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleSelectorOpening}
        className={`flex relative justify-center items-center 
        p-[0.75rem] md:p-[1rem] lg:p-[1.5rem] min-w-[100%]
        rounded-[20px] lg:rounded-[30px] bg-white ${
          selected ? "text-white bg-slate-900" : ""
        }`}
      >
        <span className="lg:text-[1.1rem] font-semibold w-fit">
          {selected ? (
            <div className="flex flex-row justify-center items-center gap-2 w-fit">
              <X className="w-[1.25rem] h-[1.25rem] lg:w-[1.5625rem] lg:h-[1.5625rem]" />
              {text("blockselector:selected")}
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center gap-2 w-fit">
              <Plus className="w-[1.25rem] h-[1.25rem] lg:w-[1.5625rem] lg:h-[1.5625rem]" />
              {text("blockselector:nonselected")}
            </div>
          )}
        </span>
      </button>
    </div>
  );
}
