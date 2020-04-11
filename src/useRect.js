import { useLayoutEffect, useCallback, useState } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';

let emptyRect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
};

export const useRect = (ref) => {
  if (ref == null) {
    throw new Error('No ref provided to useRect.');
  }

  let [rect, setRect] = useState(emptyRect);

  let handleResize = useCallback(() => {
    if (ref.current) {
      setRect(getRect(ref.current));
    }
  }, [ref]);

  useLayoutEffect(() => {
    if (!ref) {
      return;
    }

    let element = ref.current;
    if (!element) {
      return;
    }

    if (ref.current) {
      setRect(getRect(ref.current));
    }

    if (typeof ResizeObserver === 'function') {
      let resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(element);

      return () => {
        if (!resizeObserver) {
          return;
        }

        resizeObserver.disconnect();
        resizeObserver = null;
      };
    }
  }, [handleResize, ref]);

  return { rect };
};

function getRect(element) {
  if (!element) {
    return emptyRect;
  }
  return element.getBoundingClientRect();
}
