import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import Dialog, { type TDialogProps } from './Dialog';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TDialogContext {
  ref: React.RefObject<HTMLDivElement | null>;
  open: () => void;
  close: () => void;
  configure: (children: ReactNode, props?: Partial<TDialogProps>) => void;
}

// ── Context ───────────────────────────────────────────────────────────────────

const DialogContext = createContext<TDialogContext>({
  ref: { current: null },
  configure: () => { throw new Error('useDialog was invoked without DialogProvider'); },
  open: () => { throw new Error('useDialog was invoked without DialogProvider'); },
  close: () => { throw new Error('useDialog was invoked without DialogProvider'); },
});

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useDialog(): Pick<TDialogContext, 'ref' | 'open' | 'close' | 'configure'> {
  const ctx = useContext(DialogContext);
  return { ref: ctx.ref, open: ctx.open, close: ctx.close, configure: ctx.configure };
}

// ── Provider ──────────────────────────────────────────────────────────────────

export interface TDialogProviderProps
  extends Omit<TDialogProps, 'open' | 'onClose' | 'children'> {
  children?: ReactNode;
}

function DialogProvider({ children, ...defaultProps }: TDialogProviderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [dialogConfig, setDialogConfig] = useState<{
    props: Partial<TDialogProps>;
    children: ReactNode;
  }>({ props: {}, children: undefined });
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), [setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);
  const configure = useCallback(
    (children: ReactNode, props: Partial<TDialogProps> = {}) => {
      setDialogConfig({ props, children: children });
    },
    [setDialogConfig],
  );

  const contextValue = useMemo<TDialogContext>(
    () => ({ ref, open, close, configure }),
    [close, configure, open],
  );

  return (
    <>
      <DialogContext.Provider value={contextValue}>
        {children}
      </DialogContext.Provider>

      <Dialog
        {...dialogConfig.props}
        {...defaultProps}
        aria-labelledby={(dialogConfig.props as { id?: string }).id}
        aria-describedby="dialog-content-text-describe-id"
        open={isOpen}
        onClose={close}
        ref={ref}
      >
        {dialogConfig.children}
      </Dialog>
    </>
  );
}

DialogProvider.displayName = 'DialogProvider';

export default DialogProvider;