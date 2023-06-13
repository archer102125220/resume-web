import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

import useGTMTrack from '@/hooks/useGTMTrack';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import AFrameContent from '@/components/AFrame/AFrameContent';
import { useAFrameBackgroundGradient } from '@/hooks/AFrame/shader/useAFrameBackgroundGradient';
import { useAFrameModelViewer } from '@/hooks/AFrame/components/useAFrameModelViewer';

const styles = {
  modelExampleScene: {
    position: 'relative',
    '& .a-upload-model': {
      boxSizing: 'border-box',
      display: 'inline-block',
      height: '34px',
      padding: '0',
      width: '70vw',
      bottom: '20px',
      left: '15%',
      right: '15%',
      position: 'absolute',
      color: 'white',
      fontSize: '12px',
      lineHeight: '12px',
      border: 'none',
      borderRadius: '5px',
      top: '90vh',
      '@media only screen and (max-width: 800px)': {
        margin: 'auto'
      },
      '@media only screen and (max-width: 700px)': {
        display: 'none'
      },
      '&.hidden': {
        display: 'none'
      },
      '&-button': {
        cursor: 'pointer',
        padding: '0px 2px 0 2px',
        fontWeight: 'bold',
        color: '#666',
        border: '3px solid #666',
        boxSizing: 'border-box',
        verticalAlign: 'middle',
        width: '25%',
        maxWidth: '110px',
        borderRadius: '10px',
        height: '34px',
        backgroundColor: 'white',
        margin: '0',
        '&:hover': {
          borderColor: '#ef2d5e',
          color: '#ef2d5e'
        }
      },
      '&-input': {
        color: '#666',
        verticalAlign: 'middle',
        padding: '0px 10px 0 10px',
        textTransform: 'uppercase',
        border: '0',
        width: '75%',
        height: '100%',
        borderRadius: '10px',
        marginRight: '10px',
        '@media only screen and (max-width: 800px)': {
          width: '70%'
        }
      }
    }
  }
};

const useStyles = makeStyles(styles);

function AFrameModelExample() {
  const classes = useStyles();

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

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/a-frame/model-example' });

  useAFrameBackgroundGradient();
  useAFrameModelViewer();

  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - a-frame(model 範例)</title>
      </Head>
      <Box>
        <AFrameContent>
          <a-scene
            renderer="colorManagement: true;"
            cursor="rayOrigin: mouse; fuse: false;"
            webxr="optionalFeatures: hit-test, local-floor;"
            raycaster="objects: .raycastable"
            model-viewer="gltfModel: #triceratops; title: Triceratops;"
            ar-hit-test="targetEl: #modelPivot;"
            class={classes.modelExampleScene}
          >
            <a-assets>
              {/*
                Model source: https://sketchfab.com/3d-models/triceratops-d16aabe33dc24f8ab37e3df50c068265
                Model author: https://sketchfab.com/VapTor
                Model license: Sketcfab Standard
              */}
              <a-asset-item
                id="triceratops"
                src="https://cdn.aframe.io/examples/ar/models/triceratops/scene.gltf"
                response-type="arraybuffer"
                crossorigin="anonymous"
              />

              <a-asset-item
                id="reticle"
                src="https://cdn.aframe.io/examples/ar/models/reticle/reticle.gltf"
                response-type="arraybuffer"
                crossorigin="anonymous"
              />

              <Image
                id="shadow"
                src="https://cdn.glitch.com/20600112-c04b-492c-8190-8a5ccc06f37d%2Fshadow.png?v=1606338852399"
                alt=""
                crossOrigin="anonymous"
                priority={true}
                width={512}
                height={512}
              />
            </a-assets>
            {/* CameraRig */}
            <a-entity id="cameraRigEl">
              <a-entity
                id="cameraEl"
                camera="fov: 60"
                look-controls="magicWindowTrackingEnabled: false; mouseEnabled: false; touchEnabled: false"
              />
              <a-entity
                id="rightHandEl"
                rotation="0 90 0"
                laser-controls="hand: right;"
                raycaster="objects: .raycastable"
                line="color: #118A7E"
              />
              <a-entity
                id="leftHandEl"
                rotation="0 90 0"
                laser-controls="hand: right;"
                raycaster="objects: .raycastable"
                line="color: #118A7E"
              />
            </a-entity>

            {/* initEntities */}
            <a-entity
              id="sceneLightEl"
              light="type: hemisphere; intensity: 1"
            />
            <a-entity id="containerEl">
              {/* laserHitPanelEl */}
              <a-entity
                id="laserHitPanel"
                position="0 0 -10"
                geometry="primitive: plane; width: 30; height: 20"
                material="color: red"
                visible="false"
                class="raycastable"
              />
              {/* titleEl */}
              <a-entity
                id="title"
                text="value: '';width: 6"
                hide-on-enter-ar=""
                visible="false"
              />
              {/* lightEl */}
              <a-entity
                id="light"
                position="-2 4 2"
                light={`
                  type: directional;
                  castShadow: true;
                  shadowMapHeight: 1024;
                  shadowMapWidth: 1024;
                  shadowCameraLeft: -7;
                  shadowCameraRight: 5;
                  shadowCameraBottom: -5;
                  shadowCameraTop: 5;
                  intensity: 0.5;
                  target: #modelPivot
                `}
              />

              {/* modelPivotEl */}
              <a-entity id="modelPivot">
                {/* modelEl */}
                <a-entity
                  id="model"
                  rotation="0 -30 0"
                  animation-mixer="clip:triceratopsLowPolyv11_LODs"
                  shadow="cast: true; receive: false"
                />
                {/* shadowEl */}
                <a-entity
                  id="shadowEl"
                  rotation="-90 -30 0"
                  geometry="primitive: plane; width: 1.0; height: 1.0"
                  material="src: #shadow; transparent: true; opacity: 0.40"
                  hide-on-enter-ar=""
                />
                {/* arShadowEl */}
                <a-entity
                  id="arShadowEl"
                  rotation="-90 0 0"
                  geometry="primitive: plane; width: 30.0; height: 30.0"
                  // shadow="recieve: true"
                  ar-shadows="opacity: 0.2"
                  visible="false"
                />
              </a-entity>
            </a-entity>
            {/* reticleEl */}
            <a-entity
              id="reticleEl"
              gltf-model="url(https://cdn.aframe.io/examples/ar/models/reticle/reticle.gltf)"
              // gltf-model="#reticle"
              scale="0.8 0.8 0.8"
              visible="false"
            />

            {/* initBackground */}
            <a-entity
              id="backgroundEl"
              geometry="primitive: sphere; radius: 65"
              material={`
                shader: background-gradient;
                colorTop: #37383c;
                colorBottom: #757575;
                side: back
              `}
              hide-on-enter-ar=""
            />

            {/* initUploadInput */}
            <div id="uploadContainerEl" className="a-upload-model ">
              <input id="inputEl" className="a-upload-model-input" />
              <button id="submitButtonEl" className="a-upload-model-button">
                OPEN MODEL
              </button>
            </div>
          </a-scene>
        </AFrameContent>
      </Box>
    </div>
  );
}

export default AFrameModelExample;
