import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { BlockReader } from "../../../components/BlockReader/BlockReader"
import { BlockSelector } from "../../../components/BlockSelector/BlockSelector"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { BlockProps } from "../../../types/Block.types"
import { RenderBlockConfig } from "../../main/CreateTemplate/RenderBlockConfig"
import {
  ConnectedTemplatesProps,
  VariablesPanelDialog,
} from "../VariablesPanel/VariablesPanelDialog"

type AutomationBlocksConfigProps = {
  isThisOpen: boolean
  onClose: () => void
}

export function AutomationBlocksConfig({
  isThisOpen,
  onClose,
}: AutomationBlocksConfigProps) {
  const text = useTranslation().t

  const [blockSelected, setBlockSelected] = useState<string | undefined>()
  const [blocks, setBlocks] = useState<BlockProps[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isVariablesPanelOpen, setIsVariablesPanelOpen] = useState(false)
  const [functionHandleAddVariable, setFunctionHandleAddVariable] = useState(
    () => (variable: any) => {}
  )
  const [connectedTemplates, setConnectedTemplates] =
    useState<ConnectedTemplatesProps[]>()

  const handleOpenVariablePanel = () => {
    setIsVariablesPanelOpen(true)
  }

  const handleCloseVariablePanel = () => {
    setIsVariablesPanelOpen(false)
  }

  function handleBlockSelection(block: string | undefined) {
    setBlockSelected(block)
    setIsOpen(true)
  }

  function handleBlockConfigClosing() {
    setIsOpen(false)
  }

  const handleAddBlock = (newBlock: BlockProps) => {
    setBlocks((state) => [...state, newBlock])
  }

  const handleRemoveBlock = (removeIndex: number) => {
    const newBlocks = blocks.filter((block, index) => {
      return removeIndex !== index
    })
    setBlocks(newBlocks)
  }

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("createtemplate:back")}
        onClick={onClose}
      />,
      blocks.length > 0 && (
        <Tag
          key={2}
          variant="txt"
          text={text("publish:publish")}
          onClick={() => {}}
        />
      ),
    ]
  }

  return (
    <Dialog
      isOpen={isThisOpen}
      title={text("automationconfig:toptitle")}
      onClose={() => {}}
    >
      <div>
        {blocks.length > 0 ? (
          <div className="flex flex-col gap-2 mb-2 md:gap-4 md:mb-4">
            {blocks.map((block, index) => {
              return (
                <BlockReader
                  key={index}
                  block={block}
                  isEditable={true}
                  onDelete={() => handleRemoveBlock(index)}
                />
              )
            })}
          </div>
        ) : null}
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <BlockSelector onBlockSelect={handleBlockSelection} />
          {/* @ts-ignore */}
          <RenderBlockConfig
            block={blockSelected}
            isOpen={isOpen}
            onClose={handleBlockConfigClosing}
            handleAddBlock={handleAddBlock}
            handleOpenVariablePanel={handleOpenVariablePanel}
            setFunctionHandleAddVariable={setFunctionHandleAddVariable}
          />
          <VariablesPanelDialog
            handleInsertVariable={functionHandleAddVariable}
            isOpen={isVariablesPanelOpen}
            onClose={handleCloseVariablePanel}
            blocks={blocks}
            connectedTemplates={connectedTemplates}
            setConnectedTemplates={setConnectedTemplates}
          />
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
      <TabBar shiftLayoutOnXl={false} tags={handleTabBar()} />
    </Dialog>
  )
}
