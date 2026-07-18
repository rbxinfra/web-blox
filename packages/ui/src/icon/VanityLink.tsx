import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import { useTheme } from '../utils/utils';
import type { TSvgIconFunctionComponent } from './Icon';

function VanityLink({ ref, ...props }: SvgIconProps) {
  const theme = useTheme();

  return (
    <SvgIcon {...props} ref={ref} viewBox="0 0 16 17">
      <svg fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3.9 8.3H9.1V9.7H3.9V8.3ZM11.765 9H13C13 7.068 11.544 5.5 9.75 5.5H7.15V6.83H9.75C10.8615 6.83 11.765 7.803 11.765 9ZM1.235 9C1.235 7.803 2.1385 6.83 3.25 6.83H5.85V5.5H3.25C1.456 5.5 0 7.068 0 9C0 10.932 1.456 12.5 3.25 12.5H5.85V11.17H3.25C2.1385 11.17 1.235 10.197 1.235 9Z"
          fill={theme.palette.states.active}
        />
        <path
          d="M14.3636 11.8684L14.875 10.7105L16 10.1842L14.875 9.65789L14.3636 8.5L13.8523 9.65789L12.7273 10.1842L13.8523 10.7105L14.3636 11.8684ZM11.2955 12.0789L10.2727 9.76316L9.25 12.0789L7 13.1316L9.25 14.1842L10.2727 16.5L11.2955 14.1842L13.5455 13.1316L11.2955 12.0789Z"
          fill={theme.palette.content.alert.notice}
        />
      </svg>
    </SvgIcon>
  );
}

VanityLink.displayName = 'VanityLink';

export default VanityLink as TSvgIconFunctionComponent;