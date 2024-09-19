import { useState } from "react";

interface Props {
  open: boolean;
  status?: "ok" | "fail";
  icon?: boolean;
  message?: string;
}

export function ToastUI({
  open = false,
  status = "ok",
  icon = false,
  message = "",
}: Props) {
  function renderIcon() {
    if (icon && status === "ok") {
      return (
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        </svg>
      );
    }

    if (icon && status === "fail") {
      return (
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        </svg>
      );
    }

    return <></>;
  }

  return (
    <div
      className={`duration-200 ease-in-out ${
        open ? "opacity-100 top-16" : "opacity-0 top-0 scale-95 invisible"
      } fixed top-16 left-1/2 -right-1/2 z-99`}
    >
      <div className={`relative -left-1/2 flex justify-center mx-6`}>
        <div
          className={`flex gap-2 p-4 border ${status === "ok" ? "border-success-300" : "border-warning-200"} border-cinza-1 rounded-lg shadow-md ${
            status === "ok"
              ? "bg-success-50 text-success-800 fill-success-800"
              : status === "fail"
              ? "bg-warning-50 text-warning-800 fill-warning-800"
              : ""
          }`}
        >
          {renderIcon()}
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export function useToast(time = 5000) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"ok" | "fail">("ok");
  const [message, setMessage] = useState("");

  function handleToast(status: boolean, message: string) {
    setOpen(true);
    setStatus(status ? "ok" : "fail");
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, time);
  }

  return { open, status, message, handleToast };
}