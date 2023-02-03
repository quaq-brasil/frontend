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
import { BlockProps } from "../../../types/Block.types"
import { BlocksConfigProps } from "../../../types/BlockConfig.types"
type PoolConfigProps = {
  isOpen: boolean
  onClose: () => void
  handleAddBlock: (block: BlockProps) => void
}

export function PoolConfig({
  handleAddBlock,
  isOpen,
  onClose,
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
  const [saveas, setSaveas] = useState<string>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateContent(newData: IContent) {
    setContent({
      ...content,
      max: newData.max || content?.max,
      min: newData.min || content?.min,
      options: newData.options || content?.options,
      title: newData.title || content.title,
    })
    handleUpdateIsUpdating(true)
  }

  function handleUpdateSaveas(value: string) {
    setSaveas(value)
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
    setSaveas(undefined)
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
    onClose()
  }

  function onAddBlock() {
    handleAddBlock({
      type: "pool",
      saveAs: saveas,
      data: content,
    })
    handleClosing()
  }

  useEffect(() => {
    if (content?.options && saveas) {
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
      case "remove":
        if (content.options) {
          const options = content.options.map((option) => {
            if (option.id != id) {
              return option
            }
          })
          handleUpdateContent({ options: options as options[] })
        }
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
    }
  }

  return (
    <>
      <Dialog
        isOpen={isOpen}
        title={text("poolconfig:toptitle")}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col items-center gap-3 scrollbar-hide">
          <Card>
            <CardText label={text("poolconfig:title")} />
            <CardTextInput
              input={{
                label: text("poolconfig:titlelabel"),
                onChange: (title) => handleUpdateContent({ title: title }),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("poolconfig:max")} />
            <CardTextInput
              input={{
                label: text("poolconfig:maxlabel"),
                onChange: (max) => handleUpdateContent({ max: max }),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("poolconfig:min")} />
            <CardTextInput
              input={{
                label: text("poolconfig:minlabel"),
                onChange: (min) => handleUpdateContent({ min: min }),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
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
                    }}
                    indicator={{
                      icon: BracketsCurly,
                      onClick: () => console.log(),
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
                onChange: (e) => handleUpdateSaveas(e),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log(),
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
