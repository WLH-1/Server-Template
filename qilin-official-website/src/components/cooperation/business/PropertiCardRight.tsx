import { useI18n, useResponsive, windowSizeRange, useInView } from "@/hooks";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.scss";
import rightStyle from "./right.module.scss";
import { useI18nContext } from "@/states";
import { useEffect, useRef, useState } from "react";
import useScrollAnimation from '@/hooks/useScrollAnimation';
import useScrollDirection from '@/hooks/useScrollDirection'

export const PropertyCardRight = (props: {
  descData: Array<{
    title?: string;
    text: string;
    img: any;
    text2?: string;
    text3?: string;
    button: string;
  }>;
  width?: string;
  type?: any;
}) => {
  const { lang } = useI18nContext()
  const { md } = useResponsive();
  const { descData, width, type } = props;
  const windowWidth = windowSizeRange();
  const windowSize = windowWidth <= 1024.9 && windowWidth >= 769
  const t = useI18n("cooperation");

  // 图片渲染
  const isMd = (num: number) => {
    if (md) {
      return descData[num].img.m[0]
    } else {
      return descData[num].img.d[0]
    }
  }
  const nowPic = (type: any) => {
    if (type === 'right1') {
      return isMd(0)
    } else if (type === 'right2') {
      return isMd(1)
    } else if (type === 'right3') {
      return isMd(3)
    }
  }

  // title渲染
  const nowTitle = (type: any) => {
    if (type === 'right1') {
      return descData[0].title
    } else if (type === 'right2') {
      return descData[1].title
    } else if (type === 'right3') {
      return descData[3].title
    }
  }

  // text2渲染
  const nowText2 = (type: any) => {
    if (type === 'right1') {
      return descData[0].text2
    } else if (type === 'right2') {
      return descData[1].text2
    } else if (type === 'right3') {
      return descData[3].text2
    }
  }
  // text渲染
  const nowText = (type: any) => {
    if (type === 'right1') {
      return descData[0].text
    } else if (type === 'right2') {
      return descData[1].text
    } else if (type === 'right3') {
      return descData[3].text
    }
  }
  // text3渲染
  const nowText3 = (type: any) => {
    if (type === 'right1') {
      return descData[0].text3
    } else if (type === 'right2') {
      return descData[1].text3
    } else if (type === 'right3') {
      return descData[3].text3
    }
  }

  // 按钮渲染
  const nowBtn = (type: any) => {
    switch (type) {
      case 'right1':
        return descData[0].button
        break;
      case 'right2':
        return descData[1].button;
        break;
      case 'right3':
        return descData[3].button;
        break;
    }
  }

  const nowImg = (type: any) => {
    if (type === 'right1') {
      if (!md) {
        if (windowSize) {
          return descData[0].img.m[0]
        } else {
          return nowPic(type)
        }
      } else {
        return nowPic(type)
      }
    } else if (type === 'right2') {
      if (!md) {
        if (windowSize) {
          return descData[1].img.m[0]
        } else {
          return nowPic(type)
        }
      } else {
        return nowPic(type)
      }
    } else if (type === 'right3') {
      if (!md) {
        if (windowSize) {
          return descData[3].img.m[0]
        } else {
          return nowPic(type)
        }
      } else {
        return nowPic(type)
      }
    }
  }

  const style = () => {
    if (type === 'right1') {
      return rightStyle.right_contanier1
    } else if (type === 'right2') {
      return rightStyle.right_contanier2
    } else if (type === 'right3') {
      return rightStyle.right_contanier3
    }
  }
  const scrollDirection = useScrollDirection();
  const animate = () => {
    if (windowWidth > 1024) {
      return useScrollAnimation("bottom", -50, 0.6);

    } else {
      // 检查窗口滚动方向
      if (scrollDirection.isScrollUp) {
        return useScrollAnimation("bottom", 50, 0.6);
      } else {
        return useScrollAnimation("bottom", -50, 0.6)
      };
    }
  };

  return (
    <section ref={animate()} className={classNames(style(), {
      ["md:py-[72px]"]: type === 'right2',
      ["md:pt-[72px] md:pb-[72px]"]: type === 'right3',
    }
    )}
    >

      {/* 左侧图片 */}
      <div className={classNames(rightStyle.right_imgContanier, {
        ["md:flex md:flex-col-reverse md:relative"]: windowSize && type === 'right1'
      })}>

        {/* 标题 */}
        {windowSize && type === 'right1' ?
          <div className={classNames('w-full flex justify-center relative', {
          })}>
            <span className={classNames(styles.title, 'absolute', {
              ["md:mt-[28px] "]: windowSize && type === 'right1'
            })}>{t('title1')}</span>
          </div>
          : null}
        <div className={classNames({
          ["md:relative md:w-full"]: type === "right1" && !windowSize,
        })}>
          {type === 'right1' && !windowSize ? <div className={classNames(rightStyle.right_shadow)}></div> : null}
          <Image
            className={classNames(type === 'right1' ? rightStyle.right_img1 : rightStyle.right_img, width, {
              ["md:!w-[364px] md:!h-[306px] md:z-20 md:absolute md:top-[-160px]"]: type === "right1" && !windowSize,
              ["md:!w-[461px] md:!shrink-0"]: type === "right2" && !windowSize,
              ["md:!w-[428px]"]: type === "right3" && !windowSize,
              ["md:!w-full"]: windowSize && type,
            })}
            src={nowImg(type)}
            alt=""
          />
        </div>
      </div>
      {/* 右侧文字 */}
      <div
        className={classNames('md:!items-start', type === 'right2' ? styles.right_content2 : styles.right_content1,
          {
            ["md:!items-start md:ml-[54px] md:text-start"]: type === 'right1',
            ["md:!text-center"]: windowSize && type === 'right1',
            ["md:!translate-y-[-11%]"]: type === 'right1',
            ["md:!w-[55%]"]: !windowSize && type === 'right2',
            ["md:!w-[52%]"]: !windowSize && type === 'right3',
            ["md:pl-[110px]"]: type === 'right3',
            ["md:!w-full md:!ml-0 md:!pl-0"]: windowSize && type,
            ["md:!pb-0"]: windowSize && type,
            ["!ml-0 !pl-0"]: windowWidth <= 768 && type
          }
        )}
      >
        <div
          className={classNames(
            "text-[42px] font-[700] leading-[51px] text-[#333] mb-[32px] md:mb-0",
            {
              ["hidden"]: !nowTitle(type),
              ["ml-[34px] md:!pt-0"]: type === 'right2',
              ["md:mt-[31px]"]: windowSize && type === 'right3',
              ["md:!mt-[31px]"]: windowSize && type === 'right2',
              ["!mb-[32px]"]: type === 'right2' && lang === 'zh-CN' && windowWidth <= 768,
            }
          )}
        >
          {nowTitle(type)}
        </div>
        <div className={classNames({
          ["md:!h-[100%] md:flex md:flex-col md:justify-start"]: type === 'right2',
        })}>
          <div
            className={classNames(styles.right2_text,
              {
                ["mt-[84px] !mb-[10px]"]: type === 'right1',
                ["!mb-0"]: type === 'right2' && lang === 'zh-CN' && windowWidth <= 768,
                ["md:!mt-[30px] md:!mb-0"]: type === 'right2',
                ["md:!mt-[44px] md:pb-[40px]"]: type === 'right3',
                ["md:!w-full md:!mt-[22px]  md:!leading-[44px] md:!pb-0 md:!mb-[72px]"]: windowSize && type === 'right3',
                ["md:!w-full md:!pb-0 "]: windowSize && type === 'right2',
                ["md:!mt-0"]: windowSize && type === 'right1',
                ["!mt-[40px]"]: lang === 'zh-CN' && windowWidth <= 768 && type === 'right1'

              }
            )}
          >
            {/* 第一行 */}
            {nowText(type)}
          </div>
          <div
            className={classNames(styles.right2_text2,
              {
                ["hidden"]: !nowText2(type),
                ["md:!mb-[120px]"]: type === 'right1',
                ["md:!mt-[12px] md:!mb-0"]: type === 'right2',
                ["md:!mb-[72px]"]: windowSize && type === 'right1',
                ["!my-[32px]"]: type === 'right2' && lang === 'zh-CN' && windowWidth <= 768,
                // ["!my-[32px]"]:type==='right2'&&lang==='zh-CN'&&windowWidth>768,

              }
            )}
          >
            {/* 第2行 */}

            {nowText2(type)}
          </div>

          <div
            className={classNames(
              "text-[26px] leading-[44px] text-[#333]  md:text-[20px] md:leading-[31px] mb-[72px]",
              {
                ["hidden"]: !nowText3(type),
                ["md:!mt-[30px] md:!mb-[84px]"]: type === 'right2',

              }
            )}
          >
            {/* 第3行 */}
            {nowText3(type)}
          </div>
        </div>
        {/* 按钮 */}
        <Link href='#message' className={classNames("mb-[84px] md:mb-0 btn", {
          ["md:w-full md:mb-[30px]"]: windowSize && type === 'right1',
        })}>
          <span
            className={classNames(
              "md:bg-[#f5f5f5] md:px-[44px] px-[29px] py-[12px] rounded-md md:text-[20px] text-[28px] leading-[24px] text-[#ED3838] bg-white",
              {
                [" !bg-[#F5F5F5]"]: type === 'right1',
                ["hover:!bg-[#ED3838] hover:!text-white"]: type,
                ["md:ml-[30px]"]: type === 'right2',
              }
            )}
          >
            {nowBtn(type)}
          </span>
        </Link>
      </div>
    </section>
  );
};
