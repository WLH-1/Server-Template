import { useResponsive, windowSizeRange, useInView } from "@/hooks";
import classNames from "classnames";
import Image from "next/image";
import leftStyle from "./leftStyle.module.scss";
import { useI18nContext } from "@/states";
import useScrollAnimation from '@/hooks/useScrollAnimation';
import useScrollDirection from '@/hooks/useScrollDirection';

export const PropertyCardLeft = (props: {
  descData: {
    title: string;
    text: string;
    img: { m: Array<any>; d: Array<any> };
    text2: string;
  };
  width?: string;
  type?: any
}) => {
  const { md } = useResponsive();
  const { descData, width, type } = props;

  const windowSize = windowSizeRange()
  const middleWindow = windowSize > 768 && windowSize <= 1024.9
  const showImg1 = () => {
    if (!md) {
      if (middleWindow) {
        return descData.img.m[0]
      } else {
        return descData.img.d[0]
      }
    } else {
      return descData.img.m[0]
    }
  }
  const showImg2 = (num: number) => {
    if (!md) {
      if (middleWindow) {
        return descData.img.m[num]
      } else {
        return descData.img.d[num]
      }
    } else {
      return descData.img.m[num]
    }
  }

  const images = (
    <div className={classNames(leftStyle.left_images_contanier)}>
      <Image
        className={classNames(leftStyle.left_img1, width, {
          ["!w-[327px] !h-[327px] mr-[32px]"]: windowSize <= 768 && type === 'left1'
        })}
        // src={md ? descData.img.m[0] : descData.img.d[0]}
        src={showImg2(0)}
        alt=""
      />
      <Image
        className={classNames(leftStyle.left_img2, width, {
          ["!w-[327px] !h-[327px]"]: windowSize <= 768 && type === 'left1',
        })}
        src={showImg2(1)}
        alt=""
      />
    </div>
  );

  const image = (
    <div
      className={classNames(leftStyle.left_img_contanier, {
        ["md:!pl-0"]: middleWindow && type
      })}>
      <Image
        className={classNames(leftStyle.left_img, width, {
          // ["md:!w-full"]:middleWindow&&type==='left3'||type==='left2',
          ["md:!w-[394px]"]: type === 'left3',
          ["md:!w-[415px]"]: middleWindow && type === 'left2',
        })}
        // src={md ? descData.img.m[0] : descData.img.d[0]}
        src={showImg1()}
        alt=""
      />
    </div>
  );

  const nowImg = () => {
    if (!md) {
      if (descData.img.m.length == 2) {
        if (middleWindow) {
          return images
        }
        return images
      } else {
        return image
      }
    } else {
      return images
    }
  }

  const lang = useI18nContext().lang;
  const windowNow = windowSize > 768
  const langChangeView = () => {
    if (windowNow) {
      if (!md) {
        if (lang === 'en') {
          return (
            <div className={classNames(leftStyle.left_content, {
              ['mt-[30px]']: middleWindow && type === 'left1'
            })}>

              <div className={classNames(leftStyle.left_title, {
                ["mb-[30px]"]: middleWindow && type === 'left3',
              })}>
                {descData.title}
              </div>

              <div className={classNames(leftStyle.left_text, {
                ["!mb-[36px] !mt-[35px]"]: middleWindow && type === 'left2',
                ["!mb-[22px]"]: middleWindow && type === 'left3',
                ["!mt-[-48px]"]: middleWindow && type == 'left1',

              })}>
                {descData.text}
              </div>

              <div className={classNames(leftStyle.left_text2, {
                ["translate-y-[-30px]"]: middleWindow && type == 'left1',
              })}>
                {descData.text2}
              </div>
            </div>
          )
        } else if (lang === 'zh-CN') {
          return (
            <div className={classNames(leftStyle.left_content, {
              ['mt-[30px]']: middleWindow && type === 'left1'
            })}>

              {/* 标题 */}
              <div className={classNames(leftStyle.left_title, {
                ["mb-[30px]"]: middleWindow && type === 'left3' && !(windowSize > 768 && windowSize <= 1024),
                ["mb-[16px]"]: type === 'left1',
                ["mb-[-12px]"]: (type === 'left2' || type === 'left3'),
                ["!mb-[12px] !mt-[12px]"]: middleWindow && type == 'left1',
              })}>
                {descData.title}
              </div>

              {/* text内容 */}
              <div className={classNames(leftStyle.left_content_zh, {
                ["mt-[30px]"]: windowNow && (type === 'left2' || type === 'left3') && !(windowSize > 768 && windowSize <= 1024),
                ['!mb-[100px]']: (windowSize > 768 && windowSize <= 1024) && type === 'left1',
                ['!mb-[40px]']: (windowSize > 768 && windowSize <= 1024) && type === 'left2' || type === 'left3',

              })}>
                <p className={classNames(leftStyle.left_text, {
                  ['mb-[30px]']: windowNow && (type === 'left2' || type === 'left3'),
                })}>
                  {descData.text}
                </p>

                <p className={classNames(leftStyle.left_text2)}>
                  {descData.text2}
                </p>
              </div>
            </div>
          )
        }
      }
    } else {
      return (
        <div className={classNames(leftStyle.left_content, {
          ['mt-[30px]']: middleWindow && type === 'left1'
        })}>

          {/* 标题 */}
          <div className={classNames(leftStyle.left_title, {
            ["mb-[30px]"]: middleWindow && type === 'left3'
          })}>
            {descData.title}
          </div>

          {/* text内容 */}
          <div className={classNames(leftStyle.left_text, {
            ["!mb-[36px] !mt-[35px]"]: middleWindow && type === 'left2',
            ["!mb-[22px]"]: middleWindow && type === 'left3'
          })}>
            {descData.text}
          </div>

          <div className={classNames(leftStyle.left_text2)}>
            {descData.text2}
          </div>
        </div>
      )
    }
  }

  // const [leftionRef, leftInView] = useInView({ type: "context" }); 
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
    <div ref={animate()} className={classNames(leftStyle.left_contanier, {
      ["!pb-[0px]"]: middleWindow && type === 'left1' && (windowSize > 768 && windowSize <= 1024) && lang === 'zh-CN',
      ["!pb-[55px]"]: middleWindow && (type === 'left2' || type === 'left3') && (windowSize > 768 && windowSize <= 1024),
    })}>
      {/* 左侧文字 */}
      {langChangeView()}
      {/* 右侧图片 */}
      {nowImg()}
    </div>
  );
};
