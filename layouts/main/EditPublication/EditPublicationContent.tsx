import { Header } from "components/Header/Header"
import {
  ConnectedTemplatesProps,
  VariablesPanelDialog,
} from "layouts/BlocksConfig/VariablesPanel/VariablesPanelDialog"
import { RenderBlockConfig } from "layouts/main/CreateTemplate/RenderBlockConfig"
import { Translate } from "next-translate"
import useTranslation from "next-translate/useTranslation"
import dynamic from "next/dynamic"
import { NextRouter, useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BlockProps } from "types/Block.types"
import { IPage } from "types/Page.type"
import { getTemplateBySlugAndPageSlugProps } from "types/Template.type"
import { pageUrls } from "utils/pagesUrl"
import { v4 } from "uuid"
import { PublishPublication } from "./PublishPublication"

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

type EditPublicationContentProps = {
  pageData: IPage | undefined
  templateData: getTemplateBySlugAndPageSlugProps | undefined
}

export const EditPublicationContent = ({
  pageData,
  templateData,
}: EditPublicationContentProps) => {
  const text = useTranslation().t
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
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

  useEffect(() => {
    if (templateData?.publication.blocks) {
      const toFormartBlock = templateData?.publication.blocks as any

      const formatedBlock: BlockProps[] = Object.keys(toFormartBlock).map(
        (key) => toFormartBlock[key]
      )
      setBlocks(formatedBlock)
    }
  }, [templateData?.publication.blocks])

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
    setIsUpdating(true)
  }

  const handleRemoveBlock = (removeIndex: number) => {
    const newBlocks = blocks.filter((block, index) => {
      return removeIndex !== index
    })
    setBlocks(newBlocks)
    setIsUpdating(true)
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
      isUpdating && blocks.length > 0 && (
        <Tag
          key={2}
          variant="txt"
          text={text("publish:publish")}
          onClick={() => setIsOpenPublishTemplate(true)}
        />
      ),
    ]
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
      <PublishPublication
        blocks={blocks}
        pageData={pageData}
        template={templateData}
        onClose={() => setIsOpenPublishTemplate(false)}
      />
    )
  }

  return (
    <>
      <EditPublicationHeader
        pageData={pageData}
        templateData={templateData}
        router={router}
        text={text}
      />
      <div className="w-full h-screen bg-slate-100">
        <div
          className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
          bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
              md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem] overflow-x-clip"
        >
          {blocks.length > 0 ? (
            <div className="flex flex-col gap-2 mb-2 md:gap-4 md:mb-4 overflow-x-clip">
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
              blocks={blocks}
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

type EditPublicationHeaderProps = {
  pageData: IPage | undefined
  templateData: getTemplateBySlugAndPageSlugProps | undefined
  text: Translate
  router: NextRouter
}

const EditPublicationHeader = ({
  pageData,
  templateData,
  text,
  router,
}: EditPublicationHeaderProps) => {
  return (
    <Header background_url={pageData?.background_url || ""}>
      <Tag
        variant="img-txt"
        text={pageData?.title || ""}
        img_url={pageData?.avatar_url || ""}
        onClick={() =>
          router.push(pageUrls.pageSettings({ pageSlug: pageData?.slug }))
        }
      />
      <Tag
        variant="img-txt"
        text={templateData?.title || ""}
        img_url={templateData?.shortcut_image || ""}
      />
    </Header>
  )
}
