interface SelectProps {
  id?: string;
  label: string;
  value: string | number;
  onChange: React.Dispatch<React.SetStateAction<number | string>>;
  errors: string | undefined;
  touched: boolean | undefined;
}

export default function SelectComponent(props: SelectProps) {
  return (
    <div className="mt-3">
      <div className="mb-2 flex justify-between">
        <label className="dark:text-gray- text-sm text-gray-400">
          {props.label}
        </label>
      </div>
      <select
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40"
      >
        <option value="Elfos">Elfos</option>
        <option value="Anões">Anões</option>
        <option value="Selron">Selron</option>
        <option value="Homens">Homens</option>
      </select>
      {props.errors && props.touched && (
        <div className="text-sm text-red-500">{props.errors}</div>
      )}
    </div>
  );
}
