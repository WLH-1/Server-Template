import { Link } from "@/components/link";
import { useI18n, useInView, useResponsive, useWindowSize } from "@/hooks";
import Image from "next/image";
import arrow from "./images/arrow-right.png";

import classNames from "classnames";
import { useRouter } from "next/router";
import { memo, useMemo } from "react";
import { Mouse } from "./Mouse";
import styles from "./styles.module.scss";
const ratio = 8 / 5;
export const Banner = memo(() => {
  const t = useI18n("home");

  const router = useRouter();

  const { sm } = useResponsive();

  // 处理banner高度
  const windowSize = useWindowSize();
  const bannerOverflow = useMemo(
    () => windowSize && windowSize.width / ratio > windowSize.height,
    [windowSize]
  );

  const [slogan1Ref, slogan1InView] = useInView();
  const [slogan2Ref, slogan2InView] = useInView();
  const [beOurCustomerRef, beOurCustomerInView] = useInView();

  return (
    <section
      // style={!bannerOverflow ? { aspectRatio: ratio } : { height: "100vh" }}
      className={classNames(
        styles.banner,
        "relative -mt-[92px]  w-full  bg-cover bg-bottom pt-[70px]  lg:-mt-[114px]"
      )}
    >
      <div
        className={classNames(
          "ebuy-container !flex h-full flex-col items-center justify-center text-white"
        )}
      >
        <div
          className={classNames(
            "flex translate-y-[-50%] flex-col  items-center justify-center text-white md:translate-y-[0%]"
          )}
        >
          <div
            ref={slogan1Ref}
            className={classNames(
              "mb-[22px] whitespace-pre-wrap  text-center text-[44px]  font-[800] leading-[56px] first-letter:mb-[9px]  md:text-[40px] ",
              {
                head1: slogan1InView,
              }
            )}
          >
            {t("slogan-1")}
            <div
              className={classNames(
                " mx-auto mt-[15px] h-[2px] w-[70%] bg-white"
              )}
            ></div>
          </div>
          <span
            ref={slogan2Ref}
            className={classNames(
              "mb-[56px] whitespace-pre-wrap text-center text-[32px] font-[400] leading-[45px] md:text-[36px]  md:leading-[44px]",
              {
                head2: slogan2InView,
              }
            )}
          >
            {t("slogan-2")}
          </span>
          <div
            ref={beOurCustomerRef}
            className={classNames({
              head3: beOurCustomerInView,
            })}
          >
            <Link
              className={classNames(
                "flex items-center rounded-[8px]  border-[1px] border-solid border-white px-[20px] py-[8px] text-[28px] font-[400] leading-[40px] md:px-[27px] md:py-[13px] md:text-[22px] md:font-bold md:leading-[26px]"
              )}
              href="#message"
            >
              <span> {t("be-our-customer")}</span>
              <Image
                className={classNames("h-6  w-8 pl-2")}
                alt=""
                src={arrow}
              />
            </Link>
          </div>
        </div>
      </div>

      <div
        className={classNames(
          " absolute left-[50%] top-[82%] translate-x-[-50%]"
        )}
      >
        <Mouse />
      </div>
    </section>
  );
});
