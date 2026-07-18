import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider as MuiLocalizationProvider, type LocalizationProviderProps as MuiLocalizationProviderProps } from "@mui/x-date-pickers/LocalizationProvider";

export interface TLocalizationProviderProps extends Omit<MuiLocalizationProviderProps, 'dateAdapter'> {
}

function PickersUtilsProvider({ children, ...otherProps }: TLocalizationProviderProps) {
  return (
    <MuiLocalizationProvider
      {...otherProps}
      dateAdapter={AdapterDateFns}>
      {children}
    </MuiLocalizationProvider>
  )
}

PickersUtilsProvider.displayName = 'PickersUtilsProvider'

export default PickersUtilsProvider;