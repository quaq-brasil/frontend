import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

type DialogProps = {
  title: string;
  description: string;
  acceptButton?: string;
  declineButton?: string;
  isOpen: boolean;
  acceptFunc?: () => void;
  declineFunc?: () => void;
};

export const Dialog = (props: DialogProps) => {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal(wasAccepted: boolean) {
    setIsOpen(false);
  }

  function decline() {
    props.declineFunc && props.declineFunc();
    closeModal(false);
  }

  function accept() {
    props.acceptFunc && props.acceptFunc();
    closeModal(true);
  }

  return (
    <>
      {props.isOpen && (
        <Transition appear show={isOpen} as={Fragment}>
          <HeadlessDialog
            as="div"
            className="relative z-10"
            onClose={closeModal}
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
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {props.title}
                    </HeadlessDialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {props.description}
                      </p>
                    </div>

                    <div className="mt-4 flex justify-between">
                      {props.declineButton && (
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent py-2 text-sm font-medium
                      text-rose-600 hover:bg-blue-200 focus:outline-none focus-visible:ring-0 focus-visible:ring-blue-500
                      focus-visible:ring-offset-2"
                          onClick={decline}
                        >
                          {props.declineButton}
                        </button>
                      )}
                      {props.acceptButton && (
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent py-2 text-sm font-medium
                      text-blue-600 hover:bg-blue-200 focus:outline-none focus-visible:ring-0 focus-visible:ring-blue-500
                      focus-visible:ring-offset-2"
                          onClick={accept}
                        >
                          {props.acceptButton}
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
  );
};
