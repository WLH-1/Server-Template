import classNames from "classnames";
import Image from "next/image";
import { memo, useRef, useState } from "react";
import arrow from "./images/arrow-down.svg";
import mCn from "./images/map-china-m.png";
import mapCn from "./images/map-china.png";
import mMs from "./images/map-ms-m.png";
import mapMs from "./images/map-ms.png";
import mSgp from "./images/map-sgp-m.png";
import mapSgp from "./images/map-sgp.png";
import styles from "./styles.module.scss";

import { useI18n, useInView, useResponsive } from "@/hooks";

const countries = [
  {
    mapBg: mapSgp,
    mapBgm: mSgp,
  },
  {
    mapBg: mapMs,
    mapBgm: mMs,
  },
  {
    mapBg: mapCn,
    mapBgm: mCn,
  },
];

export const Location = memo(() => {
  const { md } = useResponsive();
  const [locationRef1, titleInView1] = useInView({ type: "title" });
  const [locationRef2, titleInView2] = useInView({ type: "title" });
  const t = useI18n("home");
  const [currentIndex, setCurrentIndex] = useState(0);
  const companyInfo = countries.map((country, index) => ({
    country: t(`location-${index + 1}-country` as any),
    name: t(`location-${index + 1}-name` as any),
    address: t(`location-${index + 1}-address` as any),
  }));

  const [activeMobileIndex, setActiveMobileIndex] = useState(-1);
  const mapRef = useRef<HTMLDivElement>(null);

  const arrowClick = (index: number) => {
    index === activeMobileIndex
      ? setActiveMobileIndex(-1)
      : setActiveMobileIndex(index);
  };

  //电脑端
  const deskMap = (
    <div className={classNames("col-start-1 col-end-25")}>
      <div
        className={classNames(
          " box-border flex justify-center space-x-[104.17px] pb-[48px] pt-[52px]  md:text-[40px]"
        )}
      >
        {companyInfo.map((company, index) => (
          <div
            key={`company-${index}`}
            onClick={() => setCurrentIndex(index)}
            className={classNames(
              "flex cursor-pointer flex-col items-center  ",
              styles["countrySelect"],
              {
                ["text-[#333]"]: currentIndex === index,
                ["text-[#666]"]: currentIndex != index,
              }
            )}
          >
            <span className={classNames("Inter z-40 text-[28px]")}>
              {company.country}
            </span>
            <span
              className={classNames(
                "relative -top-[20px] -mb-[14px] h-[20px] w-[80%] rounded-[3.5pt] bg-[#EFEFEF]",
                {
                  ["!bg-[#ed3838]"]: currentIndex === index,
                }
              )}
            ></span>
          </div>
        ))}
      </div>
      <div
        ref={mapRef}
        className={classNames("relative  ")}
        style={{
          boxShadow: "20px 20px 0px 0px #F9F9F9",
        }}
      >
        <Image
          className={classNames("h-full w-full")}
          src={countries[currentIndex].mapBg}
          alt=""
        />
        <div
          className={classNames(
            "absolute  left-[50px] top-[40px] flex flex-col items-start justify-between bg-[#fff]   px-2 py-[20px] md:w-[40%] md:px-6 md:py-[40px] lg:w-[35%]  "
          )}
          style={{
            boxShadow: "0px 2px 15px 0px rgba(11,36,40,0.28)",
          }}
        >
          <div
            className={classNames(
              "pb-[16px] text-center text-[16px] leading-[39px]  text-[#333333]  md:pb-[24px] md:text-[24px] lg:pb-[32px]"
            )}
          >
            {companyInfo[currentIndex].name}
          </div>
          <div
            className={classNames(
              " text-[12px] leading-[29px] text-[#666666] md:text-[20px]"
            )}
          >
            {companyInfo[currentIndex].address}
          </div>
        </div>
      </div>
    </div>
  );

  const mobileMap = (
    <div
      className={classNames(
        "relative col-start-1 col-end-25 pt-[56px]",
        styles["accordion-collapse"]
      )}
    >
      {countries.map((value, index) => (
        <div
          key={`country-${index}`}
          onClick={() => arrowClick(index)}
          className={classNames(styles.accordion, {
            [styles.accordionOpen]: index === activeMobileIndex,
          })}
        >
          <Image className={classNames("w-full")} alt="" src={value.mapBgm} />
          <div
            className={classNames(
              "absolute left-[32px] top-[16px] flex w-full flex-col gap-[12px]"
            )}
          >
            <span
              className={classNames("text-[30px] font-[600] leading-[36px]")}
            >
              {companyInfo[index].country}
            </span>
            <span
              className={classNames(
                "inline-block w-[72%] text-[22px] font-[500] leading-[32px] text-[#333]"
              )}
            >
              {companyInfo[index].address}
            </span>
          </div>
          <div className={classNames(styles.arrow, "")}>
            {" "}
            <Image alt="" src={arrow} />
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <section className={classNames(" bg-[#fff] ")}>
      <div className={classNames("ebuy-container pt-[72px]")}>
        <div className={classNames("col-start-1 col-end-25")}>
          <div
            ref={locationRef1}
            className={classNames(
              "px-[32px] pb-[32px] text-center text-[42px] font-bold leading-[51px] text-[#000] opacity-0 md:text-center ",
              { location1: titleInView1 }
            )}
          >
            {t("location-1-title")}
          </div>
          <div
            ref={locationRef2}
            className={classNames(
              "box-border text-center text-[22px] font-[400] leading-[44px] text-[#333] opacity-0 md:text-center",
              { location2: titleInView1 }
            )}
          >
            {t("location-1-description")}
          </div>
        </div>

        {/* 公司 + 地图 栅格布局 */}
        {!md ? deskMap : mobileMap}
      </div>
    </section>
  );
});
