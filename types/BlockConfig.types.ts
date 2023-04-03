import { BlockProps } from "./Block.types"

export type BlocksConfigProps = {
  isOpen: boolean
  handleAddBlock: (block: BlockProps) => void
  handleOpenVariablePanel: () => void
  onClose: () => void
  setFunctionHandleAddVariable?: (variable: any) => void
  handleCheckSaveAs: (
    value: string | undefined | null,
    block_id?: string
  ) => boolean
  blockData?: BlockProps | null
  blocks?: BlockProps[]
}
