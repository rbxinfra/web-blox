import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import type { TSvgIconFunctionComponent } from './Icon';

function PlusHeavy({ ref, ...props }: SvgIconProps) {
  return (
    <SvgIcon {...props} ref={ref} viewBox="0 0 32 32">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 6C16.789 6 17.4286 6.63959 17.4286 7.42857V14.5714H24.5714C25.3604 14.5714 26 15.211 26 16C26 16.789 25.3604 17.4286 24.5714 17.4286H17.4286V24.5714C17.4286 25.3604 16.789 26 16 26C15.211 26 14.5714 25.3604 14.5714 24.5714V17.4286H7.42857C6.63959 17.4286 6 16.789 6 16C6 15.211 6.63959 14.5714 7.42857 14.5714H14.5714V7.42857C14.5714 6.63959 15.211 6 16 6Z"
      />
    </SvgIcon>
  );
}

PlusHeavy.displayName = 'PlusHeavy';

export default PlusHeavy as TSvgIconFunctionComponent;