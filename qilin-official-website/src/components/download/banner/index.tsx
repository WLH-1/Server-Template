import classNames from "classnames";
import styles from "./styles.module.scss"
import phone_m from './images/phone1-m.png'
import phone from './images/phone1.png'
import Image from "next/image";
import app_1 from "./images/app-1-m.png"
import ecode from "./images/ecode-m.png"
import googlePlay from './images/googlePlay.png'
import googlePlay_m from './images/googlePlay-m.png'
import { useI18n, useInView, useWindowSize ,useResponsive} from "@/hooks";
// import { useRouter } from "next/router";
import { useEffect, useState,useRef } from "react";
import gsap from 'gsap';

export const Banner = () => {
  const t=useI18n('download')
  const imgElement=useRef(null)
  const phoneImg=useRef(null)
  const googlePlay1 = useRef(null)
  // 切换手机大图
  const { md } = useResponsive();

   //点击跳转苹果商城下载
   useEffect(() => {
    const downloadApp = (element: any) => {
        const handleClick = () => {          
            window.location.href ="https://apps.apple.com/cn/app/ebuy%E6%98%93%E8%B4%AD%E7%94%9F%E9%B2%9C/id1072583697?l=en";
        };
        element.addEventListener("click", handleClick);
        return () => element.removeEventListener("click", handleClick);
    };
    if (md) {
        const cleanup = downloadApp(imgElement.current);
        return () => {
            cleanup();
        };
    }
   }, [md]);
     //点击跳转Google Play下载
     useEffect(() => {
      const googleApp = (element: any) => {
          const handleClick = () => {
              window.location.href = "https://play.google.com/store/apps/details?id=com.easybuy.administrator.easybuycustomer&hl=en";
          };
          element.addEventListener("click", handleClick);
          return () => element.removeEventListener("click", handleClick);
      };
      if (md) {
          const cleanup1 = googleApp(googlePlay1.current);
          return () => {
              cleanup1();
          };
      }
  }, [md]);

  const nowWindowSize:any=useWindowSize()
  //  手机图逐渐放大的效果
  useEffect(() => {
    function handleResize() {
      const nowWindowSize = window.innerWidth;
      if (nowWindowSize <= 1070) {
        gsap.fromTo(
          phoneImg.current,
          { scale: 0.5, opacity: 1 },
          {
            duration: 1,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
          }
        );
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (nowWindowSize > 1070) {
      gsap.set(phoneImg.current, {
        scale: 1,
        opacity: 1,
      });
    }
  }, []);


  return (
    <section className={classNames('w-full',styles.banner)}>
      <div className={classNames('!flex',styles.content,styles.ebuy_container)}>
        {/* 手机大图 */}
        <div className={classNames(styles.phone_content)}>
          <Image ref={phoneImg} src={!md ? phone : phone_m} alt="" className={classNames(styles.phone)}></Image>
        </div>

        {/* 文字内容区域 */}
        <div className={classNames(styles.text_content)}>
          <div className={classNames('leading-[69px] md:w-[100%] ',styles.title)}>{t('title')}</div>
          <ul className={classNames(styles.sub_ul)}>
            <li>{t('subtitle1')} </li>
            <li>{t('subtitle2')} </li>
            <li>{t('subtitle3')} </li>
          </ul>

          {/* 图片 下载方式 */}
          <div className={classNames(styles.ecode_content)}>
            <Image ref={imgElement} src={app_1} alt="" className={classNames('w-[214px] h-[65px]')}></Image>
            <Image ref={googlePlay1} src={!md?googlePlay:googlePlay_m} alt=""  className={classNames('w-[237px] ml-[24px]')}></Image>
            <Image src={ecode} alt=""  className={classNames('w-[120px] ml-[24px]')}></Image>
          </div>
          
          {/* 底部文字 */}
          <div  className={classNames(styles.footer_text)}>{t('footertitle')} </div>
        </div>
      </div>
    </section>
  )
};


 
