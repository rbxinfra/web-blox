export type TRadiusValue = string | number;

export interface TRadiusSet {
    none: Record<string, TRadiusValue>;
    xsmall: Record<string, TRadiusValue>;
    small: Record<string, TRadiusValue>;
    medium: Record<string, TRadiusValue>;
    large: Record<string, TRadiusValue>;
    circle: Record<string, TRadiusValue>;
}

export interface TBorder {
    radius: {
        none: Record<string, TRadiusValue>;
        xsmall: Record<string, TRadiusValue>;
        small: Record<string, TRadiusValue>;
        medium: Record<string, TRadiusValue>;
        large: Record<string, TRadiusValue>;
        circle: Record<string, TRadiusValue>;
        bottomLeft: TRadiusSet;
        bottomRight: TRadiusSet;
        topLeft: TRadiusSet;
        topRight: TRadiusSet;
    };
}