import Image from "next/image";
import phone1 from "./images/phone1.png";
import phone2 from "./images/phone2.png";
import phone1_m from "./images/phone1-m.png";
import phone2_m from "./images/phone2-m.png";
import ecode from "./images/ecode.png"
import googlePlay from "./images/googlePlay.png"
import store from "./images/apple_store.png"
import classNames from "classnames";
import styles from "./styles.module.scss";
import { useI18n, useInView, windowSizeRange, useResponsive } from "@/hooks";
import { useState, useEffect, useRef } from "react";
import useScrollAnimation from '@/hooks/useScrollAnimation';
import useScrollDirection from '@/hooks/useScrollDirection';
import { log } from "console";

export const DownloadApp = () => {
    const { md } = useResponsive()
    const t = useI18n('download')
    const nowWindowSize = windowSizeRange()

    const codeElement1 = useRef(null);
    const codeElement2 = useRef(null);
    const googlePlay1 = useRef(null)
    const googlePlay2 = useRef(null)
    //点击跳转苹果商城下载
    useEffect(() => {
        const downloadApp = (element: any) => {
            const handleClick = () => {
                window.location.href = "https://apps.apple.com/cn/app/ebuy%E6%98%93%E8%B4%AD%E7%94%9F%E9%B2%9C/id1072583697?l=en";
            };
            element.addEventListener("click", handleClick);
            return () => element.removeEventListener("click", handleClick);
        };
        if (md) {
            const cleanup1 = downloadApp(codeElement1.current);
            const cleanup2 = downloadApp(codeElement2.current);
            return () => {
                cleanup1();
                cleanup2();
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
            const cleanup2 = googleApp(googlePlay2.current);
            return () => {
                cleanup1();
                cleanup2();
            };
        }
    }, [md]);

    // 判断窗口大小渲染相应图片内容
    const nowPhoto = (pic1: any, pic2: any) => {
        if (!md) {
            if (nowWindowSize <= 1070) {
                return pic1
            } else {
                return pic2
            }
        } else {
            return pic1
        }
    }

    const scrollDirection = useScrollDirection();
    const animate = () => {
        if (nowWindowSize <= 1070) {
            if (scrollDirection.isScrollUp) {
                return useScrollAnimation("bottom", 50, 0.6);
            } else {
                return useScrollAnimation("bottom", -50, 0.6)
            };
        } else {
            return useScrollAnimation("bottom", 0, 0)
        }
    };

    const animate1 = (element: any) => {
        if (nowWindowSize > 1070) {
            // // 检查窗口滚动方向
            if (element === 'phoneRef1') {
                return useScrollAnimation("right", -200, 0.6)
            } else if (element === 'textRef1') {
                return useScrollAnimation("left", -200, 0.6)
            } else if (element === 'phoneRef2') {
                return useScrollAnimation("left", -200, 0.6)
            } else if (element === 'textRef2') {
                return useScrollAnimation("right", -200, 0.6)
            }
        } else {
            return useScrollAnimation("bottom", 0, 0)
        }
    }


    return (
        <section>
            {/* 上 */}
            <div ref={animate()} className={classNames('ebuy-container', styles.content1)}>
                {/* @ts-ignore */}
                <Image ref={animate1('phoneRef1')} src={nowPhoto(phone1_m, phone1)} alt="" className={classNames('w-[515px] block mx-auto md:mx-0')}></Image>
                <div ref={animate1('textRef1')} className={classNames(styles.download)}>
                    <div>
                        <div className={classNames(styles.download_title)}>{t('downloadApp')}</div>
                        <div className={classNames(styles.download_text)}>{t('downloadTxet')}</div>
                    </div>
                    {/* 二维码 */}
                    <div className={classNames(styles.ecode_content)}>
                        <Image ref={codeElement1} src={store} alt="" className={classNames(styles.ecode_store)}></Image>
                        <Image ref={googlePlay1} src={googlePlay} alt="" className={classNames(styles.googlePlay)}></Image>
                        <Image src={ecode} alt="" className={classNames(styles.ecode)}></Image>
                    </div>
                </div>
            </div>

            {/* 下 */}
            <div ref={animate()} className={classNames('ebuy-container !flex-col-reverse md:!flex-row', styles.content2)}>
                <div ref={animate1('textRef2')} className={classNames(styles.download)}>
                    <div>
                        <div className={classNames(styles.download_title)}>{t('downloadApp')}</div>
                        <div className={classNames(styles.download_text)}>{t('downloadTxet')}</div>
                    </div>
                    {/* 二维码 */}
                    <div className={classNames(styles.ecode_content)}>
                        <Image ref={codeElement2} src={store} alt="" className={classNames(styles.ecode_store)}></Image>
                        <Image ref={googlePlay2} src={googlePlay} alt="" className={classNames(styles.googlePlay)}></Image>
                        <Image src={ecode} alt="" className={classNames(styles.ecode)}></Image>
                    </div>
                </div>
                {/* @ts-ignore */}
                <Image ref={animate1('phoneRef2')} src={nowPhoto(phone2_m, phone2)} alt="" className={classNames(' w-[532px] block mx-auto md:mx-0')}></Image>
            </div>
        </section>
    )
}