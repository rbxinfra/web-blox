import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Typography, Grid, makeStyles, getTypographyProperties, TypographyStyles } from '@rbx/ui';
import { createEnumControl, configureArgs } from '../utils/controlUtils';
import { defaultTypographyToken, customTypographyToken } from './typographyData';

const description = `Typography is a foundational area of our system and 
represents all the words and content of our experience. The Type System 
was built for flexibility — enabling anyone to create a page that looks 
legible and easy to comprehend.

It uses a type scale similar to a number scale, much like our other components. 
This helps to keep our language around sizing and weight consistent as we move 
from experience to experience and team to team. 

This system works in ramp using increments of 25, 50 and 100. The scale ranges 
from 100 (_smallest_) to 1200 (_largest_). This scale can be added to, if necessary. 

We use 3 weights: Bold, Medium, and Regular. We believe these 3 weights 
result in the best expression of typography without giving designers 
too little or too many options. 

Details of these tokens and usage can be reviewed in [Figma](https://www.figma.com/file/Os7ku6Qx3GXnybSd7aZiY8/%5B-RDL-%5D-Foundations?type=design&node-id=1100-38790&mode=design&t=JDXUBINjIUiXgTFn-4).`;

export default {
  title: "Theme/Typography",
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/btUncR4qkxWKHtLOU1d2zH/uiBlox-Creator-Web-Library?node-id=7817%3A53106',
    },
  },
} as Meta;

export const TypeStyleAndScale: StoryFn<{
  style: keyof typeof TypographyStyles;
}> = ({ style }) => {
  return (
    <React.Fragment>
      {Object.keys(TypographyStyles[style]).map(scale => (
        <div style={{ display: 'flex', alignItems: 'center' }} key={`${style}-${scale}`}>
          <div style={{ width: 100 }}>
            <Typography color='primary'>{scale}</Typography>
          </div>
          <span
            style={{
              ...getTypographyProperties(
                style,
                scale as keyof typeof TypographyStyles[keyof typeof TypographyStyles]
              ),
              paddingLeft: 20
            }}>
            This is some Text
          </span>
        </div>
      ))}
    </React.Fragment>
  );
}

TypeStyleAndScale.parameters = {
  docs: {
    // disable: true,
  },
};

configureArgs(TypeStyleAndScale, {
  style: createEnumControl('Defines the typography fonts', 'Display', Object.keys(TypographyStyles))
});

export const TypeVariant: StoryFn = () => {
  const {
    classes: { header, row }
  } = makeStyles()({
    header: {
      padding: 10,
      borderBottom: `1px solid white`
    },
    row: {
      minHeight: 50,
      padding: 10,
      borderBottom: '1px solid white'
    }
  })();

  return (
    <Grid container>
      <Grid classes={{ root: header }} item xs={6}>
        <Typography variant='h5' color='primary'>
          Variant Name
        </Typography>
      </Grid>
      <Grid classes={{ root: header }} item xs={6}>
        <Typography variant='h5' color='primary'>
          Token
        </Typography>
      </Grid>
      {[...defaultTypographyToken, ...customTypographyToken].map(({ styleName, token }) => (
        <React.Fragment key={styleName}>
          <Grid classes={{ root: row }} item xs={6}>
            <Typography variant={styleName}>{styleName}</Typography>
          </Grid>
          <Grid classes={{ root: row }} item xs={6}>
            <Typography variant={styleName}>{token}</Typography>
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
};

TypeVariant.parameters = {
  docs: {
    description: {
      story: `Typography variants add a semantic layer to our type scale and sets the theme's typography styles. The names of the variants help us standardize the product experience such that text that is used in similar use cases is presented in the consistent style.`
      ,
    },
  }
}