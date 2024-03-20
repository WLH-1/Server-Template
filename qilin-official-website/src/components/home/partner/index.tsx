import { useInView } from "@/hooks";
import { rAFWithControl } from "@/utils";
import { useInViewport } from "ahooks";
import classNames from "classnames";
import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import logo11 from "./images/logo-1-1.png";
import logo11x from "./images/logo-1-1x.png";
import logo12 from "./images/logo-1-2.png";
import logo13 from "./images/logo-1-3.png";
import logo14 from "./images/logo-1-4.png";
import logo15 from "./images/logo-1-5.png";
import logo16 from "./images/logo-1-6.png";
import logo17 from "./images/logo-1-7.png";

import logo21 from "./images/logo-2-1.png";
import logo22 from "./images/logo-2-2.png";
import logo23 from "./images/logo-2-3.png";
import logo24 from "./images/logo-2-4.png";
import logo25 from "./images/logo-2-5.png";
import logo26 from "./images/logo-2-6.png";
import logo27 from "./images/logo-2-7.png";

import logo31 from "./images/logo-3-1.png";
import logo32 from "./images/logo-3-2.png";
import logo33 from "./images/logo-3-3.png";
import logo34 from "./images/logo-3-4.png";
import logo35 from "./images/logo-3-5.png";
import logo36 from "./images/logo-3-6.png";
import logo37 from "./images/logo-3-7.png";
import logo37x from "./images/logo-3-7x.png";

import logo41 from "./images/logo-4-1.png";
import logo42 from "./images/logo-4-2.png";
import logo43 from "./images/logo-4-3.png";
import logo44 from "./images/logo-4-4.png";
import logo45 from "./images/logo-4-5.png";
import logo46 from "./images/logo-4-6.png";
import logo47 from "./images/logo-4-7.png";

import logo51 from "./images/logo-5-1.png";
import logo52 from "./images/logo-5-2.png";
import logo53 from "./images/logo-5-3.png";
import logo54 from "./images/logo-5-4.png";
import logo55 from "./images/logo-5-5.png";
import logo56 from "./images/logo-5-6.png";
import logo57 from "./images/logo-5-7.png";

import { useI18n } from "@/hooks";
import styles from "./styles.module.scss";

// const logos = [
//   [logo11, logo21, logo31],
//   [logo41, logo51, logo12],
//   [logo22, logo32, logo42],
//   [logo52, logo13, logo23],
//   [logo33, logo43, logo53],
//   [logo14, logo24, logo34],
//   [logo44, logo54, logo15],
//   [logo25, logo35, logo45],
//   [logo55, logo16, logo26],
//   [logo36, logo46, logo56],
//   [logo17, logo27, logo37],
//   [logo47, logo57],
// ];
const logos = [
  [logo11, logo21, logo31, logo41, logo51],
  [logo12, logo22, logo32, logo42, logo52],
  [logo13, logo23, logo33, logo43, logo53],
  [logo14, logo24, logo34, logo44, logo54],
  [logo15, logo25, logo35, logo45, logo55],
  [logo16, logo26, logo36, logo46, logo56],
  [logo17, logo27, logo37, logo47, logo57],

  [logo11x, logo21, logo31, logo41, logo51],
  [logo12, logo22, logo32, logo42, logo52],
  [logo13, logo23, logo33, logo43, logo53],
  [logo14, logo24, logo34, logo44, logo54],
  [logo15, logo25, logo35, logo45, logo55],
  [logo16, logo26, logo36, logo46, logo56],
  [logo17, logo27, logo37x, logo47, logo57],
];

export const Partner = memo(() => {
  const [partnerRef1, titleInView1] = useInView({
    type: "title",
  });
  const [partnerRef2, titleInView2] = useInView({
    type: "title",
  });
  // 滚动的偏移量
  const [offset, setOffset] = useState(0);
  const t = useI18n("home");
  // 所有的列
  const [cols, setCols] = useState(
    logos.map((_logos, i) => (
      <div key={`partner-logo-${i}`}>
        {_logos.map((src, j) => (
          <div
            key={`partner-logo-${i}-${j}`}
            className={classNames(
              "flex h-[144px] w-[144px] items-center justify-center"
            )}
          >
            <Image
              src={src}
              alt={`partner logo ${i} ${j}`}
              className={classNames(
                "max-h-[120px]   min-w-[100px] max-w-[120px]"
              )}
            />
          </div>
        ))}
      </div>
    ))
  );

  // 控制动画的开始和结束
  const partnerRef = useRef<HTMLDivElement>(null);
  const [inViewport, ratio] = useInViewport(partnerRef, {
    threshold: [0, 0.25, 0.5, 0.75, 1],
  });
  const animation = useMemo(
    () =>
      rAFWithControl(60, () => {
        setOffset((offset) => {
          return offset + 1;
        });
      }),
    []
  );
  const startAnimation = useCallback(() => {
    animation.start();
  }, [animation]);
  const stopAnimation = useCallback(() => {
    animation.stop();
  }, [animation]);
  useEffect(() => {
    if (!inViewport || !ratio) return stopAnimation();
    if (inViewport && ratio > 0.35) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [inViewport, ratio]);
  useEffect(() => {
    if (offset + 1 >= partnerRef.current!.firstElementChild!.clientWidth) {
      setCols((cols) => {
        const _cols = [...cols];
        const _col = _cols.shift();
        _cols.push(_col!);
        return _cols;
      });
      setOffset(0);
    }
  }, [offset]);
  useEffect(() => stopAnimation, []);

  return (
    <section className={classNames("bg-[#fff] pt-[60px] md:pt-[100px]")}>
      <div className={classNames("ebuy-container text-center font-bold")}>
        <div
          ref={partnerRef1}
          className={classNames(
            "col-start-1 col-end-25 pb-[32px] text-center text-[42px] font-bold leading-[51px] text-black opacity-0",
            { partner1: titleInView1 }
          )}
        >
          {t("partner-title")}
        </div>
        <div
          ref={partnerRef2}
          className={classNames(
            "col-start-1 col-end-25 w-full text-center text-[22px] font-[400] leading-[32px] opacity-0 md:col-start-6 md:col-end-20",
            { partner2: titleInView2 }
          )}
        >
          {t("partner-description")}
        </div>
        <div
          className={classNames(
            "relative col-start-1 col-end-25 flex flex-col py-[72px]"
          )}
        >
          <div
            className={classNames(styles.mist, "left-0 bg-gradient-to-r")}
          ></div>
          {/* 视口 */}
          <div className={classNames("w-full overflow-x-hidden ")}>
            {/* 滚动块 */}
            <div
              ref={partnerRef}
              className={classNames(
                "md:27% grid w-full max-w-full auto-cols-[30%] grid-flow-col justify-between lg:auto-cols-[16%] "
              )}
              style={{
                transform: `translateX(-${offset}px)`,
              }}
            >
              {cols}
            </div>
          </div>
          <div
            className={classNames(styles.mist, "right-0 bg-gradient-to-l")}
          ></div>
        </div>
      </div>
    </section>
  );
});
