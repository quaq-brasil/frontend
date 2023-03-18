import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "components/Dialog/Dialog"
import useTranslation from "next-translate/useTranslation"
import dynamic from "next/dynamic"
import { BracketsCurly } from "phosphor-react"
import { useCallback, useState } from "react"
import { BlockProps } from "types/Block.types"
import { BlocksConfigProps } from "types/BlockConfig.types"
import { ComparisonType } from "./AutomationOptions"

const AutomationConditionals = dynamic(() =>
  import("./Conditionals").then((mod) => mod.AutomationConditionals)
)

const AutomationBlockSelector = dynamic(() =>
  import("./AutomationBlockSelector").then((mod) => mod.AutomationBlockSelector)
)

export interface IComparison {
  type: ComparisonType
  value: any
  comparativeValue?: any
}

export interface IAutomationBlock {
  conditionals?: IComparison[][]
  blocks?: any[]
}

const defaultValueComparison = {
  type: ComparisonType.Equals,
  value: "",
  comparativeValue: "",
}

export function AutomationConfig({
  handleAddBlock,
  isOpen,
  onClose,
  handleOpenVariablePanel,
  setFunctionHandleAddVariable,
  handleCheckSaveAs,
  blockData,
}: BlocksConfigProps) {
  const text = useTranslation().t

  const [conditionals, setConditionals] = useState<IComparison[][]>([
    [defaultValueComparison],
  ])

  const [blocks, setBlocks] = useState<BlockProps[]>([])

  const [isBlockSelectorOpen, setIsBlockSelectorOpen] = useState(false)

  const handleAddComparison = useCallback((index: number) => {
    setConditionals((state) => {
      const newState = state.map((item, idx) => {
        if (idx === index) {
          return [...item, defaultValueComparison]
        }
        return item
      })

      return newState
    })
  }, [])

  const handleAddConditionalsArray = useCallback(() => {
    setConditionals((state) => [...state, [defaultValueComparison]])
  }, [])

  const handleRemoveComparison = useCallback(
    (index: number, conditionalsIndex: number) => {
      setConditionals((state) => {
        const newState = state.map((item, idx) => {
          if (idx === conditionalsIndex) {
            return item.filter((_, i) => i !== index)
          }
          return item
        })

        const cleanState = newState.filter(
          (conditionals) => conditionals.length > 0
        )

        return cleanState.length > 0 ? cleanState : [[defaultValueComparison]]
      })
    },
    []
  )

  const handleUpdateComparison = useCallback(
    ({
      conditionalsIndex,
      index,
      comparison,
    }: {
      conditionalsIndex: number
      index: number
      comparison: {
        type?: ComparisonType
        value?: string
        comparativeValue?: string
      }
    }) => {
      setConditionals((state) => {
        const newState = state.map((item, idx) => {
          if (idx === conditionalsIndex) {
            return item.map((comp, i) => {
              if (i === index) {
                return { ...comp, ...comparison }
              }
              return comp
            })
          }
          return item
        })

        return newState
      })
    },
    []
  )

  function onAddBlock() {
    handleAddBlock({
      id: blockData?.id || undefined,
      type: "automation",
      save_as: "saveAs",
      data: {
        conditionals,
        blocks,
      },
    })
    onClose()
    // handleClosing()
  }

  const handleOpenVariablePanelForComparison = ({
    conditionalsIndex,
    index,
    comparison,
  }: {
    conditionalsIndex: number
    index: number
    comparison: {
      value?: string
      comparativeValue?: string
    }
  }) => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        if (typeof comparison?.value === "string") {
          comparison.value = variable
        } else if (typeof comparison?.comparativeValue === "string") {
          comparison.comparativeValue = variable
        }

        console.log("comparison", comparison)

        handleUpdateComparison({ conditionalsIndex, index, comparison })
      })
    handleOpenVariablePanel()
  }

  return (
    <Dialog
      isOpen={isOpen}
      title={text("automationconfig:top_title")}
      onClose={() => {}}
    >
      {!isBlockSelectorOpen ? (
        <div className="flex flex-col items-center gap-3">
          <Card>
            <CardText label={text("automationconfig:description")} />
            <CardTextInput
              input={{
                label: text("automationconfig:description_label"),
              }}
              indicator={{
                icon: BracketsCurly,
              }}
            />
          </Card>

          <AutomationConditionals
            conditionals={conditionals}
            handleAddComparison={handleAddComparison}
            handleAddConditionalsArray={handleAddConditionalsArray}
            handleRemoveComparison={handleRemoveComparison}
            handleUpdateComparison={handleUpdateComparison}
            handleOpenVariablePanelForComparison={
              handleOpenVariablePanelForComparison
            }
          />

          <div className="w-full h-fit  xl:block">
            <Button
              block={{
                data: {
                  color: "bg-black",
                  text: text("automationconfig:add_blocks"),
                  onClick: () => setIsBlockSelectorOpen(true),
                },
              }}
              isEditable={false}
            />
          </div>

          <button onClick={onAddBlock}>add block</button>
        </div>
      ) : (
        <AutomationBlockSelector
          blocks={blocks}
          setBlocks={setBlocks}
          onClose={() => setIsBlockSelectorOpen(false)}
        />
      )}
    </Dialog>
  )
}
