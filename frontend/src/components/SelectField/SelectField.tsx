import { FC } from "react";

export type SelectFieldProps = {
  name: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const SelectField: FC<SelectFieldProps> = ({
  name,
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        data-testid="select-element"
        className="block w-full pl-3 pr-10 py-[12px] text-base bg-gray-700 border-gray-600 focus:outline-none border duration-150 hover:border-blue-500 focus:ring-blue-500  sm:text-sm rounded-lg"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
