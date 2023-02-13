import useTranslation from "next-translate/useTranslation"
import { BracketsCurly, X } from "phosphor-react"
import { useEffect, useState } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardSwitch } from "../../../components/Card/CardContentVariants/CardSwitch"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IBlock } from "../../../types/Block.types"
import { BlocksConfigProps } from "../../../types/BlockConfig.types"
import { AutomationBlocksConfig } from "./AutomationBlocksConfig"

export function AutomationConfig({
  handleAddBlock,
  handleOpenVariablePanel,
  isOpen,
  onClose,
  setFunctionHandleAddVariable,
}: BlocksConfigProps) {
  const text = useTranslation().t

  type IConditional = {
    first_variable?: string
    comparison?: string
    second_variable?: string
  }

  type IConditionals = {
    conditionals?: IConditional[]
  }

  type IAutomation = {
    description?: string
    visibility?: boolean
    triggers?: IConditionals[]
    blocks?: IBlock[]
  }

  const [content, setContent] = useState<IAutomation | null>({
    triggers: [
      {
        conditionals: [
          {
            first_variable: "",
            comparison: "",
            second_variable: "",
          },
        ],
      },
    ],
  })
  const [saveAs, setSaveAs] = useState<string>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateContent(newData: IAutomation) {
    setContent((state) => {
      return {
        ...state,
        ...newData,
      } as IAutomation
    })
  }

  function handleAddNewTrigger() {
    const newTrigger = [
      {
        conditionals: [
          {
            first_variable: "",
            comparison: "",
            second_variable: "",
          },
        ],
      },
    ]
    if (content?.triggers) {
      const currentTriggers = [...content.triggers, newTrigger[0]]
      handleUpdateContent({
        triggers: [...currentTriggers],
      })
    } else {
      handleUpdateContent({
        triggers: newTrigger,
      })
    }
  }

  function handleAddNewConditional(index1: number) {
    if (content?.triggers) {
      const newTriggers = [...content.triggers]
      // @ts-ignore
      newTriggers[index1].conditionals.push({
        first_variable: "",
        comparison: "",
        second_variable: "",
      })
    }
  }

  function handleUpdateConditional(
    index1: number,
    index2: number,
    newConditional: IConditional
  ) {
    if (content?.triggers) {
      const triggers = [...content.triggers]
      //@ts-ignore
      triggers[index1].conditionals[index2] = {
        comparison:
          newConditional.comparison ||
          //@ts-ignore
          triggers[index1].conditionals[index2].comparison,
        first_variable:
          newConditional.first_variable ||
          //@ts-ignore
          triggers[index1].conditionals[index2].first_variable,
        second_variable:
          newConditional.second_variable ||
          //@ts-ignore
          triggers[index1].conditionals[index2].second_variable,
      }
      handleUpdateContent({ triggers: triggers })
      console.log(triggers)
    }
  }

  function handleRemoveConditional(index1: number, index2: number) {
    if (content?.triggers) {
      const newTriggers = content.triggers.map((trigger, index) => {
        if (index !== index1 && trigger.conditionals) {
          return trigger.conditionals.map((conditional, index) => {
            if (index !== index2) {
              return conditional
            }
          })
        }
      })
      setContent({ triggers: newTriggers as IConditionals[] })
    }
  }

  function handleUpdateSaveAs(value: string) {
    setSaveAs(value)
    handleUpdateIsUpdating(true)
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleClosing() {
    setContent(null)
    setSaveAs(undefined)
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
    onClose()
  }

  function onAddBlock() {
    handleAddBlock({
      type: "automation",
      save_as: saveAs,
      data: content,
    })
    handleClosing()
  }

  useEffect(() => {
    if (content && saveAs) {
      onAddBlock()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("automationconfig:cancel")}
          onClick={() => handleClosing()}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("automationconfig:add")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("automationconfig:cancel")}
          onClick={() => handleClosing()}
        />,
      ]
    }
  }

  const [changePage, setChangePage] = useState(false)

  return (
    <>
      <Dialog
        isOpen={isOpen}
        title={text("automationconfig:toptitle")}
        onClose={() => {}}
      >
        <div className="flex flex-col items-center gap-3">
          <Card>
            <CardText label={text("automationconfig:description")} />
            <CardTextInput
              input={{
                label: text("automationconfig:descriptionlabel"),
                onChange: (description) =>
                  handleUpdateContent({ description: description }),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>
          <Card>
            <CardSwitch
              onChange={(stat) => handleUpdateContent({ visibility: stat })}
              text={text("automationconfig:visibility")}
            />
          </Card>

          {content?.triggers &&
            content.triggers.map((trigger, index1) => {
              return (
                <>
                  {trigger.conditionals &&
                    trigger.conditionals.map((conditional, index2) => {
                      return (
                        <>
                          <Card key={index2}>
                            <CardText
                              label={`${text("automationconfig:trigger")} ${
                                index1 + 1
                              }|${index2 + 1}`}
                              indicator={{
                                icon: X,
                                onClick: () =>
                                  handleRemoveConditional(index1, index2),
                              }}
                            />
                            <CardLine />
                            <CardText
                              label={text("automationconfig:firstvariable")}
                            />
                            <CardTextInput
                              input={{
                                label: text("automationconfig:triggerlabel"),
                                onChange: (text) => {
                                  handleUpdateConditional(index1, index2, {
                                    first_variable: text,
                                  })
                                },
                              }}
                            />
                            <CardText
                              label={text("automationconfig:comparison")}
                            />
                            <CardTextInput
                              dropdown={{
                                onChange: (option) => {
                                  handleUpdateConditional(index1, index2, {
                                    comparison: option,
                                  })
                                },
                                options: [
                                  {
                                    title: text("automationconfig:equalto"),
                                    value: "equal to",
                                  },
                                  {
                                    title: text("automationconfig:notequalto"),
                                    value: "not equal to",
                                  },
                                  {
                                    title: text("automationconfig:dontcontain"),
                                    value: "don't contain",
                                  },
                                  {
                                    title: text("automationconfig:contain"),
                                    value: "contain",
                                  },
                                ],
                              }}
                            />
                            <CardText
                              label={text("automationconfig:secondvariables")}
                            />
                            <CardTextInput
                              input={{
                                label: text("automationconfig:triggerlabel"),
                                onChange: (text) => {
                                  handleUpdateConditional(index1, index2, {
                                    second_variable: text,
                                  })
                                },
                              }}
                            />
                          </Card>
                        </>
                      )
                    })}
                  <Tag
                    variant="txt"
                    text={text("automationconfig:addtrigger")}
                    onClick={() => handleAddNewConditional(index1)}
                  />
                </>
              )
            })}
          <Tag
            variant="txt"
            text={text("automationconfig:newtrigger")}
            onClick={() => handleAddNewTrigger()}
          />

          <Button
            block={{
              data: {
                text: "blocks",
                color: "bg-black",
                onClick: () => setChangePage(true),
              },
            }}
            isEditable={false}
          />

          <Card>
            <CardText label={text("automationconfig:saveas")} />
            <CardTextInput
              input={{
                label: text("automationconfig:saveaslabel"),
                onChange: (text) => handleUpdateSaveAs(text),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>
          <div className="w-full h-fit hidden xl:block">
            <Button
              block={{
                data: {
                  color: "bg-white",
                  text: text("automationconfig:cancel"),
                  onClick: () => handleClosing(),
                },
              }}
              isEditable={false}
            />
          </div>
          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                block={{
                  data: {
                    color: "bg-white",
                    text: text("automationconfig:addblock"),
                    onClick: () => handleUpdateRunUpdate(true),
                  },
                }}
                isEditable={false}
              />
            </div>
          )}
          <TabBar isHidden={true} tags={handleTabBar()} />
        </div>
      </Dialog>
      {changePage && (
        <AutomationBlocksConfig
          isThisOpen={changePage}
          onClose={() => setChangePage(false)}
        />
      )}
    </>
  )
}
