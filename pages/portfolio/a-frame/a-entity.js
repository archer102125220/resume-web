import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Box from '@mui/material/Box';

import useGTMTrack from '@/hooks/useGTMTrack';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import AFrameContent from '@/components/AFrame/AFrameContent';

function AFrameTest() {
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

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/a-frame/hello-workd' });

  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - a-frame(a-entity)</title>
      </Head>
      <Box>
        <AFrameContent>
          <a-scene>
            <a-box position="-1 1 -5" color="#4CC3D9" />
            <a-sphere position="0 1 -5" radius="1.25" color="#EF2D5E" />
            <a-cylinder
              position="1 1 -5"
              radius="0.5"
              height="1.5"
              color="#FFC65D"
            />

            <a-entity position="2 2 -5">
              <a-box position="-1 1 0" color="#4CC3D9" />
              <a-sphere position="0 1 0" radius="1.25" color="#EF2D5E" />
              <a-cylinder
                position="1 1 0"
                radius="0.5"
                height="1.5"
                color="#FFC65D"
              />
            </a-entity>
          </a-scene>
        </AFrameContent>
      </Box>
    </div>
  );
}

export default AFrameTest;
