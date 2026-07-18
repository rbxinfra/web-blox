import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
  type DocumentContext,
} from 'next/document';
import {
  createCache,
  renderStyleTags,
  prepareServerStyleSheets,
  RbxCaches
} from '@rbx/ui';
import MaintenanceMetaHeadLayout from '@modules/components/layouts/MaintenanceMetaHead';

export default class TestAppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const serverSideEmotionCache = createCache();
    const sheets = prepareServerStyleSheets(serverSideEmotionCache);

    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        // @ts-expect-error cache prop exists on App, but not on NextComponentType
        enhanceApp: (App) => (props) => <App {...props} cache={serverSideEmotionCache} />,
      });

    const initialProps = await Document.getInitialProps(ctx);

    const muiStyles = sheets.getStyleElementMui(initialProps.html);
    const tssStyles = sheets.getStyleElementTss(initialProps.html);

    return {
      ...initialProps,
      head: [
        ...(initialProps.head ?? []),
        <MaintenanceMetaHeadLayout />,
        ...renderStyleTags(),
        ...muiStyles,
        ...tssStyles
      ]
    };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

