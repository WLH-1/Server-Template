import img1 from "./images/1.jpg";
import img10 from "./images/10.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";
import img7 from "./images/7.jpg";
import img8 from "./images/8.jpg";
import img9 from "./images/9.jpg";

import { useI18n, useInView } from "@/hooks";
import { rAFWithControl } from "@/utils/rAF-with-control2";
import { useInViewport } from "ahooks";
import classNames from "classnames";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ECard } from "./evaluatCard";
import styles from "./styles.module.scss";
export const Evaluation = memo(() => {
  const dom = useRef<HTMLDivElement>(null);
  const t = useI18n("home");
  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    // img11,
    // img12,
    // img13,
    // img14,
    // img15,
    // img7,
  ];
  const [evaluationRef1, titleInView1] = useInView({ type: "title" });
  const [evaluationRef2, titleInView2] = useInView({ type: "title" });

  const evalutionProps: Array<
    Array<{
      name: string;
      desc: string;
      text: string;
      img: any;
    }>
  > = [];
  for (let i = 0; i < 10; i++) {
    if (!evalutionProps[Math.floor(i / 2)])
      evalutionProps[Math.floor(i / 2)] = [];
    evalutionProps[Math.floor(i / 2)].push({
      name: t(`evaluation-${i + 1}-customer-company` as any),
      desc: t(`evaluation-${i + 1}-customer-people` as any),
      text: t(`evaluation-${i + 1}-customer-text` as any),
      // img: evaluations[Math.floor(Math.random() * 4)],
      img: images[i],
    });
  }
  //偏移逻辑
  // 滚动的偏移量
  const [offset, setOffset] = useState(0);

  // 所有的列
  const [cols, setCols] = useState(
    evalutionProps.map((column, index) => (
      <div
        key={`evaluation-${index}`}
        className={classNames("!min-w-[568px] ")}
      >
        <div className={classNames("mb-[56px] mr-[61px] min-h-[336px]")}>
          <ECard eva={evalutionProps[index][0]} />
        </div>
        <div className={classNames(" ml-[61px]")}>
          <ECard eva={evalutionProps[index][1]} />
        </div>
      </div>
    ))
  );

  // 控制动画的开始和结束
  const partnerRef = useRef<HTMLDivElement>(null);
  const [inViewport, ratio] = useInViewport(partnerRef, {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
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
    if (inViewport) {
      startAnimation();
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
    <section
      ref={dom}
      className={classNames(
        "w-full bg-[#fff] py-[28px]  md:pb-[100px] md:pt-[72px]"
      )}
    >
      {/* 主体 */}
      <div className={classNames("ebuy-container relative ")}>
        {/* 标题 */}
        <div
          ref={evaluationRef1}
          className={classNames(
            "col-start-1 col-end-25 mb-[32px] text-center text-[42px] font-bold text-black md:opacity-0",
            { evaluation1: titleInView1 }
          )}
        >
          <span
            className={classNames(
              "text-[44px] text-[#000] md:text-[48px] md:leading-[59px]"
            )}
          >
            {t("evaluation-title-1")}
          </span>
          <span
            className={classNames(
              "text-[30px] md:text-[42px] md:leading-[51px]"
            )}
          >
            {t("evaluation-title-2")}
          </span>
        </div>
        <div
          ref={evaluationRef2}
          className={classNames(
            "col-start-1 col-end-25 mb-[40px] text-center text-[22px] font-[400] leading-[32px] md:col-start-6 md:col-end-20 md:opacity-0",
            { evaluation2: titleInView2 }
          )}
        >
          {t("evaluation-description-1")}
          <span className="mx-[0.5em] font-[600]">
            {t("evaluation-description-2")}
          </span>
          {t("evaluation-description-3")}
        </div>
        {/* 大盒子 */}
        <div className={classNames("relative col-start-1 col-end-25 w-full ")}>
          {/* 白布 */}
          <div className={classNames(styles.mistLeft)}></div>
          <div className={classNames(styles.miseRight)}></div>
          {/* 固定窗口 */}
          <div
            className={classNames(
              "col-start-1 col-end-25 w-full overflow-x-hidden  py-[10px]"
            )}
          >
            {/* 超出部分 */}
            <div
              ref={partnerRef}
              className={classNames(
                "h-max-full grid w-full  grid-flow-col justify-between "
              )}
              style={{
                transform: `translateX(-${offset}px)`,
              }}
            >
              {/* 每一列 */}
              {cols}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
