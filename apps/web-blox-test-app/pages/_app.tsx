/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useEffect } from "react";

import type { NextComponentType, NextGetPageLayout } from "next";
import type { AppContext, AppInitialProps, AppLayoutProps } from "next/app";

import {
  CacheProvider,
  createCache,
  removeServerSideCSS,
  UIThemeProvider
} from '@rbx/ui';

import MultiProvider from "@modules/MultiProvider";

const getDefaultPageLayout: NextGetPageLayout = (page) => page;

type CustomAppFC = NextComponentType<AppContext, AppInitialProps, AppLayoutProps>;

const clientSideEmotionCache = createCache();

export const CustomApp: CustomAppFC = (props) => {
  const { Component, pageProps, cache } = props;

  const emotionCache = cache ?? clientSideEmotionCache;
  const getPageLayout = Component.getPageLayout ?? getDefaultPageLayout;

  console.log(props);
  console.log(`Is using server cache = ${cache !== undefined}, cache = ${emotionCache}`);

  useEffect(() => {
    removeServerSideCSS();
  }, []);

  return getPageLayout(
    <CacheProvider value={emotionCache}>
      <MultiProvider
        providers={[
          // eslint-disable-next-line react/jsx-key
          <UIThemeProvider theme="dark" />,
        ]}>
        <Component {...pageProps} />
      </MultiProvider>
    </CacheProvider>
  );
};

export default CustomApp;
