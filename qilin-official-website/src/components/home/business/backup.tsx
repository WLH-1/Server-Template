import { useI18n, useInView, useResponsive } from "@/hooks";
import classNames from "classnames";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Autoplay, Pagination, Swiper as _Swiper } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { useI18nContext } from "@/states";
import one from "./images/1.png";
import two from "./images/2.png";
import four from "./images/3.png";
import three from "./images/4.png";
import boxHighlight from "./images/box-h.png";
import box from "./images/box.png";
import carHighlight from "./images/car-h.png";
import car from "./images/car.png";
import cartHighlight from "./images/cart-h.png";
import cart from "./images/cart.png";
import dollarHighlight from "./images/dollar-h.png";
import dollar from "./images/dollar.png";

const images = [
  {
    picture: one,
    iconNormal: cart,
    iconHighlight: cartHighlight,
  },
  {
    picture: two,
    iconNormal: box,
    iconHighlight: boxHighlight,
  },
  {
    picture: three,
    iconNormal: car,
    iconHighlight: carHighlight,
  },
  {
    picture: four,
    iconNormal: dollar,
    iconHighlight: dollarHighlight,
  },
];
const Business = () => {
  const t = useI18n("home");
  const { md } = useResponsive();
  const { lang, detectedLang, setLang } = useI18nContext();
  const businesses = images.map((image, index) => ({
    title: t(`business-${index + 1}-title` as any),
    title2: t(`business-${index + 1}-title-2` as any),
    description: t(`business-${index + 1}-description` as any),
    ...image,
  }));

  const [currentIndex, setCurrentIndex] = useState(0);

  const [titleRef, titleInView] = useInView({ type: "title" });

  const desktop = (
    <div className="ebuy-container">
      <div
        className={classNames(
          "col-start-1 col-end-25 hidden w-full grid-cols-24 md:grid"
        )}
      >
        {/* 选择 */}
        <div
          // ref={textRef}
          className={classNames(
            "col-start-1  col-end-17 flex flex-1 flex-col   pt-[20px]",
            {
              // business1: textInView,
            }
          )}
        >
          {businesses.map((business, index) => (
            <div
              key={`business-title-${index}`}
              className={classNames(
                "flex flex-col rounded-[16px] px-[24px] py-[30px] md:-ml-[24px]",
                {
                  ["bg-[#1D1F21] md:bg-[#3D3D3D]"]: currentIndex === index,
                }
              )}
              onMouseOver={() => setCurrentIndex(index)}
            >
              <div className={classNames("flex flex-wrap items-center")}>
                <Image
                  className={classNames("mr-[14px] h-[30px] w-[30px]")}
                  alt={business.title}
                  src={
                    currentIndex === index
                      ? business.iconNormal
                      : business.iconHighlight
                  }
                />
                <span
                  className={classNames(
                    "text-[26px] leading-[39px] text-[#3A2D1B]",
                    {
                      ["text-[#F5F5F5]"]: currentIndex === index,
                    }
                  )}
                >
                  {business.title}
                </span>
                <span
                  className={classNames(
                    "ml-[44px] text-[20px] leading-[34px] text-[#B6863E]",
                    {
                      ["text-[#F5F5F5]"]: currentIndex === index,
                    }
                  )}
                >
                  {currentIndex === index
                    ? `${
                        business.title2
                          ? lang === "en"
                            ? `BNPL - ${business.title2}`
                            : `（${business.title2}）`
                          : ""
                      }`
                    : business.title2}
                </span>
              </div>
              <div
                className={classNames(
                  "ml-[46px] pt-[24px] text-[20px] leading-[29px] text-[#BDBDBD]",
                  {
                    ["hidden"]: currentIndex !== index,
                  }
                )}
              >
                {business.description}
              </div>
            </div>
          ))}
        </div>
        {/* 图片 */}
        <div
          // ref={imgRef}
          className={classNames(
            "  col-start-18 col-end-25 flex flex-1 items-start  justify-end"
            // { business2: imgInView }
          )}
        >
          {businesses.map((business, index) => (
            <div className={classNames("")} key={`business-${index + 1}`}>
              <Image
                loading="eager"
                key={`business-pic-${index}`}
                className={classNames("w-full max-w-[290px]", {
                  ["visible md:hidden"]: currentIndex !== index,
                  ["business2"]: currentIndex == index,
                })}
                alt={business.title}
                src={business.picture}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 移动端切换
  let timer: NodeJS.Timeout;
  const autoPlay = useCallback((swiper: _Swiper) => {
    timer = setTimeout(() => {
      swiper.autoplay?.start();
    }, 5000);
  }, []);
  useEffect(() => () => clearTimeout(timer), []);

  const mobile = (
    <div className={classNames("overflow-hidden pb-[40px] md:pb-[unset]")}>
      <Swiper
        slidesPerView={1}
        modules={[Pagination, Autoplay]}
        pagination={{ el: ".custom-pagination", clickable: true }}
        className={classNames("w-[614px] overflow-visible")}
        onActiveIndexChange={(swiper) => setCurrentIndex(swiper.realIndex)}
        onAutoplayPause={autoPlay}
        autoplay
        loop
      >
        {businesses.map((business, index) => (
          <SwiperSlide key={`business-title-${index}`}>
            <div
              className={classNames(
                "mb-[60px] flex h-[185px] items-center justify-center transition-all duration-300"
              )}
            >
              <div
                className={classNames(
                  "flex h-full w-[614px] flex-col items-center justify-center rounded-[16px] bg-[#1D1F21] px-[24px] py-[30px] transition-all duration-300",
                  {
                    ["!h-[140px] !w-[552px]"]: currentIndex !== index,
                  }
                )}
              >
                <div className={classNames("flex items-center pb-[12px]")}>
                  <Image
                    className={classNames("mr-[14px] h-[30px] w-[30px]")}
                    alt={business.title}
                    src={business.iconHighlight}
                  />
                  <span
                    className={classNames(
                      "text-[26px] leading-[39px] text-white"
                    )}
                  >
                    {business.title}
                  </span>
                </div>
                <div
                  className={classNames(
                    "text-center text-[18px] leading-[29px] text-[#BDBDBD]"
                  )}
                >
                  {business.description}
                </div>
              </div>
            </div>
            <div
              className={classNames(
                "flex h-[982px] items-center justify-center transition-all duration-300",
                {
                  ["!justify-end"]: index === currentIndex - 1,
                  ["!justify-start"]: index === currentIndex + 1,
                }
              )}
            >
              <Image
                loading="eager"
                className={classNames("w-[348px] transition-all duration-300", {
                  ["!w-[486px]"]: currentIndex === index,
                  ["!max-h-[822px] !max-w-full"]: currentIndex !== index,
                })}
                src={business.picture}
                alt={business.title}
              />
            </div>
          </SwiperSlide>
        ))}
        <div
          className={classNames(
            "custom-pagination mt-[41px] flex justify-center !space-x-[24px] md:!space-x-[12px]"
          )}
        ></div>
      </Swiper>
    </div>
  );

  return (
    <section className={classNames("w-full bg-[#fbfbfb] md:min-h-[900px]")}>
      <div className={classNames("pt-[72px]")}>
        {/* 标题 容器*/}
        <div
          ref={titleRef}
          className={classNames(
            "ebuy-container  pb-[52px] text-center opacity-0 md:text-left",
            {
              ["business0"]: titleInView,
            }
          )}
        >
          <div
            className={classNames(
              "col-start-1 col-end-25 text-[42px] font-bold text-[#3A2D1B]"
            )}
          >
            {t("business-title")}
          </div>
          <div
            className={classNames(
              "col-start-1 col-end-25 pt-[24px] text-[26px]"
            )}
          >
            {t("business-description")}
          </div>
        </div>
        {!md ? desktop : mobile}
      </div>
    </section>
  );
};

export { Business };
