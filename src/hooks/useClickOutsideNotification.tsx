import { useEffect } from "react";

export function useClickOutsideCallback(
  ref: React.RefObject<any>,
  callback?: () => void
) {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback?.();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
}
