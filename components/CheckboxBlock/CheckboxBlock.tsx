import { BlockMenu } from "components/BlockMenu/BlockMenu"
import { useEffect, useState } from "react"
import { IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"

type IData = {
  description: string
}

type ICheckboxBlock = {
  data: IData
} & IBlock

type CheckboxBlockProps = {
  block: ICheckboxBlock
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
}

export const CheckboxBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: CheckboxBlockProps) => {
  type IEvent = {
    displayedAt?: string
    lastInteractionAt?: string
    firstInteractionAt?: string
  }

  const [checked, setChecked] = useState(false)
  const [events, setEvents] = useState<IEvent>()

  function handleUpdateEvents(newEvent: IEvent) {
    setEvents((state) => {
      return {
        ...state,
        ...newEvent,
      } as IEvent
    })
  }

  function handleCheckbox() {
    if (!events?.firstInteractionAt) {
      const firstAndLast = new Date().toString()
      handleUpdateEvents({
        firstInteractionAt: firstAndLast,
        lastInteractionAt: firstAndLast,
      })
    } else {
      const lastInteractionAt = new Date().toString()
      handleUpdateEvents({ lastInteractionAt: lastInteractionAt })
    }
    setChecked(!checked)
  }

  const onInteraction = () => {
    handleUpdateInteractions &&
      handleUpdateInteractions({
        id: block.id,
        config: {
          id: block.id,
          save_as: block.save_as,
          type: block.type,
          data: {
            description: block.data.description,
          },
        },
        output: {
          events: events,
          data: {
            current_state: checked,
          },
        },
      })
  }

  useEffect(() => {
    onInteraction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked])

  useEffect(() => {
    if (!events?.displayedAt) {
      const displayedAt = new Date().toString()
      handleUpdateEvents({ displayedAt: displayedAt })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex relative justify-end">
      {isEditable === true && <BlockMenu onDelete={onDelete} onEdit={onEdit} />}
      <div
        className="flex flex-col w-full justify-center items-center bg-white 
          p-[0.75rem] rounded-[20px] lg:rounded-[30px]"
      >
        <div className="flex items-center lg:px-2 w-full">
          <p className="lg:text-[1.1rem]">{block.data.description}</p>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckbox}
            className={`${checked ? "bg-teal-400" : "bg-slate-500"}
                  relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 
                  border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2
                focus-visible:ring-white focus-visible:ring-opacity-75`}
          />
          <p>
            <a href="https://www.youtube.com" className="text-blue-700">
              dasdasd
            </a>{" "}
            test
          </p>
        </div>
      </div>
    </div>
  )
}
