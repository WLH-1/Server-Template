import { isBrowser } from "@/utils";

export const useRootFontSize = () => {
  if (!isBrowser()) return 16;
  return parseFloat(document.documentElement.style.fontSize);
};
