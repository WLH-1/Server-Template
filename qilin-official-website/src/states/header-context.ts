import { UseProvideReturn } from "@/types";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type HeaderType = "transparent" | "frosted-glass" | "white" | "firstshow";

export const HeaderContext = createContext({
  showChangeLang: false as boolean,
  setShowChangeLang: (() => {}) as Dispatch<SetStateAction<boolean>>,
  showHeader: true as boolean,
  setShowHeader: (() => {}) as Dispatch<SetStateAction<boolean>>,
  headerType: undefined as HeaderType | undefined,
  setHeaderType: (() => {}) as Dispatch<SetStateAction<HeaderType | undefined>>,
});

export const useProvideHeader = (): UseProvideReturn<
  "Header",
  typeof HeaderContext
> => {
  const [showChangeLang, setShowChangeLang] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [headerType, setHeaderType] = useState<HeaderType | undefined>(
    "firstshow"
  );

  return {
    HeaderProvider: HeaderContext.Provider,
    HeaderValue: {
      showChangeLang,
      setShowChangeLang,
      showHeader,
      setShowHeader,
      headerType,
      setHeaderType,
    },
  };
};

export interface HeaderContextProps {
  showHeader?: boolean;
  headerType?: HeaderType;
}
export const useHeaderContext = ({
  showHeader,
  headerType,
}: HeaderContextProps = {}) => {
  const headerContext = useContext(HeaderContext);
  showHeader &&
    useEffect(() => {
      const _showHeader = headerContext.showHeader;
      headerContext.setShowHeader(showHeader);
      return () => {
        headerContext.setShowHeader(_showHeader);
      };
    }, [showHeader]);
  headerType &&
    useEffect(() => {
      const _headerType = headerContext.headerType;
      headerContext.setHeaderType(headerType);
      return () => {
        headerContext.setHeaderType(_headerType);
      };
    }, [headerType]);
  return headerContext;
};
