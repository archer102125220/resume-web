import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Box from '@mui/material/Box';

import useGTMTrack from '@/hooks/useGTMTrack';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import AFrameContent from '@/components/AFrame/AFrameContent';
import { useAFrameGradient } from '@/hooks/AFrame/shader/useAFrameGradient';
import { useAFrameAGradientSky } from '@/hooks/AFrame/primitive/useAFrameAGradientSky';

function AFrameNpmExample() {
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

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/a-frame/npm-example' });

  useAFrameGradient();
  useAFrameAGradientSky();

  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - a-frame(npm 範例)</title>
      </Head>
      <Box>
        <AFrameContent>
          <a-scene>
            <a-entity
              id="rain"
              particle-system="preset: rain; color: #24CAFF; particleCount: 5000"
            />

            <a-entity
              id="sphere"
              geometry="primitive: sphere"
              material="color: #EFEFEF; shader: flat"
              position="0 0.15 -5"
              light="type: point; intensity: 5"
              animation="property: position; easing: easeInOutQuad; dir: alternate; dur: 1000; to: 0 -0.10 -5; loop: true"
            />

            <a-entity
              id="ocean"
              ocean="density: 20; width: 50; depth: 50; speed: 4"
              material="color: #9CE3F9; opacity: 0.75; metalness: 0; roughness: 1"
              rotation="-90 0 0"
            />

            <a-entity
              id="sky"
              geometry="primitive: sphere; radius: 5000"
              material="shader: gradient; topColor: 235 235 245; bottomColor: 185 185 210"
              scale="-1 1 1"
            />

            <a-entity id="light" light="type: ambient; color: #888" />
          </a-scene>
        </AFrameContent>
      </Box>
    </div>
  );
}

export default AFrameNpmExample;
