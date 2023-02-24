import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useState } from "react"
import { BlockReader } from "../../../components/BlockReader/BlockReader"
import { BlockSelector } from "../../../components/BlockSelector/BlockSelector"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { BlockProps } from "../../../types/Block.types"
import { IPage } from "../../../types/Page.type"
import { pageUrls } from "../../../utils/pagesUrl"
import {
  ConnectedTemplatesProps,
  VariablesPanelDialog,
} from "../../BlocksConfig/VariablesPanel/VariablesPanelDialog"
import { PublishNewTemplate } from "./PublishNewTemplate"
import { RenderBlockConfig } from "./RenderBlockConfig"

type CreateTemplateContentProps = {
  pageData: IPage | undefined
}

export function CreateTemplateContent({
  pageData,
}: CreateTemplateContentProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [blockSelected, setBlockSelected] = useState<string | undefined>()
  const [blocks, setBlocks] = useState<BlockProps[]>([])
  const [isOpenPublishTemplate, setIsOpenPublishTemplate] = useState(false)
  const [isVariablesPanelOpen, setIsVariablesPanelOpen] = useState(false)
  const [functionHandleAddVariable, setFunctionHandleAddVariable] = useState(
    () => (variable: any) => {
      console.log(variable)
    }
  )

  const [connectedTemplates, setConnectedTemplates] =
    useState<ConnectedTemplatesProps[]>()

  const handleOpenVariablePanel = () => {
    setIsVariablesPanelOpen(true)
  }

  const handleCloseVariablePanel = () => {
    setIsVariablesPanelOpen(false)
  }

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

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("createtemplate:back")}
        onClick={() =>
          router.push(pageUrls.pageSettings({ pageSlug: pageData?.slug }))
        }
      />,
      blocks.length > 0 && (
        <Tag
          key={2}
          variant="txt"
          text={text("publish:publish")}
          onClick={() => setIsOpenPublishTemplate(true)}
        />
      ),
    ]
  }

  if (isOpenPublishTemplate) {
    return (
      <PublishNewTemplate
        blocks={blocks}
        connectedTemplates={connectedTemplates}
        pageData={pageData}
        onClose={() => setIsOpenPublishTemplate(false)}
      />
    )
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
            <RenderBlockConfig
              block={blockSelected as string}
              isOpen={isOpen}
              onClose={handleBlockConfigClosing}
              handleAddBlock={handleAddBlock}
              handleOpenVariablePanel={handleOpenVariablePanel}
              setFunctionHandleAddVariable={setFunctionHandleAddVariable}
              handleCheckSaveAs={handleCheckSaveAs}
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
      </div>

      <TabBar isHidden={false} tags={handleTabBar()} />
    </>
  )
}
