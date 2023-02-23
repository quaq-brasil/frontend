import useTranslation from "next-translate/useTranslation"
import { BracketsCurly } from "phosphor-react"
import { useEffect, useState } from "react"
import { v4 } from "uuid"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "../../../components/Dialog/Dialog"
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { BlocksConfigProps } from "../../../types/BlockConfig.types"

export function ImageConfig({
  isOpen,
  onClose,
  handleAddBlock,
  handleOpenVariablePanel,
  setFunctionHandleAddVariable,
  handleCheckSaveAs,
}: BlocksConfigProps) {
  const text = useTranslation().t

  type IImage = {
    imageUrl?: string
  }

  type FormDataProps = {
    imageUrl?: {
      valid?: boolean
    }
    saveAs?: {
      valid?: boolean
    }
  }

  const [formData, setFormData] = useState<FormDataProps>({
    imageUrl: {
      valid: false,
    },
    saveAs: {
      valid: false,
    },
  })
  const [content, setContent] = useState<IImage>()
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

  function handleUpdateContent(newData: IImage) {
    setContent({
      imageUrl: newData.imageUrl,
    })
    handleUpdateFormData({ imageUrl: { valid: true } })
  }

  function handleUpdateSaveAs(value: string | null) {
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
      imageUrl: { valid: false },
      saveAs: { valid: false },
    })
    onClose()
  }

  function onAddBlock() {
    handleAddBlock({
      id: v4(),
      type: "image",
      save_as: saveAs as string,
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
          text={text("imageconfig:cancel")}
          onClick={() => handleClosing()}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("imageconfig:add")}
            onClick={() => onAddBlock()}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("imageconfig:cancel")}
          onClick={() => handleClosing()}
        />,
      ]
    }
  }

  const handleOpenVariablePanelForSaveAs = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateSaveAs(saveAs ? `${saveAs}${variable}` : variable)
      })
    handleOpenVariablePanel()
  }

  return (
    <>
      <Dialog
        isOpen={isOpen}
        title={text("imageconfig:toptitle")}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col items-center gap-3">
          <Card>
            <CardText label={text("imageconfig:image")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(image) =>
                    handleUpdateContent({ imageUrl: image })
                  }
                />
              }
            />
          </Card>
          <Card>
            <CardText label={text("imageconfig:saveas")} />
            <CardTextInput
              input={{
                label: text("imageconfig:saveaslabel"),
                inputValue: saveAs || "",
                onChange: (value) => handleUpdateSaveAs(value),
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
                  text: text("imageconfig:cancel"),
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
                    text: text("imageconfig:addblock"),
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
