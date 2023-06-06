import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Box from '@mui/material/Box';

import useGTMTrack from '@/hooks/useGTMTrack';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import AFrameContent from '@/components/AFrame/AFrameContent';

function AFrameNpmExample() {
  const [AFrame, setAFrame] = useState(null);
  const dispatch = useDispatch();
  const SAVE_defalutLayoutFullScreen = useCallback(
    payload =>
      dispatch({
        type: 'system/SAVE_defalutLayoutFullScreen',
        payload: payload
      }),
    [dispatch]
  );

  useIsomorphicLayoutEffect(() => {
    SAVE_defalutLayoutFullScreen(true);
  }, []);
  useEffect(() => {
    return () => {
      SAVE_defalutLayoutFullScreen(false);
    };
  }, []);
  useEffect(() => {
    console.log(AFrame);
  }, [AFrame]);

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/a-frame/test' });

  function getAframe(_AFrame) {
    console.log(_AFrame);
    try {
      // _AFrame.registerComponent('bar', {
      //   schema: {
      //     color: { default: '#FFF' },
      //     size: { type: 'int', default: 5 }
      //   }
      // });
      _AFrame.registerShader('gradient', {
        schema: {
          topColor: {
            type: 'vec3',
            default: { x: 1, y: 0, z: 0 },
            is: 'uniform'
          },
          bottomColor: {
            type: 'vec3',
            default: { x: 0, y: 0, z: 1 },
            is: 'uniform'
          },
          offset: { type: 'float', default: 400, is: 'uniform' },
          exponent: { type: 'float', default: 0.6, is: 'uniform' }
        },
        vertexShader: `
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );
          }
        `,
        fragmentShader: `
            uniform vec3 bottomColor;
            uniform vec3 topColor;
            uniform float offset;
            uniform float exponent;
            varying vec3 vWorldPosition;
            void main() {
              float h = normalize( vWorldPosition + offset ).y;
              gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max(h, 0.0 ), exponent ), 0.0 ) ), 1.0 );
            }
        `
      });
      _AFrame.registerPrimitive('a-gradient-sky', {
        defaultComponents: {
          geometry: {
            primitive: 'sphere',
            radius: 5000,
            segmentsWidth: 64,
            segmentsHeight: 20
          },
          material: {
            shader: 'gradient'
          },
          scale: '-1 1 1'
        },

        mappings: {
          topColor: 'material.topColor',
          bottomColor: 'material.bottomColor',
          offset: 'material.offset',
          exponent: 'material.exponent'
        }
      });
    } catch (error) {
      console.log(error);
    }
    setAFrame(_AFrame);
  }

  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - a-frame(npm 範例)</title>
      </Head>
      <Box>
        <AFrameContent getAframe={getAframe}>
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
