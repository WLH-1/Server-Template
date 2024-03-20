import { useI18n, useResponsive } from "@/hooks";
import classNames from "classnames";
import { memo } from "react";
import { PropertyCardLeft } from "./PropertiCardLeft";
import { PropertyCardRight } from "./PropertiCardRight";
import { BossCard } from "./bossCard";
import d1 from "./images/1-1.png";
import style from "./style.module.scss";


import d2 from "./images/2-1.png";
import d4 from "./images/4-1.png";
import d5 from "./images/5-1.png";
import d6 from "./images/6-1.png";
import d3 from "./images/m3-1.png";

import m11 from "./images/m1-1.png";
import m12 from "./images/m1-2.png";
import m21 from "./images/m2-1.png";
import m31 from "./images/m3-1.png";
import m41 from "./images/m4-1.png";
import m51 from "./images/m5-1.png";
import m61 from "./images/m6-1.png";
export const Profile = memo(() => {
  const images = [
    { m: [m11, m12], d: [d1] },
    { m: [m21], d: [d2] },
    { m: [m31], d: [d3] },
    { m: [m41], d: [d4] },
    { m: [m51], d: [d5] },
    { m: [m61], d: [d6] },
  ];
  const { md } = useResponsive();
  const t = useI18n("about");
  const descDatas: Array<{
    title: string;
    text: string;
    img: any;
    text2: string;
  }> = [];

  for (let i = 0; i < 6; i++) {
    descDatas.push({
      title: t(`profile-${i + 1}-title` as any),
      text: t(`profile-${i + 1}-text` as any),
      text2: t(`profile-${i + 1}-text2` as any),
      img: images[i],
    });
  }

  return (
    <section
      className={classNames("py-[72px]", {
        [style.deskBg]: !md,

      })}
    >
      {/* 老板介绍 */}
      <div
        className={classNames("ebuy-container w-full", {
          [style.mobileBg1]: md,
        })}
      >
        <BossCard />
      </div>
      <div
        className={classNames("ebuy-container w-full bg-[#f5f5f5] md:bg-[unset]")}>
        <PropertyCardLeft  
          descData={descDatas[0]}
          type={"left1"}
          width={"w-[410px]"} 
        />
      </div>
      <div
        className={classNames("ebuy-container w-full  ", {
          [style.mobileBg2]: md,
        })}
      >
        <PropertyCardRight
          descData={descDatas[1]}
          type={"right1"}
          width={"w-[456px] md:w-[340px]"}
        />
      </div>
      <div
        className={classNames(
          "ebuy-container w-full bg-[#f5f5f5] md:bg-white  "
        )}
      >
        <PropertyCardLeft
          descData={descDatas[2]}
          type={"left2"}
          width={"w-full md:w-[415px]"}
        />
      </div>
      <div className={classNames("ebuy-container w-full   ")}>
        <PropertyCardRight
          descData={descDatas[3]}
          type={"right2"}
          width={"w-full md:w-[340px]"}
        />
      </div>
      <div
        className={classNames(
          "ebuy-container w-full bg-[#f5f5f5] md:bg-white  "
        )}
      >
        <PropertyCardLeft
          descData={descDatas[4]}
          type={"left3"}
          width={"w-full md:w-[340px]"}
        />
      </div>
      <div className={classNames("ebuy-container w-full   ")}>
        <PropertyCardRight
         type={"right3"}
          descData={descDatas[5]}
          width={"w-[410px] md:w-[393px]"}
        />
      </div>
    </section>
  );
});
