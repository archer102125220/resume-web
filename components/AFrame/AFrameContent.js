import PropTypes from 'prop-types';
import { useState, useEffect, forwardRef, useSyncExternalStore } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

const _AFrameContent = forwardRef(function AFrameContent(
  {
    children,
    renderBeforeAFrameLoad,
    beforeAFrameLoad,
    getAframe,
    afterAFrameLoad
  },
  AFrameRootRef
) {
  const [AFrameLoaded, setAFrameLoaded] = useState(false);

  useIsomorphicLayoutEffect(() => {
    (async () => {
      if (typeof beforeAFrameLoad === 'function') {
        await beforeAFrameLoad();
      }

      try {
        await import('aframe');
        await Promise.all([
          import('aframe-event-set-component'),
          import('aframe-environment-component')
        ]);
      } catch (error) {
        console.log(error);
      }

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

  return (
    <div ref={AFrameRootRef}>
      {renderBeforeAFrameLoad || AFrameLoaded ? children : <></>}
    </div>
  );
});

_AFrameContent.propTypes = {
  children: PropTypes.any,
  renderBeforeAFrameLoad: PropTypes.bool,
  beforeAFrameLoad: PropTypes.func,
  getAframe: PropTypes.func,
  afterAFrameLoad: PropTypes.func
};

_AFrameContent.defaultProps = {
  renderBeforeAFrameLoad: false,
  beforeAFrameLoad() {},
  getAframe() {},
  afterAFrameLoad() {}
};

let AFrame = null;
let listeners = [];
const AFrameStore = {
  insert(newAFrame) {
    AFrame = newAFrame;
    for (const listener of listeners) {
      listener();
    }
  },
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getSnapshot() {
    return AFrame;
  }
};
export function useAFrame() {
  return useSyncExternalStore(AFrameStore.subscribe, AFrameStore.getSnapshot);
}

export default _AFrameContent;
