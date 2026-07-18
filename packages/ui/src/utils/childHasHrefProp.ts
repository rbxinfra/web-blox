import { isValidElement, type ReactNode } from "react";

function hasProp<K extends string>(
  props: unknown,
  key: K
): props is Record<K, unknown> {
  return typeof props === "object" && props !== null && key in props;
}

export default function childHasHrefProp(
  element: ReactNode[] | ReactNode
): boolean {
  if (Array.isArray(element)) {
    return element.some(childHasHrefProp);
  }

  if (isValidElement(element)) {
    if (hasProp(element.props, "href")) {
      return true;
    }

    if (hasProp(element.props, "children")) {
      return childHasHrefProp(element.props.children as ReactNode[] | ReactNode);
    }
  }

  return false;
}