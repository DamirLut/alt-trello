import { type RefObject, useEffect } from 'react';

export const useOutsideClick = <T extends RefObject<HTMLElement>>(
  ref: T,
  callback: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      if (ref.current && !ref.current.contains(evt.target as HTMLElement)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};

export default useOutsideClick;
