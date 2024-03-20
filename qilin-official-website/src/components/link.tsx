import { useI18nContext } from "@/states";
import { locales } from "@/utils";
import NextLink, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren, Ref, forwardRef, memo } from "react";

export const Link = memo(forwardRef(
  (
    props: PropsWithChildren<
      LinkProps & {
        className?: string;
      }
    >, ref
  ) => {
    const router = useRouter();
    const { lang } = useI18nContext();
    const needAddLang = locales.some((l) => router.asPath.startsWith(`/${l}`));

    return (
      <NextLink
        {...props}
        ref={ref as any}
        className={props.className}
        href={needAddLang ? `/${lang}${props.href}` : props.href}
      >
        {props.children}
      </NextLink>
    );
  }
))
