import { PlusIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useRef, useState } from "react";
import Item from "./Item";
import { useDispatch } from "react-redux";

const SelectBox = ({
  selectionFor,
  className,
  data,
  loading = false,
  selected,
  dispatchFunction,
}) => {
  const DefaultText = "Select " + selectionFor;
  const selectComponent = useRef(null);
  const Dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const getConcatenatedName = () => {
    return selected.length
      ? selected.map((s) => s.name).join(", ")
      : DefaultText;
  };

  const handleClickOutside = (event) => {
    if (
      selectComponent.current &&
      !selectComponent.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  const handleClickForItem = (e) => {
    const value = e.target.innerText.toString();

    const isSelected = selected.some((s) => s.name === value);

    Dispatch(
      dispatchFunction(
        isSelected
          ? selected.filter((s) => s.name !== value)
          : [...selected, data.find((d) => d.name === value)]
      )
    );
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={selectComponent} className={`${className} relative`}>
      <div
        className={`h-12 rounded-full flex bg-opacity-45 justify-between items-center p-5 pr-8 bg-white text-sm`}
        title={getConcatenatedName()}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
          <span>
            {/* {JSON.stringify(selected)} */}
            {selected.length ? selected[0].name : DefaultText}
            {selected.length > 1 && `, ${selected.length - 1} more`}
          </span>
        </span>
        <PlusIcon
          width={12}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        />
      </div>
      <div
        className={`w-full translate-y-2 rounded-2xl overflow-hidden absolute top-full pr-4 pt-4 pb-9 backdrop-blur-md bg-white bg-opacity-45  ${
          isOpen ? "pointer-events-auto" : "pointer-events-none hidden"
        }`}
      >
        <ul className={`w-full text-left overflow-auto max-h-60`}>
          <li className="pointer-events-none text-xs px-5 py-2">
            {loading ? <span>Loading...</span> : DefaultText}
          </li>
          {data?.map((d) => (
            <Item
              key={d.id}
              data-key={d.id}
              data={d}
              handleClickForItem={handleClickForItem}
              className={
                selected.some((i) => i.name === d.name.toString())
                  ? "text-blue-600"
                  : ""
              }
            />
          ))}
        </ul>
        <div
          className="flex justify-center items-center py-3 absolute w-full bottom-0 hover:underline cursor-pointer"
          onClick={() => Dispatch(dispatchFunction([]))}
        >
          <span className="text-xs">Clear All</span>
        </div>
      </div>
    </div>
  );
};

export default SelectBox;
