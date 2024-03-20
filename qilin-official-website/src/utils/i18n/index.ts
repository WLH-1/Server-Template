import { GetStaticPaths, GetStaticProps } from "next";

import enAbout from "./locales/en/about.json";
import enCommon from "./locales/en/common.json";
import enFooter from "./locales/en/footer.json";
import enHome from "./locales/en/home.json";
import enNavbar from "./locales/en/navbar.json";
import zhAbout from "./locales/zh/about.json";
import zhCommon from "./locales/zh/common.json";
import zhFooter from "./locales/zh/footer.json";
import zhHome from "./locales/zh/home.json";
import zhNavbar from "./locales/zh/navbar.json";
import enJoinus from "./locales/en/joinus.json";
import zhJoinus from "./locales/zh/joinus.json";
import enDownload from "./locales/en/download.json"
import zhDownload from "./locales/zh/download.json"
import enCooperation from "./locales/en/cooperation.json"
import zhCooperation from "./locales/zh/cooperation.json"

type Trans = {
  common: typeof enCommon;
  navbar: typeof enNavbar;
  home: typeof enHome;
  footer: typeof enFooter;
  about: typeof enAbout;
  joinus:typeof enJoinus;
  download:typeof enDownload;
  cooperation:typeof enCooperation
};
export type Lang = "en" | "zh-CN";
export type NS = keyof Trans;
export type I18n = {
  [key in Lang]: Trans;
};

export const defaultLang = "en";
export const defaultNS = "common";
export const locales: Array<Lang> = ["en", "zh-CN"];

const i18n: I18n = {
  en: {
    common: enCommon,
    navbar: enNavbar,
    home: enHome,
    footer: enFooter,
    about: enAbout,
    joinus:enJoinus,
    download:enDownload,
    cooperation:enCooperation
  },
  "zh-CN": {
    common: zhCommon,
    navbar: zhNavbar,
    home: zhHome,
    footer: zhFooter,
    about: zhAbout,
    joinus:zhJoinus,
    download:zhDownload,
    cooperation:zhCooperation
  },
};

export function t<
  L extends Lang = typeof defaultLang,
  N extends NS = typeof defaultNS
>(key: keyof I18n[L][N], ns: N = defaultNS as N, lang: L = defaultLang as L) {
  return i18n[lang][ns][key];
}

export const getI18nStaticProps: GetStaticProps = async (context) => {
  const lang = context.params?.lang;

  return {
    props: lang ? { lang } : {},
  };
};

export const getI18nStaticPaths: GetStaticPaths = async () => {
  return {
    paths: locales.map((locale) => ({ params: { lang: locale } })),
    fallback: false,
  };
};
