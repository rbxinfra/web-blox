import { useEffect } from 'react';

import { Title, Subtitle, Description, Controls, Stories, Primary } from '@storybook/addon-docs/blocks';

import { UIThemeProvider, darkTheme, lightTheme } from '@rbx/ui';
import { StyledEngineProvider } from '@mui/styled-engine';

const stylesDecorator = (Story, context) => {
  const currentTheme = context.globals.theme || 'dark';

  useEffect(() => {
    const docsContainers = document.querySelectorAll('.docs-story, .sbdocs-content');

    docsContainers.forEach((container) => {
      if (currentTheme === 'dark') {
        container.classList.add('dark');
        container.classList.remove('light');
        container.setAttribute('data-theme', 'dark');
      } else {
        container.classList.add('light');
        container.classList.remove('dark');
        container.setAttribute('data-theme', 'light');
      }
    });
  }, [currentTheme]);

  return (
    <StyledEngineProvider>
      <UIThemeProvider theme={currentTheme}>
        <Story />
      </UIThemeProvider>
    </StyledEngineProvider>
  );
};

const preview = {
  initialGlobals: {
    theme: 'dark',
    backgrounds: {
      value: 'dark'
    }
  },

  tags: ['autodocs'],

  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "dark", icon: "circle", title: "dark" },
          { value: "light", icon: "circlehollow", title: "light" }
        ],
        showName: true
      }
    }
  },

  decorators: [stylesDecorator],

  parameters: {
    viewMode: "docs",
    controls: {
      expanded: true
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Introduction", "Theme", "Components", "Community"]
      }
    },
    docs: {
      codePanel: true,

      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
      source: {
        transform: (src) => src?.replace(/WithRef/g, ''),
      }
    },
    backgrounds: {
      default: darkTheme.palette.mode,
      values: [
        {
          name: darkTheme.palette.mode,
          value: darkTheme.palette.background.default
        },
        {
          name: lightTheme.palette.mode,
          value: lightTheme.palette.background.default
        }
      ],
      options: {
        dark: {
          name: darkTheme.palette.mode,
          value: darkTheme.palette.background.default
        },
        light: {
          name: lightTheme.palette.mode,
          value: lightTheme.palette.background.default
        }
      }
    }
  }
};

export default preview;
