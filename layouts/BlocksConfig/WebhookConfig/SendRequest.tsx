import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardSwitch } from "components/Card/CardContentVariants/CardSwitch"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { CodeEditor } from "components/CodeEditor/CodeEditor"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import { useValidation, validationRules } from "hooks/useValidation"
import useTranslation from "next-translate/useTranslation"
import { BracketsCurly, Check } from "phosphor-react"
import { useEffect, useState } from "react"
import { BlocksConfigProps } from "types/BlockConfig.types"

export function SendRequest({
  isOpen,
  onClose,
  blockData,
  handleAddBlock,
  handleOpenVariablePanel,
  setFunctionHandleAddVariable,
  handleCheckSaveAs,
}: BlocksConfigProps) {
  const text = useTranslation().t

  type WebhookProps = {
    description?: string
    visibility?: boolean
    parameters?: string
    header?: string
    body?: string
    type?: string
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
    visibility: {
      initialValue: blockData?.data?.visibility || false,
      validators: [validationRules.required(text("validation:required"))],
    },
    parameters: {
      initialValue: blockData?.data?.parameters || "",
    },
    header: {
      initialValue: blockData?.data?.header || "",
    },
    body: {
      initialValue: blockData?.data?.body || "",
    },
    type: {
      initialValue: blockData?.data?.type || "",
      validators: [validationRules.required(text("validation:required"))],
    },
    link: {
      initialValue: blockData?.data?.link || "",
      validators: [
        validationRules.required(text("validation:required")),
        validationRules.url(text("validation:url")),
      ],
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
      if (blockData?.data?.body !== localBlockData?.body) {
        hasDataChanged = true
      }
      if (blockData?.data?.description !== localBlockData?.description) {
        hasDataChanged = true
      }
      if (blockData?.data?.header !== localBlockData?.header) {
        hasDataChanged = true
      }
      if (blockData?.data?.link !== localBlockData?.link) {
        hasDataChanged = true
      }
      if (blockData?.data?.parameters !== localBlockData?.parameters) {
        hasDataChanged = true
      }
      if (blockData?.data?.type !== localBlockData?.type) {
        hasDataChanged = true
      }
      if (blockData?.data?.visibility !== localBlockData?.visibility) {
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
      visibility: false,
      parameters: "",
      header: "",
      body: "",
      type: "",
      link: "",
      save_as: "",
    })
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
    setHasDataChanged(false)
    onClose()
  }

  function onAddBlock() {
    handleAddBlock({
      id: blockData?.id || undefined,
      type: "webhook",
      save_as: localBlockData.save_as,
      data: {
        description: localBlockData.description,
        visibility: localBlockData.visibility,
        parameters: localBlockData.parameters,
        header: localBlockData.header,
        body: localBlockData.body,
        type: localBlockData.type,
        link: localBlockData.link,
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
            onClick={onAddBlock}
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

  const handleOpenVariablePanelForParameters = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateLocalBlockData({
          parameters: localBlockData?.parameters
            ? `${localBlockData?.parameters}${variable}`
            : variable,
        })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForLink = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateLocalBlockData({
          link: localBlockData?.link
            ? `${localBlockData?.link}${variable}`
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

  const handleOpenVariablePanelForHeaders = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateLocalBlockData({
          header: localBlockData?.link
            ? `${localBlockData?.link}${variable}`
            : variable,
        })
      })

    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForBody = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateLocalBlockData({
          body: localBlockData?.link
            ? `${localBlockData?.link}${variable}`
            : variable,
        })
      })

    handleOpenVariablePanel()
  }

  useEffect(() => {
    if (blockData) {
      setLocalBlockData({
        description: blockData.data.description,
        visibility: blockData.data.visibility,
        parameters: blockData.data.parameters,
        header: blockData.data.header,
        body: blockData.data.body,
        type: blockData.data.type,
        link: blockData.data.link,
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
          <CardSwitch
            onChange={(stat) =>
              handleUpdateLocalBlockData({ visibility: stat })
            }
            text={text("webhookconfig:switch")}
            showStatus={true}
          />
        </Card>

        <Card>
          <CardText label={text("webhookconfig:parameters")} />
          <CardTextInput
            input={{
              label: text("webhookconfig:parametersinput"),
              onChange: (parameters) => {
                handleUpdateLocalBlockData({ parameters: parameters })
              },
              value: localBlockData?.parameters,
              errors: hasDataChanged ? localBlockDataErrors.parameters : [],
            }}
            indicator={{
              icon: BracketsCurly,
              onClick: handleOpenVariablePanelForParameters,
            }}
          />
        </Card>

        <Card>
          <CardText label={text("webhookconfig:header")} />
          <CodeEditor
            code={localBlockData?.header || ``}
            language="json"
            onChange={(header) => handleUpdateLocalBlockData({ header })}
            handleOpenVariablePanel={handleOpenVariablePanelForHeaders}
            placeHolder={text("webhookconfig:json")}
          />
        </Card>

        <Card>
          <CardText label={text("webhookconfig:body")} />
          <CodeEditor
            code={localBlockData?.body || ``}
            language="json"
            onChange={(body) => handleUpdateLocalBlockData({ body })}
            handleOpenVariablePanel={handleOpenVariablePanelForBody}
            placeHolder={text("webhookconfig:json")}
          />
        </Card>

        <Card>
          <CardText label={text("webhookconfig:type")} />
          <CardText
            label={text("webhookconfig:get")}
            indicator={{
              icon: Check,
              isVisible: localBlockData?.type == "GET" ? false : true,
            }}
            onClick={() => {
              handleUpdateLocalBlockData({ type: "GET" })
            }}
          />
          <CardLine />
          <CardText
            label={text("webhookconfig:post")}
            indicator={{
              icon: Check,
              isVisible: localBlockData?.type == "POST" ? false : true,
            }}
            onClick={() => {
              handleUpdateLocalBlockData({ type: "POST" })
            }}
          />
          <CardLine />
          <CardText
            label={text("webhookconfig:patch")}
            indicator={{
              icon: Check,
              isVisible: localBlockData?.type == "PATCH" ? false : true,
            }}
            onClick={() => {
              handleUpdateLocalBlockData({ type: "PATCH" })
            }}
          />
          <CardLine />
          <CardText
            label={text("webhookconfig:delete")}
            indicator={{
              icon: Check,
              isVisible: localBlockData?.type == "DELETE" ? false : true,
            }}
            onClick={() => {
              handleUpdateLocalBlockData({ type: "DELETE" })
            }}
          />
          <CardLine />
        </Card>

        <Card>
          <CardText label={text("webhookconfig:link")} />
          <CardTextInput
            input={{
              label: text("webhookconfig:linkinput"),
              onChange: (link) => {
                handleUpdateLocalBlockData({ link: link })
              },
              value: localBlockData?.link,
              errors: hasDataChanged ? localBlockDataErrors.link : [],
            }}
            indicator={{
              icon: BracketsCurly,
              onClick: handleOpenVariablePanelForLink,
            }}
          />
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
