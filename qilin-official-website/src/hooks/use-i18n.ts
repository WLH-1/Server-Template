import { useI18nContext } from "@/states";
import { I18n, Lang, NS, defaultLang, defaultNS, t } from "@/utils";
import { useMemo } from "react";

/**
 * 使用翻译函数
 * @param ns 命名空间
 * @param lang 使用语言
 * @returns 翻译函数
 */
export function useI18n<
  L extends Lang = typeof defaultLang,
  N extends NS = typeof defaultNS
>(ns?: N, lang?: L) {
  const { lang: contextLang, detectedLang } = useI18nContext();
  const _ns = ns || (defaultNS as N);
  const _lang = lang || ((contextLang || detectedLang || defaultLang) as L);
  return useMemo(
    () => (key: keyof I18n[L][N]) => t(key, _ns, _lang),
    [_lang, _ns]
  );
}
