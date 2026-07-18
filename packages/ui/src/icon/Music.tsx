import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import type { TSvgIconFunctionComponent } from './Icon';

function Music({ ref, ...props }: SvgIconProps) {
  return (
    <SvgIcon {...props} ref={ref} viewBox="0 0 32 32">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.4847 1.36916C25.7544 1.03058 27 1.98757 27 3.30163V22H25V9.30163L12 12.7683V25H10V6.7683C10 5.86219 10.6092 5.06929 11.4847 4.83583L24.4847 1.36916ZM12 10.6984L25 7.23174V3.30163L12 6.7683V10.6984Z"
      >music</path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 25C23.6569 25 25 23.6569 25 22C25 20.3432 23.6569 19 22 19C20.3431 19 19 20.3432 19 22C19 23.6569 20.3431 25 22 25ZM22 27C24.7614 27 27 24.7614 27 22C27 19.2386 24.7614 17 22 17C19.2386 17 17 19.2386 17 22C17 24.7614 19.2386 27 22 27Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 28C8.65685 28 10 26.6569 10 25C10 23.3432 8.65685 22 7 22C5.34315 22 4 23.3432 4 25C4 26.6569 5.34315 28 7 28ZM7 30C9.76142 30 12 27.7614 12 25C12 22.2386 9.76142 20 7 20C4.23858 20 2 22.2386 2 25C2 27.7614 4.23858 30 7 30Z"
      />
    </SvgIcon>
  );
}

Music.displayName = 'Music';

export default Music as TSvgIconFunctionComponent;