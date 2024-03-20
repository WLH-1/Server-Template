import { useEventListener } from "ahooks";
import { useEffect, useMemo, useState } from "react";

export interface Size {
  width: number;
  height: number;
}
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Size>();

  useEventListener("resize", () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });
  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  return windowSize;
};

export const useResponsive = () => {
  const windowSize = useWindowSize();
  return useMemo(() => {
    return {
      sm: windowSize && windowSize?.width < 640.1,
      md: windowSize && windowSize?.width < 768.1,
      lg: windowSize && windowSize?.width < 1280.1,
      xl: windowSize && windowSize?.width < 1440.1,
      xxl: windowSize && windowSize?.width < 1536.1,
    };
  }, [windowSize]);
};
