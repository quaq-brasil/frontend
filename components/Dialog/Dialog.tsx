import { Dialog as HeadlessDialog, Transition } from "@headlessui/react"
import { Fragment } from "react"

type DialogProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  height?: "full" | "md" | "sm"
}

const heightClasses = {
  full: "h-full",
  md: "h-3/4",
  sm: "h-1/2",
}

export function Dialog({
  isOpen,
  onClose,
  children,
  title,
  height = "full",
}: DialogProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <HeadlessDialog.Panel
                className={`fixed transform overflow-y-auto overflow-x-hidden w-full max-w-[1024px] bottom-0 scrollbar-hide
               ${heightClasses[height]} `}
              >
                <div className="bg-slate-100 overflow-y-auto rounded-t-3xl xl:rounded-t-[30px] xl:rounded-b-[30px] text-left h-[calc(100%-0.75rem)] xl:h-[calc(100%-1.75rem)] pb-20 mt-3">
                  <div className="absolute z-50 rounded-t-3xl xl:rounded-t-[30px] bg-white w-full h-8 md:h-10 flex items-center justify-center py-2 mb-3">
                    <p className="font-semibold md:text-[1.1rem]">{title}</p>
                  </div>
                  <div className="w-full content-center px-2 pt-[42px] md:pt-[52px] md:px-3">
                    {children}
                  </div>
                </div>
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition.Root>
  )
}
