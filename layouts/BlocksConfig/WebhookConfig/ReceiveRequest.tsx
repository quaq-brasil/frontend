import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
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

  type IWebhook = {
    description?: string
    key?: string
    link?: string
  }

  type FormDataProps = {
    description?: {
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
    saveAs: {
      valid: false,
    },
  })
  const [content, setContent] = useState<IWebhook>()
  const [key, _setKey] = useState(v4())
  const [slug, _setSlug] = useState(`${v4()}`)

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

  const handleOpenVariablePanelForDescription = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateContent({
          description: content?.description
            ? `${content?.description}${variable}`
            : variable,
        })
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

  useEffect(() => {
    if (content?.description) {
      handleUpdateFormData({ description: { valid: true } })
    } else {
      handleUpdateFormData({ description: { valid: false } })
    }
    if (saveAs) {
      const isValid = handleCheckSaveAs(saveAs)
      handleUpdateFormData({ saveAs: { valid: isValid } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, saveAs])

  useEffect(() => {
    if (blockData) {
      setContent(blockData.data)
      setSaveAs(blockData.save_as)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockData])

  useEffect(() => {
    if (formData?.description.valid && formData?.saveAs.valid) {
      handleUpdateIsUpdating(true)
    } else {
      handleUpdateIsUpdating(false)
    }
  }, [formData])

  useEffect(() => {
    if (content && saveAs) {
      onAddBlock()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

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
          <CardText label={text("webhookconfig:keytitle")} />
          <CardLine />
          <CardText
            label={key}
            indicator={{
              icon: CopySimple,
              onClick: () => handleCopyTextToClipboard(key),
            }}
          />
          <CardLine />
        </Card>
        <Card>
          <CardText label={text("webhookconfig:url")} />
          <CardLine />
          <CardText
            label={`api.quaq.me/entrypoint/${slug}`}
            indicator={{
              icon: CopySimple,
              onClick: () => handleCopyTextToClipboard(slug),
            }}
          />
          <CardLine />
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
