import { useEventListener } from "ahooks";
import React, { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useWindowSize } from ".";
import { useResponsive } from "@/hooks";
import { useRouter } from "next/router";

interface UseInViewOption {
  triggerOnce?: boolean;
  offset?: number;
  type?: "title" | "context";
}
export const useInView = ({
  triggerOnce,
  offset,
  type,
}: UseInViewOption = {}) => {
  const wSize = useWindowSize();
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  const handleScroll = useCallback(() => {
    if (triggerOnce && inView) return;
    if (ref.current && wSize) {
      const rect = ref.current.getBoundingClientRect();
      if (type == "title")
        setInView(rect.top / 1.2 < wSize.height - rect.height - (offset ?? 0));
      else {
        setInView(rect.top / 1.8 < wSize.height - rect.height - (offset ?? 0));
      }
    }
  }, [ref.current, wSize, setInView]);
  useEventListener("scroll", handleScroll);
  useEffect(handleScroll, [ref.current, wSize]);
  return [ref as RefObject<any>, inView] as const;
};
