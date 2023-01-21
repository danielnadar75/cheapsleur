import React from "react";
import DropdownOptions from "./DropdownOption";

type Props = {
  title: string;
  options: { key: string; label: string }[];
  handleOnClick: (langKey: string) => void;
};

const Dropdown = ({ title, options, handleOnClick }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-center">
      <div>
        <div className="dropdown relative">
          <button
            className="
          dropdown-toggle
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-md
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap
        "
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={toggle}
          >
            {title}
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="caret-down"
              className="w-2 ml-2"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
              ></path>
            </svg>
          </button>
          <ul
            className={`dropdown-menu
          min-w-max
          absolute
        bg-gray-800
          text-base
          z-50
          py-2
          list-none
          text-center
          rounded-lg
          shadow-lg
          mt-1
          m-0
          bg-clip-padding
          border-none   

          ${isOpen ? "" : "hidden"}`}
            aria-labelledby="dropdownMenuButton1"
          >
            {options.map((option: any) => (
              <DropdownOptions
                key={Math.random()}
                option={option}
                handleOnClick={(data) => {
                  handleOnClick(data);
                  toggle();
                }}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
