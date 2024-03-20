import classNames from "classnames";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useI18n } from "@/hooks";



export const Expore = () => {
  const t = useI18n("cooperation");
  return (
    <div className={classNames(styles.banner,'overflow-hidden')}>
      <div className={classNames(styles.content)}>
        <div className={classNames(styles.title)}>
          {t('explore_title')}
        </div>
        <div className={classNames(styles.text)}>
        {t('explore_text')}
        </div>
        <Link href="#message" className={classNames(styles.btn)}>
          <span className={classNames(styles.btn_text)}
          >
            {t('explore_button')}
          </span>
        </Link>
      </div>
    </div>
  );
};
