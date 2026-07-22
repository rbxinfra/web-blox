import Document, {
  type DocumentContext,
  // type DocumentProps,
} from 'next/document';
import {
  createCache,
  renderStyleTags,
  prepareServerStyleSheets,
} from '@rbx/ui';

export default class TestAppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const serverSideEmotionCache = createCache();
    const sheets = prepareServerStyleSheets(serverSideEmotionCache);

    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => (
          <>
            {/* @ts-expect-error cache prop exists on App, but not on NextComponentType */}
            <App {...props} cache={serverSideEmotionCache} />
          </>
        ),
      });

    const initialProps = await Document.getInitialProps(ctx);

    const muiStyles = sheets.getStyleElementMui(initialProps.html);
    const tssStyles = sheets.getStyleElementTss(initialProps.html);

    return {
      ...initialProps,
      styles: [
        ...renderStyleTags(),
        ...muiStyles,
        ...tssStyles
      ]
    };
  }
}

