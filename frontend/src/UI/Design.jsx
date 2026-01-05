import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const Design = ({ data, OnToggle, isActive }) => {
  return (
    <li className="mb-4 rounded-xl overflow-hidden border-b">
      <div
        className="flex justify-between items-center px-6 py-4 cursor-pointer select-none"
        onClick={OnToggle}
      >
        <p className="font-semibold text-2xl text-black">{data.question}</p>
        <span className="text-red-400 text-3xl transition-transform duration-300">
          {isActive ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </div>

      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden px-6 pb-4 text-black">
          {data.answer}
        </div>
      </div>
    </li>
  );
};
