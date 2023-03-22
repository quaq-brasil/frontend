import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "components/Dialog/Dialog"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { BracketsCurly } from "phosphor-react"
import { useEffect, useState } from "react"
import { BlocksConfigProps } from "types/BlockConfig.types"

export function EmbedConfig({
  handleAddBlock,
  isOpen,
  onClose,
  handleOpenVariablePanel,
  setFunctionHandleAddVariable,
  handleCheckSaveAs,
  blockData,
}: BlocksConfigProps) {
  const text = useTranslation().t

  type IContent = {
    link?: string
  }

  type FormDataProps = {
    content?: {
      valid?: boolean
    }
    saveAs?: {
      valid?: boolean
    }
  }

  const [formData, setFormData] = useState<FormDataProps>({
    content: {
      valid: true,
    },
    saveAs: {
      valid: true,
    },
  })
  const [content, setContent] = useState<IContent | null>(null)
  const [saveAs, setSaveAs] = useState<string | null>(null)
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

  function handleUpdateContent(newData: IContent) {
    setContent((state) => {
      return {
        ...state,
        ...newData,
      } as IContent
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
    setContent(null)
    handleUpdateIsUpdating(false)
    handleUpdateRunUpdate(false)
    handleUpdateSaveAs(null)
    handleUpdateFormData({
      content: { valid: false },
      saveAs: { valid: false },
    })
    onClose()
  }

  function onAddBlock() {
    handleAddBlock({
      id: blockData?.id || undefined,
      type: "embed",
      data: content,
      save_as: saveAs,
    })
    handleClosing()
  }

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("textconfig:cancel")}
          onClick={handleClosing}
        />,
        <div key={2}>
          <Tag
            variant="txt"
            text={text("textconfig:add")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("textconfig:cancel")}
          onClick={() => onClose()}
        />,
      ]
    }
  }

  const handleOpenVariablePanelForLink = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateContent({
          link: content?.link ? `${content.link}${variable}` : variable,
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

  useEffect(() => {
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
    if (content) {
      handleUpdateFormData({ content: { valid: true } })
    } else {
      handleUpdateFormData({ content: { valid: false } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveAs, content])

  useEffect(() => {
    if (blockData) {
      setContent(blockData.data)
      setSaveAs(blockData.save_as)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockData])

  useEffect(() => {
    if (content && saveAs) {
      onAddBlock()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  useEffect(() => {
    if (formData.content?.valid && formData.saveAs?.valid) {
      handleUpdateIsUpdating(true)
    } else {
      handleUpdateIsUpdating(false)
    }
  }, [formData])

  return (
    <>
      <Dialog isOpen={isOpen} title={text("embedconfig:toptitle")}>
        <div className="flex flex-col items-center gap-3">
          <Card>
            <CardText label={text("embedconfig:title1")} />
            <CardTextInput
              input={{
                label: text("embedconfig:label1"),
                inputValue: content?.link,
                onChange: (link) => handleUpdateContent({ link: link }),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: handleOpenVariablePanelForLink,
              }}
            />
          </Card>
          <Card>
            <CardText label={text("embedconfig:title2")} />
            <CardTextInput
              input={{
                label: text("embedconfig:label2"),
                inputValue: saveAs,
                onChange: (value) => handleUpdateSaveAs(value),
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
          <TabBar isHidden={true} tags={handleTabBar()} />
        </div>
      </Dialog>
    </>
  )
}
