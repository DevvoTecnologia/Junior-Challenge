import { FC, useState } from "react";

export type TextFieldProps = {
  label?: string;
  onInput?: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField: FC<TextFieldProps> = ({ label, onInput, ...rest }) => {
  const [value, setValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    onInput?.(newValue);
  };

  return (
    <div>
      <label
        htmlFor={label}
        className="block mb-2 w-max text-sm font-medium text-gray-900 cursor-pointer"
      >
        {label}
      </label>
      <input
        id={label}
        {...rest}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:border-blue-500 focus:ring-1 focus:ring-blue-500 block w-full p-2.5 outline-none disabled:bg-gray-200 disabled:pointer-events-none"
      />
    </div>
  );
};
