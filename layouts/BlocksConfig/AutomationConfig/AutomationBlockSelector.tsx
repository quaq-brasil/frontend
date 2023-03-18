import { BlockReader } from "components/BlockReader/BlockReader"
import { BlockSelector } from "components/BlockSelector/BlockSelector"
import { RenderBlockConfig } from "layouts/main/CreateTemplate/RenderBlockConfig"
import { Dispatch, SetStateAction, useState } from "react"
import { BlockProps } from "types/Block.types"
import { v4 } from "uuid"
import {
  ConnectedTemplatesProps,
  VariablesPanelDialog,
} from "../VariablesPanel/VariablesPanelDialog"

type AutomationBlockSelectorProps = {
  blocks: BlockProps[]
  setBlocks: Dispatch<SetStateAction<BlockProps[]>>
  onClose: () => void
}

type TabBarContent = {
  isPublishVisible: boolean
  onPublishClick: () => void
}

export function AutomationBlockSelector({
  blocks,
  setBlocks,
  onClose,
}: AutomationBlockSelectorProps) {
  // const text = useTranslation().t

  const [blockSelected, setBlockSelected] = useState<string | undefined>()
  const [editBlockData, setEditBlockData] = useState<BlockProps | null>()
  const [isOpen, setIsOpen] = useState(false)
  const [isVariablesPanelOpen, setIsVariablesPanelOpen] = useState(false)
  const [functionHandleAddVariable, setFunctionHandleAddVariable] = useState(
    () => (variable: any) => {}
  )
  const [isUpdating, setIsUpdating] = useState(false)
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

  const handleAddBlock = (newBlock: BlockProps) => {
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

  const [connectedTemplates, setConnectedTemplates] =
    useState<ConnectedTemplatesProps[]>()

  const handleRemoveBlock = (removeIndex: number) => {
    const newBlocks = blocks.filter((block, index) => {
      return removeIndex !== index
    })
    setBlocks(newBlocks)
  }

  const handleCheckSaveAs = (value: string | undefined | null) => {
    let uniqueSaveAs = true
    if (!value) {
      uniqueSaveAs = false
    } else {
      blocks.forEach((block) => {
        if (block.save_as == value) {
          uniqueSaveAs = false
        }
      })
    }
    return uniqueSaveAs
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

  return (
    <>
      <div className="w-full h-screen bg-slate-100">
        <div
          className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
  bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
  md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
        >
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
                  />
                )
              })}
            </div>
          ) : null}
          <div className="flex flex-col gap-2 md:gap-4 items-center">
            <BlockSelector onBlockSelect={handleBlockSelection} />
            <RenderBlockConfig
              block={blockSelected}
              isOpen={isOpen}
              onClose={handleBlockConfigClosing}
              handleAddBlock={handleAddBlock}
              handleOpenVariablePanel={handleOpenVariablePanel}
              setFunctionHandleAddVariable={setFunctionHandleAddVariable}
              handleCheckSaveAs={handleCheckSaveAs}
              blockData={editBlockData}
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

        <button onClick={onClose}>close</button>
      </div>

      {/* <TabBar isHidden={true} tags={handleTabBar()} /> */}
    </>
  )
}
