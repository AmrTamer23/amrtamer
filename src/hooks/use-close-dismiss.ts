import { useEffect, type RefObject } from "react";
import { useOnClickOutside } from "usehooks-ts";

/**
 * Closes a panel/modal on both outside-click and Escape key.
 * @param ref - Ref to the element that should not trigger a close when clicked
 * @param onClose - Callback to invoke when dismissing
 */
export function useCloseDismiss(
  ref: RefObject<HTMLElement | null>,
  onClose: () => void
) {
  useOnClickOutside(ref as RefObject<HTMLElement>, onClose);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);
}
