import { useResponsive,windowSizeRange,useInView } from "@/hooks";
import classNames from "classnames";
import Image from "next/image";
import rightStyle from "./rightStyle.module.scss";
import { useI18nContext } from "@/states";
import useScrollAnimation from '@/hooks/useScrollAnimation';
import useScrollDirection from '@/hooks/useScrollDirection';

export const PropertyCardRight = (props: {
  descData: {
    title: string;
    text: string;
    img: { m: Array<any>; d: Array<any> };
    text2: string;
  };
  width?: string;
  type?:any;
}) => {
  const { md } = useResponsive();
  const lang = useI18nContext().lang;
  const { descData, width ,type} = props;
  const images = (
    <div
      className={classNames(rightStyle.right_images_contanier)}
    >
      <Image
        className={classNames(rightStyle.right_img1,width)}
        src={md ? descData.img.m[0] : descData.img.d[0]}
        alt=""
      />
      <Image
        className={classNames(rightStyle.right_img2, width)}
        src={md ? descData.img.m[1] : descData.img.d[1]}
        alt=""
      />
    </div>
  );

  const windowSize=windowSizeRange()
  const middleWindow=windowSize>=768.9&&windowSize<=1024.9
  const showImg=()=>{
    if(!md){
      if(middleWindow){
        return descData.img.m[0] 
      }else{
        return descData.img.d[0] 
      }
    }else{
      return descData.img.m[0] 
    }
  }
  
  const image = (
    <div className={classNames(rightStyle.right_img_contanier,{
      ["md:!translate-y-[-72px]"]:middleWindow&&type==='right3'&&(windowSize>768&&windowSize<=1024)&&lang==='zh-CN'
    })}>
      <Image
        className={classNames("h-auto  md:w-[340px]", width,{
          ["md:!w-[455px]"]:middleWindow&&type==='right1',
          ["md:!w-full"]:middleWindow&&type==='right2',
          ["md:!w-[410px]"]:middleWindow&&type==='right3'
        })}
        // src={md ? descData.img.m[0] : descData.img.d[0]}
        src={showImg()}
        alt=""
      />
    </div>
  );
  

  const windowNow=windowSize>768
  const langChangeView=()=>{
    if(windowNow){
      if(!md){
        if(lang==='en'){
          return (
            <div className={classNames(rightStyle.right_content,{
              ['mb-[72px]']:middleWindow&&type==='right2'||type==='right1',
            })}>
                <div className={classNames(rightStyle.right_title)}>
                  {descData.title}
                </div>
      
                <div className={classNames(rightStyle.right_text)}>
                  {descData.text}
                </div>
      
                <div className={classNames(rightStyle.right_text2)}>
                  {descData.text2}
                </div>
            </div>
          )
        }else if(lang==='zh-CN'){
          return (
            <div className={classNames(rightStyle.right_content,{
              ['mb-[72px]']:middleWindow&&type==='right2'||type==='right1',
              // ['mt-[-20px]']:lang==='zh-CN'&&type==='right2'
            })}>
                <div className={classNames(rightStyle.right_title,'mb-[16px]',{
              ['!mt-[30px]']:windowSize>=1528&&(type==='right2'||type==='right1'),
              ['!mt-[16px]']:(windowSize>768&&windowSize<=1024)&&type==='right2',
              ['!mb-[16px]']:type==='right2'&&(windowSize>=1025&&windowSize<=1452),
              ['!mb-[0px]']:type&&windowSize>1452

                })}>
                  {descData.title}
                </div>
      
               <div className={classNames(rightStyle.right_content_zh,{
                ['!pb-[60px]']:windowNow&&type==='right3',
                ['!mb-[20px]']:(windowSize>768&&windowSize<=1024)&&type,
                
               })}>
                  <p className={classNames(rightStyle.right_text)}>
                    {descData.text}
                  </p>
                  <p className={classNames(rightStyle.right_text2)}>
                    {descData.text2}
                  </p>
               </div>
            </div>
          )
        }
      }
    }else{
      return(
        <div className={classNames(rightStyle.right_content,{
          ['mb-[72px]']:middleWindow&&type==='right2'||type==='right1',
        })}>
            <div className={classNames(rightStyle.right_title,{
            })}>
              {descData.title}
            </div>
  
            <div className={classNames(rightStyle.right_text)}>
              {descData.text}
            </div>
  
            <div className={classNames(rightStyle.right_text2)}>
              {descData.text2}
            </div>
        </div>
      )
    }
  }

  // const [rightionRef, rightInView] = useInView({ type: "context" }); 
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
    <div ref={animate()} className={classNames(rightStyle.right_contanier,{
      ["translate-y-[72px]"]:middleWindow&&type==='right3'&&(windowSize>768&&windowSize<=1024)&&lang==='zh-CN'
    })}>
      {/* 左侧图片 */}
      {md && descData.img.m.length == 2 ? images : image}

      {/* 右侧文字 */}
      {langChangeView()}

    </div>
  );
};
