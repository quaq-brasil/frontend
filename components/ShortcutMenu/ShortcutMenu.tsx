import { Popover } from "components/Popover/Popover"
import useTranslation from "next-translate/useTranslation"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDeleteTemplate } from "services/hooks/useTemplate/useDeleteTemplate"
import { IPage } from "types/Page.type"
import { IUpdateTemplate } from "types/Template.type"
import { pageUrls } from "utils/pagesUrl"

const ArrowsOutCardinal = dynamic(() =>
  import("phosphor-react").then((mod) => mod.ArrowsOutCardinal)
)

const CornersIn = dynamic(() =>
  import("phosphor-react").then((mod) => mod.CornersIn)
)

const CornersOut = dynamic(() =>
  import("phosphor-react").then((mod) => mod.CornersOut)
)

const Crop = dynamic(() => import("phosphor-react").then((mod) => mod.Crop))

const GearSix = dynamic(() =>
  import("phosphor-react").then((mod) => mod.GearSix)
)

const PencilSimple = dynamic(() =>
  import("phosphor-react").then((mod) => mod.PencilSimple)
)

const Play = dynamic(() => import("phosphor-react").then((mod) => mod.Play))

const Trash = dynamic(() => import("phosphor-react").then((mod) => mod.Trash))

type ShortcutMenuProps = {
  templateData: IUpdateTemplate | undefined
  pageData: IPage | undefined
  handleClose: () => void
  handleUpdateContentData: (newData: IUpdateTemplate) => void
}

export function ShortcutMenu({
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
        id: templateData?.id,
      },
      {
        onSuccess: () => {
          router.push(pageUrls.pageSettings({ pageSlug: pageData?.slug }))
        },
      }
    )
  }

  return (
    <div className="relative z-10 min-w-full w-fit h-full">
      <div className="h-fit pt-3 pl-3 overflow-x-scroll flex scrollbar-hide gap-3 items-center justify-start pr-3">
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
                    pageSlug: pageData?.slug,
                    templateSlug: templateData?.slug,
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
              className="min-w-[40px] h-10 rounded-full bg-white p-1 flex items-center justify-center"
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
