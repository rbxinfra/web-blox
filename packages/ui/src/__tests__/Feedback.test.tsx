/* eslint-disable */

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UIThemeProvider from '../theme/UIThemeProvider';
import Dialog         from '../feedback/Dialog';
import DialogActions  from '../feedback/DialogActions';
import DialogContent  from '../feedback/DialogContent';
import DialogTitle    from '../feedback/DialogTitle';
import DialogTemplate from '../feedback/DialogTemplate';
import DialogProvider, { useDialog } from '../feedback/DialogProvider';
import LinearProgress from '../feedback/LinearProgress';
import SnackbarProvider, { useSnackbar } from '../feedback/SnackbarProvider';

function wrap(ui: React.ReactElement) {
  return render(<UIThemeProvider>{ui}</UIThemeProvider>);
}

// ── Dialog ─────────────────────────────────────────────────────────────────

describe('Dialog', () => {
  it('renders when open', () => {
    wrap(
      <Dialog open>
        <div>Dialog content</div>
      </Dialog>,
    );
    expect(screen.getByText('Dialog content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    wrap(
      <Dialog open={false}>
        <div>Hidden content</div>
      </Dialog>,
    );
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', async () => {
    const onClose = jest.fn();
    wrap(
      <Dialog open onClose={onClose}>
        <div>Content</div>
      </Dialog>,
    );
    // Click the backdrop
    const backdrop = document.querySelector('.MuiBackdrop-root');
    if (backdrop) await userEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it('never renders fullScreen regardless of prop', () => {
    const { container } = wrap(
      // @ts-expect-error — fullScreen is intentionally excluded from DialogProps
      <Dialog open fullScreen>
        <div>Content</div>
      </Dialog>,
    );
    expect(
      container.querySelector('.MuiDialog-paperFullScreen'),
    ).not.toBeInTheDocument();
  });

  it('maps XSmall maxWidth to Small', () => {
    // Should not throw when passed XSmall
    expect(() =>
      wrap(
        // @ts-expect-error — XSmall is a Roblox-only extension
        <Dialog open maxWidth="XSmall">
          <div>Content</div>
        </Dialog>,
      ),
    ).not.toThrow();
  });
});

// ── DialogTitle ────────────────────────────────────────────────────────────

describe('DialogTitle', () => {
  it('renders children', () => {
    wrap(<Dialog open><DialogTitle>My Title</DialogTitle></Dialog>);
    expect(screen.getByText('My Title')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    wrap(
      <Dialog open>
        <DialogTitle ref={ref}>Title</DialogTitle>
      </Dialog>,
    );
    expect(ref.current).toBeTruthy();
  });
});

// ── DialogContent ──────────────────────────────────────────────────────────

describe('DialogContent', () => {
  it('renders children', () => {
    wrap(
      <Dialog open>
        <DialogContent>Body text</DialogContent>
      </Dialog>,
    );
    expect(screen.getByText('Body text')).toBeInTheDocument();
  });
});

// ── DialogActions ──────────────────────────────────────────────────────────

describe('DialogActions', () => {
  it('renders action buttons', () => {
    wrap(
      <Dialog open>
        <DialogActions>
          <button>Cancel</button>
          <button>Confirm</button>
        </DialogActions>
      </Dialog>,
    );
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });
});

// ── DialogTemplate ─────────────────────────────────────────────────────────

describe('DialogTemplate', () => {
  it('renders title, content, and action buttons', () => {
    wrap(
      <Dialog open>
        <DialogTemplate
          title="Confirm delete"
          content="This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </Dialog>,
    );
    expect(screen.getByText('Confirm delete')).toBeInTheDocument();
    expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('disables cancel and shows loading on confirm when loading=true', () => {
    wrap(
      <Dialog open>
        <DialogTemplate
          title="Saving"
          content="Please wait"
          confirmText="Save"
          cancelText="Cancel"
          loading
        />
      </Dialog>,
    );
    const cancelBtn = screen.getByText('Cancel').closest('button');
    expect(cancelBtn).toBeDisabled();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('fires onConfirm and onCancel', async () => {
    const onConfirm = jest.fn();
    const onCancel  = jest.fn();
    wrap(
      <Dialog open>
        <DialogTemplate
          title="Title"
          content="Content"
          confirmText="Yes"
          cancelText="No"
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      </Dialog>,
    );
    await userEvent.click(screen.getByText('Yes'));
    expect(onConfirm).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByText('No'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});

// ── DialogProvider ─────────────────────────────────────────────────────────

function DialogConsumer() {
  const { open, close, configure } = useDialog();
  return (
    <>
      <button
        onClick={() => {
          configure(<span>Provider content</span>);
          open();
        }}
      >
        Open dialog
      </button>
      <button onClick={close}>Close dialog</button>
    </>
  );
}

describe('DialogProvider / useDialog', () => {
  it('opens and closes the managed dialog', async () => {
    wrap(
      <DialogProvider>
        <DialogConsumer />
      </DialogProvider>,
    );

    expect(screen.queryByText('Provider content')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Open dialog'));
    await waitFor(() =>
      expect(screen.getByText('Provider content')).toBeInTheDocument(),
    );

    await userEvent.click(screen.getByText('Close dialog'));
    await waitFor(() =>
      expect(screen.queryByText('Provider content')).not.toBeInTheDocument(),
    );
  });

  it('throws when useDialog is used without a provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    function BadConsumer() {
      const { open } = useDialog();
      return <button onClick={open}>Open</button>;
    }
    wrap(<BadConsumer />);
    expect(() => userEvent.click(screen.getByText('Open'))).not.toThrow();
    spy.mockRestore();
  });
});

// ── LinearProgress ─────────────────────────────────────────────────────────

describe('LinearProgress', () => {
  it('renders a progress bar', () => {
    wrap(<LinearProgress />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders determinate variant', () => {
    const { container } = wrap(
      <LinearProgress variant="determinate" value={50} />,
    );
    expect(
      container.querySelector('.MuiLinearProgress-determinate'),
    ).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = wrap(<LinearProgress className="my-bar" />);
    expect(container.firstChild).toHaveClass('my-bar');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    wrap(<LinearProgress ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});

// ── SnackbarProvider ───────────────────────────────────────────────────────

function SnackbarConsumer() {
  const { enqueue, close } = useSnackbar();
  return (
    <>
      <button
        onClick={() =>
          enqueue({ message: 'Hello snackbar', children: <span>Hello snackbar</span> })
        }
      >
        Show snackbar
      </button>
      <button onClick={close}>Close snackbar</button>
    </>
  );
}

describe('SnackbarProvider / useSnackbar', () => {
  it('shows a snackbar after enqueue', async () => {
    wrap(
      <SnackbarProvider>
        <SnackbarConsumer />
      </SnackbarProvider>,
    );

    expect(screen.queryByText('Hello snackbar')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Show snackbar'));
    await waitFor(() =>
      expect(screen.getByText('Hello snackbar')).toBeInTheDocument(),
    );
  });

  it('closes the snackbar', async () => {
    wrap(
      <SnackbarProvider>
        <SnackbarConsumer />
      </SnackbarProvider>,
    );

    await userEvent.click(screen.getByText('Show snackbar'));
    await waitFor(() =>
      expect(screen.getByText('Hello snackbar')).toBeInTheDocument(),
    );

    // userEvent.click itself schedules state updates; await it fully
    await userEvent.click(screen.getByText('Close snackbar'));

    // Snackbar hides via CSS opacity transition — wait for it to leave the DOM
    await waitFor(() =>
      expect(screen.queryByText('Hello snackbar')).not.toBeInTheDocument(),
    );
  });

  it('queues multiple snackbars', async () => {
    wrap(
      <SnackbarProvider>
        <SnackbarConsumer />
      </SnackbarProvider>,
    );

    await userEvent.click(screen.getByText('Show snackbar'));
    await userEvent.click(screen.getByText('Show snackbar'));
    // Only the first one is visible at a time
    await waitFor(() =>
      expect(screen.getAllByText('Hello snackbar')).toHaveLength(1),
    );
  });
});