import { useResponsive ,windowSizeRange,useInView} from "@/hooks";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import leftStyle from './left.module.scss';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import useScrollDirection from '@/hooks/useScrollDirection';

export const PropertyCardLeft = (props: {
  descData:  Array<{
    title?: string;
    text: string;
    img: any;
    text2?: string;
    text3?: string;
    button: string;
  }> ;
  width?: string;
  type?:any;
}) => {
  const { md } = useResponsive();
  const { descData, width ,type} = props;
  const windowWidth=windowSizeRange();
  const windowSize=windowWidth<=1024.9&&windowWidth>=768
  const window=windowWidth>1454
  const middleWindow=windowWidth>=1025&&windowWidth<=1057
  const nowImg=(type:any)=>{
    if(type==='left1'){
      if(!md){
        if(windowSize){
          return descData[2].img.m[0]
        }else{
          return descData[2].img.d[0]
        }
      }else{
        return descData[2].img.d[0]
      }
    }
  }

  const titledom = <div className={classNames()}>{descData[2].title}</div>;

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
    <div ref={animate()}
      className={classNames(leftStyle.left_contanier,{
        ["!items-start"]:windowWidth<=768&&type
      })}
    >
      {/* 左侧 */}
      <div
        className={classNames(leftStyle.left_content,
          {
          ["md:w-[43%]"]:window
        }
        )}
      >
        <div
          className={classNames(leftStyle.left_title,
            {
              ["hidden"]: !descData[2].title,
              ["md:mb-[45px]"]:type==='left1',
            }
          )}
        >
          {descData[2].title}
        </div>
        <div className={classNames(leftStyle.left_text)}>
          {/* 文本 */}
          <div
            className={classNames(
              " md:py-[32px] pt-[32px] text-[26px] leading-[44px] text-[#333]  md:pb-[16px] md:pt-[8px] md:text-[20px] md:leading-[31px] md:h-[31px]"
            )}
          >
            {descData[2].text}
          </div>
          <div
            className={classNames(
              "text-[26px] leading-[44px]  text-[#333]  md:text-[20px] md:leading-[31px]",
              {
                ["hidden"]: !descData[2].text2,
                ["mt-[28px]"]:type==='left1',
                ["md:pt-[28px]"]:middleWindow
              }
            )}
          >
            {descData[2].text2}
          </div>
        </div>
        {/* 按钮 */}
        <Link href='#message'>
          <span className={classNames(leftStyle.left_btn)}>
            {descData[2].button}
          </span>
        </Link>
      </div>
      {/* 右侧图片 */}
      <div
        className={classNames(leftStyle.left_imgContanier,{
          ["md:w-[475px]"]:type==='left1',
          ["md:!w-full"]:windowSize&&type
        })}
      >
        <Image
          className={classNames("h-auto md:w-[340px]", width,{
            ["md:!w-full"]:windowSize&&type,
            ["md:pl-0"]:window&&type
          })}
          src={nowImg(type)}
          alt=""
        />
      </div>
    </div>
  );
};
