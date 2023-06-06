import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Box from '@mui/material/Box';

import useGTMTrack from '@/hooks/useGTMTrack';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

function AFrameHelloWorkd() {
  const [AFrameLoaded, setAFrameLoaded] = useState(false);

  const dispatch = useDispatch();
  const SAVE_defalutLayoutFullScreen = useCallback(
    payload =>
      dispatch({
        type: 'system/SAVE_defalutLayoutFullScreen',
        payload: payload
      }),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      SAVE_defalutLayoutFullScreen(false);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    (async () => {
      await import('aframe');
      setAFrameLoaded(true);
    })();
  }, []);

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/a-frame/hello-workd' });

  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - a-frame(Hello, World!)</title>
      </Head>
      <Box>
        {AFrameLoaded === true && (
          <a-scene>
            <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" />
            <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" />
            <a-cylinder
              position="1 0.75 -3"
              radius="0.5"
              height="1.5"
              color="#FFC65D"
            />
            <a-plane
              position="0 0 -4"
              rotation="-90 0 0"
              width="4"
              height="4"
              color="#7BC8A4"
            />
            <a-sky color="#ECECEC" />
          </a-scene>
        )}
      </Box>
    </div>
  );
}

export default AFrameHelloWorkd;
