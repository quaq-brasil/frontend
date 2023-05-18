import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardFileInput } from "components/Card/CardContentVariants/CardImageInput"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "components/Dialog/Dialog"
import { FileSelector } from "components/FileSelector/FileSelector"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import { useValidation, validationRules } from "hooks/useValidation"
import useTranslation from "next-translate/useTranslation"
import { BracketsCurly } from "phosphor-react"
import { useEffect, useState } from "react"
import { BlocksConfigProps } from "types/BlockConfig.types"

export function ImageConfig({
  isOpen,
  onClose,
  handleAddBlock,
  handleOpenVariablePanel,
  setFunctionHandleAddVariable,
  handleCheckSaveAs,
  blockData,
}: BlocksConfigProps) {
  const text = useTranslation().t

  type ImageProps = {
    img_url?: string
    height?: {
      value?: number | null
      locked_width?: number | null
    }
    save_as?: string
  }

  const [
    localBlockData,
    setLocalBlockData,
    localBlockDataErrors,
    isLocalBlockDataValid,
  ] = useValidation<ImageProps>({
    img_url: {
      initialValue: blockData?.data?.img_url || "",
      validators: [validationRules.required(text("validation:required"))],
    },
    height: {
      initialValue: blockData?.data?.height || { locked_width: 0, value: 420 },
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

  function handleUpdateLocalBlockData(newBlockData: ImageProps) {
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
      if (blockData?.data?.img_url !== localBlockData?.img_url) {
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
      img_url: "",
      height: {
        value: null,
        locked_width: null,
      },
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
      type: "image",
      save_as: localBlockData.save_as,
      data: {
        img_url: localBlockData.img_url,
        height: {
          value: null,
          locked_width: null,
        },
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
          text={text("imageconfig:cancel")}
          onClick={() => handleClosing()}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={
              blockData ? text("imageconfig:update") : text("imageconfig:add")
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
          text={text("imageconfig:cancel")}
          onClick={() => handleClosing()}
        />,
      ]
    }
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
        img_url: blockData.data.img_url,
        height: blockData.data.height,
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
      <Dialog isOpen={isOpen} title={text("imageconfig:toptitle")}>
        <div className="flex flex-col items-center gap-3">
          <Card>
            <CardText label={text("imageconfig:image")} />
            <CardFileInput
              fileSelector={
                <FileSelector
                  onImageChange={(image) => {
                    handleUpdateLocalBlockData({ img_url: image })
                  }}
                  url={localBlockData?.img_url}
                />
              }
              errors={hasDataChanged ? localBlockDataErrors.img_url : []}
            />
          </Card>
          <Card>
            <CardText label={text("imageconfig:saveas")} />
            <CardTextInput
              input={{
                label: text("imageconfig:saveaslabel"),
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
                    text: blockData
                      ? text("imageconfig:updateblock")
                      : text("imageconfig:addblock"),
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
