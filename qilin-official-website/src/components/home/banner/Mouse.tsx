import classNames from "classnames";
import styles from "./styles.module.scss";

export const Mouse = () => {
  return (
    <div className={classNames(styles.mouse_scroll)}>
      <div className={classNames(styles.mouse)}>
        <div className={classNames(styles.wheel)}></div>
      </div>
      <div>
        <span className={classNames(styles.unu, styles.m_scroll_arrows)}></span>
        <span className={classNames(styles.doi, styles.m_scroll_arrows)}></span>
        <span
          className={classNames(styles.trei, styles.m_scroll_arrows)}
        ></span>
      </div>
    </div>
  );
};
