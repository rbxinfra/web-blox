import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Tabs, Tab, TTabsProps, NotificationsIcon, makeStyles, Card } from '@rbx/ui';
import { createBooleanControl, createEnumControl, configureArgs } from './utils/controlUtils';

const notes = `Built over MUI v5 [Tab](https://v5.mui.com/api/tab/) and 
[Tabs](https://v5.mui.com/api/tabs/).

### 🔄 Changelog
1. [Tabs] Added a \`filled\` prop that supports supports booleans as values. The default value is \`false\`.
2. [Tabs] Removed \`filled\` prop. Removed \`textColor\` prop. Set tabs as Title Case.`;

export default {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: notes
      }
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=334%3A0'
    }
  }
} as Meta;

export const Base: StoryFn<
  Pick<TTabsProps, 'orientation' | 'scrollButtons' | 'variant'> & {
    showLabel: boolean;
    showLabelIcon: boolean;
    disabled: boolean;
  }
> = ({ orientation, scrollButtons, variant, showLabel, showLabelIcon, disabled }) => {
  const [value, setValue] = React.useState(1);
  const handleValueChange = (event: React.ChangeEvent<{}>, newValue: number): void => {
    setValue(newValue as number);
  };

  return (
    <React.Fragment>
      <Tabs
        value={value}
        variant={variant}
        orientation={orientation}
        scrollButtons={scrollButtons}
        onChange={handleValueChange as TTabsProps['onChange']}>
        <Tab
          disabled={disabled}
          label={showLabel && 'Tab label text 1'}
          icon={showLabelIcon ? <NotificationsIcon /> : undefined}
          value={1}
        />
        <Tab
          disabled={disabled}
          label={showLabel && 'Tab Label Text 2'}
          icon={showLabelIcon ? <NotificationsIcon /> : undefined}
          value={2}
        />
        <Tab
          disabled={disabled}
          label={showLabel && 'Tab Label Text 3'}
          icon={showLabelIcon ? <NotificationsIcon /> : undefined}
          value={3}
        />
        <Tab
          disabled={disabled}
          label={showLabel && 'Tab Label Text 4'}
          icon={showLabelIcon ? <NotificationsIcon /> : undefined}
          value={4}
        />
        <Tab
          disabled={disabled}
          label={showLabel && 'Tab Label Text 5'}
          icon={showLabelIcon ? <NotificationsIcon /> : undefined}
          value={5}
        />
      </Tabs>
    </React.Fragment>
  );
};
configureArgs(Base, {
  variant: createEnumControl('Defines the stylistic variant to use. ', 'standard', [
    'fullWidth',
    'scrollable',
    'standard'
  ]),
  orientation: createEnumControl('Defines the tabs orientation.', 'horizontal', [
    'horizontal',
    'vertical'
  ]),
  scrollButtons: createEnumControl(
    'Defines the scroll button behavior for the `scrollable` variant of tabs.',
    'auto',
    ['auto', 'desktop', 'off', 'on']
  ),
  showLabel: createBooleanControl(
    'Defines if the tab should show a label text via `label` prop.',
    true
  ),
  showLabelIcon: createBooleanControl(
    'Defines if the tab should show a custom icon via `icon` prop.',
    false
  ),
  disabled: createBooleanControl('Defines if the tab should be disabled.', false)
});

export const ControlledTabs: StoryFn = () => {
  const [tabValue, setTabValue] = React.useState(1);
  const handleValueChange = (_: React.ChangeEvent<{}>, newValue: number): void => {
    setTabValue(newValue as number);
  };

  return (
    <React.Fragment>
      <Tabs
        value={tabValue}
        variant='scrollable'
        onChange={handleValueChange as TTabsProps['onChange']}
        aria-label='tabs'>
        <Tab label='Javascript' value={1} />
        <Tab label='Swift' value={2} />
        <Tab label='Dart' value={3} />
      </Tabs>
      <Tabs
        value={tabValue}
        variant='scrollable'
        onChange={handleValueChange as TTabsProps['onChange']}
        aria-label='tabs'>
        <Tab label='Javascript' value={1} />
        <Tab label='Swift' value={2} />
        <Tab label='Dart' value={3} />
      </Tabs>
    </React.Fragment>
  );
};

export const CompositeTabs: StoryFn = () => {
  const [horizontalValue, sethorizontalValue] = React.useState(1);
  const [verticalValue, setVerticalValue] = React.useState(1);
  const handleVerticalValueChange = (evet: React.ChangeEvent<{}>, newValue: number): void => {
    setVerticalValue(newValue as number);
  };
  const handleHorizontalValueChange = (_: React.ChangeEvent<{}>, newValue: number): void => {
    sethorizontalValue(newValue as number);
  };
  const {
    classes: { horizontalDivStyle, verticalDivStyle }
  } = makeStyles()({
    cardStyle: {
      flexGrow: 1,
      display: 'flex'
    },
    horizontalDivStyle: {
      height: 48
    },
    verticalDivStyle: {
      width: 160
    }
  })();

  return (
    <Card>
      <div className={horizontalDivStyle}>
        <Tabs
          value={horizontalValue}
          variant='scrollable'
          orientation='horizontal'
          onChange={handleHorizontalValueChange as TTabsProps['onChange']}>
          <Tab label='Javascript' value={1} />
          <Tab label='Swift' value={2} />
          <Tab label='Dart' value={3} />
        </Tabs>
      </div>
      <div className={verticalDivStyle}>
        <Tabs
          value={verticalValue}
          variant='scrollable'
          orientation='vertical'
          onChange={handleVerticalValueChange as TTabsProps['onChange']}>
          <Tab label='Step 1' value={1} />
          <Tab label='Step 2' value={2} />
          <Tab label='Step 3' value={3} />
        </Tabs>
      </div>
    </Card>
  );
};
