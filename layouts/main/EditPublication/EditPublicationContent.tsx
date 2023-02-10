import { Translate } from "next-translate"
import useTranslation from "next-translate/useTranslation"
import { NextRouter, useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BlockReader } from "../../../components/BlockReader/BlockReader"
import { BlockSelector } from "../../../components/BlockSelector/BlockSelector"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { BlockProps } from "../../../types/Block.types"
import { IPage } from "../../../types/Page.type"
import { getTemplateByUrlAndPageUrlProps } from "../../../types/Template.type"
import { pageUrls } from "../../../utils/pagesUrl"
import { VariablesPanelDialog } from "../../BlocksConfig/VariablesPanel/VariablesPanelDialog"
import { RenderBlockConfig } from "../CreateTemplate/RenderBlockConfig"
import { PublishPublication } from "./PublishPublication"

type EditPublicationContentProps = {
  pageData: IPage | undefined
  templateData: getTemplateByUrlAndPageUrlProps | undefined
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
    () => (variable: any) => {
      console.log(variable)
    }
  )

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
  }

  const handleAddBlock = (newBlock: BlockProps) => {
    setBlocks((state) => [...state, newBlock])
  }

  const handleRemoveBlock = (removeIndex: number) => {
    const newBlocks = blocks.filter((block, index) => {
      return removeIndex !== index
    })
    setBlocks(newBlocks)
    setIsUpdating(true)
  }

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("createtemplate:back")}
        onClick={() =>
          router.push(pageUrls.pageSettings({ pageSlug: pageData?.url }))
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

      <TabBar isHidden={false} tags={handleTabBar()} />
    </>
  )
}

type EditPublicationHeaderProps = {
  pageData: IPage | undefined
  templateData: getTemplateByUrlAndPageUrlProps | undefined
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
    <Header
      background_url={
        pageData?.background_url ||
        "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
      }
    >
      <Tag
        variant="img-txt"
        text={pageData?.name || ""}
        img_url={
          pageData?.avatar_url || "https://source.unsplash.com/featured/"
        }
        onClick={() =>
          router.push(pageUrls.pageSettings({ pageSlug: pageData?.url }))
        }
      />
      <Tag
        variant="img-txt"
        text={templateData?.name || ""}
        img_url={templateData?.shortcut_image || ""}
      />
    </Header>
  )
}
