'use client';

import { useLayoutEffect } from 'react';

type Props = {
  maxFontSize?: number;
};

function useResizeWindow({ maxFontSize = 19 }: Props = {}) {
  useLayoutEffect(() => {
    const html: any = document.getElementsByTagName('html') || [];
    const onResize = () => {
      if (html.length) {
        const innerWidth = window.innerWidth;
        if (innerWidth > 768) {
          const size = (innerWidth / 1440) * 16;

          html[0].style.fontSize =
            (size > maxFontSize ? maxFontSize : size) + 'px';
        } else {
          const size = (innerWidth / 375) * 16;

          html[0].style.fontSize = size + 'px';
        }
      }
    };

    onResize();

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [maxFontSize]);
}

export default useResizeWindow;
