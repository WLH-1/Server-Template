import { useI18n, useResponsive } from "@/hooks";
import classNames from "classnames";
import styles from "./style.module.scss";
export const Mission = () => {
  const { md } = useResponsive();
  const t = useI18n("about");
  return (
    <section className={classNames(" w-full bg-cover", !md?styles.bg:styles.bg_m)}>
      <div
        className={classNames(
          "ebuy-container min-h-[680px]  w-full"
        )}
      >
        <div
          className={classNames(
            "col-start-1 col-end-25 flex items-center justify-center  "
          )}
        >
          <div
            className={classNames(
              "my-[40px] flex  flex-col justify-between rounded-lg bg-[rgba(255,255,255,0.84)] px-[43px] py-[40px] md:py-[72px] md:my-[unset] md:w-[1068px] md:h-[537px] md:justify-center"
            )}
          >
            <div className={classNames("flex flex-col items-center")}>
              <div
                className={classNames("text-[42px] font-[600] leading-[51px]")}
              >
                {t("mission-title")}
              </div>
              <div
                className={classNames(
                  "md:w-[87%] pt-[32px] text-center text-[26px] leading-[44px] text-[#333] md:text-[20px] md:leading-[31px]"
                )}
              >
                {t("mission-text")}
              </div>
            </div>
            <div className={classNames("flex flex-col items-center pt-[40px]")}>
              <div
                className={classNames("text-[42px] font-[600] leading-[51px]")}
              >
                {t("vision-title")}
              </div>
              <div
                className={classNames(
                  " md:w-[92%] pt-[32px] text-center text-[26px] leading-[44px] text-[#333] md:text-[20px] md:leading-[31px]"
                )}
              >
                {t("vision-text")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
