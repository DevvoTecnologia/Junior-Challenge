import { useState, useEffect } from 'react';

function useInitialLoad(delay = 100) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay); // Delay to allow initial render

    return () => clearTimeout(timer);
  }, [delay]);

  return isLoaded;
}

export default useInitialLoad;
