import PropTypes from 'prop-types';
import { useState } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

function AFrameContent({ children }) {
  const [AFrameLoaded, setAFrameLoaded] = useState(false);

  useIsomorphicLayoutEffect(() => {
    (async () => {
      await import('aframe');
      setAFrameLoaded(true);
    })();
  }, []);

  return AFrameLoaded ? children : <></>;
}

AFrameContent.propTypes = {
  children: PropTypes.any
};

export default AFrameContent;
