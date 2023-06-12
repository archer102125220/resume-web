import { useEffect, useId, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Image from 'next/image';
import Box from '@mui/material/Box';

import useGTMTrack from '@/hooks/useGTMTrack';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import AFrameContent from '@/components/AFrame/AFrameContent';
import AFrameInfoPanel from '@/components/AFrame/EventEaxmple/InfoPanel';
import AFrameHighlight from '@/components/AFrame/EventEaxmple/Highlight';

function AFrameEventEaxmple() {
  const kazetachinuId = useId();
  const kazetachinuPosterId = useId();
  const ponyoId = useId();
  const ponyoPosterId = useId();
  const karigurashiId = useId();
  const karigurashiPosterId = useId();
  const mixinFrameId = 'mixinFrame';
  const mixinPosterId = 'mixinPoster';
  const mixinMovieImageId = 'mixinMovieImage';
  const backgroundId = useId();
  const fadeBackgroundId = useId();
  const menuButtonClassName = 'menu-button';
  const raycasterClassName = 'raycastable';
  const karigurashiButtonId = useId();
  const kazetachinuButtonId = useId();
  const ponyoButtonId = useId();

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
  useEffect(
    () => () => {
      SAVE_defalutLayoutSetting({ fullScreen: false });
    },
    []
  );

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/a-frame/event-example' });

  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - a-frame(事件範例)</title>
      </Head>
      <Box>
        <AFrameContent>
          <a-scene
            background="color: #212"
            environment=""
            cursor="rayOrigin: mouse; fuse: false"
            raycaster={`objects: .${raycasterClassName}`}
          >
            <a-assets>
              {/*
                Image source: http://www.ghibli.jp/works/kazetachinu/#frame&gid=1&pid=1
                Image author: Studio Ghibli
               */}
              <Image
                id={kazetachinuId}
                src="https://cdn.aframe.io/examples/ui/kazetachinu.jpg"
                alt="kazetachinu"
                crossOrigin="anonymous"
                priority={true}
                width={1024}
                height={554}
              />
              <Image
                id={kazetachinuPosterId}
                src="https://cdn.aframe.io/examples/ui/kazetachinuPoster.jpg"
                alt="kazetachinuPoster"
                crossOrigin="anonymous"
                priority={true}
                width={400}
                height={566}
              />
              {/*
                Image source: http://www.ghibli.jp/works/ponyo/#frame&gid=1&pid=36
                Image author: Studio Ghibli
               */}
              <Image
                id={ponyoId}
                src="https://cdn.aframe.io/examples/ui/ponyo.jpg"
                alt="ponyo"
                crossOrigin="anonymous"
                priority={true}
                width={1024}
                height={554}
              />
              <Image
                id={ponyoPosterId}
                src="https://cdn.aframe.io/examples/ui/ponyoPoster.jpg"
                alt="ponyoPoster"
                crossOrigin="anonymous"
                priority={true}
                width={400}
                height={566}
              />
              {/*
                Image source: http://www.ghibli.jp/works/karigurashi/#frame&gid=1&pid=32
                Image author: Studio Ghibli
              */}
              <Image
                id={karigurashiId}
                src="https://cdn.aframe.io/examples/ui/karigurashi.jpg"
                alt="karigurashi"
                crossOrigin="anonymous"
                priority={true}
                width={1024}
                height={554}
              />
              <Image
                id={karigurashiPosterId}
                src="https://cdn.aframe.io/examples/ui/karigurashiPoster.jpg"
                alt="karigurashiPoster"
                crossOrigin="anonymous"
                priority={true}
                width={400}
                height={566}
              />
              <a-mixin
                id={mixinFrameId}
                geometry="primitive: plane; width: 0.5783552; height: 0.8192"
                material="color: white; shader: flat"
                animation__scale="property: scale; to: 1.2 1.2 1.2; dur: 200; startEvents: mouseenter"
                animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
              />
              <a-mixin
                id={mixinPosterId}
                geometry="primitive: plane; width: 0.544768; height: 0.786432"
                material="color: white; shader: flat"
                position="0 0 0.005"
              />
              <a-mixin
                id={mixinMovieImageId}
                geometry="primitive: plane; width: 1.5; height: 0.81"
                material={`src: #${ponyoId}; shader: flat; transparent: true`}
                position="0 0.495 0.002"
              />
            </a-assets>

            <a-entity
              id={backgroundId}
              position="0 0 0"
              geometry="primitive: sphere; radius: 2.0"
              material="color: red; side: back; shader: flat"
              scale="0.001 0.001 0.001"
              visible="false"
              class={raycasterClassName}
            />

            <a-entity look-controls="magicWindowTrackingEnabled: false; touchEnabled: false; mouseEnabled: false">
              <a-camera active />
              <a-entity
                id={fadeBackgroundId}
                geometry="primitive: sphere; radius: 2.5"
                material="color: black; side: back; shader: flat; transparent: true; opacity: 0.6"
                visible="false"
              />
            </a-entity>

            {/* Hand controls */}

            <a-entity id="ui" position="0 1.6 -2.5">
              {/* Poster menu */}
              <AFrameHighlight
                menuButtonClassName={menuButtonClassName}
                backgroundId={backgroundId}
                mixinFrameId={mixinFrameId}
                karigurashiPosterId={`#${karigurashiPosterId}`}
                mixinPosterId={mixinPosterId}
                kazetachinuPosterId={`#${kazetachinuPosterId}`}
                ponyoPosterId={`#${ponyoPosterId}`}
                raycasterClassName={raycasterClassName}
                karigurashiButtonId={karigurashiButtonId}
                kazetachinuButtonId={kazetachinuButtonId}
                ponyoButtonId={ponyoButtonId}
              />

              {/* Info panel of the selected movie. */}
              <AFrameInfoPanel
                menuButtonClassName={menuButtonClassName}
                fadeBackgroundId={fadeBackgroundId}
                backgroundId={backgroundId}
                mixinMovieImageId={mixinMovieImageId}
                ponyoId={`#${ponyoId}`}
                kazetachinuId={`#${kazetachinuId}`}
                karigurashiId={`#${karigurashiId}`}
                raycasterClassName={raycasterClassName}
                karigurashiButtonId={karigurashiButtonId}
                kazetachinuButtonId={kazetachinuButtonId}
                ponyoButtonId={ponyoButtonId}
              />
            </a-entity>
          </a-scene>
        </AFrameContent>
      </Box>
    </div>
  );
}

export default AFrameEventEaxmple;
