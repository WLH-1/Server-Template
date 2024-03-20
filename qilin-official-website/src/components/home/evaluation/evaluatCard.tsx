import classNames from "classnames";

import Image from "next/image";
const ECard = (props: {
  eva: {
    name: string;
    desc: string;
    text: string;
    img: any;
  };
}) => {
  const { eva } = props;
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #FFFBFB 0%, #FFFFFF 100%)",
        boxShadow: "0px 2px 8px 0px rgba(86,16,16,0.09)",
      }}
      className={classNames(
        " flex h-full flex-col rounded-[8px] px-[20px] py-[20px]"
      )}
    >
      {/* 第一层 */}
      <div className={classNames("flex")}>
        <div
          className={classNames(
            "box-border h-[80px] w-[80px] px-1 py-1 md:px-[10px] md:py-[10px] "
          )}
        >
          <Image src={eva.img} alt="" />
        </div>
        <div className={classNames("flex flex-col justify-around pl-[12px]")}>
          <div className={classNames("text-[24px] font-[600]  text-[#333]")}>
            {eva.name}
          </div>
          <div className={classNames("text-[18px]  text-[#999]")}>
            {eva.desc}
          </div>
        </div>
      </div>
      <div
        className={classNames(
          `min-h-[132px] max-w-[473px] pt-[20px] text-[18px] font-[500]  leading-7 text-[#333]`
        )}
      >
        {eva.text}
      </div>
    </div>
  );
};

export { ECard };
