import type { Identifier, XYCoord } from "dnd-core";
import Image from "next/image";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import ShortcutMenu from "../ShortcutMenu/ShortcutMenu";

type ShortcutProps = {
  title: string;
  img_url: string;
  size: "small" | "large";
  isCreator?: boolean;
  isSelect?: boolean;
  onMove?: (dragIndex: number, hoverIndex: number) => void;
  index: number;
  id: string;
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Shortcut = (props: ShortcutProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      props.onMove && props.onMove(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id: props.id, index: props.index, type: "card" };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <>
      <div
        ref={ref}
        style={{ opacity }}
        data-handler-id={handlerId}
        className={`flex relative min-w-[100%] max-w-[100%] overflow-hidden rounded-[20px] h-[13.0625rem] justify-center content-center lg:h-[19rem] lg:rounded-[30px] ${
          props.size === "large"
            ? "col-span-2  max-w-[35.25rem]"
            : "col-span-1  md:max-w-[16.5625rem]"
        }`}
      >
        <div
          className="z-10 absolute flex row justify-center bg-white ml-auto mr-auto left-[0.375rem]
      right-[0.375rem] rounded-[15px] bottom-[6px] px-[6px] lg:rounded-[25px]"
        >
          <p className="inline-block py-[0.625rem] text-center lg:text-[1.25rem]">
            {props.title}
          </p>
        </div>

        <Image
          className="rounded-[20px] lg:rounded-[30px]"
          src={props.img_url}
          fill
          style={{ objectFit: "cover" }}
          alt={""}
        />

        {props.isCreator && props.isSelect ? (
          <div className="relative z-10 h-fit min-w-full w-fit pt-3 pl-3 overflow-scroll flex scrollbar-hide gap-3 items-center justify-start">
            <ShortcutMenu />
          </div>
        ) : null}
      </div>
    </>
  );
};
