export type TColorScale = Record<number, string>;
export type TAlphaScale = Record<number, number>;

export interface TAlphaColorScale {
    black: TColorScale;
    white: TColorScale;

    mutedBlue: {
        dark: TColorScale;
        light: TColorScale;
    }
}

export interface TAlertColorScale {
    green: string;
    red: string;
    yellow: string;
    blue: string;
}

export interface TStatusColorScale {
    important: string;
    notice: string;
    active: string;
    actionBlue: string;
}