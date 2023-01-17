import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import React, { createContext, Fragment, useContext, useState } from "react";

type ContextMenuHookProps = {
  handleOpenContextMenu: (content: React.ReactNode) => void;
  handleCloseContextMenu: () => void;
  handleToggleContextMenu: (content: React.ReactNode) => void;
};

const ContextMenuHook = createContext({} as ContextMenuHookProps);

export type ContextMenuProviderProps = {
  children: React.ReactNode;
};

function ContextMenuProvider({ children }: ContextMenuProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);

  const handleOpenContextMenu = (content: React.ReactNode) => {
    setContent(content);
    setIsOpen(true);
  };

  const handleCloseContextMenu = () => {
    setContent(null);
    setIsOpen(false);
  };

  const handleToggleContextMenu = (content: React.ReactNode) => {
    setIsOpen(!isOpen);
    setContent(!isOpen ? content : null);
  };

  return (
    <ContextMenuHook.Provider
      value={{
        handleOpenContextMenu,
        handleCloseContextMenu,
        handleToggleContextMenu,
      }}
    >
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
  );
}

const useContextMenu = () => useContext(ContextMenuHook);

export { ContextMenuProvider, useContextMenu };
