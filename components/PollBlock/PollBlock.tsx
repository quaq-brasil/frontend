import dynamic from "next/dynamic"
import { useCallback, useEffect, useState } from "react"
import { IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"
import { Option } from "./Option"

const BlockMenu = dynamic(
  () => import("components/BlockMenu/BlockMenu").then((mod) => mod.BlockMenu),
  { ssr: false }
)

interface Options {
  id: number
  value: string
}

interface IData {
  options: Options[]
  max?: string
  min?: string
}

interface IPollBlock extends IBlock {
  data: IData
}

interface PollBlockProps {
  block: IPollBlock
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
}

type IOption = {
  id: number
  value: string
  selected: boolean
}

type ISelectMap = {
  number: number
  selectionListIds: number[]
}

type IEvent = Partial<{
  displayedAt: string
  lastInteractionAt: string
  firstInteractionAt: string
  maxAchievedAt: string
  minAchievedAt: string
}>

export const PollBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: PollBlockProps) => {
  const [events, setEvents] = useState<IEvent>()
  const [options, setOptions] = useState<IOption[]>(block.data?.options as any)
  const [selectMap, setSelectMap] = useState<ISelectMap>({
    number: 0,
    selectionListIds: [],
  })

  const max = block.data.max ? Number(block.data.max) : Infinity
  const min = block.data.min ? Number(block.data.min) : 0

  const isMaxAchieved = selectMap.number === max
  const isMinAchieved = selectMap.number >= min

  function handleUpdateEvents(newEvent: IEvent) {
    setEvents((state) => {
      return {
        ...state,
        ...newEvent,
      } as IEvent
    })
  }

  function handleUpdateSelectMap(newSelectMap: ISelectMap) {
    setSelectMap((state) => {
      return {
        ...state,
        ...newSelectMap,
      } as ISelectMap
    })
  }

  const handleSelect = useCallback(
    (answer: IOption) => {
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

      const selectedOption = options?.find((option) => option.id === answer.id)

      if (selectedOption.selected) {
        const tempOptions = options?.map((option) => {
          if (option.id === answer.id) {
            return {
              ...option,
              selected: false,
            }
          }
          return option
        })
        handleUpdateSelectMap({
          number: selectMap.number - 1,
          selectionListIds: selectMap.selectionListIds.filter(
            (id) => id !== answer.id
          ),
        })
        setOptions(tempOptions ? tempOptions : [])
      } else {
        if (!isMaxAchieved) {
          const tempOptions = options?.map((option) => {
            if (option.id === answer.id) {
              return {
                ...option,
                selected: true,
              }
            }
            return option
          })
          handleUpdateSelectMap({
            number: selectMap.number + 1,
            selectionListIds: [...selectMap.selectionListIds, answer.id],
          })
          setOptions(tempOptions ? tempOptions : [])
        } else {
          const optionToBeDeselected = options?.find(
            (option) => option.id === selectMap.selectionListIds[0]
          )
          const tempOptions = options?.map((option) => {
            if (option.id === answer.id) {
              return {
                ...option,
                selected: true,
              }
            }
            if (option.id === optionToBeDeselected.id) {
              return {
                ...option,
                selected: false,
              }
            }
            return option
          })
          handleUpdateSelectMap({
            number: selectMap.number,
            selectionListIds: [
              ...selectMap.selectionListIds.filter(
                (id) => id !== optionToBeDeselected.id
              ),
              answer.id,
            ],
          })
          setOptions(tempOptions ? tempOptions : [])
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options]
  )

  const onInteraction = () => {
    handleUpdateInteractions &&
      handleUpdateInteractions({
        id: block.id,
        config: {
          id: block.id,
          save_as: block.save_as,
          type: block.type,
          data: {
            min: block.data.min,
            max: block.data.max,
            options: block.data.options.map((option) => option.value),
          },
        },
        output: {
          events: events,
          data: {
            selected_options: options
              ? options
                  .filter((option) => option.selected)
                  .map((option) => option.value)
              : [],
            number_of_selections: selectMap.number,
          },
        },
      })
  }

  useEffect(() => {
    if (!options) {
      const tempOptions: IOption[] = block.data.options.map((option) => {
        return {
          id: option.id,
          selected: false,
          value: option.value,
        }
      })
      setOptions(tempOptions)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block.data.options])

  useEffect(() => {
    if (!events?.displayedAt) {
      const displayedAt = new Date().toString()
      handleUpdateEvents({ displayedAt: displayedAt })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (options) {
      const max = Number(block.data.max) || 0
      const min = Number(block.data.min) || 0
      const maxAchieved = selectMap.number === max
      const minAchieved = selectMap.number >= min

      const date = new Date().toString()

      if (maxAchieved) {
        handleUpdateEvents({ maxAchievedAt: date })
      }

      if (minAchieved) {
        handleUpdateEvents({ minAchievedAt: date })
      }
      onInteraction()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  return (
    <div className="flex relative justify-end min-w-[100%]">
      {isEditable && <BlockMenu onDelete={onDelete} onEdit={onEdit} />}
      <div
        className="flex flex-col px-3 pt-3 gap-[0.3125rem] justify-center items-center
            min-w-[100%] bg-white rounded-[20px] lg:rounded-[30px]"
      >
        {(block.data.min || block.data.max) && (
          <>
            <div
              className={`w-fit text-center lg:text-[1.1rem] ring-2 ring-slate-100 rounded-2xl p-2 ${
                isMaxAchieved || isMinAchieved ? "" : "text-rose-500"
              } lg:mt-1`}
            >
              <p>
                {selectMap.number}/{block.data.min || block.data.max}
              </p>
            </div>
          </>
        )}
        <div
          className={`flex flex-col gap-3 w-full ${
            block.data.min || block.data.max
              ? "mt-2 lg:mt-3 mb-3 lg:mb-4"
              : "mb-3 lg:mb-4"
          }`}
        >
          {options &&
            options.map((option) => (
              <>
                <Option
                  key={option.id}
                  answer={option}
                  handleSelect={handleSelect}
                />
              </>
            ))}
        </div>
      </div>
    </div>
  )
}
