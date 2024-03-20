import { useI18n, useResponsive,useInView, useWindowSize } from "@/hooks";
import classNames from "classnames";
import { memo, useMemo , useRef,useEffect,useState} from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import slogonStyle from "../../banner.module.scss"
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
        className={classNames(slogonStyle.slogan_content,' !flex ebuy-container')}
        style={{
          opacity:opacityValue,
          transform:`translateY(${distance}px)`
        }}
      >
        <span
          ref={slogan1Ref}
          className={classNames(
            slogonStyle.slogan1,
            {
              head1: slogan1InView,
            }
          )}
        >
          {t("slogan-1")}
        </span>
        <span
          ref={slogan2Ref}
          className={classNames(
            slogonStyle.slogan2,
            {
              head2: slogan2InView,
            }
          )}
        >
          {t("slogan-2")}
        </span>
      </div>
    </section>
  );
});
