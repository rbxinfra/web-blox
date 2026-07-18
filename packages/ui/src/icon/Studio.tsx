import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import type { TSvgIconFunctionComponent } from './Icon';

function Studio({ ref, ...props }: SvgIconProps) {
  return (
    <SvgIcon {...props} ref={ref} viewBox="0 0 33 33">
      <path d="M6.78817 0.975342L3.21606 14.3004L12.3069 16.7337L13.4424 12.4994L29.5881 16.8264L32.0247 7.73884L6.78817 0.975342Z" />
      <path d="M18.6069 21.448L2.46124 17.1211L0.0246582 26.2119L25.2611 32.9754L28.8332 19.6504L19.7424 17.2138L18.6069 21.448Z" />
    </SvgIcon>
  );
}

Studio.displayName = 'Studio';

export default Studio as TSvgIconFunctionComponent;