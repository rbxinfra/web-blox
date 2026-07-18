import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import type { TSvgIconFunctionComponent } from './Icon';

function Playing({ ref, ...props }: SvgIconProps) {
  return (
    <SvgIcon {...props} ref={ref} viewBox="0 0 16 16">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 8.8125C5.37563 8.8125 2.4375 11.7506 2.4375 15.375V16.6875H15.5625V15.375C15.5625 11.7506 12.6244 8.8125 9 8.8125ZM12.1875 12.9375L7.6875 10.3125V15.5625L12.1875 12.9375Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.4375 3.75C5.4375 2.61091 6.36091 1.6875 7.5 1.6875H10.5C11.6391 1.6875 12.5625 2.61091 12.5625 3.75V5.25C12.5625 6.38909 11.6391 7.3125 10.5 7.3125H7.5C6.36091 7.3125 5.4375 6.38909 5.4375 5.25V3.75Z"
      />
    </SvgIcon>
  );
}

Playing.displayName = 'Playing';

export default Playing as TSvgIconFunctionComponent;