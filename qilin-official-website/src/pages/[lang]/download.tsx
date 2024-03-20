import { Banner ,Help,DownloadApp} from "@/components/download";
import { getI18nStaticPaths, getI18nStaticProps } from "@/utils";
export default function About() {
  return (
    <>
      <Banner />
      <Help/>
      <DownloadApp/>
    </>
  )
}

export const getStaticProps = getI18nStaticProps;
export const getStaticPaths = getI18nStaticPaths;
