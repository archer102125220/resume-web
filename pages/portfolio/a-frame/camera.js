import { useId, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Box from '@mui/material/Box';

import useGTMTrack from '@/hooks/useGTMTrack';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import AFrameContent from '@/components/AFrame/AFrameContent';
import AFrameHideOnClick from '@/components/AFrame/HideOnClick';

function AFrameCamera() {
  const anotherCubeId = useId();
  const aSphereId = 'a_sphere';
  const cursorId = 'cursor';

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

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/a-frame/camera' });

  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - a-frame(camera)</title>
      </Head>
      <Box>
        <AFrameContent>
          <a-scene>
            <a-sky src="/a-frame/img/c8f7c63e7912f9c386e02a6b9ba6861c6847bc8c.png" />
            <AFrameHideOnClick
              anotherCubeId={anotherCubeId}
              aSphereId={aSphereId}
              cursorId={cursorId}
            />
            <a-box
              id={anotherCubeId}
              visible="false"
              position="-1 1.5 -4"
              rotation="0 45 0"
              width="1"
              height="1"
              depth="1"
              color="#4CC3D9"
            />

            {/* Camera + cursor. */}
            <a-entity look-controls>
              <a-camera active>
                <a-cursor
                  id={cursorId}
                  raycaster={`objects: #${aSphereId}`}
                  animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
                  animation__fusing="property: fusing; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500"
                  event-set__1="_event: mouseenter; color: #0092d8"
                  event-set__2="_event: mouseleave; color: black"
                />
              </a-camera>
            </a-entity>
          </a-scene>
        </AFrameContent>
      </Box>
    </div>
  );
}

export default AFrameCamera;
