import { forwardRef } from 'react';
import MuiPagination, {
  type PaginationProps as MuiPaginationProps
} from '@mui/material/Pagination';

import { PaginationItem } from './PaginationItem';
import ReducedPagination, { type TReducedPaginationProps } from './ReducedPagination';

export type {
  PaginationProps as TDefaultPaginationProps
} from '@mui/material/Pagination';

// ── Types ─────────────────────────────────────────────────────────────────

export type TPaginationVariant = MuiPaginationProps['variant'] | 'reduced';

export interface TPaginationProps extends Omit<TReducedPaginationProps, 'variant' | 'ref'> {
  variant?: TPaginationVariant;
  ref?: React.ForwardedRef<HTMLElement>;
}

// ── Component ─────────────────────────────────────────────────────────────────

function PaginationWithRef(
  props: TPaginationProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  return props.variant === 'reduced'
    ? <ReducedPagination {...(props as Omit<TReducedPaginationProps, 'ref'>)} />
    : <MuiPagination
      {...(props as MuiPaginationProps)}
      renderItem={props.renderItem ?? ((params) => (<PaginationItem {...params} />))}
      ref={ref}
    />
}

PaginationWithRef.displayName = 'PaginationWithRef';

const Pagination = forwardRef<HTMLElement, TPaginationProps>(PaginationWithRef);

export default Pagination;