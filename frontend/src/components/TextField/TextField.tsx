import { FC } from "react";

export type TextFieldProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField: FC<TextFieldProps> = ({ label, ...rest }) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block mb-2 w-max text-sm font-medium cursor-pointer"
      >
        {label}
      </label>
      <input
        id={label}
        {...rest}
        className="bg-gray-700 border border-gray-600 text-gray-50 text-sm rounded-lg hover:border-blue-500 focus:ring-1 focus:ring-blue-500 block w-full p-2.5 outline-none disabled:bg-gray-200 disabled:pointer-events-none"
      />
    </div>
  );
};
