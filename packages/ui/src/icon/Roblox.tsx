import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import type { TSvgIconFunctionComponent } from './Icon';

function Roblox({ ref, ...props }: SvgIconProps) {
	return (
		<SvgIcon {...props} ref={ref} viewBox="0 0 16 16">
			<path d="M3.38116 0L0 12.6188L12.6188 16L16 3.38116L3.38116 0ZM9.291 10.2363L5.76484 9.291L6.71013 5.76484L10.2377 6.71013L9.291 10.2363Z" />
		</SvgIcon>
	);
}

Roblox.displayName = 'Roblox';

export default Roblox as TSvgIconFunctionComponent;