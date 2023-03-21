import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardImageInput } from "components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "components/Dialog/Dialog"
import { ImageSelector } from "components/ImageSelector/ImageSelector"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { BracketsCurly, Check } from "phosphor-react"
import { useEffect, useState } from "react"
import { BlocksConfigProps } from "types/BlockConfig.types"

export function RedirectConfig({
  handleAddBlock,
  isOpen,
  onClose,
  handleOpenVariablePanel,
  setFunctionHandleAddVariable,
  handleCheckSaveAs,
  blockData,
}: BlocksConfigProps) {
  const text = useTranslation().t

  type IRedirect = {
    description?: string
    link?: string
    type?: string
    cover_image?: string
  }

  type FormDataProps = {
    description?: {
      valid?: boolean
    }
    link?: {
      valid?: boolean
    }
    type?: {
      valid?: boolean
    }
    cover_image?: {
      valid?: boolean
    }
    save_as?: {
      valid?: boolean
    }
  }

  const [content, setContent] = useState<IRedirect>({ type: "manual" })
  const [formData, setFormData] = useState<FormDataProps>({
    description: {
      valid: false,
    },
    save_as: {
      valid: false,
    },
  })
  const [save_as, set_save_as] = useState<string>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateContent(newData: IRedirect) {
    setContent((state) => {
      return {
        ...state,
        ...newData,
      } as IRedirect
    })
  }

  function handleUpdateFormData(newData: FormDataProps) {
    setFormData((state) => {
      return {
        ...state,
        ...newData,
      } as FormDataProps
    })
  }

  function handleUpdateSaveAs(value: string) {
    set_save_as(value)
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleClosing() {
    set_save_as(undefined)
    setContent(undefined)
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
    onClose()
  }

  function onAddBlock() {
    handleAddBlock({
      id: blockData?.id || undefined,
      type: "redirect",
      save_as: save_as,
      data: content,
    })
    handleClosing()
  }

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("redirectconfig:cancel")}
          onClick={() => handleClosing()}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("redirectconfig:add")}
            onClick={() => onAddBlock()}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("redirectconfig:cancel")}
          onClick={() => handleClosing()}
        />,
      ]
    }
  }

  const handleOpenVariablePanelForDescription = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateContent({
          description: content.description
            ? `${content.description}${variable}`
            : variable,
        })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForLink = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateContent({
          link: content.link ? `${content.link}${variable}` : variable,
        })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForSaveAs = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateSaveAs(save_as ? `${save_as}${variable}` : variable)
      })
    handleOpenVariablePanel()
  }

  useEffect(() => {
    if (save_as) {
      if (blockData) {
        if (blockData.save_as == save_as) {
          handleUpdateFormData({ save_as: { valid: true } })
        } else {
          const isValid = handleCheckSaveAs(save_as)
          handleUpdateFormData({ save_as: { valid: isValid } })
        }
      } else {
        const isValid = handleCheckSaveAs(save_as)
        handleUpdateFormData({ save_as: { valid: isValid } })
      }
    } else {
      handleUpdateFormData({ save_as: { valid: false } })
    }
    if (content?.description) {
      handleUpdateFormData({ description: { valid: true } })
    } else {
      handleUpdateFormData({ description: { valid: false } })
    }
    if (content?.link) {
      handleUpdateFormData({ link: { valid: true } })
    } else {
      handleUpdateFormData({ link: { valid: false } })
    }
    if (content?.type) {
      handleUpdateFormData({ type: { valid: true } })
    } else {
      handleUpdateFormData({
        type: { valid: false },
      })
    }
    if (content?.cover_image) {
      handleUpdateFormData({ cover_image: { valid: true } })
    } else {
      if (content?.type == "auto") {
        handleUpdateFormData({ cover_image: { valid: true } })
      } else {
        handleUpdateFormData({ cover_image: { valid: false } })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [save_as, content])

  useEffect(() => {
    if (blockData) {
      setContent(blockData.data)
      set_save_as(blockData.save_as)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockData])

  useEffect(() => {
    if (save_as && content) {
      onAddBlock()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  useEffect(() => {
    if (
      formData.description?.valid &&
      formData.link?.valid &&
      formData.type?.valid &&
      formData.cover_image?.valid &&
      formData.save_as?.valid
    ) {
      handleUpdateIsUpdating(true)
    } else {
      handleUpdateIsUpdating(false)
    }
  }, [formData])

  return (
    <>
      <Dialog isOpen={isOpen} title={text("redirectconfig:toptitle")}>
        <div className="flex flex-col items-center gap-3 scrollbar-hide">
          <Card>
            <CardText label={text("redirectconfig:description")} />
            <CardTextInput
              input={{
                label: text("redirectconfig:descriptionlabel"),
                onChange: (value) => {
                  handleUpdateContent({ description: value })
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
            <CardText label={text("redirectconfig:link")} />
            <CardTextInput
              input={{
                label: text("redirectconfig:linklabel"),
                onChange: (value) => {
                  handleUpdateContent({ link: value })
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
            <CardText label={text("redirectconfig:type")} />
            <CardLine />
            <CardText
              label={text("redirectconfig:manual")}
              indicator={{
                icon: Check,
                isVisible: content?.type !== "manual",
              }}
              onClick={() => {
                handleUpdateContent({ type: "manual" })
              }}
            />
            <CardLine />
            <CardText
              label={text("redirectconfig:auto")}
              indicator={{
                icon: Check,
                isVisible: content?.type !== "auto",
              }}
              onClick={() => {
                handleUpdateContent({ type: "auto" })
              }}
            />
            <CardLine />
          </Card>

          {content?.type === "manual" && (
            <Card>
              <CardText label={text("redirectconfig:coverimage")} />
              <CardImageInput
                imageSelector={
                  <ImageSelector
                    onImageChange={(value) =>
                      handleUpdateContent({ cover_image: value })
                    }
                    url={content?.cover_image}
                  />
                }
              />
            </Card>
          )}

          <Card>
            <CardText label={text("redirectconfig:saveas")} />
            <CardTextInput
              input={{
                label: text("redirectconfig:saveaslabel"),
                onChange: (value) => {
                  handleUpdateSaveAs(value)
                },
                inputValue: save_as,
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
                  text: text("redirectconfig:cancel"),
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
                    text: text("redirectconfig:addblock"),
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
