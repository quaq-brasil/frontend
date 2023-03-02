import { Dialog as HeadlessDialog, Transition } from "@headlessui/react"
import { Fragment } from "react"

type PopoverProps = {
  title: string
  description: string
  acceptButton?: string
  declineButton?: string
  isOpen: boolean
  acceptFunc?: () => void
  declineFunc?: () => void
}

export const Popover = ({
  description,
  isOpen,
  title,
  acceptButton,
  acceptFunc,
  declineButton,
  declineFunc,
}: PopoverProps) => {
  return (
    <>
      {isOpen && (
        <Transition appear show={isOpen} as={Fragment}>
          <HeadlessDialog as="div" className="relative z-10" onClose={() => {}}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <HeadlessDialog.Panel
                    className="w-full max-w-md transform overflow-hidden rounded-[20px]
                bg-white p-3 text-left align-middle transition-all"
                  >
                    <HeadlessDialog.Title
                      as="h3"
                      className="lg:text-[1.1rem] font-medium leading-6 text-gray-900"
                    >
                      {title}
                    </HeadlessDialog.Title>
                    <div className="mt-2">
                      <p className=" text-gray-500 lg:text-[1.1rem]">
                        {description}
                      </p>
                    </div>

                    <div className="mt-4 flex justify-between">
                      {declineButton && (
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent py-2 font-medium
                      text-rose-500 hover:bg-slate-100 focus:outline-none focus-visible:ring-0 px-1 lg:text-[1.1rem] lg:px-2"
                          onClick={declineFunc}
                        >
                          {declineButton}
                        </button>
                      )}
                      {acceptButton && (
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent py-2 font-medium
                      text-blue-500 hover:bg-slate-100 focus:outline-none focus-visible:ring-0 px-1 lg:text-[1.1rem] lg:px-2"
                          onClick={acceptFunc}
                        >
                          {acceptButton}
                        </button>
                      )}
                    </div>
                  </HeadlessDialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </HeadlessDialog>
        </Transition>
      )}
    </>
  )
}
