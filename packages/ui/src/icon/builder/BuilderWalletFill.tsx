import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';

function BuilderWalletFill({ ref, ...props }: SvgIconProps) {
  return (
    <SvgIcon {...props} ref={ref} viewBox="0 0 32 32" width="32" height="32">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 4C23.1046 4 24 4.89543 24 6L8 6C7.44772 6 7 6.44772 7 7C7 7.55228 7.44772 8 8 8L26.2192 8C27.1315 8 27.9559 8.624 28.1477 9.55954C28.4403 10.9877 29 14.2106 29 18C29 21.7894 28.4403 25.0123 28.1477 26.4405C27.9559 27.376 27.1315 28 26.2192 28L5 28C3.89543 28 3 27.1046 3 26V7C3 5.34314 4.34315 4 6 4H22ZM19.5453 16.3793C19.8113 15.3869 20.8313 14.7979 21.8238 15.0639L23.6207 15.5453C24.6131 15.8113 25.2021 16.8313 24.9361 17.8238L24.4547 19.6207C24.1887 20.6131 23.1687 21.2021 22.1762 20.9361L20.3793 20.4547C19.3869 20.1887 18.7979 19.1687 19.0639 18.1762L19.5453 16.3793Z"
      />
    </SvgIcon>
  );
}

BuilderWalletFill.displayName = 'BuilderWalletFill';

export default BuilderWalletFill;