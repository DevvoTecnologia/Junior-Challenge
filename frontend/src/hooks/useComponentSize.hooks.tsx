import { useEffect, useState } from 'react';

export const useComponentSize = (componentRef: any) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const getDimensions = () => ({
            width: componentRef.current.offsetWidth,
            height: componentRef.current.offsetHeight,
        });

        const handleResize = () => {
            setDimensions(getDimensions());
        };

        if (componentRef.current) {
            setDimensions(getDimensions());
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [componentRef]);

    return dimensions;
};