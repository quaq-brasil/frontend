import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "components/Dialog/Dialog"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import { TextEditor } from "components/TextEditor/TextEditor"
import { useValidation, validationRules } from "hooks/useValidation"
import useTranslation from "next-translate/useTranslation"
import { BracketsCurly } from "phosphor-react"
import { useEffect, useState } from "react"
import PhoneInput from "react-phone-number-input/input"
import { BlocksConfigProps } from "types/BlockConfig.types"

export function WhatsAppConfig({
  handleAddBlock,
  isOpen,
  onClose,
  handleOpenVariablePanel,
  setFunctionHandleAddVariable,
  handleCheckSaveAs,
  blockData,
}: BlocksConfigProps) {
  const text = useTranslation().t

  type WhatsAppProps = {
    phone_number?: string
    data?: string
    save_as?: string
  }

  const [
    localBlockData,
    setLocalBlockData,
    localBlockDataErrors,
    isLocalBlockDataValid,
  ] = useValidation<WhatsAppProps>({
    phone_number: {
      initialValue: "",
      validators: [validationRules.required(text("validation:required"))],
    },
    data: {
      initialValue: "",
      validators: [validationRules.required(text("validation:required"))],
    },
    save_as: {
      initialValue: "",
      validators: [
        validationRules.required(text("validation:required")),
        validationRules.custom(
          text("createtemplate:saveas"),
          handleCheckSaveAs,
          [blockData?.save_as]
        ),
      ],
    },
  })

  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)
  const [hasDataChanged, setHasDataChanged] = useState(false)

  function handleUpdateLocalBlockData(newBlockData: WhatsAppProps) {
    setLocalBlockData({ ...localBlockData, ...newBlockData })
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function checkIfDataHasChanged() {
    if (blockData) {
      let hasDataChanged = false
      if (blockData?.save_as !== localBlockData?.save_as) {
        hasDataChanged = true
      }
      return hasDataChanged
    } else {
      return false
    }
  }

  function handleClosing() {
    setLocalBlockData({
      save_as: "",
      data: "",
      phone_number: "",
    })
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
    setHasDataChanged(false)
    onClose()
  }

  function onAddBlock() {
    handleAddBlock({
      id: blockData?.id || undefined,
      type: "whatsapp",
      save_as: localBlockData.save_as,
      data: {
        phone_number: localBlockData.phone_number,
        data: localBlockData.data,
      },
    })
    handleClosing()
  }

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("sendtowhatsapp:cancel")}
          onClick={() => handleClosing()}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={
              blockData
                ? text("sendtowhatsapp:update")
                : text("sendtowhatsapp:add")
            }
            onClick={() => onAddBlock()}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("sendtowhatsapp:cancel")}
          onClick={() => handleClosing()}
        />,
      ]
    }
  }

  const handleOpenVariablePanelForText = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateLocalBlockData({
          data: localBlockData.data
            ? `${localBlockData.data}${variable}`
            : variable,
        })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForSaveAs = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateLocalBlockData({
          save_as: localBlockData.save_as
            ? `${localBlockData.save_as}${variable}`
            : variable,
        })
      })
    handleOpenVariablePanel()
  }

  useEffect(() => {
    if (blockData) {
      setLocalBlockData({ save_as: blockData.save_as })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockData])

  useEffect(() => {
    if (runUpdate && isLocalBlockDataValid) {
      if (!blockData) {
        onAddBlock()
      } else {
        if (checkIfDataHasChanged()) {
          onAddBlock()
        }
      }
    } else if (runUpdate && !isLocalBlockDataValid) {
      setHasDataChanged(true)
      handleUpdateRunUpdate(false)
      handleUpdateIsUpdating(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  useEffect(() => {
    if (blockData) {
      if (checkIfDataHasChanged() && isLocalBlockDataValid) {
        handleUpdateIsUpdating(true)
      } else {
        handleUpdateIsUpdating(false)
      }
    } else {
      if (isLocalBlockDataValid) {
        handleUpdateIsUpdating(true)
      } else {
        handleUpdateIsUpdating(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localBlockData, isLocalBlockDataValid])

  return (
    <>
      <Dialog isOpen={isOpen} title={text("sendtowhatsapp:toptitle")}>
        <div className="flex flex-col items-center gap-3">
          <Card>
            <CardText label={text("sendtowhatsapp:title1")} />
            <PhoneInput
              international
              className="w-full bg-slate-50 p-3 placeholder:text-slate-500 focus:outline-none text-[1rem] md:text-[1.125rem]"
              placeholder={text("sendtowhatsapp:label2")}
              value={localBlockData.phone_number}
              onChange={(data) =>
                handleUpdateLocalBlockData({ phone_number: data })
              }
              error={localBlockDataErrors.phone_number}
            />
          </Card>
          <div
            className="flex flex-col justify-center gap-[0.375rem] h-fit py-[16px]
    bg-white min-w-[100%] rounded-[20px] lg:rounded-[30px] lg:gap-[0.75rem]"
          >
            <CardText label={text("sendtowhatsapp:texttowhats")} />
            <TextEditor
              content={localBlockData.data}
              onChange={(data) => {
                handleUpdateLocalBlockData({ data })
              }}
              handleOpenVariablePanelForText={handleOpenVariablePanelForText}
              errors={hasDataChanged ? localBlockDataErrors.data : []}
            />
            <CardLine />
          </div>
          <Card>
            <CardText label={text("sendtowhatsapp:title2")} />
            <CardTextInput
              input={{
                label: text("sendtowhatsapp:label2"),
                value: localBlockData.save_as,
                onChange: (value) =>
                  handleUpdateLocalBlockData({ save_as: value }),
                errors: localBlockData.save_as
                  ? localBlockDataErrors.save_as
                  : [],
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: handleOpenVariablePanelForSaveAs,
              }}
            />
          </Card>
          <div className="w-full h-fit hidden xl:block">
            <Button
              block={{
                data: {
                  color: "bg-white",
                  text: text("sendtowhatsapp:cancel"),
                  onClick: handleClosing,
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
                    text: blockData
                      ? text("sendtowhatsapp:updateblock")
                      : text("sendtowhatsapp:addblock"),
                    onClick: () => handleUpdateRunUpdate(true),
                  },
                }}
                isEditable={false}
              />
            </div>
          )}
        </div>
        <TabBar isHidden={true} tags={handleTabBar()} />
      </Dialog>
    </>
  )
}
