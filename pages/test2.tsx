import { AutomationConfig } from "layouts/BlocksConfig/AutomationConfig/AutomationConfig"
import { BlockProps } from "types/Block.types"

export default function test2() {
  return (
    <AutomationConfig
      isOpen={true}
      handleAddBlock={function (block: BlockProps): void {
        throw new Error("Function not implemented.")
      }}
      handleOpenVariablePanel={function (): void {
        throw new Error("Function not implemented.")
      }}
      onClose={function (): void {
        throw new Error("Function not implemented.")
      }}
      handleCheckSaveAs={function (value: string): boolean {
        throw new Error("Function not implemented.")
      }}
    />
  )
}
