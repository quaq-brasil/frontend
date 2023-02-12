import useTranslation from "next-translate/useTranslation"
import { BracketsCurly, X } from "phosphor-react"
import { useEffect, useState } from "react"

import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { BlocksConfigProps } from "../../../types/BlockConfig.types"

export function PoolConfig({
  handleAddBlock,
  isOpen,
  onClose,
  handleOpenVariablePanel,
  setFunctionHandleAddVariable,
}: BlocksConfigProps) {
  const text = useTranslation().t

  type options = {
    id?: number
    value?: string
  }

  type IContent = {
    options?: options[]
    title?: string
    max?: string
    min?: string
  }

  const [content, setContent] = useState<IContent>({
    options: [{ id: 0, value: "" }],
  })
  const [saveAs, setSaveAs] = useState<string>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateContent(newData: IContent) {
    setContent((state) => {
      return {
        ...state,
        ...newData,
      } as IContent
    })
    setIsUpdating(true)
  }

  function handleUpdateSaveAs(value: string) {
    setSaveAs(value)
    handleUpdateIsUpdating(true)
  }

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleClosing() {
    setContent({})
    setSaveAs(undefined)
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
    onClose()
  }

  function onAddBlock() {
    handleAddBlock({
      type: "pool",
      save_as: saveAs,
      data: content,
    })
    handleClosing()
  }

  useEffect(() => {
    if (content?.options && saveAs) {
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
          text={text("poolconfig:cancel")}
          onClick={() => handleClosing()}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("poolconfig:add")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("poolconfig:cancel")}
          onClick={() => handleClosing()}
        />,
      ]
    }
  }

  type HandleUpdateOptionsProps = {
    id?: number
    value?: string
    option: string
  }

  function handleUpdateOptions({
    id,
    option,
    value,
  }: HandleUpdateOptionsProps) {
    switch (option) {
      case "add":
        if (content.options) {
          const options = content.options
          options.push({ id: content.options.length, value: "" })
          handleUpdateContent({ options: options })
        }
        break
      case "remove":
        if (content.options) {
          const options = content.options.map((option) => {
            if (option.id != id) {
              return option
            }
          })
          handleUpdateContent({ options: options as options[] })
        }
        break
      case "update":
        if (content.options) {
          const options = content.options.map((option) => {
            if (option.id == id) {
              option.value = value
              return option
            } else {
              return option
            }
          })
          handleUpdateContent({ options: options as options[] })
        }
        break
    }
  }

  const handleOpenVariablePanelForOption = ({
    option,
    id,
  }: HandleUpdateOptionsProps) => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateOptions({ option, id, value: variable })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForTitle = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateContent({ title: `${content.title}${variable}` })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForMax = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateContent({ max: `${content.max}${variable}` })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForMin = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateContent({ min: `${content.min}${variable}` })
      })
    handleOpenVariablePanel()
  }

  const handleOpenVariablePanelForSaveAs = () => {
    setFunctionHandleAddVariable &&
      setFunctionHandleAddVariable(() => (variable: any) => {
        handleUpdateSaveAs(`${saveAs}${variable}`)
      })
    handleOpenVariablePanel()
  }

  return (
    <>
      <Dialog
        isOpen={isOpen}
        title={text("poolconfig:toptitle")}
        onClose={() => {}}
      >
        <div className="flex flex-col items-center gap-3 scrollbar-hide">
          <Card>
            <CardText label={text("poolconfig:title")} />
            <CardTextInput
              input={{
                label: text("poolconfig:titlelabel"),
                onChange: (title) => handleUpdateContent({ title: title }),
                inputValue: content.title,
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: handleOpenVariablePanelForTitle,
              }}
            />
          </Card>
          <Card>
            <CardText label={text("poolconfig:max")} />
            <CardTextInput
              input={{
                label: text("poolconfig:maxlabel"),
                onChange: (max) => handleUpdateContent({ max: max }),
                inputValue: content.max,
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: handleOpenVariablePanelForMax,
              }}
            />
          </Card>
          <Card>
            <CardText label={text("poolconfig:min")} />
            <CardTextInput
              input={{
                label: text("poolconfig:minlabel"),
                onChange: (min) => handleUpdateContent({ min: min }),
                inputValue: content.min,
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: handleOpenVariablePanelForMin,
              }}
            />
          </Card>
          <>
            {content.options &&
              content?.options.map((option, index) => (
                <Card key={option.id}>
                  <CardText
                    label={`${text("poolconfig:option")} ${index + 1}`}
                    indicator={{
                      icon: X,
                    }}
                    onClick={() =>
                      handleUpdateOptions({ id: index, option: "remove" })
                    }
                  />
                  <CardTextInput
                    input={{
                      label: text("poolconfig:optionlabel"),
                      onChange: (value) =>
                        handleUpdateOptions({
                          id: index,
                          option: "update",
                          value: value,
                        }),
                      defaultValue: option.value,
                      inputValue: option.value,
                    }}
                    indicator={{
                      icon: BracketsCurly,
                      onClick: () =>
                        handleOpenVariablePanelForOption({
                          option: "update",
                          id: index,
                        }),
                    }}
                  />
                </Card>
              ))}
          </>
          <Tag
            variant="txt"
            text={text("poolconfig:addoption")}
            onClick={() => handleUpdateOptions({ option: "add" })}
          />
          <Card>
            <CardText label={text("poolconfig:saveas")} />
            <CardTextInput
              input={{
                label: text("poolconfig:saveaslabel"),
                onChange: (e) => handleUpdateSaveAs(e),
                inputValue: saveAs,
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: handleOpenVariablePanelForSaveAs,
              }}
            />
          </Card>
          {isUpdating && (
            <>
              <div className="w-full h-fit hidden xl:block">
                <Button
                  block={{
                    data: {
                      color: "bg-white",
                      text: text("textconfig:addblock"),
                      onClick: () => handleUpdateRunUpdate(true),
                    },
                  }}
                  isEditable={false}
                />
              </div>
            </>
          )}
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
        </div>
        <TabBar isHidden={true} tags={handleTabBar()} />
      </Dialog>
    </>
  )
}
