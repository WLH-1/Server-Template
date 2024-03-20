import Image from "next/image"
import pm1 from "./images/1.png"
import pm2 from "./images/2.png"
import pm3 from "./images/3.png"
import classNames from "classnames"
import styles from "./styles.module.scss"
import { useI18n} from "@/hooks";



export const Help=()=>{
    const t=useI18n('download')
    return(
        <section className={classNames('bg-[#F5F5F5]')}>
           <div className={classNames('ebuy-container w-full',styles.help_container)}>
             {/* 上 */}
             <div className={classNames(styles.top)}>
                <div className={classNames(styles.help_title)}>{t('helpTitle')}</div>
                <div className={classNames(styles.top_content)}>{t('helpText')}</div>
            </div>

            {/* 下 */}
            <div>
                <ul className={classNames(styles.help_ul)}>
                    <li className={classNames(styles.help_li)}>
                        <div className={classNames(styles.ul_content)}>
                                <Image src={pm1} alt="" className={classNames('md:w-[40px]',styles.ul_img)}></Image>
                                <div className={classNames(styles.li_title)}>{t('helpUlTitle1')}</div>
                        </div>
                        <div className={classNames(styles.li_content)}>{t('helpUltext1')}</div>
                    </li>
                    <li className={classNames(styles.help_li)}>
                        <div className={classNames(styles.ul_content)}>
                            <Image src={pm2} alt="" className={classNames('md:w-[45px]',styles.ul_img)}></Image>
                            <div className={classNames(styles.li_title)}>{t('helpUlTitle2')}</div>
                        </div>
                        <div className={classNames(styles.li_content)}>{t('helpUltext2')}</div>
                    </li>
                    <li className={classNames(styles.help_li)}>
                        <div className={classNames(styles.ul_content)}>
                            <Image src={pm3} alt="" className={classNames('md:w-[45px]',styles.ul_img)}></Image>
                            <div className={classNames(styles.li_title)}>{t('helpUlTitle3')}</div>
                        </div>
                        <div className={classNames('!mb-0',styles.li_content)}>{t('helpUltext3')}</div>
                    </li>
                </ul>
            </div>

           </div>
        </section>
    )
}