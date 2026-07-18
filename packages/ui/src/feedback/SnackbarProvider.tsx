import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import Snackbar, { type TSnackbarProps, type TSnackbarCloseReason } from './Snackbar';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TSnackbarItem {
  /** Props passed to MUI Snackbar */
  props: Partial<TSnackbarProps>;
  /**
   * Predicate called with the close reason.
   * Return true to allow the snackbar to close, false to keep it open.
   * Defaults to always returning true.
   */
  shouldClose: (reason: TSnackbarCloseReason) => boolean;
}

export interface TSnackbarContext {
  ref: React.RefObject<HTMLDivElement | null>;
  enqueue: (props?: Partial<TSnackbarProps>, shouldClose?: TSnackbarItem['shouldClose']) => void;
  close: () => void;
}

// ── Context ───────────────────────────────────────────────────────────────────

const SnackbarContext = createContext<TSnackbarContext>({
  ref: { current: null },
  enqueue: () => { throw new Error('useSnackbar was invoked without SnackbarProvider'); },
  close: () => { throw new Error('useSnackbar was invoked without SnackbarProvider'); },
});

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useSnackbar(): Pick<TSnackbarContext, 'ref' | 'enqueue' | 'close'> {
  const ctx = useContext(SnackbarContext);
  return { ref: ctx.ref, enqueue: ctx.enqueue, close: ctx.close };
}

// ── Provider ──────────────────────────────────────────────────────────────────

export interface TSnackbarProviderProps
  extends Omit<TSnackbarProps, 'open' | 'onClose' | 'children'> {
  children?: ReactNode;
}

function SnackbarProvider({ children, ...defaultProps }: TSnackbarProviderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [snackbarQueue, setSnackbarQueue] = useState<TSnackbarItem[]>([]);

  const enqueue = useCallback(
    (
      props: Partial<TSnackbarProps> = {},
      shouldClose: TSnackbarItem['shouldClose'] = () => true,
    ) => {
      setSnackbarQueue(prev => [...prev, { props, shouldClose }]);
    },
    [setSnackbarQueue],
  );

  const close = useCallback(() => setIsOpen(false), []);

  // Open whenever a new item arrives in the queue
  useEffect(() => {
    if (snackbarQueue.length > 0) setIsOpen(true);
  }, [snackbarQueue.length]);

  const contextValue = useMemo<TSnackbarContext>(
    () => ({ ref: ref, enqueue, close }),
    [enqueue, close],
  );

  const current = snackbarQueue[0];

  return (
    <>
      <SnackbarContext.Provider value={contextValue}>
        {children}
      </SnackbarContext.Provider>

      <Snackbar
        {...(current?.props ?? {})}
        {...defaultProps}
        TransitionProps={{
          ...(current?.props.TransitionProps ?? {}),
          onExited: node => {
            setSnackbarQueue(prev => prev.slice(1));
            current?.props.TransitionProps?.onExited?.(node);
          },
        }}
        onClose={(event, reason) => {
          if (current?.shouldClose(reason) ?? true)
            setIsOpen(false);

          current?.props.onClose?.(event, reason);
        }}
        open={isOpen}
        ref={ref}
      >
        {current?.props.children}
      </Snackbar>
    </>
  );
}

export default SnackbarProvider;