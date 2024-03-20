import { useI18n, useResponsive,useInView, useWindowSize } from "@/hooks";
import classNames from "classnames";
import { memo, useMemo , useRef,useEffect,useState} from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import { useScroll } from "ahooks";

const ratio = 8 / 5;
export const Banner = memo(() => {
  const t = useI18n("about");
  const {md}=useResponsive()
  const router = useRouter();

  // 处理banner高度
  const windowSize = useWindowSize();
  const bannerOverflow = useMemo(
    () => windowSize && windowSize.width / ratio > windowSize.height,
    [windowSize]
  );

  const [slogan1Ref, slogan1InView] = useInView();
  const [slogan2Ref, slogan2InView] = useInView();

   /* start 文字随滚动条渐淡移动 */
  //获取banner元素节点
  const bgRef=useRef<HTMLElement>(null)
  const [opacityValue,setOpacityValue]=useState(1)
  const [distance,setDistance]=useState(0)
  
  // 监听滚动
  const scroll = useScroll();
  useEffect(() => {
    const totalDistance:any=bgRef.current?.getBoundingClientRect().height;
    const nowDistance=totalDistance+114 
    if(window.scrollY>nowDistance) setOpacityValue(0)
    else{
      setOpacityValue(1-(window.scrollY/nowDistance/2))
    }
    setDistance(window.scrollY*0.4)
  }, [scroll]);
  /* end 文字随滚动条渐淡移动 */

  return (
    <section ref={bgRef} className={classNames(!md?styles.banner_pc:styles.banner_m,'overflow-hidden')}>
      <div 
        className={classNames(
          "ebuy-container !flex h-full flex-col items-center justify-center text-white md:items-center md:justify-center  mt-[54px] md:mt-0"
        )}
        style={{
          opacity:opacityValue,
          transform:`translateY(${distance}px)`
        }}
      >
        <span
          ref={slogan1Ref}
          className={classNames(
            " whitespace-pre-wrap text-center text-[44px] font-[550] leading-[62px] tracking-[4px] first-letter:mb-[9px]  md:pb-3  md:text-[50px] md:leading-[70px] md:mt-[68px]",
            {
              head1: slogan1InView,
            }
          )}
        >
          加入我们
        </span>
        <span
          ref={slogan2Ref}
          className={classNames(
            "mb-[22px]  whitespace-pre-wrap text-center text-[44px] font-[600] leading-[62px] first-letter:mb-[9px]  md:pb-3  md:text-[40px] md:leading-[70px]",
            {
              head2: slogan2InView,
            }
          )}
        >
          Join us
        </span>
      </div>
    </section>
  );
});
