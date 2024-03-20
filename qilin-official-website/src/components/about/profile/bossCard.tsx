import { useI18n, windowSizeRange, useResponsive, useInView } from "@/hooks";
import classNames from "classnames";
import Image from "next/image";
import boss from "./images/boss.png";
import bossStyle from "./boss.module.scss"
import { useI18nContext } from "@/states";
import useScrollAnimation from '@/hooks/useScrollAnimation';
import useScrollDirection from '@/hooks/useScrollDirection';

export const BossCard = () => {
  const t = useI18n("about");
  const { md } = useResponsive();
  const lang = useI18nContext().lang;
  const windowWidth = windowSizeRange()
  const windowSize = windowWidth > 768

  const langChangeView = () => {
    if (windowSize) {
      if (!md) {
        if (lang === 'en') {
          return (
            <div className={classNames(bossStyle.boss_content)}>
              <div className={classNames(bossStyle.boss_name, {
              })}>
                {t("boss-name")}
              </div>
              <div className={classNames(bossStyle.boss_profile1, {
                ['mt-[30px]']: windowWidth > 768 && windowWidth <= 1024

              })}>
                {t("boss-profile-1")}
              </div>
              <div className={classNames(bossStyle.boss_profile2)}>
                {t("boss-profile-2")}
              </div>
            </div>
          )
        } else if (lang === 'zh-CN') {
          return (
            <div className={classNames(bossStyle.boss_content_zh)}>
              <div className={classNames(bossStyle.boss_name)}>
                {t("boss-name")}
              </div>
              <div className={classNames(bossStyle.boss_profile_zh)}>
                <p>{t("boss-profile-1")}</p>
                <p>{t("boss-profile-2")}</p>
              </div>
            </div>
          )
        }
      }
    } else {
      return (
        <div className={classNames(bossStyle.boss_content)}>
          <div className={classNames(bossStyle.boss_name)}>
            {t("boss-name")}
          </div>
          <div className={classNames(bossStyle.boss_profile1)}>
            {t("boss-profile-1")}
          </div>
          <div className={classNames(bossStyle.boss_profile2, {
          })}>
            {t("boss-profile-2")}
          </div>
        </div>
      )
    }
  }

  const scrollDirection = useScrollDirection();
  const animate = () => {
    // 检查窗口滚动方向
    if (scrollDirection.isScrollUp) {
      return useScrollAnimation("bottom", 50, 0.6);
    } else {
      return useScrollAnimation("bottom", -50, 0.6)
    };
  };


  return (
    <div ref={animate()} className={classNames(bossStyle.boss_container)}>
      {/* 左侧图片 */}
      <div className={classNames(bossStyle.boss_img_container)}>
        <Image className={classNames(bossStyle.boss_img)}
          src={boss}
          alt=""
        />
      </div>{langChangeView()}</div>
  );
};
