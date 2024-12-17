import { useEffect } from 'react';

type RefType = React.RefObject<HTMLElement>;
type HandlerType = (event: MouseEvent | TouchEvent) => void;

/**
 * Hook to detect clicks outside a specified element.
 * @param ref - The React ref to the target element.
 * @param handler - The function to call when a click outside is detected.
 */
export default function useOnClickOutside(ref: RefType, handler: HandlerType) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
