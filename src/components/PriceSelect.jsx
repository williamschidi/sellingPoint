import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { PRICE_OPTIONS } from "../lib/properties/constants";

const buttonStyles = {
  default:
    "flex h-8 w-full items-center justify-between border-l border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition outline-none hover:border-slate-300",
  hero: "flex h-11 w-full items-center justify-between rounded-xl bg-slate-50 px-3 text-sm font-medium text-slate-700 transition outline-none ring-primary focus:ring-2",
};

export default function PriceSelect({
  value,
  onChange,
  variant = "default",
  ariaLabelledBy,
  id,
}) {
  return (
    <div className="relative w-full">
      <Listbox value={value} onChange={onChange}>
        <Listbox.Button
          id={id}
          aria-labelledby={ariaLabelledBy}
          className={buttonStyles[variant] ?? buttonStyles.default}
        >
          <span className="truncate text-sm text-gray-500">{value}</span>
          <Icon icon="lucide:chevron-down" className="h-4 w-4 text-slate-400" />
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 mt-4 max-h-64 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-2 shadow-xl">
            {PRICE_OPTIONS.map((price) => (
              <Listbox.Option key={price} value={price}>
                {({ active, selected }) => (
                  <div
                    className={`cursor-pointer px-4 py-2 text-sm ${
                      active ? "bg-primary-subtle" : ""
                    } ${selected ? "font-semibold text-primary" : ""}`}
                  >
                    {price}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}
