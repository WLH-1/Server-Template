import { useI18n, useResponsive } from "@/hooks";
import classNames from "classnames";
import Image from "next/image";
import one from "./images/1.png";
import three from "./images/3.png";
import four from "./images/4.png";
import five from "./images/5.png";
import style from "./style.module.scss";
export const Env = () => {
  const t = useI18n("about");
  const { md } = useResponsive();
  return (
    <section
      className={classNames(
        "ebuy-container text-42px py-[72px] pb-0  font-[600] leading-[51px]"
      )}
    >
      <div
        className={classNames(
          "col-start-1 col-end-25 md:pb-[72px] pb-[56px] text-center text-[42px] font-[700] leading-[51px]"
        )}
      >
        {t("environment-title")}
      </div>
      {/* 第一层 */}
      <div
        className={classNames(
          "col-start-1 col-end-25 ",
          !md ? style.container : style.phoneContainer
        )}
      >
        <div className={classNames(style.box)}>
          <Image className={classNames(style.scale)} alt="" src={one} />
        </div>

        <div className={classNames(style.box)}>
          <div
            className={classNames(
              style.emptyBox,
              "flex h-full w-full flex-col justify-center pl-10"
            )}
          >
            <span
              className={classNames(" text-[48px] leading-[67px] text-white ")}
            >
              发展
            </span>
            <span
              className={classNames(
                "pt-[7px] text-[36px] leading-[44px] text-white md:text-[36px]"
              )}
            >
              development
            </span>
          </div>
        </div>
        <div className={classNames(style.box)}>
          <Image className={classNames(style.scale)} alt="" src={three} />
        </div>
        <div className={classNames(style.box)}>
          <Image className={classNames(style.scale)} alt="" src={four} />
        </div>
        <div className={classNames(style.box)}>
          <Image className={classNames(style.scale)} alt="" src={five} />
        </div>
        <div className={classNames(style.box)}>
          <div
            className={classNames(
              style.emptyBox,
              "flex h-full  w-full flex-col justify-center pl-10"
            )}
          >
            <span
              className={classNames("text-[48px] leading-[67px] text-white ")}
            >
              创造
            </span>
            <span
              className={classNames(
                "pt-[7px] text-[36px] leading-[44px] text-white"
              )}
            >
              create
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
