import type { Theme } from "@mui/material/styles";

import type { TElevation } from "./elevationTypes";
import type { TBorder } from "./borderTypes";
import type { TPalette } from "./colorPaletteTypes";

export interface TTheme extends Omit<Theme, 'palette'> {
    elevation: TElevation;
    border: TBorder;
    palette: TPalette;
};