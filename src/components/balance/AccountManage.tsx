import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import logo from "../../assets/img/logo.svg";
import { Accounts } from "../accounts";

export const AccountManage = () => {
  return (
    <Menu>
      <Menu.Button>
        <div className="flex justify-center items-center rounded-full bg-[#212529] p-2 cursor-pointer">
          <img className="w-5 h-5" src={logo} />
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="right-0 absolute origin-top-right top-12 w-full max-w-lg bg-[#29323C] rounded-t-3xl ring-0 outline-0">
          <div className="text-start px-3 py-10">
            <p className="pb-6 text-xl">Accounts</p>
            <Accounts />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
