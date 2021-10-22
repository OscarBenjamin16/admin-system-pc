import React from "react";
import InputIcon from "./InputIcon";

export default function InputSearch({ handleChange, placeholder, label }) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-500 text-xs">{label}</label>
      <div className="relative mt-1 flex text-gray-600 focus-within:text-gray-400">
        <InputIcon />
        <input
          type="search"
          name="q"
          className="w-full text-xs py-1 search rounded border outline-none"
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
