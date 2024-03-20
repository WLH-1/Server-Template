import { useI18n } from "@/hooks";
import Image from "next/image";
import classNames from "classnames";
import pm0 from './images/0.png'

export const Title = () => {
  const t = useI18n("joinus");
  return (
    <section
      className={classNames(
        "ebuy-container text-center text-[42px] font-[700] leading-[51px] text-[#333333]"
      )}
    >
      <div
        className={classNames(
          "col-start-1 col-end-25 pb-[72px] pt-[100px] md:pb-[92px] md:pt-[97px] flex justify-center"
        )}
      >
        <Image src={pm0} alt="" className={
          classNames('md:w-[55px] md:h-[48px] w-[54px] h-[47px] md:mr-[15px] mr-[11px] md:pb-[6px] pb-[1px] pt-[3px]')
          }>
        </Image>
        {t("title")}
      </div>
    </section>
  );
};
