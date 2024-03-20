import { useI18n, useResponsive } from "@/hooks";

import { useHeaderContext, useI18nContext } from "@/states";

import { locales } from "@/utils";

import { useScroll } from "ahooks";
import classNames from "classnames";

import Image from "next/image";

import { useRouter } from "next/router";

import React,{ memo, useEffect, useRef, useState } from "react";

import { Link } from "./link";

import styles from "./header.module.scss";

import logo_m from "@/assets/images/logo-m.png";
import logo from "@/assets/images/logo.svg";

type Position = {
  left: number;

  top: number;
};

export const Header = memo(() => {
  const t = useI18n("navbar");

  // start 切换语言

  const router = useRouter();

  const { lang, detectedLang, setLang } = useI18nContext();

  const changeLang = () => {
    const index = (router.asPath).indexOf("#"); // 获取 "#" 的索引位置
    if (index !== -1) {
      router.asPath = (router.asPath).substring(0, index); // 获取 "#" 之前的子字符串
    } 
    const pathLang = locales.find((l) => router.asPath.startsWith(`/${l}`));    

    const pathLangIndex = locales.findIndex((l) =>
      router.asPath.startsWith(`/${l}`)
    );

    const detectedLangIndex = locales.findIndex((l) => detectedLang === l);

    const newLangIndex = pathLang
      ? (pathLangIndex + 1) % locales.length
      : (detectedLangIndex + 1) % locales.length;

    setLang(locales[newLangIndex]);
    console.log(router);

    if (!pathLang)
      return router.push(`/${locales[newLangIndex]}${router.asPath}`);

    router.push(
      router.asPath.replace(`/${pathLang}`, `/${locales[newLangIndex]}`)
    );
  };

  // end 切换语言

  // start 菜单切换

  //用于 outsideClick
  const actionRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  // useClickAway(() => setShowMenu(false), actionRef);

  // end 菜单切换

  // start 下滚隐藏头部 上滚显示头部

  let { showHeader, headerType, setShowHeader, setHeaderType } =
    useHeaderContext({ headerType: "transparent" });
  const [lastScroll, setLastScroll] = useState<Position>();

  const scroll = useScroll();
  const headerElement = useRef<HTMLDivElement>(null);
  const headerHeight:any = headerElement.current?.getBoundingClientRect().height;
  
  useEffect(() => {
    if (showMenu) {
      setShowHeader(true);
      return;
    }

    //初始化
    if (!scroll) return;
    
    if (!lastScroll) {
      setLastScroll(headerHeight);
      setShowHeader(true);

      return;                        
    }

    //向下滑动

    // if (scroll.top > lastScroll.top) {
    if (scroll.top > headerHeight*1.5) {
      setShowHeader(false);
    } else {
      if (scroll.top&&!isHome) setHeaderType("white");
      else {
        setHeaderType("transparent");
      }

      setShowHeader(true);
    }
    setLastScroll(scroll);
  }, [scroll,headerHeight]);

  // end 下滚隐藏头部 上滚显示头部

  // start 手机端 header

  const { lg, md } = useResponsive();

  const listPage = (
    <div
      className={classNames(styles.headerMenu, {
        [styles.activeMenu]: showMenu,
      })}
    >
      <ul
        onClick={() => setShowMenu(false)}
        className={classNames(styles.headerLists)}
      >
        <Link href="/">
          <li className={classNames(styles.listItem)}>{t("home")}</li>
        </Link>

        <Link href="/about">
          <li className={classNames(styles.listItem)}>{t("about")}</li>
        </Link>

        <Link href="/download">
          <li className={classNames(styles.listItem)}>{t("download")}</li>
        </Link>

        <Link href="/cooperation">
          <li className={classNames(styles.listItem)}>{t("cooperation")}</li>
        </Link>

        <Link href="/joinus">
          <li className={classNames(styles.listItem)}>{t("join")}</li>
        </Link>
      </ul>
    </div>
  );

  // end 手机端 header

  //不同页面header逻辑

  const keywords = ["about", "joinus", "cooperation", "download"];
  const regexp = new RegExp(keywords.join("|"), "i");
  const [isHome, setHome] = useState(true);
  const [nowLogo, setLogo] = useState(logo);
  useEffect(() => {
    if (
      regexp.test(router.asPath.split("/")[router.asPath.split("/").length - 1])
    ) {
      setHome(() => false);
    } else {
      setHome(() => true);
    }

    if (router.asPath.split("/").includes("download") && md) {
      setLogo(logo_m);
    } else {
      setLogo(logo);
    }
  }, [router.asPath, md]);

  const currentHeaderType = () => {
    if (showMenu) {
      return "white";
    } else {
      //移动端
      if (md) {
        return headerType! || "transparent";
      }
      //电脑端
      else {
        if (isHome) return headerType! || "transparent";
        else {
          return "white";
        }
      }
    }
  };

  return (
    <header ref={headerElement}
      className={classNames(
        " h-[92px] w-full  py-[10px] lg:h-[114px]",

        styles["in"],

        {
          [styles["mobile"]]: lg,

          [styles["out"]]: !showHeader,
        },

        styles[currentHeaderType()]
      )}
    >
      <div
        className={classNames(
          "ebuy-container  flex h-full items-center justify-between "
        )}
      >
        <Image
          src={headerType === "white" ? logo : nowLogo}
          alt="ebuy"
          height={50}
          className={classNames(" col-start-1 col-end-6 w-[146px]")}
        />

        {/* 右侧导航 */}

        <div
          className={classNames(
            "col-start-6 col-end-25  flex  h-full flex-row-reverse items-center justify-start gap-[21px] lg:flex-col-reverse lg:items-end lg:justify-between lg:gap-[0px] lg:py-[12px] "
          )}
        >
          <div className={classNames("relative bottom-[4px]")}>
            <div
              ref={actionRef}
              className={classNames(
                styles["action-icon"],

                "visible lg:hidden",

                {
                  [styles["action-icon-close"]]: showMenu,
                }
              )}
              onClick={() => setShowMenu(!showMenu)}
            >
              <span></span>

              <span></span>

              <span></span>

              <span></span>
            </div>

            <ul
              className={classNames(
                "hidden flex-col text-[17px] md:gap-[20px] lg:flex lg:flex-row lg:gap-[40px]",

                {
                  ["flex"]: !lg,
                }
              )}
            >
              <li>
                <Link href="/">{t("home")}</Link>
              </li>

              <li>
                <Link href="/about">{t("about")}</Link>
              </li>

              <li>
                <Link href="/download">{t("download")}</Link>
              </li>

              <li>
                <Link href="/cooperation">{t("cooperation")}</Link>
              </li>

              <li>
                <Link href="/joinus">{t("join")}</Link>
              </li>
            </ul>
          </div>

          {/* 联系我们 */}

          <div className={classNames("flex md:text-[16px] items-center text-[28px]", styles["contract"])}>
            <Link
              className={classNames("md:px-[15px] px-[24px] md:text-[16px] text-[24px] font-[500]")}
              href="#message"
            >
              {t("contact")}
            </Link>

            <div>|</div>

            {/* 语言切换dom */}

            <div className={classNames("relative")}>
              <div
                onClick={changeLang}
                className={classNames("cursor-pointer md:pl-[15px] pl-[24px] pr-[10px] font-[500]")}
              >
                {lang === "zh-CN" ? "En" : "简体"}
              </div>
            </div>
          </div>
        </div>
      </div>
      {listPage}
    </header>
  );
});
