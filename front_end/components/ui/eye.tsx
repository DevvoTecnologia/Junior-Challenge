import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const SauronEye: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  
  const springConfig = { stiffness: 300, damping: 30 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX: mouseX, clientY: mouseY } = event;
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    x.set(mouseX - centerX);
    y.set(mouseY - centerY);
  };

  return (
    <div
      className="relative w-full h-full flex justify-center items-center"
      onMouseMove={handleMouseMove}
    >
      <motion.img
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1dbc1935-6542-4ee3-822f-135cff4ba62c/dhc732x-14085f84-b359-4ec3-8741-e88136db15b7.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzFkYmMxOTM1LTY1NDItNGVlMy04MjJmLTEzNWNmZjRiYTYyY1wvZGhjNzMyeC0xNDA4NWY4NC1iMzU5LTRlYzMtODc0MS1lODgxMzZkYjE1YjcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gFoL2_wV61J5Drl-xsu6JyN6EZQ0TDut2rb_J8ONKU8"
        alt="Animated Image"
        width={100}
        height={100}
        style={{ 
          rotateX: rotateX,
          rotateY: rotateY,
        }}
      />
    </div>
  );
};

export default SauronEye;
