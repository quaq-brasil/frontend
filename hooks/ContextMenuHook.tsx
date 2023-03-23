import { Dialog as HeadlessDialog, Transition } from "@headlessui/react"
import {
  createContext,
  Fragment,
  memo,
  useCallback,
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

const ContextMenuProvider = memo(function ContextMenuProvider({
  children,
}: ContextMenuProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<React.ReactNode>(null)

  const handleOpenContextMenu = useCallback((content: React.ReactNode) => {
    setContent(content)
    setIsOpen(true)
  }, [])

  const handleCloseContextMenu = useCallback(() => {
    setContent(null)
    setIsOpen(false)
  }, [])

  const handleToggleContextMenu = useCallback(
    (content: React.ReactNode) => {
      setIsOpen((prevState) => !prevState)
      setContent((prevState) => (!isOpen ? content : null))
    },
    [isOpen]
  )

  const handleUpdateContextMenu = useCallback((content: React.ReactNode) => {
    setContent(content)
  }, [])

  const contextMenuActions = useMemo(
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

  return (
    <ContextMenuHook.Provider value={contextMenuActions}>
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
                  onClick={handleCloseContextMenu}
                ></div>
                <div className="relative  h-fit w-fit bg-red-500">
                  {content}
                </div>
              </div>
            </Transition.Child>
          </HeadlessDialog>
        </Transition.Root>

        {children}
      </>
    </ContextMenuHook.Provider>
  )
})

const useContextMenu = () => useContext(ContextMenuHook)

export { ContextMenuProvider, useContextMenu }
