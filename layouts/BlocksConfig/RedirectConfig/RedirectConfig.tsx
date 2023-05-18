import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardFileInput } from "components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "components/Dialog/Dialog"
import { FileSelector } from "components/FileSelector/FileSelector"

import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import { useValidation, validationRules } from "hooks/useValidation"
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

  type RedirectProps = {
    description?: string
    link?: string
    type?: string
    cover_image?: string
    height?: {
      value?: number | null
      locked_width?: number | null
    }
    save_as?: string
  }

  const [
    localBlockData,
    setLocalBlockData,
    LocalBlockDataErrors,
    isLocalBlockDataValid,
  ] = useValidation<RedirectProps>({
    description: {
      initialValue: blockData?.data?.description || "",
      validators: [validationRules.required(text("validation:required"))],
    },
    link: {
      initialValue: blockData?.data?.link || "",
      validators: [
        validationRules.required(text("validation:required")),
        validationRules.url(text("validation:url")),
      ],
    },
    type: {
      initialValue: blockData?.data?.type || "manual",
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

  function handleUpdateLocalBlockData(newBlockData: RedirectProps) {
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
      if (blockData?.data?.cover_image !== localBlockData?.cover_image) {
        hasDataChanged = true
      }
      if (blockData?.data?.description !== localBlockData?.description) {
        hasDataChanged = true
      }
      if (blockData?.data?.link !== localBlockData?.link) {
        hasDataChanged = true
      }
      if (blockData?.data?.type !== localBlockData?.type) {
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
      cover_image: "",
      description: "",
      link: "",
      type: "manual",
      save_as: "",
      height: {
        value: null,
        locked_width: null,
      },
    })
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
    setHasDataChanged(false)
    onClose()
  }

  function onAddBlock() {
    handleAddBlock({
      id: blockData?.id || undefined,
      type: "redirect",
      save_as: localBlockData.save_as,
      data: {
        cover_image: localBlockData.cover_image,
        description: localBlockData.description,
        link: localBlockData.link,
        type: localBlockData.type,
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
          text={text("redirectconfig:cancel")}
          onClick={() => handleClosing()}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={
              blockData
                ? text("redirectconfig:update")
                : text("redirectconfig:add")
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
          text={text("redirectconfig:cancel")}
          onClick={() => handleClosing()}
        />,
      ]
    }
  }

  const handleOpenVariablePanelForDescription = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateLocalBlockData({
          description: localBlockData.description
            ? `${localBlockData.description}${variable}`
            : variable,
        })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForLink = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateLocalBlockData({
          link: localBlockData.link
            ? `${localBlockData.link}${variable}`
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
        cover_image: blockData.data.cover_image,
        description: blockData.data.description,
        link: blockData.data.link,
        type: blockData.data.type,
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
      <Dialog isOpen={isOpen} title={text("redirectconfig:toptitle")}>
        <div className="flex flex-col items-center gap-3 scrollbar-hide">
          <Card>
            <CardText label={text("redirectconfig:description")} />
            <CardTextInput
              input={{
                label: text("redirectconfig:descriptionlabel"),
                onChange: (value) => {
                  handleUpdateLocalBlockData({ description: value })
                },
                value: localBlockData?.description,
                errors: hasDataChanged ? LocalBlockDataErrors.description : [],
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
                  handleUpdateLocalBlockData({ link: value })
                },
                value: localBlockData?.link,
                errors: hasDataChanged ? LocalBlockDataErrors.description : [],
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
                isVisible: localBlockData?.type !== "manual",
              }}
              onClick={() => {
                handleUpdateLocalBlockData({ type: "manual" })
              }}
            />
            <CardLine />
            <CardText
              label={text("redirectconfig:auto")}
              indicator={{
                icon: Check,
                isVisible: localBlockData?.type !== "auto",
              }}
              onClick={() => {
                handleUpdateLocalBlockData({ type: "auto" })
              }}
            />
            <CardLine />
          </Card>

          {localBlockData?.type === "manual" && (
            <Card>
              <CardText label={text("redirectconfig:coverimage")} />
              <CardFileInput
                fileSelector={
                  <FileSelector
                    onImageChange={(value) =>
                      handleUpdateLocalBlockData({ cover_image: value })
                    }
                    url={localBlockData?.cover_image}
                  />
                }
                errors={hasDataChanged ? LocalBlockDataErrors.cover_image : []}
              />
            </Card>
          )}

          <Card>
            <CardText label={text("redirectconfig:saveas")} />
            <CardTextInput
              input={{
                label: text("redirectconfig:saveaslabel"),
                onChange: (value) => {
                  handleUpdateLocalBlockData({ save_as: value })
                },
                value: localBlockData.save_as,
                errors: localBlockData.save_as
                  ? LocalBlockDataErrors.save_as
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
                    text: blockData
                      ? text("redirectconfig:updateblock")
                      : text("redirectconfig:addblock"),
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
