import React from "react";

interface InputProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string | number;
  onChange: React.Dispatch<React.SetStateAction<number | string>>;
  errors: string | undefined;
  touched: boolean | undefined;
}

export default function InputComponent(props: InputProps) {
  return (
    <div className="mt-3">
      <div className="mb-2 flex justify-between">
        <label className="dark:text-gray- text-sm text-gray-400">
          {props.label}
        </label>
      </div>

      <input
        id={props.id}
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder ? props.placeholder : ""}
        className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40"
      />
      {props.errors && props.touched && (
        <div className="text-sm text-red-500">{props.errors}</div>
      )}
    </div>
  );
}
