import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: React.ReactNode;
}

export function Text({ name, label, ...rest }: Props) {
  const router = useRouter();
  const value = router.query[name];
  const [inputValue, setInputValue] = useState((value as string) || "");

  useEffect(() => {
    if (!value) {
      return;
    }

    setInputValue(value as string);
  }, [value]);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const URLparams = new URL(document.location.toString()).searchParams;

    setInputValue(e.target.value);
    URLparams.set(e.target.name, e.target.value);
    router.replace("/rings/create?" + URLparams.toString());
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <label htmlFor={name}>
          {label}
          {rest.required && "*"}
        </label>
        <input
          type="text"
          id={name}
          name={name}
          placeholder={rest.placeholder}
          className="p-2 border border-neutral-700 rounded-lg bg-neutral-950 text-neutral-50"
          required={rest.required}
          value={inputValue}
          onChange={handleOnChange}
        />
      </div>
    </>
  );
}
