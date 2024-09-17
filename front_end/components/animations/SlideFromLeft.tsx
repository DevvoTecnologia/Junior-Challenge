import { motion } from "framer-motion";
import React from "react";

interface SlideFromLeftProps {
  children: React.ReactNode;
  delay?: number; // Optional delay for animation start
  className?:string;
}

const SlideFromLeft: React.FC<SlideFromLeftProps> = ({ children, delay = 0,className="" }) => {
  return (
    <motion.div
    className={className}
      initial={{ opacity: 0, x: -100 }}  // Start off-screen to the left
      animate={{ opacity: 1, x: 0 }}     // Animate into view
      transition={{
        type: "tween",
        duration: 0.6,       // Animation duration
        delay: delay,        // Optional delay for the animation
        ease: "easeInOut",   // Easing for smoother effect
      }}
    >
      {children}
    </motion.div>
  );
};

export default SlideFromLeft;
