import { useEffect, useRef } from 'react';

const useOutsideClick = <TRef extends HTMLElement>(
  callback: () => void,
  useCapture: boolean = true
) => {
  const ref = useRef<TRef>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, useCapture);

    return () => {
      document.removeEventListener('click', handleClick, useCapture);
    };
  }, [ref, callback, useCapture]);

  return ref;
};

export default useOutsideClick;
