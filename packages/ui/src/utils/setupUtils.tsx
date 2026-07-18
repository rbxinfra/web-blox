/**
 * SSR utilities for uiblox emotion cache setup.
 *
 * These are needed when rendering uiblox in a Next.js or other SSR
 * environment to prevent style flickering and hydration mismatches.
 */

import type { ReactNode, ReactElement } from 'react';
import createEmotionCache, { type EmotionCache } from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import { CacheProvider as EmotionCacheProvider } from '@emotion/react';
import { TssCacheProvider } from 'tss-react';

// ── Constants ─────────────────────────────────────────────────────────────────
// These key names must match the names used in UIThemeProvider and tss-react
// so that style deduplication works correctly across SSR and hydration.

const MUI_CACHE_KEY = 'web-blox-css-mui';
const TSS_CACHE_KEY = 'web-blox-css-tss';

const MUI_INSERTION_POINT_NAME = 'emotion-insertion-point-mui';
const TSS_INSERTION_POINT_NAME = 'emotion-insertion-point-tss';
const SSR_INSERTION_POINT_NAME = 'emotion-insertion-point-ssr';

const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface RbxCaches {
  muiCache: EmotionCache;
  tssCache: EmotionCache;
}


// ── CacheProvider ─────────────────────────────────────────────────────────────

export interface CacheProviderProps {
  /**
   * Alias for `cache` — matches emotion's native CacheProvider API so this
   * component is a drop-in replacement for @emotion/react CacheProvider.
   */
  value?: RbxCaches;
  children?: ReactNode;
}

/**
 * Wraps children with both the MUI and TSS emotion cache providers.
 * Use this at the root of your app alongside `createCache()`.
 */
export function CacheProvider({ value, children }: CacheProviderProps): ReactElement {
  if (!value) throw new Error('uiblox CacheProvider: value prop is required');
  return (
    <EmotionCacheProvider value={value.muiCache}>
      <TssCacheProvider value={value.tssCache}>
        {children}
      </TssCacheProvider>
    </EmotionCacheProvider>
  );
}

// ── createCache ───────────────────────────────────────────────────────────────

/**
 * Creates the two emotion caches used by uiblox.
 * Call this once per request on the server, or once on the client.
 *
 * On the client the caches pick up their insertion points from the
 * `<meta>` tags injected by `renderStyleTags`.
 */
export function createCache(): RbxCaches {
  let muiInsertionPoint: HTMLElement | undefined;
  let tssInsertionPoint: HTMLElement | undefined;

  if (IS_BROWSER) {
    muiInsertionPoint =
      document.querySelector<HTMLElement>(`meta[name="${MUI_INSERTION_POINT_NAME}"]`) ?? undefined;
    tssInsertionPoint =
      document.querySelector<HTMLElement>(`meta[name="${TSS_INSERTION_POINT_NAME}"]`) ?? undefined;
  }

  return {
    muiCache: createEmotionCache({
      key:            MUI_CACHE_KEY,
      prepend:        true,
      insertionPoint: muiInsertionPoint,
    }),
    tssCache: createEmotionCache({
      key:            TSS_CACHE_KEY,
      insertionPoint: tssInsertionPoint,
    }),
  };
}

// ── prepareServerStyleSheets ──────────────────────────────────────────────────

/**
 * Extracts critical CSS from a rendered HTML string for Next.js Pages Router SSR.
 */
export function prepareServerStyleSheets(caches: RbxCaches) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const muiServerExtractCriticalToChunks = createEmotionServer(caches.muiCache).extractCriticalToChunks;
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const tssServerExtractCriticalToChunks = createEmotionServer(caches.tssCache).extractCriticalToChunks;

  return {
    getStyleElementMui: function getStyleElementMui(html: string): ReactElement[] {
      return muiServerExtractCriticalToChunks(html).styles.map(style => (
        <style
          key={style.key}
          data-emotion={`${style.key} ${style.ids.join(' ')}`}
          dangerouslySetInnerHTML={{ __html: style.css }}
        />
      ));
    },
    getStyleElementTss: function getStyleElementTss(html: string): ReactElement[] {
      return tssServerExtractCriticalToChunks(html).styles.map(style => (
        <style
          key={style.key}
          data-emotion={`${style.key} ${style.ids.join(' ')}`}
          dangerouslySetInnerHTML={{ __html: style.css }}
        />
      ));
    }
  }
}

// ── removeServerSideCSS ───────────────────────────────────────────────────────

/**
 * Removes server-side injected global CSS `<style>` elements from the DOM
 * after client-side hydration to prevent style duplication.
 *
 * Call this in a `useEffect` in your `_app.tsx` or root layout.
 *
 * @example
 * useEffect(() => { removeServerSideCSS(); }, []);
 */
export function removeServerSideCSS(): void {
  if (!IS_BROWSER) return;

  const insertionPointMeta = document.querySelector(
    `meta[name="${SSR_INSERTION_POINT_NAME}"]`,
  );
  if (!insertionPointMeta) return;

  let pastInsertionPoint = false;
  document.head.childNodes.forEach(node => {
    if (node === insertionPointMeta) {
      pastInsertionPoint = true;
      return;
    }
    if (!pastInsertionPoint) return;
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const el = node as HTMLElement;
    const dataEmotion = el.getAttribute('data-emotion') ?? '';
    if (
      dataEmotion.includes(`${MUI_CACHE_KEY}-global`) ||
      dataEmotion.includes(`${TSS_CACHE_KEY}-global`)
    ) {
      el.remove();
    }
  });
}

// ── renderStyleTags ───────────────────────────────────────────────────────────

/**
 * Returns the `<meta>` insertion-point tags that must be rendered in
 * `<head>` before any emotion styles.
 *
 * Use in Next.js `_document.tsx` `getInitialProps` or equivalent.
 *
 * @param extraHeadElements Additional head elements to include after the tags.
 */
export function renderStyleTags(
  extraHeadElements: ReactNode[] = [],
): ReactElement[] {
  return [
    <meta key={MUI_INSERTION_POINT_NAME} name={MUI_INSERTION_POINT_NAME} content="" />,
    <meta key={TSS_INSERTION_POINT_NAME} name={TSS_INSERTION_POINT_NAME} content="" />,
    <meta key={SSR_INSERTION_POINT_NAME} name={SSR_INSERTION_POINT_NAME} content="" />,
    ...extraHeadElements,
  ] as ReactElement[];
}
