import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "components/Dialog/Dialog"
import useTranslation from "next-translate/useTranslation"
import dynamic from "next/dynamic"
import { ArrowRight, BracketsCurly } from "phosphor-react"
import { useCallback, useEffect, useState } from "react"
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

  type FormDataProps = {
    description?: {
      valid?: boolean
    }
    conditionals?: {
      valid?: boolean
    }
    saveAs?: {
      valid?: boolean
    }
  }

  const [formData, setFormData] = useState<FormDataProps>({
    conditionals: {
      valid: false,
    },
    description: {
      valid: false,
    },
    saveAs: {
      valid: false,
    },
  })
  const [description, setDescription] = useState<string | null>()
  const [conditionals, setConditionals] = useState<IComparison[][]>([
    [defaultValueComparison],
  ])
  const [blocks, setBlocks] = useState<BlockProps[]>([])
  const [isBlockSelectorOpen, setIsBlockSelectorOpen] = useState(false)
  const [isConditionalsOpen, setConditionalsOpen] = useState(false)
  const [saveAs, setSaveAs] = useState<string | null>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateFormData(newData: FormDataProps) {
    setFormData((state) => {
      return {
        ...state,
        ...newData,
      } as FormDataProps
    })
  }

  function handleUpdateDescription(text: string) {
    setDescription(text)
  }

  function handleUpdateSaveAs(value: typeof saveAs) {
    setSaveAs(value)
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

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
                if (comp.comparativeValue === null) {
                  delete comp.comparativeValue
                }
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

  function handleClosing() {
    setDescription(null)
    setConditionals([])
    handleUpdateIsUpdating(false)
    handleUpdateRunUpdate(false)
    handleUpdateSaveAs(null)
    handleUpdateFormData({
      description: { valid: false },
      conditionals: { valid: false },
      saveAs: { valid: false },
    })
    onClose()
  }

  function onAddBlock() {
    handleAddBlock({
      id: blockData?.id || undefined,
      type: "automation",
      save_as: saveAs,
      data: {
        description,
        conditionals,
        blocks,
      },
    })
    handleClosing()
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

        handleUpdateComparison({ conditionalsIndex, index, comparison })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForSaveAs = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateSaveAs(saveAs ? `${saveAs}${variable}` : variable)
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForDescription = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateDescription(
          description ? `${description}${variable}` : variable
        )
      })
    handleOpenVariablePanel()
  }

  useEffect(() => {
    if (blockData) {
      setDescription(blockData?.data?.description)
      setConditionals([...blockData?.data?.conditionals])
      setBlocks([...blockData?.data?.blocks])
      setSaveAs(blockData.save_as)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockData])

  useEffect(() => {
    if (description) {
      handleUpdateFormData({ description: { valid: true } })
    } else {
      handleUpdateFormData({ description: { valid: false } })
    }
    if (conditionals.length > 0 && conditionals[0][0].value) {
      handleUpdateFormData({ conditionals: { valid: true } })
    } else {
      handleUpdateFormData({ conditionals: { valid: false } })
    }
    if (saveAs) {
      if (blockData) {
        if (blockData.save_as == saveAs) {
          handleUpdateFormData({ saveAs: { valid: true } })
        } else {
          const isValid = handleCheckSaveAs(saveAs)
          handleUpdateFormData({ saveAs: { valid: isValid } })
        }
      } else {
        const isValid = handleCheckSaveAs(saveAs)
        handleUpdateFormData({ saveAs: { valid: isValid } })
      }
    } else {
      handleUpdateFormData({ saveAs: { valid: false } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description, conditionals, saveAs])

  useEffect(() => {
    if (
      formData.conditionals.valid &&
      formData.description.valid &&
      formData.saveAs.valid
    ) {
      handleUpdateIsUpdating(true)
    } else {
      handleUpdateIsUpdating(false)
    }
  }, [formData])

  useEffect(() => {
    if (runUpdate) {
      onAddBlock()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  return (
    <Dialog isOpen={isOpen} title={text("automationconfig:top_title")}>
      {!isBlockSelectorOpen && !isConditionalsOpen ? (
        <div className="flex flex-col items-center gap-3">
          <Card>
            <CardText label={text("automationconfig:description")} />
            <CardTextInput
              input={{
                label: text("automationconfig:description_label"),
                onChange: (text) => handleUpdateDescription(text),
                inputValue: description || "",
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: handleOpenVariablePanelForDescription,
              }}
            />
          </Card>

          <Card>
            <CardText label={text("automationconfig:settings")} />
            <CardText
              label={text("automationconfig:conditionals")}
              indicator={{
                icon: ArrowRight,
              }}
              onClick={() => setConditionalsOpen(true)}
            />
            <CardLine />
            <CardText
              label={`${text("automationconfig:manage_blocks")} (${
                blocks.length
              })`}
              indicator={{
                icon: ArrowRight,
              }}
              onClick={() => setIsBlockSelectorOpen(true)}
            />
            <CardLine />
          </Card>

          <Card>
            <CardText label={text("buttonconfig:saveas")} />
            <CardTextInput
              input={{
                label: text("buttonconfig:saveaslabel"),
                onChange: (e) => handleUpdateSaveAs(e),
                inputValue: saveAs || "",
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: handleOpenVariablePanelForSaveAs,
              }}
            />
            {!formData.saveAs?.valid && (
              <p className="w-full lg:text-[1.1rem] text-center">
                {text("createtemplate:saveas")}
              </p>
            )}
          </Card>

          <div className="w-full h-fit hidden xl:block">
            <Button
              block={{
                data: {
                  color: "bg-white",
                  text: text("textconfig:cancel"),
                  onClick: () => handleClosing(),
                },
              }}
              isEditable={false}
            />
          </div>
          {isUpdating && (
            <>
              <div className="w-full h-fit hidden xl:block">
                <Button
                  block={{
                    data: {
                      color: "bg-white",
                      text: blockData
                        ? text("textconfig:updateblock")
                        : text("textconfig:addblock"),
                      onClick: () => handleUpdateRunUpdate(true),
                    },
                  }}
                  isEditable={false}
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          {isBlockSelectorOpen && (
            <AutomationBlockSelector
              blocks={blocks}
              setBlocks={setBlocks}
              onClose={() => setIsBlockSelectorOpen(false)}
              handleCheckSaveAs={handleCheckSaveAs}
              saveAs={saveAs}
            />
          )}
          {isConditionalsOpen && (
            <AutomationConditionals
              conditionals={conditionals}
              handleAddComparison={handleAddComparison}
              handleAddConditionalsArray={handleAddConditionalsArray}
              handleRemoveComparison={handleRemoveComparison}
              handleUpdateComparison={handleUpdateComparison}
              handleOpenVariablePanelForComparison={
                handleOpenVariablePanelForComparison
              }
              onClose={() => setConditionalsOpen(false)}
            />
          )}
        </>
      )}
    </Dialog>
  )
}
