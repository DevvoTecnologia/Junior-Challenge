import { motion } from "framer-motion";
import { MouseEventHandler } from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
interface AnimatedIconProps {
  onClick: MouseEventHandler<SVGSVGElement>;
}

const AnimatedArrowIcon = ({ onClick }: AnimatedIconProps) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.2, 
        transition: { duration: 0.2 }, 
      }}
      whileTap={{
        scale: 0.9, 
        transition: { duration: 0.1 }, 
      }}
      className="inline-block cursor-pointer"
    >
      <ArrowLeftIcon
        onClick={onClick}
        className="w-6 h-6 text-gray-700 hover:text-blue-500 transition-colors duration-300"
      />
    </motion.div>
  );
};

export default AnimatedArrowIcon;
