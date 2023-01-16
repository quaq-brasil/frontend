import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

type ContextMenuProps = {
  Opener: React.ReactNode;
  children: React.ReactNode;
};

const ContextMenu = ({ Opener, children }: ContextMenuProps) => {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div className=" min-h-[75px] flex items-center">
          <Menu.Button>{Opener}</Menu.Button>
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
          <Menu.Items className="absolute right-0 mt-3 origin-top-right focus:outline-none">
            <div>{children}</div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ContextMenu;
