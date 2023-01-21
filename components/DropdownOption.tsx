import React from "react";

type Props = {
  option: {
    key: string;
    label: string;
  };
  handleOnClick: (key: string) => void;
};

const DropdownOptions = ({ option, handleOnClick }: Props) => {
  return (
    <li>
      <a
        className="
              dropdown-item
              text-lg
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-white
              hover:bg-gray-700
            "
        href="#"
        onClick={() => {
          handleOnClick(option.key);
        }}
      >
        {option.label}
      </a>
    </li>
  );
};

export default DropdownOptions;
