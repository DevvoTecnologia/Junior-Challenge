import React from 'react';

const CloudAnimation: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden select-none z-0">
      <div className="absolute top-1/2 left-0 w-full h-full flex items-center justify-center">
        <div className="relative w-full h-full">
          <img
            width={150}
            height={150}
            src="https://pngimg.com/d/cloud_PNG112212.png" // Replace with your cloud image URL
            alt="Cloud"
            className="absolute top-0 left-0 animate-slide-left-right-very-slow"
          />
          <img
            width={150}
            height={150}
            src="https://static.vecteezy.com/system/resources/thumbnails/012/595/156/small_2x/realistic-white-cloud-free-png.png" // Replace with your cloud image URL
            alt="Cloud"
            className="absolute top-20 left-32 animate-slide-left-right-slow"
          />
        </div>
      </div>
    </div>
  );
};

export default CloudAnimation;
