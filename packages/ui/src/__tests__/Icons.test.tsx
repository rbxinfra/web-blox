/* eslint-disable */

import React from 'react';
import { render, screen } from '@testing-library/react';

import AdjustIcon        from '../icon/Adjust';
import LimitedIcon       from '../icon/Limited';
import RobloxIcon        from '../icon/Roblox';
import RobuxIcon         from '../icon/Robux';
import StudioIcon        from '../icon/Studio';
import { Instagram, Facebook, LinkedIn, X, YouTube } from '../icon/Social';
import BuilderHomeIcon   from '../icon/builder/BuilderHome';
import BuilderHomeFillIcon from '../icon/builder/BuilderHomeFill';
import BuilderNineDotGridIcon from '../icon/builder/BuilderNineDotGrid';

// All custom icons follow the same pattern:
// - Render an <svg> element (MUI SvgIcon)
// - Accept standard SvgIconProps (className, fontSize, color, etc.)
// - Pass extra props through to SvgIcon

const CUSTOM_ICONS = [
  { name: 'AdjustIcon',   Component: AdjustIcon  },
  { name: 'LimitedIcon',  Component: LimitedIcon },
  { name: 'RobloxIcon',   Component: RobloxIcon  },
  { name: 'RobuxIcon',    Component: RobuxIcon   },
  { name: 'StudioIcon',   Component: StudioIcon  },
  { name: 'Instagram',    Component: Instagram   },
  { name: 'Facebook',     Component: Facebook    },
  { name: 'LinkedIn',     Component: LinkedIn    },
  { name: 'X',           Component: X           },
  { name: 'YouTube',      Component: YouTube     },
  { name: 'BuilderHomeIcon',       Component: BuilderHomeIcon       },
  { name: 'BuilderHomeFillIcon',   Component: BuilderHomeFillIcon   },
  { name: 'BuilderNineDotGridIcon', Component: BuilderNineDotGridIcon },
];

describe('Custom Roblox icons', () => {
  CUSTOM_ICONS.forEach(({ name, Component }) => {
    describe(name, () => {
      it('renders an svg element', () => {
        const { container } = render(<Component />);
        expect(container.querySelector('svg')).toBeInTheDocument();
      });

      it('applies className prop', () => {
        const { container } = render(<Component className="test-class" />);
        expect(container.querySelector('svg')).toHaveClass('test-class');
      });

      it('applies aria-label prop', () => {
        render(<Component aria-label={`${name} icon`} />);
        expect(screen.getByLabelText(`${name} icon`)).toBeInTheDocument();
      });

      it('applies data-testid prop', () => {
        render(<Component data-testid="icon" />);
        expect(screen.getByTestId('icon')).toBeInTheDocument();
      });
    });
  });
});

// MUI icon re-exports
describe('MUI icon re-exports', () => {
  it('exports Settings from @mui/icons-material', async () => {
    const { SettingsIcon } = await import('../icon/Icon');
    expect(SettingsIcon).toBeDefined();
    const { container } = render(<SettingsIcon />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('exports CallMade from @mui/icons-material', async () => {
    const { CallMadeIcon } = await import('../icon/Icon');
    expect(CallMadeIcon).toBeDefined();
  });

  it('exports Close from @mui/icons-material', async () => {
    const { CloseIcon } = await import('../icon/Icon');
    expect(CloseIcon).toBeDefined();
  });
});