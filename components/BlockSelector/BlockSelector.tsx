import useTranslation from "next-translate/useTranslation"
import {
  Article,
  ChartLine,
  CheckSquare,
  FlowArrow,
  ImageSquare,
  Plugs,
  Plus,
  RadioButton,
  Robot,
  Star,
  TextAa,
  Textbox,
  TextIndent,
  X,
} from "phosphor-react"
import { useState } from "react"
import { Tag } from "../Tag/Tag"

type BlockSelectorProps = {
  onBlockSelect: (type: string | undefined) => void
}

export function BlockSelector(props: BlockSelectorProps) {
  const text = useTranslation().t

  const [selected, setSelected] = useState(false)

  const [options, setOptions] = useState<"content" | "entry" | "action">(
    "content"
  )

  function handleBlockSelection(block: string) {
    handleSelectorOpening()
    props.onBlockSelect(block)
  }

  function handleSelectorOpening() {
    setSelected(!selected)
  }

  function handleBlockOptions(type: string) {
    switch (type) {
      case "content":
        return (
          <>
            {/* <Tag
              variant="icn-txt"
              icon={ArrowCounterClockwise}
              text={text("blockselector:creations")}
              isSelected={false}
              hasOutline={true}
              onClick={() => handleBlockSelection("creations")}
            /> */}
            <Tag
              variant="icn-txt"
              icon={ImageSquare}
              text={text("blockselector:image")}
              isSelected={false}
              hasOutline={true}
              onClick={() => handleBlockSelection("image")}
            />
            <Tag
              variant="icn-txt"
              icon={TextAa}
              text={text("blockselector:text")}
              isSelected={false}
              hasOutline={true}
              onClick={() => handleBlockSelection("text")}
            />
            <Tag
              variant="icn-txt"
              icon={ChartLine}
              text={text("blockselector:chart")}
              isSelected={false}
              hasOutline={true}
              onClick={() => handleBlockSelection("chart")}
            />
            {/* <Tag
              variant="icn-txt"
              icon={CodeSimple}
              text={text("blockselector:embed")}
              isSelected={false}
              hasOutline={true}
              onClick={() => handleBlockSelection("embed")}
            />
            <Tag
              variant="icn-txt"
              icon={FileArrowUp}
              text={text("blockselector:file")}
              isSelected={false}
              hasOutline={true}
              onClick={() => handleBlockSelection("file")}
            /> */}
          </>
        )
      case "entry":
        return (
          <>
            <Tag
              variant="icn-txt"
              icon={Textbox}
              text={text("blockselector:textentry")}
              hasOutline={true}
              onClick={() => handleBlockSelection("textentry")}
            />
            {/* <Tag
              variant="icn-txt"
              icon={FileArrowDown}
              text={text("blockselector:fileentry")}
              hasOutline={true}
              onClick={() => handleBlockSelection("fileentry")}
            /> */}
            <Tag
              variant="icn-txt"
              icon={CheckSquare}
              text={text("blockselector:pool")}
              hasOutline={true}
              onClick={() => handleBlockSelection("pool")}
            />
            <Tag
              variant="icn-txt"
              icon={RadioButton}
              text={text("blockselector:button")}
              hasOutline={true}
              onClick={() => handleBlockSelection("button")}
            />
            {/* <Tag
              variant="icn-txt"
              icon={ToggleLeft}
              text={text("blockselector:toggle")}
              hasOutline={true}
              onClick={() => handleBlockSelection("toggle")}
            /> */}
            <Tag
              variant="icn-txt"
              icon={Star}
              text={text("blockselector:review")}
              hasOutline={true}
              onClick={() => handleBlockSelection("review")}
            />
            {/* <Tag
              variant="icn-txt"
              icon={BracketsCurly}
              text={text("blockselector:json")}
              hasOutline={true}
              onClick={() => handleBlockSelection("json")}
            />
            <Tag
              variant="icn-txt"
              icon={PlusMinus}
              text={text("blockselector:counter")}
              hasOutline={true}
              onClick={() => handleBlockSelection("counter")}
            /> */}
          </>
        )
      case "action":
        return (
          <>
            <Tag
              variant="icn-txt"
              icon={Robot}
              text={text("blockselector:automation")}
              hasOutline={true}
              onClick={() => handleBlockSelection("automation")}
            />
            {/* <Tag
              variant="icn-txt"
              icon={ShuffleSimple}
              text={text("blockselector:redirect")}
              hasOutline={true}
              onClick={() => handleBlockSelection("redirect")}
            /> */}
            <Tag
              variant="icn-txt"
              icon={Plugs}
              text={text("blockselector:webhook")}
              hasOutline={true}
              onClick={() => handleBlockSelection("webhook")}
            />
          </>
        )
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      {selected && (
        <div
          className="h-fit w-full bg-white shrink-0 mb-3 lg:mb-6 rounded-[20px] lg:rounded-[30px]
          flex flex-col items-center justify-center overflow-x-hidden"
        >
          <div className="flex flex-col w-full justify-between h-full p-3 gap-3">
            <p className="px-3 lg:text-[1.1rem]">
              {text("blockselector:types")}
            </p>
            <div className="flex flex-row gap-2 items-star">
              <Tag
                variant="icn-txt"
                icon={Article}
                text={text("blockselector:content")}
                isSelected={options == "content"}
                onClick={() => setOptions("content")}
                hasOutline={options == "content"}
              />
              <Tag
                variant="icn-txt"
                icon={TextIndent}
                text={text("blockselector:entry")}
                isSelected={options == "entry"}
                onClick={() => setOptions("entry")}
                hasOutline={options == "entry"}
              />
              <Tag
                variant="icn-txt"
                icon={FlowArrow}
                text={text("blockselector:action")}
                isSelected={options == "action"}
                onClick={() => setOptions("action")}
                hasOutline={options == "action"}
              />
            </div>
            <span className="w-full p-[0.5px] bg-slate-50 mt-2"></span>
            <p className="px-3 lg:text-[1.1rem]">
              {text("blockselector:blocks")}
            </p>
            <div>
              <div className="flex flex-row gap-3 items-end py-[2px] overflow-x-scroll scrollbar-hide">
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
  )
}
