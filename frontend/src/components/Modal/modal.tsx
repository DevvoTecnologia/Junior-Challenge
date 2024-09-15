import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useState } from "react";

export type ModalProps = {
  title: string;
  children: React.ReactNode;
  showModal?: boolean;
  setShowModal?: (value: boolean) => void;
};

export const Modal: FC<ModalProps> = ({
  title,
  children,
  showModal = false,
  setShowModal,
}) => {
  const [isOpen, setIsOpen] = useState(showModal);

  useEffect(() => {
    setIsOpen(showModal);
  }, [showModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute z-10 inset-0 flex items-center justify-center bg-gray-800/80 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden={!isOpen}
        >
          <motion.div
            className="relative p-8 bg-gray-700 rounded-lg border-gray-600 border w-[500px]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IconX
              className="absolute right-4 top-4 cursor-pointer text-white hover:text-gray-400 duration-150"
              aria-label="Close Modal"
              size={20}
              onClick={() => setShowModal?.(false)}
            />
            <h2 className="text-white text-2xl font-semibold text-center">
              {title}
            </h2>
            <hr className="my-4 border-gray-600 -mx-8" />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
