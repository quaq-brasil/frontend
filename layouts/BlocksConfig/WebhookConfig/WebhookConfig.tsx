import useTranslation from "next-translate/useTranslation"
import { BracketsCurly, Check } from "phosphor-react"
import { useEffect, useState } from "react"
import { BlockProps } from "../../../components/BlockReader/BlockReader"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardSwitch } from "../../../components/Card/CardContentVariants/CardSwitch"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { CodeEditor } from "../../../components/CodeEditor/CodeEditor"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"

type WebhookConfigProps = {
  isOpen: boolean
  setIsOpen: () => void
  handleAddBlock: (block: BlockProps) => void
}

export function WebhookConfig({
  isOpen,
  setIsOpen,
  handleAddBlock,
}: WebhookConfigProps) {
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

  const [content, setContent] = useState<IWebhook>()
  const [saveas, setSaveas] = useState<string>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateHeader(data: string) {
    handleUpdateConent({ header: data })
  }

  function handleUpdateBody(data: string) {
    handleUpdateConent({ body: data })
  }

  function handleUpdateConent(newData: IWebhook) {
    setContent({
      description: newData.description || content?.description,
      visibility: newData.visibility || content?.visibility,
      parameters: newData.parameters || content?.parameters,
      header: newData.header || content?.header,
      body: newData.body || content?.body,
      type: newData.type || content?.type,
      link: newData.link || content?.link,
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
    handleUpdateConent({})
    setSaveas(undefined)
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
    setIsOpen()
  }

  function onAddBlock() {
    handleAddBlock({
      type: "webhook",
      savaAs: saveas,
      data: { content },
    })
    handleClosing()
  }

  useEffect(() => {
    if (content && saveas) {
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
          text={text("webhookconfig:cancel")}
          onClick={() => handleClosing()}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("webhookconfig:add")}
            onClick={() => onAddBlock()}
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
      <Dialog
        isOpen={isOpen}
        title={text("webhookconfig:toptitle")}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col items-center gap-3 scrollbar-hide">
          <Card>
            <CardText label={text("webhookconfig:description")} />
            <CardTextInput
              input={{
                label: text("webhookconfig:descriptioninput"),
                onChange: (description) =>
                  handleUpdateConent({ description: description }),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => {},
              }}
            />
          </Card>

          <Card>
            <CardSwitch
              onChange={(stat) => handleUpdateConent({ visibility: stat })}
              text={text("webhookconfig:switch")}
              showStatus={true}
            />
          </Card>

          <Card>
            <CardText label={text("webhookconfig:parameters")} />
            <CardTextInput
              input={{
                label: text("webhookconfig:parametersinput"),
                onChange: (parameters) =>
                  handleUpdateConent({ parameters: parameters }),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => {},
              }}
            />
          </Card>

          <Card>
            <CardText label={text("webhookconfig:header")} />
            <CodeEditor
              initialCodedata={`"header": {}`}
              language="json"
              onChange={handleUpdateHeader}
            />
          </Card>

          <Card>
            <CardText label={text("webhookconfig:body")} />
            <CodeEditor
              initialCodedata={`"body": {}`}
              language="json"
              onChange={handleUpdateBody}
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
              onClick={() => handleUpdateConent({ type: "GET" })}
            />
            <CardLine />
            <CardText
              label={text("webhookconfig:post")}
              indicator={{
                icon: Check,
                isVisible: content?.type == "POST" ? false : true,
              }}
              onClick={() => handleUpdateConent({ type: "POST" })}
            />
            <CardLine />
            <CardText
              label={text("webhookconfig:patch")}
              indicator={{
                icon: Check,
                isVisible: content?.type == "PATCH" ? false : true,
              }}
              onClick={() => handleUpdateConent({ type: "PATCH" })}
            />
            <CardLine />
            <CardText
              label={text("webhookconfig:delete")}
              indicator={{
                icon: Check,
                isVisible: content?.type == "DELETE" ? false : true,
              }}
              onClick={() => handleUpdateConent({ type: "DELETE" })}
            />
            <CardLine />
          </Card>

          <Card>
            <CardText label={text("webhookconfig:link")} />
            <CardTextInput
              input={{
                label: text("webhookconfig:linkinput"),
                onChange: (link) => handleUpdateConent({ link: link }),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => {},
              }}
            />
          </Card>

          <Card>
            <CardText label={text("webhookconfig:saveas")} />
            <CardTextInput
              input={{
                label: text("webhookconfig:saveasinput"),
                onChange: (e) => handleUpdateSaveas(e),
              }}
              indicator={{
                icon: BracketsCurly,
                onClick: () => {},
              }}
            />
          </Card>

          <div className="w-full h-fit hidden xl:block">
            <Button
              color="white"
              onClick={() => handleClosing()}
              text={text("webhookconfig:cancel")}
            />
          </div>
          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                color="white"
                onClick={() => handleUpdateRunUpdate(true)}
                text={text("webhookconfig:addblock")}
              />
            </div>
          )}
        </div>
        <TabBar isHidden={true} tags={handleTabBar()} />
      </Dialog>
    </>
  )
}
