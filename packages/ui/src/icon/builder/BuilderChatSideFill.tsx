import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';

function BuilderChatSideFill({ ref, ...props }: SvgIconProps) {
  return (
    <SvgIcon {...props} ref={ref} viewBox="0 0 32 32" width="32" height="32">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30 6V21.3057C30 22.2834 29.2939 23.1136 28.324 23.2371C26.8582 23.4238 24.5109 23.6788 21.6035 23.8415L16.7595 28.6854C16.3401 29.1049 15.6599 29.1049 15.2405 28.6854L10.3965 23.8415C7.48912 23.6788 5.1418 23.4238 3.67597 23.2371C2.70612 23.1136 2 22.2834 2 21.3057V6C2 4.89543 2.89543 4 4 4H28C29.1046 4 30 4.89543 30 6ZM10 12C10 11.4477 10.4477 11 11 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H11C10.4477 13 10 12.5523 10 12ZM13.5 15C12.9477 15 12.5 15.4477 12.5 16C12.5 16.5523 12.9477 17 13.5 17H18.5C19.0523 17 19.5 16.5523 19.5 16C19.5 15.4477 19.0523 15 18.5 15H13.5Z"
      />
    </SvgIcon>
  );
}

BuilderChatSideFill.displayName = 'BuilderChatSideFill';

export default BuilderChatSideFill;