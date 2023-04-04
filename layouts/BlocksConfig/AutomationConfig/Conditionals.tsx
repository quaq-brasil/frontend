import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { BracketsCurly, X } from "phosphor-react"
import { Fragment, memo } from "react"
import { IComparison } from "./AutomationConfig"
import {
  AutomationOptions,
  ComparisonType,
  typesWithSecondValue,
} from "./AutomationOptions"

type AutomationConditionalsProps = {
  conditionals: IComparison[][]
  handleRemoveComparison: (index: number, conditionalsIndex: number) => void
  handleAddConditionalsArray: () => void
  handleAddComparison: (index: number) => void
  handleUpdateComparison: ({
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
  }) => void
  handleOpenVariablePanelForComparison: ({
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
  }) => void
  onClose: () => void
}

export const AutomationConditionals = memo(function AutomationConditionals({
  conditionals,
  handleAddComparison,
  handleAddConditionalsArray,
  handleRemoveComparison,
  handleUpdateComparison,
  handleOpenVariablePanelForComparison,
  onClose,
}: AutomationConditionalsProps) {
  const text = useTranslation().t

  const options = AutomationOptions(text)

  return (
    <div className="flex flex-col items-center gap-3">
      {conditionals.map((comparisons, conditionalsIndex) => (
        <Fragment key={conditionalsIndex}>
          {comparisons.length > 0 &&
            comparisons.map((comparison, index) => (
              <Card key={index}>
                <CardText
                  label={`${text("automationconfig:trigger")} ${index + 1}`}
                  indicator={{
                    icon: X,
                    onClick: () =>
                      handleRemoveComparison(index, conditionalsIndex),
                  }}
                />
                <CardLine />
                <CardText label={text("automationconfig:first_value")} />
                <CardTextInput
                  input={{
                    label: text("automationconfig:trigger_label"),
                    value: comparison.value,
                    onChange: (value) =>
                      handleUpdateComparison({
                        conditionalsIndex,
                        index,
                        comparison: { value },
                      }),
                  }}
                  indicator={{
                    icon: BracketsCurly,
                    onClick: () =>
                      handleOpenVariablePanelForComparison({
                        conditionalsIndex,
                        index,
                        comparison: {
                          value: comparison.value,
                        },
                      }),
                  }}
                />
                <CardText label={text("automationconfig:comparison")} />
                <CardTextInput
                  dropdown={{
                    value: comparison.type,
                    onChange: (type: any) => {
                      handleUpdateComparison({
                        conditionalsIndex,
                        index,
                        comparison: { type },
                      })
                      if (!typesWithSecondValue.includes(type)) {
                        handleUpdateComparison({
                          conditionalsIndex,
                          index,
                          comparison: { comparativeValue: "" },
                        })
                      }
                    },
                    options: options,
                  }}
                />

                {typesWithSecondValue.includes(comparison.type) ? (
                  <>
                    <CardText label={text("automationconfig:second_value")} />
                    <CardTextInput
                      input={{
                        label: text("automationconfig:trigger_label"),
                        value: comparison.comparativeValue,
                        onChange: (comparativeValue) => {
                          handleUpdateComparison({
                            conditionalsIndex,
                            index,
                            comparison: { comparativeValue },
                          })
                        },
                      }}
                      indicator={{
                        icon: BracketsCurly,
                        onClick: () =>
                          handleOpenVariablePanelForComparison({
                            conditionalsIndex,
                            index,
                            comparison: {
                              comparativeValue: comparison.comparativeValue,
                            },
                          }),
                      }}
                    />
                  </>
                ) : null}

                <button
                  className="lg:text-[1.1rem] mb-1"
                  onClick={() => handleAddComparison(conditionalsIndex)}
                >
                  {text("automationconfig:and")}
                </button>
              </Card>
            ))}

          <Tag
            variant="txt"
            text={text("automationconfig:or")}
            onClick={handleAddConditionalsArray}
          />
        </Fragment>
      ))}
      <div className="w-full h-fit">
        <Button
          block={{
            data: {
              color: "bg-white",
              text:
                conditionals.length > 0 && conditionals[0][0].value
                  ? text("automationconfig:save")
                  : text("automationconfig:back"),
              onClick: onClose,
            },
          }}
          isEditable={false}
        />
      </div>
    </div>
  )
})
