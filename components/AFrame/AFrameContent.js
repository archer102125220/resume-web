import PropTypes from 'prop-types';
import { useState, useEffect, forwardRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

const _AFrameContent = forwardRef(function AFrameContent(
  {
    children,
    renderBeforeAFrameLoad,
    beforeAFrameLoad,
    getAframe,
    afterAFrameLoad
  },
  aFrameRoot
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

  return renderBeforeAFrameLoad || AFrameLoaded ? (
    <div ref={aFrameRoot}>{children}</div>
  ) : (
    <></>
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

export default _AFrameContent;
