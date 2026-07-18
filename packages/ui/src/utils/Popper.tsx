/* Shim for Popper */

import Popper from '@mui/material/Popper';
import popperClasses from '@mui/material/Popper/popperClasses';

export { popperClasses };

export {
  type PopperProps as TPopperProps,
  type PopperClasses as TPopperClasses,
  type PopperClassKey as TPopperClassKey
} from '@mui/material/Popper';

export default Popper;