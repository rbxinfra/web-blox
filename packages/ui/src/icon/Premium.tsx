import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import type { TSvgIconFunctionComponent } from './Icon';

function Premium({ ref, ...props }: SvgIconProps) {
  return (
    <SvgIcon {...props} ref={ref} viewBox="0 0 32 32">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28 24a4 4 0 01-4 4H14v-4h10V4H4v24a4 4 0 01-4-4V4a4 4 0 014-4h20a4 4 0 014 4zm-7-7v4h-7v-4h3v-6h-6v17H7V7h14v10z"
      />
    </SvgIcon>
  );
}

Premium.displayName = 'Premium';

export default Premium as TSvgIconFunctionComponent;