import officialAccount from "@/assets/images/official-account.jpg";
import { useI18n, useResponsive } from "@/hooks";
import { useI18nContext } from "@/states";
import axios from "axios";
import classNames from "classnames";
import Image from "next/image";
import { memo, useState } from "react";
import {
  CountryIso2,
  CountrySelector,
  defaultCountries,
} from "react-international-phone";
import "react-international-phone/style.css";
import { default as header, default as styles } from "./header.module.scss";

import countries from "@/types/countries";

// 防抖
function debounce(func: any, delay: number) {
  let timer: NodeJS.Timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, delay);
  };
}

export const Footer = memo(() => {
  const lang = useI18nContext().lang;
  const t = useI18n("footer");
  const { md } = useResponsive();

  const [showError, setError] = useState({
    isShow: false,
    text: "",
  });
  const [country, setCountry] = useState<CountryIso2>("sg");
  const [countryCode, setCountryCode] = useState<string>("+65");
  const [showAttention, setAttention] = useState({
    isShow: false,
    text: "发送成功，客服将尽快与您联系",
  });
  //选择国家的回调
  const selectedCountry = (country: any) => {
    const { iso2 } = country;
    let number = defaultCountries.find(
      ([name, b, short, code]) => short === iso2
    )![3];
    setCountry(iso2);

    setCountryCode(`+${number}`);
  };
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    help: "",
  });

  const submitForm = () => {
    if (formValue.phone.replace(" ", "").length == 0) {
      lang === "en"
        ? setError({ isShow: true, text: "Telephone number cannot be empty" })
        : setError({ isShow: true, text: "电话号码不能为空" });
      setTimeout(() => {
        setError({ ...showError, isShow: false });
      }, 5000);
      return;
    } else {
      axios
        .post("https://www.ebuysgp.com/core/api/manage/contactUs", {
          firstName: formValue.firstName,
          lastName: formValue.lastName,
          phone: `${countryCode} ${formValue.phone}`,
          email: formValue.email,
          lang: lang,
          message: formValue.help,
        })
        .then((res) => {
          if (res.data.code == 200) {
            setFormValue({
              firstName: "",
              lastName: "",
              phone: "",
              email: "",
              help: "",
            });
            lang === "en"
              ? setAttention({
                  isShow: true,
                  text: "Send successfully,we'll contact you soon!",
                })
              : setAttention({
                  isShow: true,
                  text: "发送成功，客服将尽快与您联系",
                });
            setTimeout(() => {
              setAttention({ ...showAttention, isShow: false });
            }, 5000);
          } else {
            setAttention({ isShow: true, text: res.data.msg });
            setTimeout(() => {
              setAttention({ ...showAttention, isShow: false });
            }, 5000);
          }
        })
        .catch(() => {
          setError({ isShow: true, text: "发送失败，请检查网络" });
          setTimeout(() => {
            setError({ ...showError, isShow: false });
          }, 5000);
        });
    }
  };

  //英语移动版
  const supply = [
    t("veg"),
    t("dried"),
    t("fruit"),
    t("buns"),
    t("frozon"),
    t("drinks"),
  ];
  const mobileSupply = (
    <div className={classNames("bg-[#1d1f21]")}>
      {/* start 信息 */}
      <div
        className={classNames(
          "ebuy-container !flex flex-col justify-between pb-[34px] pt-[72px] text-[28px]  leading-[20px] text-[#acacac] text-[400] md:flex-row md:pb-[unset] md:text-[14px]"
        )}
      >
        {/* 食材供应 */}
        <div className={classNames(`col-start-1 col-end-6`)}>
          {/* 标题 */}
          <div
            className={classNames(
              "mb-8 text-[32px] font-[600] leading-[100%] text-white md:mb-[25px] md:text-[20px] md:leading-[28px]"
            )}
          >
            {t("supply")}
          </div>
          <div
            className={classNames(
              "flex w-full flex-wrap items-center justify-start  "
            )}
          >
            {supply.map((item, index) => (
              <div
                className={classNames(" mb-[20px] pr-6 leading-[40px]")}
                key={`supply-${index}`}
              >
                {item}
              </div>
            ))}
          </div>
          <li className={classNames("mt-[10px] list-none")}>
            <span className={classNames("leading-[100%]")}>
              {t("merchant")}
            </span>
          </li>
        </div>
        {/* 第二个 */}
        <div className={classNames("col-start-8 col-end-13 mt-[72px] md:mt-0")}>
          <div
            className={classNames(
              "mb-5 text-[32px] font-[600] leading-[100%] text-white md:mb-[25px] md:text-[20px] md:leading-[28px]"
            )}
          >
            {t("other")}
          </div>
          <div
            className={classNames(
              "flex w-full flex-wrap items-center justify-start  "
            )}
          >
            <div className={classNames("my-3 pr-6 leading-[40px]")}>
              {t("cooperation")}
            </div>
            <div className={classNames("my-3 pr-6 leading-[40px]")}>
              {t("storage")}
            </div>
            <div className={classNames(" my-3 pr-6 leading-[40px]")}>
              {t("distributin")}
            </div>
            <div className={classNames(" my-3 pr-6 leading-[40px]")}>
              {t("provisioning")}
            </div>
          </div>
        </div>
        {/* 第三个 */}
        <div
          className={classNames(
            "col-start-15 col-end-21 mt-[50px] leading-[100%] md:mt-0"
          )}
        >
          <ul className={classNames("space-y-[12px]")}>
            <li
              className={classNames(
                "text-[32px] font-[600] text-white md:text-[20px] md:leading-[28px]"
              )}
            >
              {t("contact")}
            </li>
            <li
              className={classNames(
                "pt-8 text-[44px] font-[600] leading-[100%] text-[#ededed] md:pt-0  md:text-[24px] md:leading-[33px]"
              )}
            >
              {t("phone")}
            </li>
            <li
              className={classNames(
                "pt-6 leading-[100%] md:pt-0 md:leading-[20px]"
              )}
            >
              {t("address")}
            </li>
            <li
              className={classNames(
                "pt-6 leading-[100%] md:pt-0 md:leading-[20px]"
              )}
            >
              {t("email-detail")}
            </li>
            <li
              className={classNames(
                "!w-[100vw] overflow-x-hidden pt-6 leading-[100%] md:pt-0 md:leading-[20px]"
              )}
            >
              {t("time")}
            </li>
          </ul>
        </div>
        {/* 第四个 */}
        <div className={classNames("col-start-22  mt-[72px] md:mt-0")}>
          <ul>
            <li
              className={classNames(
                "mb-[25px] text-[32px] font-[600] leading-[45px] text-white md:text-[20px] md:leading-[28px]"
              )}
            >
              {t("follow")}
            </li>
            <li
              className={classNames(
                "mb-[8px] h-[260px] w-[260px] bg-white md:h-[89px] md:w-[89px]"
              )}
            >
              <Image
                className={classNames("h-full w-full")}
                src={officialAccount}
                alt="official account"
              ></Image>
            </li>
            <li
              className={classNames(
                "pt-[12px] leading-[100%] md:pt-0 md:leading-[20px]"
              )}
            >
              {t("wechat")}
            </li>
          </ul>
        </div>
      </div>
      <div
        className={classNames(
          "mt-[86px] flex flex-col justify-center px-8 pb-[34px] text-[24px] text-[#acacac] text-[400] md:mt-[100px] md:flex-row md:items-center md:space-x-[120px] md:text-[12px] md:leading-[17px]"
        )}
      >
        {t("company")}
      </div>
      {/* end 信息 */}
    </div>
  );
  const deskSupply = (
    <div className={classNames("bg-[#1d1f21]")}>
      {/* start 信息 */}
      <div
        className={classNames(
          "ebuy-container !flex flex-col justify-between pb-[34px] pt-[72px] text-[28px]  leading-[20px] text-[#acacac] text-[400] md:flex-row md:pb-[unset] md:text-[14px]"
        )}
      >
        {/* 食材供应 */}
        <div className={classNames(`col-start-1 col-end-6`)}>
          {/* 标题 */}
          <div
            className={classNames(
              "mb-8 text-[32px] font-[600] leading-[100%] text-white md:mb-[25px] md:text-[20px] md:leading-[28px]"
            )}
          >
            {t("supply")}
          </div>
          <ul
            className={classNames(
              "flex max-w-[568px] justify-between leading-[100%] md:flex-col md:space-y-[12px] md:leading-[20px]"
            )}
          >
            <li
              className={classNames("flex flex-col md:block md:space-x-[28px]")}
            >
              <span>{t("veg")}</span>
              <span className={classNames("my-[24px] md:my-0")}>
                {t("fruit")}
              </span>
            </li>
            <li
              className={classNames("flex flex-col md:block md:space-x-[28px]")}
            >
              <span>{t("buns")}</span>
              <span className={classNames("my-[24px] md:my-0")}>
                {t("dried")}
              </span>
            </li>
            <li
              className={classNames("flex flex-col md:block md:space-x-[28px]")}
            >
              <span>{t("frozon")}</span>
              <span className={classNames("my-[24px] md:my-0")}>
                {t("drinks")}
              </span>
            </li>
          </ul>
          <li className={classNames("mt-[10px] list-none")}>
            <span className={classNames("leading-[100%]")}>
              {t("merchant")}
            </span>
          </li>
        </div>
        {/* 第二个 */}
        <div className={classNames("col-start-8 col-end-13 mt-[72px] md:mt-0")}>
          <div
            className={classNames(
              "mb-5 text-[32px] font-[600] leading-[100%] text-white md:mb-[25px] md:text-[20px] md:leading-[28px]"
            )}
          >
            {t("other")}
          </div>
          <ul
            className={classNames(
              "flex flex-wrap justify-between leading-[100%] md:block md:space-y-[12px] md:leading-[20px]"
            )}
          >
            <li className={classNames("py-3 md:py-0")}>{t("cooperation")}</li>
            <li className={classNames("list-none py-3 md:py-0")}>
              {t("storage")}
            </li>
            <li className={classNames("list-none py-3 md:py-0")}>
              {t("distributin")}
            </li>
            <li className={classNames("list-none py-3 md:py-0")}>
              {t("provisioning")}
            </li>
          </ul>
        </div>
        {/* 第三个 */}
        <div
          className={classNames(
            "col-start-15 col-end-21 mt-[50px] leading-[100%] md:mt-0"
          )}
        >
          <ul className={classNames("space-y-[12px]")}>
            <li
              className={classNames(
                "text-[32px] font-[600] text-white md:text-[20px] md:leading-[28px]"
              )}
            >
              {t("contact")}
            </li>
            <li
              className={classNames(
                "pt-8 text-[44px] font-[600] leading-[100%] text-[#ededed] md:pt-0  md:text-[24px] md:leading-[33px]"
              )}
            >
              {t("phone")}
            </li>
            <li
              className={classNames(
                "pt-6 leading-[100%] md:pt-0 md:leading-[20px]"
              )}
            >
              {t("address")}
            </li>
            <li
              className={classNames(
                "pt-6 leading-[100%] md:pt-0 md:leading-[20px]"
              )}
            >
              {t("email-detail")}
            </li>
            <li
              className={classNames(
                "overflow-x-hidden whitespace-nowrap pt-6 leading-[100%] md:pt-0 md:leading-[20px] "
              )}
              style={{ width: "calc(100% + 40px)" }}
            >
              {t("time")}
            </li>
          </ul>
        </div>
        {/* 第四个 */}
        <div className={classNames("col-start-22  mt-[72px] md:mt-0")}>
          <ul>
            <li
              className={classNames(
                "mb-[25px] text-[32px] font-[600] leading-[45px] text-white md:text-[20px] md:leading-[28px]"
              )}
            >
              {t("follow")}
            </li>
            <li
              className={classNames(
                "mb-[8px] h-[260px] w-[260px] bg-white md:h-[89px] md:w-[89px]"
              )}
            >
              <Image
                className={classNames("h-full w-full")}
                src={officialAccount}
                alt="official account"
              ></Image>
            </li>
            <li
              className={classNames(
                "pt-[12px] leading-[100%] md:pt-0 md:leading-[20px]"
              )}
            >
              {t("wechat")}
            </li>
          </ul>
        </div>
      </div>
      <div
        className={classNames(
          "mt-[86px] flex flex-col justify-center px-8 pb-[34px] text-[24px] text-[#acacac] text-[400] md:mt-[100px] md:flex-row md:items-center md:space-x-[120px] md:text-[12px] md:leading-[17px]"
        )}
      >
        {t("company")}
      </div>
      {/* end 信息 */}
    </div>
  );

  return (
    <footer className={classNames("bg-white")} id="message">
      {/* start 表单 */}
      <div className={classNames("ebuy-container mb-[40px] pt-[100px]")}>
        <div
          className={classNames(
            "col-start-1 col-end-25 mb-[31px] text-[42px] font-bold leading-[51px] text-[#333333]"
          )}
        >
          {t("contact")}
        </div>
        <div
          className={classNames(
            "col-start-1 col-end-25 mb-[56px] text-[26px] font-[400] leading-[44px]"
          )}
        >
          {t("detail-1")}
          <span className="text-[#ED3838]">{t("detail-2")}</span>
          {t("detail-3")}
        </div>
        <div
          className={classNames(
            "col-start-1 col-end-25 space-y-[32px]  text-[24px] font-[400] leading-[36px] text-[#666666]"
          )}
        >
          {/* 姓+名 */}
          <div
            className={classNames(
              "flex flex-col md:flex-row md:justify-between"
            )}
          >
            {/* 名 */}
            <div
              className={classNames(
                "flex flex-col  md:w-[45%] md:items-start md:pt-0"
              )}
            >
              <span>{t("first-name")}</span>
              <input
                className={classNames(
                  " mt-4 h-[56px]  w-full rounded-[4px] px-8 py-4",
                  header.defaultInput
                )}
                value={formValue.firstName}
                onChange={(e) =>
                  setFormValue({ ...formValue, firstName: e.target.value })
                }
                type="text"
              />
            </div>
            {/* 姓 */}
            <div
              className={classNames(
                "flex flex-col pt-8 md:w-[45%] md:items-start md:pt-0"
              )}
            >
              <span>{t("last-name")}</span>
              <input
                className={classNames(
                  "mt-4 h-[56px] w-full rounded-[4px] px-8 py-4",
                  header.defaultInput
                )}
                value={formValue.lastName}
                onChange={(e) =>
                  setFormValue({ ...formValue, lastName: e.target.value })
                }
                type="text"
              />
            </div>
          </div>
          {/* 国家选择栏 */}
          <div className={classNames("relative flex flex-col space-y-[16px]")}>
            <span
              className={classNames(
                "after:ml-[4px] after:text-[24px] after:font-[500] after:leading-[36px] after:text-[#ed3838] after:content-['*']"
              )}
            >
              {t("telephone")}
            </span>
            <div className={classNames("relative flex")}>
              <CountrySelector
                selectedCountry={country}
                onSelect={selectedCountry}
                className={classNames("hidden md:block")}
                countries={countries}
                key={1}
              />
              <span
                className={classNames(
                  "absolute left-[110px] top-[10px] hidden md:block"
                )}
              >
                {countryCode}
              </span>
              <input
                className={classNames(
                  "h-[56px] w-full rounded-r-[4px] pl-8 pr-8 md:pl-[96px]",
                  header.defaultInput,
                  {
                    [styles.errorForm]: showError.isShow,
                  }
                )}
                value={formValue.phone}
                onChange={(e) =>
                  setFormValue({ ...formValue, phone: e.target.value })
                }
                type="text"
              />
            </div>
            {
              <div
                className={classNames(
                  "absolute right-[0%] top-[0] translate-y-[0] text-[24px]  text-[#ED3838]",

                  showError.isShow ? "footerattentionIn" : "footerattentionOut"
                )}
              >
                {showError.text}
              </div>
            }
            {showAttention.isShow && (
              <div
                className={classNames(
                  "absolute left-[50%] top-[0] translate-x-[-50%] rounded bg-[#e4e4e4] px-5 py-4 text-center  text-[24px] text-[#353434]",

                  showAttention.isShow
                    ? "footerattentionIn"
                    : "footerattentionOut"
                )}
              >
                {showAttention.text}
              </div>
            )}
          </div>
          <div className={classNames("flex flex-col space-y-[16px]")}>
            <span>{t("email")}</span>
            <input
              className={classNames(
                "h-[56px] w-full rounded-[4px] px-8",
                header.defaultInput
              )}
              value={formValue.email}
              onChange={(e) =>
                setFormValue({ ...formValue, email: e.target.value })
              }
              type="text"
            />
          </div>
          <div className={classNames("flex flex-col space-y-[16px]")}>
            <span>{t("help")}</span>
            <textarea
              className={classNames(
                "h-[112px] w-full rounded-[4px] px-8 py-4",
                header.defaultInput
              )}
              value={formValue.help}
              onChange={(e) =>
                setFormValue({ ...formValue, help: e.target.value })
              }
            />
          </div>
        </div>
        <div
          className={classNames(
            "relative col-start-1 col-end-25 mt-[48px] flex items-center justify-center"
          )}
        >
          <button
            onClick={debounce(submitForm, 200)}
            className={classNames(
              " bg-[#ED3838] px-[78px] py-[19px] text-[24px] leading-[36px] text-white hover:bg-[#b92b2b]"
            )}
          >
            {t("submit")}
          </button>
        </div>
      </div>
      {/* end 表单 */}
      {lang === "en" && md ? mobileSupply : deskSupply}
    </footer>
  );
});
