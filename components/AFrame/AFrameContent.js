import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

function AFrameContent({ children, getAframe }) {
  const [AFrameLoaded, setAFrameLoaded] = useState(false);

  useIsomorphicLayoutEffect(() => {
    (async () => {
      await import('aframe');

      const AFRAME = window.AFRAME;
      if (typeof getAframe === 'function') {
        await getAframe(AFRAME);
      }

      const html = document.querySelector('html');
      const hasClassName = html.classList.value.includes('a-fullscreen');
      if (hasClassName === false) {
        html.classList.add('a-fullscreen');
      }

      setAFrameLoaded(true);
    })();
  }, []);
  useEffect(
    () => () => {
      const html = document.querySelector('html');
      html.classList.remove('a-fullscreen');
    },
    []
  );

  return AFrameLoaded ? children : <></>;
}

AFrameContent.propTypes = {
  children: PropTypes.any,
  getAframe: PropTypes.func
};

AFrameContent.propTypes = {
  getAframe() {}
};

export default AFrameContent;
