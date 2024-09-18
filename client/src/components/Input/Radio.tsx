import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: React.ReactNode;
  values: string[];
  labels: string[];
}

export function Radio({ name, label, values, labels, ...rest }: RadioProps) {
  const router = useRouter();
  const value = router.query[name];
  const [selectedValue, setSelectedValue] = useState((value as string) || "");

  useEffect(() => {
    if (!value) {
      return;
    }

    setSelectedValue(value as string);
  }, [value]);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const URLparams = new URL(document.location.toString()).searchParams;

    setSelectedValue(e.target.value);
    URLparams.set(e.target.name, e.target.value);
    router.replace("/rings/create?" + URLparams.toString());
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <label>
          {label}
          {rest.required && "*"}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {values.map((value, index) => (
            <div key={value} className="flex text-center">
              <input
                type="radio"
                name={name}
                id={value}
                value={value}
                checked={selectedValue === value}
                placeholder={rest.placeholder}
                className="absolute opacity-0 peer"
                {...rest}
                onChange={handleOnChange}
              />
              <label
                htmlFor={value}
                className={`bg-neutral-950 border border-neutral-700 py-2 w-full text-neutral-50 rounded-md duration-100 ease-in-out 
                    hover:cursor-pointer hover:bg-neutral-800
                    peer-checked:bg-secondary-600 peer-checked:border-secondary-500
                    peer-focus-within:ring`}
              >
                {labels[index]}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
