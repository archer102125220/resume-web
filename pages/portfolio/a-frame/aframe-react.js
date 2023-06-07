import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Box from '@mui/material/Box';
import { Entity, Scene } from 'aframe-react';

import useGTMTrack from '@/hooks/useGTMTrack';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import AFrameContent from '@/components/AFrame/AFrameContent';

function AFrameReact() {
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

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/a-frame/aframe-react' });
  function handleClick() {
    console.log('Clicked!');
  }

  function handleCollide() {
    console.log('Collided!');
  }
  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - a-frame(aframe-react)</title>
      </Head>
      <Box>
        <AFrameContent>
          <Scene>
            <Entity
              geometry={{ primitive: 'box' }}
              material={{ color: 'red' }}
              position={{ x: 0, y: 0, z: -5 }}
            />
            <Entity particle-system="preset: snow;" />
            <Entity light={{ type: 'point' }} />
            {/* <Entity gltf-model={{ src: 'virtualcity.gltf' }} /> */}
            <Entity
              text={{ value: 'Hello, WebVR!' }}
              position={{ x: 0.4, y: 1.7, z: -1 }}
            />
            <Entity
              geometry={{ primitive: 'box' }}
              material={{ color: '#EF2D5E' }}
              position={{ x: 0, y: 0, z: -3 }}
              events={{
                click: handleClick,
                collided: [handleCollide]
              }}
            />
          </Scene>
        </AFrameContent>
      </Box>
    </div>
  );
}

export default AFrameReact;
