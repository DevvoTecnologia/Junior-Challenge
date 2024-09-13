import { IconX } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";

export type ModalProps = {
  title: string;
  children: React.ReactNode;
  showModal?: boolean;
};

export const Modal: FC<ModalProps> = ({
  title,
  children,
  showModal = false,
}) => {
  const [isOpen, setIsOpen] = useState(showModal);

  useEffect(() => {
    setIsOpen(showModal);
  }, [showModal]);

  return (
    <div
      className={`${
        isOpen
          ? "visible opacity-100"
          : "invisible opacity-0 pointer-events-none"
      } absolute transition-all duration-300 inset-0 flex items-center justify-center bg-zinc-800/30`}
      aria-hidden={!isOpen}
    >
      <div className="relative p-8 bg-zinc-800 rounded-lg border-zinc-300">
        <IconX
          className="absolute right-2 top-2 cursor-pointer text-white hover:text-zinc-400 duration-150"
          aria-label="Close Modal"
          size={20}
          onClick={() => setIsOpen(false)}
        />
        <h2 className="text-white text-2xl font-semibold">{title}</h2>
        <hr className="my-4 border-zinc-500 -mx-8" />
        {children}
      </div>
    </div>
  );
};
