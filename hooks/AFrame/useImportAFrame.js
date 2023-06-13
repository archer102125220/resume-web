import { useState, useEffect } from 'react';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { useAFrame, AFrameStore } from '@/hooks/AFrame/useAFrame';

export function useImportAFrame(beforeAFrameLoad, getAframe, afterAFrameLoad) {
  const [AFrameLoaded, setAFrameLoaded] = useState(false);
  const AFrame = useAFrame();

  useIsomorphicLayoutEffect(() => {
    (async () => {
      if (window.AFRAME !== undefined && process.env.IS_DEV) {
        console.log('%cAFrame has been loaded.', 'color: #ef9b00;');
      }

      if (typeof beforeAFrameLoad === 'function') {
        await beforeAFrameLoad();
      }

      await import('aframe');
      await Promise.all([
        import('aframe-event-set-component'),
        import('aframe-environment-component'),
        import('aframe-extras')
      ]);

      if (typeof getAframe === 'function') {
        await getAframe(window.AFRAME);
      }

      const html = document.querySelector('html');
      const hasClassName = html.classList.value.includes('a-fullscreen');
      if (hasClassName === false) {
        html.classList.add('a-fullscreen');
      }

      AFrameStore.insert(window.AFRAME);
      setAFrameLoaded(true);
    })();
  }, []);
  useEffect(() => {
    return () => {
      const html = document.querySelector('html');
      html.classList.remove('a-fullscreen');
    };
  }, []);
  useEffect(() => {
    if (AFrameLoaded === true && typeof afterAFrameLoad === 'function') {
      afterAFrameLoad(window.AFRAME);
    }
  }, [AFrameLoaded]);

  return AFrameLoaded === true ? AFrame : null;
}
