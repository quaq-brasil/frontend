import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import { useValidation, validationRules } from "hooks/useValidation"
import useTranslation from "next-translate/useTranslation"
import { BracketsCurly, CopySimple } from "phosphor-react"
import { useEffect, useState } from "react"
import { BlocksConfigProps } from "types/BlockConfig.types"
import { v4 } from "uuid"

export function ReceiveRequest({
  isOpen,
  onClose,
  handleAddBlock,
  handleOpenVariablePanel,
  setFunctionHandleAddVariable,
  handleCheckSaveAs,
  blockData,
}: BlocksConfigProps) {
  const text = useTranslation().t

  type WebhookProps = {
    description?: string
    key?: string
    link?: string
    save_as?: string
  }

  const [
    localBlockData,
    setLocalBlockData,
    localBlockDataErrors,
    isLocalBlockDataValid,
  ] = useValidation<WebhookProps>({
    description: {
      initialValue: blockData?.data?.description || "",
      validators: [validationRules.required(text("validation:required"))],
    },
    key: {
      initialValue: blockData?.data?.key || v4(),
      validators: [validationRules.required(text("validation:required"))],
    },
    link: {
      initialValue: blockData?.data?.link || `api.quaq.me/entrypoint/${v4()}`,
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

  function handleUpdateLocalBlockData(newBlockData: WebhookProps) {
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
      if (blockData?.data?.description !== localBlockData?.description) {
        hasDataChanged = true
      }
      if (blockData?.data?.key !== localBlockData?.key) {
        hasDataChanged = true
      }
      if (blockData?.data?.link !== localBlockData?.link) {
        hasDataChanged = true
      }
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
      description: "",
      key: v4(),
      link: `api.quaq.me/entrypoint/${v4()}`,
      save_as: "",
    })
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
    setHasDataChanged(false)
    onClose()
  }

  function onAddBlock() {
    handleAddBlock({
      id: v4(),
      type: "webhook",
      save_as: localBlockData.save_as,
      data: {
        description: localBlockData.description,
        key: localBlockData.key,
        link: localBlockData.link,
      },
    })
    handleClosing()
  }

  const handleCopyTextToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      // Content copied to clipboard
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("webhookconfig:cancel")}
          onClick={() => handleClosing()}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={
              blockData
                ? text("webhookconfig:update")
                : text("webhookconfig:add")
            }
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("webhookconfig:cancel")}
          onClick={() => handleClosing()}
        />,
      ]
    }
  }

  const handleOpenVariablePanelForDescription = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateLocalBlockData({
          description: localBlockData?.description
            ? `${localBlockData?.description}${variable}`
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
      setLocalBlockData({
        description: blockData?.data?.description,
        key: blockData?.data?.key,
        link: blockData?.data?.link,
        save_as: blockData.save_as,
      })
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
      <>
        <Card>
          <CardText label={text("webhookconfig:description")} />
          <CardTextInput
            input={{
              label: text("webhookconfig:descriptioninput"),
              onChange: (description) => {
                handleUpdateLocalBlockData({ description: description })
              },
              value: localBlockData?.description,
              errors: hasDataChanged ? localBlockDataErrors.description : [],
            }}
            indicator={{
              icon: BracketsCurly,
              onClick: handleOpenVariablePanelForDescription,
            }}
          />
        </Card>
        <Card>
          <CardText label={text("webhookconfig:keytitle")} />
          <CardLine />
          <CardText
            label={localBlockData.key}
            indicator={{
              icon: CopySimple,
              onClick: () => handleCopyTextToClipboard(localBlockData.key),
            }}
          />
          <CardLine />
        </Card>
        <Card>
          <CardText label={text("webhookconfig:url")} />
          <CardLine />
          <CardText
            label={localBlockData.link}
            indicator={{
              icon: CopySimple,
              onClick: () => handleCopyTextToClipboard(localBlockData.link),
            }}
          />
          <CardLine />
        </Card>
        <Card>
          <CardText label={text("webhookconfig:saveas")} />
          <CardTextInput
            input={{
              label: text("webhookconfig:saveasinput"),
              onChange: (e) => handleUpdateLocalBlockData({ save_as: e }),
              value: localBlockData.save_as,
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
                text: text("webhookconfig:cancel"),
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
                  text: blockData
                    ? text("webhookconfig:updateblock")
                    : text("webhookconfig:addblock"),
                  onClick: () => handleUpdateRunUpdate(true),
                },
              }}
              isEditable={false}
            />
          </div>
        )}
      </>
      <TabBar isHidden={true} tags={handleTabBar()} />
    </>
  )
}
