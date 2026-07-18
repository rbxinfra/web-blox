import type { TRadiusValue, TBorder, TRadiusSet } from "./types/borderTypes";

export enum BorderCorner {
  BottomLeft = 'borderBottomLeftRadius',
  BottomRight = 'borderBottomRightRadius',
  TopLeft = 'borderTopLeftRadius',
  TopRight = 'borderTopRightRadius',
  All = 'borderRadius',
}

function getBorderCornerRadiusStyles(value: TRadiusValue, corner: BorderCorner): Record<string, TRadiusValue> {
  return { [corner]: value };
}

function getBorderCornerRadiusStyleOptions(corner: BorderCorner): TRadiusSet {
  return {
    none:    getBorderCornerRadiusStyles(0, corner),
    xsmall:  getBorderCornerRadiusStyles('4px', corner),
    small:   getBorderCornerRadiusStyles('6px', corner),
    medium:  getBorderCornerRadiusStyles('8px', corner),
    large:   getBorderCornerRadiusStyles('12px', corner),
    circle:  getBorderCornerRadiusStyles('50%', corner),
  };
}

const border: TBorder = {
  radius: {
    ...getBorderCornerRadiusStyleOptions(BorderCorner.All),
    bottomLeft:  getBorderCornerRadiusStyleOptions(BorderCorner.BottomLeft),
    bottomRight: getBorderCornerRadiusStyleOptions(BorderCorner.BottomRight),
    topLeft:     getBorderCornerRadiusStyleOptions(BorderCorner.TopLeft),
    topRight:    getBorderCornerRadiusStyleOptions(BorderCorner.TopRight),
  },
};

export default border;