import { BlockReader } from "components/BlockReader/BlockReader"
import { BlockSelector } from "components/BlockSelector/BlockSelector"
import { Button } from "components/Button/Button"
import { RenderBlockConfig } from "layouts/main/CreateTemplate/RenderBlockConfig"
import useTranslation from "next-translate/useTranslation"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { BlockProps } from "types/Block.types"
import { v4 } from "uuid"
import {
  ConnectedTemplatesProps,
  VariablesPanelDialog,
} from "../VariablesPanel/VariablesPanelDialog"

type AutomationBlockSelectorProps = {
  blocks: BlockProps[]
  publicationBlocks: BlockProps[]
  setBlocks: Dispatch<SetStateAction<BlockProps[]>>
  onClose: () => void
  handleCheckSaveAs: (value: string) => boolean
  saveAs: string
}

export function AutomationBlockSelector({
  blocks,
  setBlocks,
  onClose,
  handleCheckSaveAs,
  saveAs,
  publicationBlocks,
}: AutomationBlockSelectorProps) {
  const text = useTranslation().t

  const [blocksVariables, setBlocksVariables] = useState<BlockProps[]>([])
  const [blockSelected, setBlockSelected] = useState<string | undefined>()
  const [editBlockData, setEditBlockData] = useState<BlockProps | null>()
  const [isOpen, setIsOpen] = useState(false)
  const [isVariablesPanelOpen, setIsVariablesPanelOpen] = useState(false)
  const [functionHandleAddVariable, setFunctionHandleAddVariable] = useState(
    () => (variable: any) => {}
  )

  useEffect(() => {
    let newBlocksVariables = [] as BlockProps[]

    publicationBlocks.forEach((block) => {
      if (block.type === "automation") {
        newBlocksVariables = [
          ...newBlocksVariables,
          ...block?.data?.automationBlocks,
        ]
      } else {
        newBlocksVariables.push(block)
      }
    })

    setBlocksVariables(newBlocksVariables)
  }, [publicationBlocks])

  function handleBlockSelection(block: string | undefined) {
    setBlockSelected(block)
    setIsOpen(true)
  }

  function handleBlockConfigClosing() {
    setIsOpen(false)
    if (editBlockData) {
      setEditBlockData(null)
    }
  }

  const handleAddLocalBlocks = (newBlock: BlockProps) => {
    if (newBlock.id) {
      const tempBlocks = blocks.map((block) => {
        if (block.id == newBlock.id) {
          return newBlock
        } else {
          return block
        }
      })
      setBlocks([...tempBlocks])
    } else {
      const tempBlock = {
        data: newBlock.data,
        id: v4(),
        save_as: newBlock.save_as,
        type: newBlock.type,
      } as BlockProps
      setBlocks((state) => [...state, tempBlock])
    }
  }

  const handleOpenVariablePanel = () => {
    setIsVariablesPanelOpen(true)
  }

  const handleCloseVariablePanel = () => {
    setIsVariablesPanelOpen(false)
  }

  function handleCheckLocalSaveAs(value: string) {
    const generalValidation = handleCheckSaveAs(value)
    const localValidation = saveAs !== value

    return generalValidation && localValidation
  }

  const [connectedTemplates, setConnectedTemplates] =
    useState<ConnectedTemplatesProps[]>()

  const handleRemoveBlock = (removeIndex: number) => {
    const newBlocks = blocks.filter((block, index) => {
      return removeIndex !== index
    })
    setBlocks(newBlocks)
  }

  const handleOnEdit = (blockData: BlockProps) => {
    setEditBlockData((prevEditBlockData) => {
      if (prevEditBlockData && prevEditBlockData.id === blockData.id) {
        return blockData
      } else {
        return { ...blockData }
      }
    })
    handleBlockSelection(blockData.type)
  }

  function handleCancel() {
    setBlocks([])
    onClose()
  }

  function handleAddBlocks() {
    onClose()
  }

  return (
    <>
      {blocks.length > 0 ? (
        <div className="flex flex-col gap-2 mb-2 md:gap-4 md:mb-4">
          {blocks.map((block, index) => {
            return (
              <BlockReader
                key={block.id}
                block={block}
                isEditable={true}
                onDelete={() => handleRemoveBlock(index)}
                onEdit={() => handleOnEdit(block)}
                handleAddBlock={handleAddLocalBlocks}
              />
            )
          })}
        </div>
      ) : null}
      <div className="flex flex-col gap-2 md:gap-4 items-center">
        <BlockSelector
          onBlockSelect={handleBlockSelection}
          isInsideAutomation={true}
        />
        <RenderBlockConfig
          block={blockSelected}
          isOpen={isOpen}
          onClose={handleBlockConfigClosing}
          handleAddBlock={handleAddLocalBlocks}
          handleOpenVariablePanel={handleOpenVariablePanel}
          setFunctionHandleAddVariable={setFunctionHandleAddVariable}
          handleCheckSaveAs={handleCheckLocalSaveAs}
          blockData={editBlockData}
        />
        <VariablesPanelDialog
          handleInsertVariable={functionHandleAddVariable}
          isOpen={isVariablesPanelOpen}
          onClose={handleCloseVariablePanel}
          blocks={[...blocksVariables, ...publicationBlocks]}
          connectedTemplates={connectedTemplates}
          setConnectedTemplates={setConnectedTemplates}
        />
        {blocks.length == 0 ? (
          <div className="w-full h-fit">
            <Button
              block={{
                data: {
                  color: "bg-white",
                  text: text("automationconfig:cancel"),
                  onClick: handleCancel,
                },
              }}
              isEditable={false}
            />
          </div>
        ) : null}

        {blocks.length > 0 ? (
          <div className="w-full h-fit">
            <Button
              block={{
                data: {
                  color: "bg-white",
                  text: text("automationconfig:add_blocks"),
                  onClick: handleAddBlocks,
                },
              }}
              isEditable={false}
            />
          </div>
        ) : null}
      </div>
    </>
  )
}
