import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useUpdateTemplate } from "services/hooks/useTemplate/useUpdateTemplate"
import { IPage } from "types/Page.type"
import { ITemplate, IUpdateTemplate } from "types/Template.type"

const Image = dynamic(() => import("next/image").then((mod) => mod.default))

const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  { ssr: false }
)

const ShortcutMenu = dynamic(() =>
  import("components/ShortcutMenu/ShortcutMenu").then((mod) => mod.ShortcutMenu)
)
type ShortcutProps = {
  title: string
  img_url: string
  size: "small" | "large"
  isCreator?: boolean
  isSelected?: boolean
  onClick?: () => void
  onMove?: (dragIndex: number, hoverIndex: number) => void
  index: number
  id: string
  templateData: ITemplate
  pageData: IPage | undefined
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const Shortcut = memo(function Shortcut(props: ShortcutProps) {
  const router = useRouter()

  const {
    title,
    img_url,
    size,
    isCreator,
    isSelected,
    onClick,
    onMove,
    index,
    id,
    templateData,
    pageData,
  } = props

  const [contentData, setContentData] = useState<IUpdateTemplate>(templateData)
  const updateTemplate = useUpdateTemplate()

  function handleUpdateContentData(newData: IUpdateTemplate) {
    updateTemplate.mutate(
      {
        id: contentData?.id,
        data: {
          ...newData,
        },
      },
      {
        onSuccess: () => {
          setContentData((state) => {
            return {
              ...state,
              ...newData,
            } as IUpdateTemplate
          })
        },
      }
    )
  }

  const handleClick = useCallback(() => {
    onClick
      ? onClick()
      : !isCreator && router.push(`/${pageData?.slug}/${templateData.slug}`)
  }, [isCreator, onClick, pageData?.slug, router, templateData.slug])

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (templateData) {
      setContentData(templateData)
    }
  }, [templateData])

  const MemoizedImage = useMemo(() => {
    return (
      <Image
        className={`rounded-[20px] lg:rounded-[30px]`}
        src={contentData?.shortcut_image}
        fill
        style={{ objectFit: "cover" }}
        alt={""}
        loading="lazy"
        onClick={handleClick}
        sizes={
          size === "large"
            ? "(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 30vw"
            : "(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 15vw"
        }
      />
    )
  }, [contentData?.shortcut_image, handleClick, size])

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex relative min-w-[100%] max-w-[100%] overflow-hidden rounded-[20px] h-[13.0625rem] justify-center content-center lg:h-[16rem] lg:rounded-[30px] cursor-pointer ${
            contentData?.shortcut_size === "large"
              ? "col-span-2  max-w-[100%]"
              : "col-span-1  md:max-w-[100%]"
          }
          ${isCreator && isSelected ? "ring-[0.375rem] ring-white" : ""}
          `}
        >
          <div
            className={`z-10 absolute flex row justify-center bg-white ml-auto mr-auto left-[0.375rem]
            right-[0.375rem] rounded-[15px] bottom-[6px] px-[6px] lg:rounded-[25px] `}
            onClick={handleClick}
          >
            <p className="inline-block py-[0.625rem] text-center lg:text-[1.1rem] line-clamp">
              {contentData?.title || ""}
            </p>
          </div>
          {img_url ? (
            <>{MemoizedImage}</>
          ) : (
            <div className="min-w-full min-h-full bg-slate-300 animate-pulse rounded-[20px] lg:rounded-[30px]"></div>
          )}

          {isCreator && isSelected ? (
            <div className="relative z-10 h-full overscroll-y-none min-w-full w-fit pt-0 pl-0 flex scrollbar-hide gap-3 items-start align-top justify-start">
              <ShortcutMenu
                templateData={contentData}
                pageData={pageData}
                handleClose={handleClick}
                handleUpdateContentData={handleUpdateContentData}
              />
            </div>
          ) : null}
        </li>
      )}
    </Draggable>
  )
})
