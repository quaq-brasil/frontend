import { useEffect, useState } from "react"
import { BlockReader } from "../../../components/BlockReader/BlockReader"
import { BlockSelector } from "../../../components/BlockSelector/BlockSelector"
import { BlockProps } from "../../../types/Block.types"
import { VariablesPanelDialog } from "../../BlocksConfig/VariablesPanel/VariablesPanelDialog"
import { RenderBlockConfig } from "./RenderBlockConfig"

type CreateTemplateContentProps = {
  isUpdating: boolean
  runUpdating: boolean
  handleUpdateIsUpdating: (stat: boolean) => void
  handleUpdateRunUpdate: (stat: boolean) => void
}

export function CreateTemplateContent({
  handleUpdateIsUpdating,
  handleUpdateRunUpdate,
  isUpdating,
  runUpdating,
}: CreateTemplateContentProps) {
  const [blockSelected, setBlockSelected] = useState<string | undefined>()
  const [blocks, setBlocks] = useState<BlockProps[]>([])
  const [isVariablesPanelOpen, setIsVariablesPanelOpen] = useState(false)
  const [functionHandleAddVariable, setFunctionHandleAddVariable] = useState(
    () => (variable: any) => {
      console.log(variable)
    }
  )

  const handleOpenVariablePanel = () => {
    setIsVariablesPanelOpen(true)
  }

  const handleCloseVariablePanel = () => {
    setIsVariablesPanelOpen(false)
  }

  useEffect(() => {
    console.log("blocks", blocks)
  }, [blocks])

  const [isOpen, setIsOpen] = useState(false)

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

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
      >
        {blocks.length > 0 ? (
          <div className="flex flex-col gap-2 mb-2 md:gap-4 md:mb-4">
            {blocks.map((block, index) => {
              return <BlockReader key={index} block={block} />
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
          />
          <VariablesPanelDialog
            handleInsertVariable={functionHandleAddVariable}
            isOpen={isVariablesPanelOpen}
            onClose={handleCloseVariablePanel}
            blocks={blocks}
          />
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
