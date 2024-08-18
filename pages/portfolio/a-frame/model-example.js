import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { buttonStyle } from '@/styles/buttonStyle';
import useGTMTrack from '@/hooks/useGTMTrack';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import Image from '@/components/Image';
import AFrameContent from '@/components/AFrame/AFrameContent';
import { useAFrameBackgroundGradient } from '@/hooks/AFrame/shader/useAFrameBackgroundGradient';
import { useAFrameModelViewer } from '@/hooks/AFrame/components/useAFrameModelViewer';

const styles = {
  modelExampleScene: {
    position: 'relative',
    '& .a-upload-model': {
      boxSizing: 'border-box',
      display: 'flex',
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
      alignItems: 'center',
      justifyContent: 'center',
      '@media only screen and (max-width: 800px)': {
        margin: 'auto'
      },
      '@media only screen and (max-width: 700px)': {
        display: 'none'
      },
      '&.hidden': {
        display: 'none'
      },
      '&-button': buttonStyle,
      '&-input': {
        width: '75%',
        marginRight: '10px',
        '@media only screen and (max-width: 800px)': {
          width: '70%'
        }
      }
    }
  }
};

const useStyles = makeStyles(styles);

const INPUT_DEFAULT_VALUE = 'Copy URL to glTF or glb model';

function AFrameModelExample() {
  const [modelUrl, setModelUrl] = useState('');
  const [gltfModel, setGltfModel] = useState('#triceratops');

  const cameraRigId = 'cameraRigEl';
  const cameraId = 'cameraEl';
  const rightHandId = 'rightHandEl';
  const leftHandId = 'leftHandEl';
  const containerId = 'containerEl';
  const laserHitPanelId = 'laserHitPanel';
  const modelPivotId = 'modelPivot';
  const modelId = 'model';
  const shadowId = 'shadowEl';
  const arShadowId = 'arShadowEl';
  const titleId = 'title';
  const reticleId = 'reticleEl';
  const lightId = 'light';
  const sceneLightId = 'sceneLightEl';
  const backgroundId = 'backgroundEl';
  const uploadContainerId = 'uploadContainerEl';

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

  function handleChange(e) {
    const newValue = e.target.value;
    setModelUrl(newValue);
  }
  function submitURLButtonClicked() {
    if (modelUrl !== INPUT_DEFAULT_VALUE) {
      setGltfModel(modelUrl);
    }
  }

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
            model-viewer={`
              gltfModel: ${gltfModel};
              title: Triceratops;
              uploadUIEnabled: true;

              cameraRigId: ${cameraRigId};
              cameraId: ${cameraId};
              rightHandId: ${rightHandId};
              leftHandId: ${leftHandId};
              containerId: ${containerId};
              laserHitPanelId: ${laserHitPanelId};
              modelPivotId: ${modelPivotId};
              modelId: ${modelId};
              shadowId: ${shadowId};
              arShadowId: ${arShadowId};
              titleId: ${titleId};
              reticleId: ${reticleId};
              lightId: ${lightId};
              sceneLightId: ${sceneLightId};
              backgroundId: ${backgroundId};
              uploadContainerId: ${uploadContainerId};
            `}
            ar-hit-test={`target: #${modelPivotId};`}
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
                crossorigin="anonymous"
                response-type="arraybuffer"
                src="https://cdn.aframe.io/examples/ar/models/triceratops/scene.gltf"
              />

              <a-asset-item
                id="reticle"
                crossorigin="anonymous"
                response-type="arraybuffer"
                src="https://cdn.aframe.io/examples/ar/models/reticle/reticle.gltf"
              />

              <Image
                alt=""
                id="shadow"
                width={512}
                height={512}
                priority={true}
                crossOrigin="anonymous"
                src="https://cdn.glitch.com/20600112-c04b-492c-8190-8a5ccc06f37d%2Fshadow.png?v=1606338852399"
              />
            </a-assets>
            {/* CameraRig */}
            <a-entity id={cameraRigId}>
              <a-entity
                id={cameraId}
                camera="fov: 60"
                look-controls="magicWindowTrackingEnabled: false; mouseEnabled: false; touchEnabled: false"
              />
              <a-entity
                id={rightHandId}
                rotation="0 90 0"
                line="color: #118A7E"
                laser-controls="hand: right;"
                raycaster="objects: .raycastable"
              />
              <a-entity
                id={leftHandId}
                rotation="0 90 0"
                line="color: #118A7E"
                laser-controls="hand: right;"
                raycaster="objects: .raycastable"
              />
            </a-entity>

            {/* initEntities */}
            <a-entity
              id={sceneLightId}
              light="type: hemisphere; intensity: 1"
            />
            <a-entity id={containerId}>
              {/* laserHitPanelEl */}
              <a-entity
                id={laserHitPanelId}
                visible="false"
                position="0 0 -10"
                class="raycastable"
                material="color: red"
                geometry="primitive: plane; width: 30; height: 20"
              />
              {/* titleEl */}
              <a-entity
                id={titleId}
                visible="false"
                hide-on-enter-ar=""
                text="value: '';width: 6"
              />
              {/* lightEl */}
              <a-entity
                id={lightId}
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
                  target: #${modelPivotId}
                `}
              />

              {/* modelPivotEl */}
              <a-entity id={modelPivotId}>
                {/* modelEl */}
                <a-entity
                  id={modelId}
                  rotation="0 -30 0"
                  shadow="cast: true; receive: false"
                  animation-mixer="clip:triceratopsLowPolyv11_LODs"
                />
                {/* shadowEl */}
                <a-entity
                  id={shadowId}
                  hide-on-enter-ar=""
                  rotation="-90 -30 0"
                  geometry="primitive: plane; width: 1.0; height: 1.0"
                  material="src: #shadow; transparent: true; opacity: 0.40"
                />
                {/* arShadowEl */}
                <a-entity
                  id={arShadowId}
                  visible="false"
                  rotation="-90 0 0"
                  // shadow="recieve: true"
                  ar-shadows="opacity: 0.2"
                  geometry="primitive: plane; width: 30.0; height: 30.0"
                />
              </a-entity>
            </a-entity>
            {/* reticleEl */}
            <a-entity
              id={reticleId}
              visible="false"
              scale="0.8 0.8 0.8"
              // gltf-model="#reticle"
              gltf-model="url(https://cdn.aframe.io/examples/ar/models/reticle/reticle.gltf)"
            />

            {/* initBackground */}
            <a-entity
              id={backgroundId}
              material={`
                shader: background-gradient;
                colorTop: #37383c;
                colorBottom: #757575;
                side: back
              `}
              hide-on-enter-ar=""
              geometry="primitive: sphere; radius: 65"
            />

            {/* initUploadInput */}
            <div id={uploadContainerId} className="a-upload-model ">
              <Box className="a-upload-model-input">
                <TextField
                  id="inputEl"
                  label={INPUT_DEFAULT_VALUE}
                  value={modelUrl}
                  onChange={handleChange}
                  fullWidth={true}
                  variant="outlined"
                />
              </Box>

              <Button
                id="submitButtonEl"
                variant="contained"
                className="a-upload-model-button"
                onClick={submitURLButtonClicked}
              >
                OPEN MODEL
              </Button>
            </div>
          </a-scene>
        </AFrameContent>
      </Box>
    </div>
  );
}

export default AFrameModelExample;
