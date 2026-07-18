import type { NextComponentType } from "next";
import type { AppProps } from "next/app";

declare module 'next' {
  type NextLayoutComponentType<P = {}> = NextComponentType<NextPageContext, any, P> & {
    getPageLayout?: (page: ReactNode) => ReactNode;
  };

  type NextLayoutPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & {
    getPageLayout: (page: ReactNode) => ReactNode;
  };

  type NextGetPageLayout = (page: ReactNode) => ReactNode;
}

declare module 'next/app' {
  type AppLayoutProps<P = {}> = AppProps & {
    Component: NextLayoutComponentType;
    cache?: ReturnType<typeof createCache>;
  };
}