import { Menu, Transition } from "@headlessui/react"
import useTranslation from "next-translate/useTranslation"
import dynamic from "next/dynamic"
import { CaretDown } from "phosphor-react"
import { Fragment, useEffect, useState } from "react"
import { IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"

const BlockMenu = dynamic(
  () => import("components/BlockMenu/BlockMenu").then((mod) => mod.BlockMenu),
  { ssr: false }
)

interface Options {
  id: number
  value: string
}

type IDropDownMenuBlock = {
  data: {
    options: Options[]
  }
} & IBlock

type IOption = {
  id: number
  value: string
  selected: boolean
}

type DropDownMenuBlock = {
  block: IDropDownMenuBlock
  isEditable: boolean
  onDelete?: () => void
  handleUpdateInteractions?: (interaction: IInteractionData) => void
  onEdit?: () => void
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}

export const DropDownMenuBlock = ({
  block,
  isEditable,
  onDelete,
  handleUpdateInteractions,
  onEdit,
}: DropDownMenuBlock) => {
  const text = useTranslation().t

  type IEvent = {
    displayedAt?: string
    lastInteractionAt?: string
    firstInteractionAt?: string
  }

  const [options, setOptions] = useState<IOption[]>(block.data?.options as any)
  const [selectedOption, setSelectedOption] = useState<string>(
    text("dropdownmenu:select")
  )
  const [events, setEvents] = useState<IEvent>()

  function handleUpdateEvents(newEvent: IEvent) {
    setEvents((state) => {
      return {
        ...state,
        ...newEvent,
      } as IEvent
    })
  }

  function handleUpdateSelection(option: IOption) {
    setOptions((state) => {
      return state.map((optionState) => {
        if (optionState.selected) {
          return {
            ...optionState,
            selected: !optionState.selected,
          }
        }
        return optionState
      })
    })
    setOptions((state) => {
      return state.map((optionState) => {
        if (optionState.id === option.id) {
          return {
            ...optionState,
            selected: !optionState.selected,
          }
        }
        return optionState
      })
    })
    setSelectedOption(option.value)
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
            options: block.data.options,
          },
        },
        output: {
          events: events,
          data: {
            selected_option: options.filter((option) => option.selected),
          },
        },
      })
  }

  useEffect(() => {
    onInteraction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

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
        <Menu as="div" className="relative inline-block text-left w-full">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-2xl bg-white px-3 py-2 md:px-4 md:py-3 ring-2 ring-inset ring-gray-100 hover:bg-gray-50">
              <div className="w-full text-left flex flex-row gap-2 align-middle items-center justify-start">
                <p className="lg:text-[1.1rem]">{selectedOption}</p>
                <CaretDown className="-mr-1 h-5 w-5" aria-hidden="true" />
              </div>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 z-10 mt-2 w-full lg:text-[1.1rem] origin-top-right divide-y divide-gray-100 rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1 w-full">
                {options.map((option) => (
                  <Menu.Item key={option.id}>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          handleUpdateSelection(option)
                        }}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 lg:py-3 w-full text-left"
                        )}
                      >
                        {option.value}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}
