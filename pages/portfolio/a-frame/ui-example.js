import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Box from '@mui/material/Box';

import useGTMTrack from '@/hooks/useGTMTrack';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import AFrameContent from '@/components/AFrame/AFrameContent';

function AFrameHelloWorkd() {
  const dispatch = useDispatch();
  const SAVE_defalutLayoutSetting = useCallback(
    payload =>
      dispatch({
        type: 'system/SAVE_defalutLayoutSetting',
        payload
      }),
    [dispatch]
  );

  useIsomorphicLayoutEffect(() => {
    SAVE_defalutLayoutSetting({ fullScreen: true });
  }, []);
  useEffect(() => {
    return () => {
      SAVE_defalutLayoutSetting({ fullScreen: false });
    };
  }, []);

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/a-frame/ui-example' });

  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - a-frame(UI範例)</title>
      </Head>
      <Box>
        <AFrameContent>
          <a-scene>
            <a-text value="Hello, World!" position="-0.5 2.5 -3" />
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
        </AFrameContent>
      </Box>
    </div>
  );
}

export default AFrameHelloWorkd;
