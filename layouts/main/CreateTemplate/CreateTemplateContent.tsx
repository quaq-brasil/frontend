const BlockReader = dynamic(
  () =>
    import("components/BlockReader/BlockReader").then((mod) => mod.BlockReader),
  {
    ssr: true,
  }
)
const BlockSelector = dynamic(() =>
  import("components/BlockSelector/BlockSelector").then(
    (mod) => mod.BlockSelector
  )
)
const TabBar = dynamic(() =>
  import("components/TabBar/TabBar").then((mod) => mod.TabBar)
)
const Tag = dynamic(() => import("components/Tag/Tag").then((mod) => mod.Tag))

const PublishNewTemplate = dynamic(() =>
  import("./PublishNewTemplate").then((mod) => mod.PublishNewTemplate)
)
const RenderBlockConfig = dynamic(() =>
  import("./RenderBlockConfig").then((mod) => mod.RenderBlockConfig)
)

import {
  ConnectedTemplatesProps,
  VariablesPanelDialog,
} from "layouts/BlocksConfig/VariablesPanel/VariablesPanelDialog"
import useTranslation from "next-translate/useTranslation"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useState } from "react"
import { BlockProps } from "types/Block.types"
import { IPage } from "types/Page.type"
import { pageUrls } from "utils/pagesUrl"
import { v4 } from "uuid"

type CreateTemplateContentProps = {
  pageData: IPage | undefined
}

type TabBarContentProps = {
  pageData: IPage | undefined
  isPublishVisible: boolean
  onPublishClick: () => void
}

const TabBarContent = ({
  pageData,
  isPublishVisible,
  onPublishClick,
}: TabBarContentProps) => {
  const text = useTranslation().t
  const router = useRouter()

  const tags = [
    <Tag
      key={1}
      variant="txt"
      text={text("createtemplate:back")}
      onClick={() =>
        router.push(pageUrls.pageSettings({ pageSlug: pageData?.slug }))
      }
    />,
  ]

  if (isPublishVisible) {
    tags.push(
      <Tag
        key={2}
        variant="txt"
        text={text("publish:publish")}
        onClick={onPublishClick}
      />
    )
  }

  return <TabBar isHidden={false} tags={tags} />
}

export function CreateTemplateContent({
  pageData,
}: CreateTemplateContentProps) {
  const [blockSelected, setBlockSelected] = useState<string | undefined>()
  const [blocks, setBlocks] = useState<BlockProps[]>([])
  const [isOpenPublishTemplate, setIsOpenPublishTemplate] = useState(false)
  const [isVariablesPanelOpen, setIsVariablesPanelOpen] = useState(false)
  const [functionHandleAddVariable, setFunctionHandleAddVariable] = useState(
    () => (variable: any) => {}
  )
  const [connectedTemplates, setConnectedTemplates] =
    useState<ConnectedTemplatesProps[]>()
  const [editBlockData, setEditBlockData] = useState<BlockProps | null>()

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
      </div>

      <TabBarContent
        pageData={pageData}
        isPublishVisible={blocks.length > 0}
        onPublishClick={() => setIsOpenPublishTemplate(true)}
      />

      {isOpenPublishTemplate && (
        <PublishNewTemplate
          blocks={blocks}
          connectedTemplates={connectedTemplates}
          pageData={pageData}
          onClose={() => setIsOpenPublishTemplate(false)}
        />
      )}
    </>
  )
}
