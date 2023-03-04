import useTranslation from "next-translate/useTranslation"
import { BracketsCurly, Check } from "phosphor-react"
import { useEffect, useState } from "react"
import { v4 } from "uuid"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardSwitch } from "../../../components/Card/CardContentVariants/CardSwitch"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { CodeEditor } from "../../../components/CodeEditor/CodeEditor"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { BlocksConfigProps } from "../../../types/BlockConfig.types"

export function SendRequest({
  isOpen,
  onClose,
  handleAddBlock,
  handleOpenVariablePanel,
  setFunctionHandleAddVariable,
  handleCheckSaveAs,
}: BlocksConfigProps) {
  const text = useTranslation().t

  type IWebhook = {
    description?: string
    visibility?: boolean
    parameters?: any
    header?: string
    body?: string
    type?: string
    link?: string
  }

  type FormDataProps = {
    description?: {
      valid?: boolean
    }
    parameters?: {
      valid?: boolean
    }
    type?: {
      valid?: boolean
    }
    link?: {
      valid?: boolean
    }
    saveAs?: {
      valid?: boolean
    }
  }

  const [formData, setFormData] = useState<FormDataProps>({
    description: {
      valid: false,
    },
    parameters: {
      valid: false,
    },
    type: {
      valid: false,
    },
    link: {
      valid: false,
    },
    saveAs: {
      valid: false,
    },
  })
  const [content, setContent] = useState<IWebhook>()
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

  function handleValidation() {
    if (content.description) {
      handleUpdateFormData({ description: { valid: true } })
    } else {
      handleUpdateFormData({ description: { valid: false } })
    }
    if (content.parameters) {
      handleUpdateFormData({ parameters: { valid: true } })
    } else {
      handleUpdateFormData({ parameters: { valid: false } })
    }
    if (content.type) {
      handleUpdateFormData({ type: { valid: true } })
    } else {
      handleUpdateFormData({ type: { valid: false } })
    }
    if (content.link) {
      handleUpdateFormData({ link: { valid: true } })
    } else {
      handleUpdateFormData({ link: { valid: false } })
    }
  }

  function handleUpdateHeader(data: string) {
    handleUpdateContent({ header: data })
  }

  function handleUpdateBody(data: string) {
    handleUpdateContent({ body: data })
  }

  function handleUpdateContent(newData: IWebhook) {
    setContent((state) => {
      return {
        ...state,
        ...newData,
      } as IWebhook
    })
  }

  function handleUpdateSaveAs(value: typeof saveAs) {
    setSaveAs(value)
    const isValid = handleCheckSaveAs(value)
    handleUpdateFormData({ saveAs: { valid: isValid } })
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleClosing() {
    handleUpdateContent({})
    setSaveAs(undefined)
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
    handleUpdateFormData({
      description: {
        valid: false,
      },
      parameters: {
        valid: false,
      },
      type: {
        valid: false,
      },
      link: {
        valid: false,
      },
      saveAs: {
        valid: false,
      },
    })
    onClose()
  }

  function onAddBlock() {
    handleAddBlock({
      id: v4(),
      type: "webhook",
      save_as: saveAs,
      data: {
        ...content,
        body: `{${content?.body}}`,
        header: `{${content?.header}}`,
      },
    })
    handleClosing()
  }

  useEffect(() => {
    if (content && saveAs) {
      onAddBlock()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  useEffect(() => {
    if (
      formData.description?.valid &&
      formData.link?.valid &&
      formData.parameters?.valid &&
      formData.type?.valid &&
      formData.saveAs?.valid
    ) {
      handleUpdateIsUpdating(true)
    } else {
      handleUpdateIsUpdating(false)
    }
  }, [formData])

  const handleOpenVariablePanelForDescription = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateContent({
          description: content?.description
            ? `${content?.description}${variable}`
            : variable,
        })
        handleValidation()
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForParameters = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateContent({
          parameters: content?.parameters
            ? `${content?.parameters}${variable}`
            : variable,
        })
        handleValidation()
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForLink = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateContent({
          link: content?.link ? `${content?.link}${variable}` : variable,
        })
        handleValidation()
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

  const handleOpenVariablePanelForHeaders = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateContent({ header: `${content?.link}${variable}` })
      })
    handleValidation()
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForBody = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateContent({ body: `${content?.link}${variable}` })
      })
    handleValidation()
    handleOpenVariablePanel()
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
            text={text("webhookconfig:add")}
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

  return (
    <>
      <>
        <Card>
          <CardText label={text("webhookconfig:description")} />
          <CardTextInput
            input={{
              label: text("webhookconfig:descriptioninput"),
              onChange: (description) => {
                handleUpdateContent({ description: description })
                handleValidation()
              },
              inputValue: content?.description,
            }}
            indicator={{
              icon: BracketsCurly,
              onClick: handleOpenVariablePanelForDescription,
            }}
          />
        </Card>

        <Card>
          <CardSwitch
            onChange={(stat) => handleUpdateContent({ visibility: stat })}
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
                handleUpdateContent({ parameters: parameters })
                handleValidation()
              },
              inputValue: content?.parameters,
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
            code={content?.header || ``}
            language="json"
            onChange={handleUpdateHeader}
            handleOpenVariablePanel={handleOpenVariablePanelForHeaders}
          />
        </Card>

        <Card>
          <CardText label={text("webhookconfig:body")} />
          <CodeEditor
            code={content?.body || ``}
            language="json"
            onChange={handleUpdateBody}
            handleOpenVariablePanel={handleOpenVariablePanelForBody}
          />
        </Card>

        <Card>
          <CardText label={text("webhookconfig:type")} />
          <CardText
            label={text("webhookconfig:get")}
            indicator={{
              icon: Check,
              isVisible: content?.type == "GET" ? false : true,
            }}
            onClick={() => {
              handleUpdateContent({ type: "GET" })
              handleValidation()
            }}
          />
          <CardLine />
          <CardText
            label={text("webhookconfig:post")}
            indicator={{
              icon: Check,
              isVisible: content?.type == "POST" ? false : true,
            }}
            onClick={() => {
              handleUpdateContent({ type: "POST" })
              handleValidation()
            }}
          />
          <CardLine />
          <CardText
            label={text("webhookconfig:patch")}
            indicator={{
              icon: Check,
              isVisible: content?.type == "PATCH" ? false : true,
            }}
            onClick={() => {
              handleUpdateContent({ type: "PATCH" })
              handleValidation()
            }}
          />
          <CardLine />
          <CardText
            label={text("webhookconfig:delete")}
            indicator={{
              icon: Check,
              isVisible: content?.type == "DELETE" ? false : true,
            }}
            onClick={() => {
              handleUpdateContent({ type: "DELETE" })
              handleValidation()
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
                handleUpdateContent({ link: link })
                handleValidation()
              },
              inputValue: content?.link,
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
                  text: text("webhookconfig:addblock"),
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