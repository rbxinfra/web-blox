import { forwardRef } from 'react';
import type { PaginationProps as MuiPaginationProps } from '@mui/material/Pagination';

import type { TTheme } from '../theme/theme';
import makeStyles from '../styles/makeStyles';

import { paginationItemClasses, PaginationItem, type TPaginationItemProps } from './PaginationItem';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TReducedPaginationProps extends Omit<MuiPaginationProps, 'ref'> {
  previousProps?: Partial<TPaginationItemProps>;
  pageProps?: Partial<TPaginationItemProps>;
  nextProps?: Partial<TPaginationItemProps>;
}

// ── Styles ────────────────────────────────────────────────────────────────────

export const useStyles = makeStyles({ name: 'ReducedPagination' })(
  (theme: TTheme) => ({
    page: {
      [`&.${paginationItemClasses.selected}`]: {
        [`&${paginationItemClasses.disabled}`]: {
          color: theme.palette.content.standard
        }
      }
    }
  }),
);

// ── Component ─────────────────────────────────────────────────────────────────

const ReducedPagination = forwardRef<HTMLElement, TReducedPaginationProps>(
  function ReducedPagination(
    {
      classes,
      className,
      size,
      shape,
      page,
      previousProps,
      pageProps,
      nextProps,
      ...otherProps
    }: TReducedPaginationProps,
    ref: React.ForwardedRef<HTMLElement>
  ) {
    const { classes: mergedClasses } = useStyles(
      undefined,
      {
        props: {
          classes: pageProps?.classes
        }
      }
    );

    return (
      <nav
        {...(otherProps as React.HTMLAttributes<HTMLElement>)}
        aria-label='pagination navigation'
        className={classes?.root ?? className}
        ref={ref}
      >
        <PaginationItem
          aria-label='Go to previous page'
          {...previousProps}
          size={size}
          shape={shape}
          type="previous"
        />
        <PaginationItem
          aria-label={`page ${page}`}
          {...pageProps}
          classes={mergedClasses}
          size={size}
          shape={shape}
          page={page}
          selected
          disabled
          type='page'
        />
        <PaginationItem
          aria-label='Go to next page'
          {...nextProps}
          size={size}
          shape={shape}
          type='next'
        />
      </nav>
    )
  }
);

ReducedPagination.displayName = 'PaginationReduced';

export default ReducedPagination;