import { Dialog as HeadlessDialog, Transition } from "@headlessui/react"
import React, {
  createContext,
  Fragment,
  useContext,
  useMemo,
  useState,
} from "react"

type ContextMenuHookProps = {
  handleOpenContextMenu: (content: React.ReactNode) => void
  handleCloseContextMenu: () => void
  handleToggleContextMenu: (content: React.ReactNode) => void
  handleUpdateContextMenu: (content: React.ReactNode) => void
}

const ContextMenuHook = createContext({} as ContextMenuHookProps)

export type ContextMenuProviderProps = {
  children: React.ReactNode
}

function ContextMenuProvider({ children }: ContextMenuProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<React.ReactNode>(null)

  const contextValue = useMemo(
    () => ({
      handleOpenContextMenu,
      handleCloseContextMenu,
      handleToggleContextMenu,
      handleUpdateContextMenu,
    }),
    [
      handleOpenContextMenu,
      handleCloseContextMenu,
      handleToggleContextMenu,
      handleUpdateContextMenu,
    ]
  )

  function handleOpenContextMenu(content: React.ReactNode) {
    setContent(content)
    setIsOpen(true)
  }

  function handleCloseContextMenu() {
    setContent(null)
    setIsOpen(false)
  }

  function handleToggleContextMenu(content: React.ReactNode) {
    setIsOpen(!isOpen)
    setContent(!isOpen ? content : null)
  }

  function handleUpdateContextMenu(content: React.ReactNode) {
    setContent(content)
  }

  return (
    <ContextMenuHook.Provider value={contextValue}>
      <>
        <Transition.Root show={isOpen} as={Fragment}>
          <HeadlessDialog
            as="div"
            className="relative z-50"
            onClose={handleCloseContextMenu}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div>
                <div
                  className="fixed inset-0 bg-black opacity-30"
                  aria-hidden="true"
                ></div>
                <div className="relative  h-screen">{content}</div>
              </div>
            </Transition.Child>
          </HeadlessDialog>
        </Transition.Root>

        {children}
      </>
    </ContextMenuHook.Provider>
  )
}

const useContextMenu = () => useContext(ContextMenuHook)

export { ContextMenuProvider, useContextMenu }
