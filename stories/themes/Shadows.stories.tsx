import { Typography, makeStyles, shadows } from '@rbx/ui';

export default {
  title: 'Theme/Shadows',
  component: shadows,
};

export const Base: React.FC = () => {
  const {
    classes: { background, foreground, shadowCard }
  } = makeStyles()(theme => ({
    background: {
      backgroundColor: theme.palette.content.standard,
      padding: 10,
      borderRadius: 5,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))'
    },
    foreground: {
      padding: 10,
      color: theme.palette.content.inverse
    },
    shadowCard: {
      width: 72,
      height: 72
    }
  }))();

  return (
    <div className={background}>
      {shadows.slice(1, shadows.length).map((idx, shadow) => (
        <div key={idx} className={foreground}>
          <Typography variant='largeLabel1' color='inherit'>
            Shadow Level {shadow + 1}
          </Typography>
          <div
            className={shadowCard}
            style={{
              boxShadow: shadows[shadow + 1]
            }}
          />
        </div>
      ))}
    </div>
  );
};