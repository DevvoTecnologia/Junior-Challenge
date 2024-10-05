"use client";

import { motion } from "framer-motion";

interface ModalProps {
  children: React.ReactNode;
  isModalOpen: boolean;
}

export default function Modal({ children, isModalOpen }: Readonly<ModalProps>) {
  return (
    <>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <>{children}</>
        </motion.div>
      )}
    </>
  );
}
