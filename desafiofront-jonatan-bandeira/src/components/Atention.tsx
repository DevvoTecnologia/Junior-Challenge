import React, { useState, useEffect } from 'react';

type Props = {
  type: 'success' | 'error' | 'warning';
  message: string;
};

const FeedbackMessage: React.FC<Props> = ({ type, message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    message !== "" && setVisible(true);
  }, [message])

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const getStyle = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-l-4 border-green-500 text-green-700';
      case 'error':
        return 'bg-red-100 border-l-4 border-red-500 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700';
      default:
        return 'bg-gray-100 border-l-4 border-gray-500 text-gray-700';
    }
  };

  if (!visible) return null;

  return (
    <div
      className={`p-4 mb-4 rounded-xl min-w-40 fixed bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out ${getStyle()} animate-slide-up`}
      role="alert"
    >
      <p className='font-bold'>{message}</p>
    </div>
  );
};

export default FeedbackMessage;
