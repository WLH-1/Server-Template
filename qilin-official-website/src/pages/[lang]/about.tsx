import { Banner, Env, Finance, Mission, Profile } from "@/components/about";
import { getI18nStaticPaths, getI18nStaticProps } from "@/utils";
export default function About() {
  return (
    <>
      <Banner />
      <Profile />
      <Mission />
      <Finance />
      <Env />
    </>
  );
}

export const getStaticProps = getI18nStaticProps;
export const getStaticPaths = getI18nStaticPaths;
