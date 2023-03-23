import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import {
  Article,
  ChartLine,
  CheckSquare,
  CodeSimple,
  FlowArrow,
  ImageSquare,
  Plugs,
  Plus,
  RadioButton,
  Robot,
  ShuffleSimple,
  Star,
  TextAa,
  Textbox,
  TextIndent,
  ToggleLeft,
  X,
} from "phosphor-react"
import { memo, useState } from "react"

type BlockSelectorProps = {
  onBlockSelect?: (type: string | undefined) => void
}

const blockOptionsConfig = [
  {
    type: "content",
    options: [
      { icon: ImageSquare, textKey: "blockselector:image", value: "image" },
      { icon: TextAa, textKey: "blockselector:text", value: "text" },
      { icon: ChartLine, textKey: "blockselector:chart", value: "chart" },
      { icon: CodeSimple, textKey: "blockselector:embed", value: "embed" },
    ],
  },
  {
    type: "entry",
    options: [
      { icon: Textbox, textKey: "blockselector:textentry", value: "textentry" },
      { icon: CheckSquare, textKey: "blockselector:pool", value: "pool" },
      { icon: RadioButton, textKey: "blockselector:button", value: "button" },
      { icon: ToggleLeft, textKey: "blockselector:toggle", value: "toggle" },
      { icon: Star, textKey: "blockselector:review", value: "review" },
    ],
  },
  {
    type: "action",
    options: [
      { icon: Robot, textKey: "blockselector:automation", value: "automation" },
      {
        icon: ShuffleSimple,
        textKey: "blockselector:redirect",
        value: "redirect",
      },
      { icon: Plugs, textKey: "blockselector:webhook", value: "webhook" },
    ],
  },
]

interface BlockOptionTag {
  icon: any
  textKey: string
  onClick: () => void
}

const BlockOptionTag = ({ icon, textKey, onClick }: BlockOptionTag) => {
  const text = useTranslation().t
  return (
    <Tag
      variant="icn-txt"
      icon={icon}
      text={text(textKey)}
      isSelected={false}
      hasOutline={true}
      onClick={onClick}
    />
  )
}

export const BlockSelector = memo(function BlockSelector(
  props: BlockSelectorProps
) {
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

  function renderBlockOptions(type: string) {
    return blockOptionsConfig
      .find((config) => config.type === type)
      .options.map(({ icon, textKey, value }) => (
        <BlockOptionTag
          key={value}
          icon={icon}
          textKey={textKey}
          onClick={() => handleBlockSelection(value)}
        />
      ))
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
            <div className="flex flex-row gap-2 items-start">
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
                {renderBlockOptions(options)}
              </div>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleSelectorOpening}
        className={`flex relative justify-center items-center p-[0.75rem] md:p-[1rem] lg:p-[1.5rem] min-w-[100%] rounded-[20px] lg:rounded-[30px] ${
          selected ? "text-white bg-slate-900" : "text-black bg-white"
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
})
