import { useI18n, useInView } from "@/hooks";
import { useScroll, useSize } from "ahooks";
import classNames from "classnames";
import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Autoplay, Navigation, Pagination, Swiper as _Swiper } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import benefit_1_1 from "./images/benefit-1-1.png";
import benefit_1_2 from "./images/benefit-1-2.png";
import benefit_1_3 from "./images/benefit-1-3.png";
import benefit_2_1 from "./images/benefit-2-1.png";
import benefit_2_2 from "./images/benefit-2-2.png";
import benefit_2_3 from "./images/benefit-2-3.png";
import benefit_3_1 from "./images/benefit-3-1.png";
import benefit_3_2 from "./images/benefit-3-2.png";
import benefit_3_3 from "./images/benefit-3-3.png";

import { useHeaderContext } from "@/states";
import styles from "./styles.module.scss";

const allImages = [
  [benefit_1_1, benefit_1_2, benefit_1_3],
  [benefit_2_1, benefit_2_2, benefit_2_3],
  [benefit_3_1, benefit_3_2, benefit_3_3],
];

export const Benefit = memo(() => {
  const t = useI18n("home");

  // 优势相关
  const benefits = useMemo(
    () =>
      allImages.map((images, index) => ({
        images: images,
        title: t(`benefit-${index + 1}-title` as any),
        description: t(`benefit-${index + 1}-description` as any),
      })),
    [t]
  );
  const [currentBenefitIndex, setCurrentBenefitIndex] = useState(0);

  // 恢复自动播放
  let timer: NodeJS.Timeout;
  const autoPlay = useCallback((swiper: _Swiper) => {
    timer = setTimeout(() => {
      swiper.autoplay?.start();
    }, 5000);
  }, []);
  useEffect(() => () => clearTimeout(timer), []);

  // 是否显示可读header
  const scroll = useScroll();
  const benefitRef = useRef<HTMLDivElement>(null);

  //导航栏变色逻辑

  // const showReadableHeader = useMemo(() => {
  //   if (!scroll?.top || !benefitRef.current) return false;
  //   return scroll.top > benefitRef.current.offsetTop - 70;
  // }, [scroll?.top]);

  // // 设置 header 样式
  // const { setHeaderType } = useHeaderContext({ headerType: "transparent" });
  // useEffect(() => {

  //   setHeaderType(showReadableHeader ? "white" : "transparent");
  // }, [showReadableHeader]);

  // 同步按钮位置
  const imageRef = useRef(null);
  const imageSize = useSize(imageRef);

  const [titleRef, titleInView] = useInView();
  const [swiperRef, swiperInView] = useInView({ type: "context" });

  return (
    <section
      ref={benefitRef}
      className={classNames(
        styles.benefit,
        "bg-[#fff9f0]  pb-[40px] pt-[58px] "
      )}
    >
      <div
        className={classNames(
          "ebuy-container relative flex flex-col items-center justify-center"
        )}
      >
        <div
          ref={titleRef}
          className={classNames(
            " col-start-1 col-end-25 mb-[45px]  text-center text-[26px] font-[400] leading-[40px] text-[#E79A44] md:text-[26px] md:font-[500] md:leading-[31px]"
          )}
        >
          <span
            className={classNames(
              "inline-block  px-[130px] pb-[27px]  pt-[12px] ",
              styles.benefitTitle
            )}
          >
            {t("benefit-title")}
          </span>
        </div>
        <button
          className={classNames(
            "left-arrow absolute left-[32px] z-[30] mt-[30px] hidden h-[77px] w-[48px] items-center justify-center rounded-[12px] bg-white md:left-[16px] md:flex md:opacity-0 lg:left-[72px]",
            {
              "!hidden": imageSize === undefined,
              ["benifit2"]: swiperInView,
            }
          )}
          style={{
            bottom: (imageSize?.height || 0) / 2 + 15,
          }}
        >
          <svg
            fill="#ed3838"
            width="32px"
            height="21px"
            viewBox="0 0 22 21"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m4.431 12.822 13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z" />
          </svg>
        </button>
        <Swiper
          ref={swiperRef}
          className={classNames(
            "col-start-1 col-end-25 w-full md:col-start-2 md:col-end-24 opacity-0",
            {
              ["benifit2"]: swiperInView,
            }
          )}
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ el: ".custom-pagination", clickable: true }}
          navigation={{
            prevEl: ".left-arrow",
            nextEl: ".right-arrow",
          }}
          onActiveIndexChange={(swiper) =>
            setCurrentBenefitIndex(swiper.realIndex)
          }
          onAutoplayPause={autoPlay}
          autoplay
          loop
        >
          {benefits.map((_, i) => (
            <SwiperSlide key={`benefit-${i + 1}`}>
              <div className={classNames("flex flex-col items-center")}>
                <span
                  className={classNames(
                    "mb-[24px] text-[42px] font-[600] leading-[62px] text-[#333333] md:text-[42px] md:font-bold md:leading-[51px]"
                  )}
                >
                  {benefits[currentBenefitIndex].title}
                </span>
                <span
                  className={classNames(
                    "mb-[12px] h-[68px] text-center text-[26px] font-[400] leading-[40px] text-[#333333] md:font-[500] md:leading-[31px]"
                  )}
                >
                  {benefits[currentBenefitIndex].description}
                </span>
                <div
                  ref={imageRef}
                  className={classNames("flex w-full justify-between")}
                >
                  {benefits[i].images.map((image, j) => (
                    <Image
                      className={classNames("aspect-square ", styles.swiperImg)}
                      style={
                        {
                          // width: "calc(calc(100% - 122px) / 3)",
                        }
                      }
                      key={`benefit-${i + 1}-${j + 1}`}
                      alt={`benefit-${i + 1}-${j + 1}`}
                      src={image}
                    />
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div
            className={classNames(
              "custom-pagination mt-[41px] flex justify-center !space-x-[24px] md:!space-x-[12px]"
            )}
          ></div>
        </Swiper>
        <button
          className={classNames(
            "right-arrow  absolute  z-[30] mt-[30px] hidden h-[77px] w-[48px] items-center justify-center rounded-[12px] bg-white md:right-[16px] md:flex md:opacity-0 lg:right-[72px]",
            {
              "!hidden": imageSize === undefined,

              ["benifit2"]: swiperInView,
            }
          )}
          style={{
            bottom: (imageSize?.height || 0) / 2 + 15,
          }}
        >
          <svg
            fill="#ed3838"
            width="32px"
            height="21px"
            viewBox="0 0 22 21"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z" />
          </svg>
        </button>
      </div>
    </section>
  );
});
