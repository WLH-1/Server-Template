import { Banner, Business, Expore } from "@/components/cooperation";
import { getI18nStaticPaths, getI18nStaticProps } from "@/utils";
export default function About() {
  return (
    <>
      <Banner />
      <Business />
      <Expore />
    </>
  );
}

export const getStaticProps = getI18nStaticProps;
export const getStaticPaths = getI18nStaticPaths;
