import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BounceWrapperProps {
  children: ReactNode;
  className:string;
}

export const BounceWrapper = ({ children,className }: BounceWrapperProps) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        transition: {
          yoyo: Infinity, // Loop the bounce effect during hover
          duration: 0.3,  // Speed of the bounce effect
        },
      }}
      className={"inline-block cursor-pointer "+className}
    >
      {children}
    </motion.div>
  );
};

