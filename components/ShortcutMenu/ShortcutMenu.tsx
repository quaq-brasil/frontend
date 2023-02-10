import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import {
  ArrowsOutCardinal,
  Crop,
  GearSix,
  PencilSimple,
  Play,
  Trash,
} from "phosphor-react"
import { useState } from "react"
import { useDeleteTemplate } from "../../services/hooks/useTemplate/useDeleteTemplate"
import { IPage } from "../../types/Page.type"
import { ITemplate } from "../../types/Template.type"
import { pageUrls } from "../../utils/pagesUrl"
import { Popover } from "../Popover/Popover"

type ShortcutMenuProps = {
  templateData: ITemplate | undefined
  pageData: IPage | undefined
}

export default function ShortcutMenu({
  templateData,
  pageData,
}: ShortcutMenuProps) {
  const text = useTranslation().t
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

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
            pageUrls.pageSettings({ pageSlug: pageData?.url as string })
          )
        },
      }
    )
  }

  return (
    <div className="relative z-10 h-fit min-w-full w-fit pt-3 pl-3 overflow-scroll flex scrollbar-hide gap-3 items-center justify-start">
      <button className="min-w-[40px] h-10 rounded-full bg-white p-1 flex items-center justify-center">
        <ArrowsOutCardinal className="w-5 h-5 text-black" weight="bold" />
      </button>
      <button
        onClick={() =>
          router.push(
            pageUrls.templateCentral({
              pageSlug: pageData?.url as string,
              templateSlug: templateData?.url as string,
              settings: "edit",
            })
          )
        }
        className="min-w-[40px] h-10 rounded-full bg-white p-1 flex items-center justify-center"
      >
        <PencilSimple className="w-5 h-5 text-black" weight="bold" />
      </button>
      <button
        onClick={() =>
          router.push(
            pageUrls.template(pageData?.url || "", templateData?.url || "")
          )
        }
        className="min-w-[40px] h-10 rounded-full bg-white p-1 flex items-center justify-center"
      >
        <Play className="w-5 h-5 text-black" weight="bold" />
      </button>
      <button
        onClick={() =>
          router.push(
            pageUrls.templateCentral({
              pageSlug: pageData?.url || "",
              templateSlug: templateData?.url || "",
              settings: "central",
            })
          )
        }
        className="min-w-[40px] h-10 rounded-full bg-white p-1 flex items-center justify-center"
      >
        <GearSix className="w-5 h-5 text-black" weight="bold" />
      </button>
      <button className="min-w-[40px] h-10 rounded-full bg-white p-1 flex items-center justify-center">
        <Crop className="w-5 h-5 text-black" weight="bold" />
      </button>
      <button
        onClick={handleDeleteTemplate}
        className="min-w-[40px] h-10 rounded-full bg-white p-1 flex items-center justify-center mr-3"
      >
        <Trash className="w-5 h-5 text-black" weight="bold" />
      </button>
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
  )
}
