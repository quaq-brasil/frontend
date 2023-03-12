import ShortcutMenu from "components/ShortcutMenu/ShortcutMenu"
import type { Identifier, XYCoord } from "dnd-core"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useDrag, useDrop } from "react-dnd"
import { useUpdateTemplate } from "services/hooks/useTemplate/useUpdateTemplate"
import { IPage } from "types/Page.type"
import { ITemplate, IUpdateTemplate } from "types/Template.type"

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

export const Shortcut = (props: ShortcutProps) => {
  const router = useRouter()

  const [contentData, setContentData] = useState<IUpdateTemplate>()
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

  function handleClick() {
    props.onClick
      ? props.onClick()
      : !props.isCreator &&
        router.push(`/${props.pageData?.slug}/${props.templateData.slug}`)
  }

  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = props.index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      props.onMove && props.onMove(dragIndex, hoverIndex)

      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id: props.id, index: props.index, type: "card" }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  useEffect(() => {
    if (props.templateData) {
      setContentData(props.templateData)
    }
  }, [props.templateData])

  return (
    <>
      <div
        ref={ref}
        style={{ opacity }}
        data-handler-id={handlerId}
        className={`flex relative min-w-[100%] max-w-[100%] overflow-hidden rounded-[20px] h-[13.0625rem] justify-center content-center lg:h-[16rem] lg:rounded-[30px] cursor-pointer ${
          contentData?.shortcut_size === "large"
            ? "col-span-2  max-w-[100%]"
            : "col-span-1  md:max-w-[100%]"
        }
        ${
          props.isCreator && props.isSelected
            ? "outline outline-[6px] outline-white"
            : ""
        }
        `}
      >
        <div
          className={`z-10 absolute flex row justify-center bg-white ml-auto mr-auto left-[0.375rem]
          right-[0.375rem] rounded-[15px] bottom-[6px] px-[6px] lg:rounded-[25px] `}
          onClick={handleClick}
        >
          <p className="inline-block py-[0.625rem] text-center lg:text-[1.1rem]">
            {contentData?.title || ""}
          </p>
        </div>
        {props.img_url ? (
          <Image
            className={`rounded-[20px] lg:rounded-[30px]`}
            src={contentData?.shortcut_image || ""}
            fill
            style={{ objectFit: "cover" }}
            alt={""}
            onClick={handleClick}
          />
        ) : (
          <div className="min-w-full min-h-full bg-slate-300 animate-pulse rounded-[20px] lg:rounded-[30px]"></div>
        )}

        {props.isCreator && props.isSelected ? (
          <div className="relative z-10 h-full overscroll-y-none min-w-full w-fit pt-0 pl-0 flex scrollbar-hide gap-3 items-start align-top justify-start">
            <ShortcutMenu
              templateData={contentData}
              pageData={props.pageData}
              handleClose={handleClick}
              handleUpdateContentData={handleUpdateContentData}
            />
          </div>
        ) : null}
      </div>
    </>
  )
}
