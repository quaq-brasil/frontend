import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import {
  ArrowsOutCardinal,
  CornersIn,
  CornersOut,
  Crop,
  GearSix,
  PencilSimple,
  Play,
  Trash
} from "phosphor-react"
import { useState } from "react"
import { useDeleteTemplate } from "../../services/hooks/useTemplate/useDeleteTemplate"
import { IPage } from "../../types/Page.type"
import { IUpdateTemplate } from "../../types/Template.type"
import { pageUrls } from "../../utils/pagesUrl"
import { Popover } from "../Popover/Popover"

type ShortcutMenuProps = {
  templateData: IUpdateTemplate | undefined
  pageData: IPage | undefined
  handleClose: () => void
  handleUpdateContentData: (newData: IUpdateTemplate) => void
}

export default function ShortcutMenu({
  templateData,
  pageData,
  handleClose,
  handleUpdateContentData,
}: ShortcutMenuProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [openSizeOptions, setOpenSizeOptions] = useState(false)

  const deleteTemplate = useDeleteTemplate()

  function handleDeleteTemplate() {
    setIsOpen(false)
    deleteTemplate.mutate(
      {
        id: templateData?.id as string,
      },
      {
        onSuccess: () => {
          router.push(
            pageUrls.pageSettings({ pageSlug: pageData?.slug as string })
          )
        },
      }
    )
  }

  return (
    <div className="relative z-10 min-w-full w-fit h-full">
      <div className="h-fit pt-3 pl-3 overflow-x-scroll flex scrollbar-hide gap-3 items-center justify-start">
        {!openSizeOptions ? (
          <>
            <button className="min-w-[40px] h-10 rounded-full bg-white p-1 flex items-center justify-center">
              <ArrowsOutCardinal className="w-5 h-5 text-black" weight="bold" />
            </button>
            <button
              onClick={() => {
                handleClose()
                router.push(
                  pageUrls.templateCentral({
                    pageSlug: pageData?.slug as string,
                    templateSlug: templateData?.slug as string,
                    settings: "edit",
                  })
                )
              }}
              className="min-w-[40px] h-10 rounded-full bg-white p-1 flex items-center justify-center"
            >
              <PencilSimple className="w-5 h-5 text-black" weight="bold" />
            </button>
            <button
              onClick={() => {
                handleClose()
                router.push(
                  pageUrls.template(
                    pageData?.slug || "",
                    templateData?.slug || ""
                  )
                )
              }}
              className="min-w-[40px] h-10 rounded-full bg-white p-1 flex items-center justify-center"
            >
              <Play className="w-5 h-5 text-black" weight="bold" />
            </button>
            <button
              onClick={() => {
                handleClose()
                router.push(
                  pageUrls.templateCentral({
                    pageSlug: pageData?.slug || "",
                    templateSlug: templateData?.slug || "",
                    settings: "central",
                  })
                )
              }}
              className="min-w-[40px] h-10 rounded-full bg-white p-1 flex items-center justify-center"
            >
              <GearSix className="w-5 h-5 text-black" weight="bold" />
            </button>
            <button
              onClick={() => {
                setOpenSizeOptions(true)
              }}
              className="min-w-[40px] h-10 rounded-full bg-white p-1 flex items-center justify-center"
            >
              <Crop className="w-5 h-5 text-black" weight="bold" />
            </button>
            <button
              onClick={() => {
                handleClose()
                handleDeleteTemplate()
              }}
              className="min-w-[40px] h-10 rounded-full bg-white p-1 flex items-center justify-center mr-3"
            >
              <Trash className="w-5 h-5 text-black" weight="bold" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setOpenSizeOptions(false)}
              className="min-w-[40px] h-10 rounded-full bg-white p-1 flex items-center justify-center"
            >
              <Crop className="w-5 h-5 text-black" weight="bold" />
            </button>
            <button
              onClick={() => {
                handleUpdateContentData({ shortcut_size: "small" })
              }}
              className={`min-w-[40px] h-10 rounded-full ${
                templateData?.shortcut_size == "large"
                  ? "bg-white"
                  : "bg-slate-900"
              } p-1 flex items-center justify-center`}
            >
              <CornersIn
                className={`w-5 h-5 ${
                  templateData?.shortcut_size == "large"
                    ? "text-black"
                    : "text-white"
                }`}
                weight="bold"
              />
            </button>
            <button
              onClick={() => {
                handleUpdateContentData({ shortcut_size: "large" })
              }}
              className={`min-w-[40px] h-10 rounded-full ${
                templateData?.shortcut_size == "small"
                  ? "bg-white"
                  : "bg-slate-900"
              } p-1 flex items-center justify-center`}
            >
              <CornersOut
                className={`w-5 h-5 ${
                  templateData?.shortcut_size == "small"
                    ? "text-black"
                    : "text-white"
                }`}
                weight="bold"
              />
            </button>
          </>
        )}
        <Popover
          description={text("stmenu:description")}
          isOpen={isOpen}
          title={text("stmenu:title")}
          acceptButton={text("stmenu:accept")}
          acceptFunc={handleDeleteTemplate}
          declineButton={text("stmenu:decline")}
          declineFunc={() => setIsOpen(false)}
        />
      </div>
      <div className="h-full" onClick={handleClose}></div>
    </div>
  )
}
