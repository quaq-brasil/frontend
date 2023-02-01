import useTranslation from "next-translate/useTranslation"
import { BracketsCurly, X } from "phosphor-react"
import { useEffect, useState } from "react"
import { BlockProps } from "../../../components/BlockReader/BlockReader"

import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
type PoolConfigProps = {
  isOpen: boolean
  setIsOpen: () => void
  size?: "sm" | "md" | "full"
  handleAddBlock: (block: BlockProps) => void
}

export function PoolConfig({
  handleAddBlock,
  isOpen,
  setIsOpen,
  size,
}: PoolConfigProps) {
  const text = useTranslation().t

  type options = {
    id: number
    value: string
  }

  type maxAndMin = {
    max?: string
    min?: string
  }

  const [options, setOptions] = useState<options[]>([{ id: 0, value: "" }])
  const [limits, setLimits] = useState<maxAndMin>()
  const [saveas, setSaveas] = useState<string>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateSetOptions({ id, value }: options) {
    const newOptions: options[] = options.map((option) => {
      if (option.id === id) {
        return {
          id: option.id,
          value: value,
        }
      } else {
        return option
      }
    })
    setOptions(newOptions)
    handleUpdateIsUpdating(true)
  }

  function handleUpdateLimits({ max, min }: maxAndMin) {
    setLimits({
      max: max || limits?.max,
      min: min || limits?.min,
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
    setOptions([{ id: 0, value: "" }])
    setLimits(undefined)
    setSaveas(undefined)
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
    setIsOpen()
  }

  function onAddBlock() {
    handleAddBlock({
      type: "pool",
      savaAs: saveas,
      data: { options, limits },
    })
    handleClosing()
  }

  useEffect(() => {
    if (options && saveas) {
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

  function handleAddOption() {
    const newOption = { id: options.length, value: "" }
    setOptions([...options, newOption])
  }

  function handleRemoveOption(id: number) {
    const newOptions = options.filter((option) => option.id !== id)
    setOptions(newOptions)
  }

  return (
    <>
      <Dialog
        height={size}
        isOpen={isOpen}
        title={text("poolconfig:toptitle")}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col items-center gap-3">
          <Card>
            <CardText label={text("poolconfig:title1")} />
            <CardTextInput
              input={{
                label: text("poolconfig:label1"),
                onChange: (max) => handleUpdateLimits({ max: max }),
                type: "number",
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("poolconfig:title2")} />
            <CardTextInput
              input={{
                label: text("poolconfig:label2"),
                onChange: (min) => handleUpdateLimits({ min: min }),
                type: "number",
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => console.log("click"),
              }}
            />
          </Card>
          <>
            {options.map((option, index) => (
              <Card key={option.id}>
                <CardText
                  label={`${text("poolconfig:title3")} ${index + 1}`}
                  indicator={{
                    icon: X,
                  }}
                  onClick={() => handleRemoveOption(option.id)}
                />
                <CardTextInput
                  input={{
                    label: text("poolconfig:label3"),
                    onChange: (value) =>
                      handleUpdateSetOptions({ id: index, value: value }),
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
            onClick={handleAddOption}
          />

          <Card>
            <CardText label={text("poolconfig:title4")} />
            <CardTextInput
              input={{
                label: text("poolconfig:label4"),
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
                  color="white"
                  text={text("textconfig:addblock")}
                  onClick={() => handleUpdateRunUpdate(true)}
                />
              </div>
            </>
          )}
          <div className="w-full h-fit hidden xl:block">
            <Button
              color="white"
              text={text("textconfig:cancel")}
              onClick={handleClosing}
            />
          </div>
        </div>
        <TabBar isHidden={true} tags={handleTabBar()} />
      </Dialog>
    </>
  )
}
