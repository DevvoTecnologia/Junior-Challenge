import { useEffect, useState } from "react";

export const useWidth = () => {
  const [width, setWidth] = useState(0);

  const handleResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

export const useHeight = () => {
  const [height, setHeight] = useState(0);

  const handleResize = () => setHeight(window.innerHeight);

  useEffect(() => {
    setHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return height;
};

export const useScroll = () => {
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => setScroll(window.pageYOffset);

  useEffect(() => {
    setScroll(window.pageYOffset);
    window.removeEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scroll;
};
