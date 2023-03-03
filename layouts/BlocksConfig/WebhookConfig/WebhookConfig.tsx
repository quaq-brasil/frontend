import useTranslation from "next-translate/useTranslation"
import { Check } from "phosphor-react"
import { useState } from "react"
import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { Dialog } from "../../../components/Dialog/Dialog"
import { BlocksConfigProps } from "../../../types/BlockConfig.types"
import { ReceiveRequest } from "./ReceiveRequest"
import { SendRequest } from "./SendRequest"

export function WebhookConfig({
  isOpen,
  onClose,
  handleAddBlock,
  handleOpenVariablePanel,
  setFunctionHandleAddVariable,
  handleCheckSaveAs,
}: BlocksConfigProps) {
  const text = useTranslation().t

  const [webhookType, setWebhookType] = useState<string>("send")

  function handleUpdateWebhookType(type: string) {
    setWebhookType(type)
  }

  return (
    <>
      <Dialog
        isOpen={isOpen}
        title={text("webhookconfig:toptitle")}
        onClose={() => {}}
      >
        <div className="flex flex-col items-center gap-3 scrollbar-hide">
          <Card>
            <CardText label={text("webhookconfig:hooktype")} />
            <CardText
              label={text("webhookconfig:send")}
              indicator={{
                icon: Check,
                isVisible: webhookType !== "send",
              }}
              onClick={() => handleUpdateWebhookType("send")}
            />
            <CardLine />
            <CardText
              label={text("webhookconfig:receive")}
              indicator={{
                icon: Check,
                isVisible: webhookType !== "receive",
              }}
              onClick={() => handleUpdateWebhookType("receive")}
            />
            <CardLine />
          </Card>
          {webhookType === "send" ? (
            <SendRequest
              handleAddBlock={handleAddBlock}
              handleCheckSaveAs={handleCheckSaveAs}
              handleOpenVariablePanel={handleOpenVariablePanel}
              isOpen={isOpen}
              onClose={onClose}
              setFunctionHandleAddVariable={setFunctionHandleAddVariable}
            />
          ) : (
            <ReceiveRequest
              handleAddBlock={handleAddBlock}
              handleCheckSaveAs={handleCheckSaveAs}
              handleOpenVariablePanel={handleOpenVariablePanel}
              isOpen={isOpen}
              onClose={onClose}
              setFunctionHandleAddVariable={setFunctionHandleAddVariable}
            />
          )}
        </div>
      </Dialog>
    </>
  )
}
