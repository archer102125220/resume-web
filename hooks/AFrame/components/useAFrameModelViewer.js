import { useState } from 'react';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { useAFrame } from '@/hooks/AFrame/useAFrame';
import { useAFrameArShadows } from '@/hooks/AFrame/components/useAFrameArShadows';
import { useAFrameHideOnEnterAr } from '@/hooks/AFrame/components/useAFrameHideOnEnterAr';

export function useAFrameModelViewer() {
  const [modelViewerIsLoaded, setModelViewerIsLoaded] = useState(false);

  const arShadowsIsLoaded = useAFrameArShadows();
  const hideOnEnterArIsLoaded = useAFrameHideOnEnterAr();

  const AFrame = useAFrame();

  useIsomorphicLayoutEffect(() => {
    if (
      arShadowsIsLoaded === true &&
      hideOnEnterArIsLoaded === true &&
      AFrame.components['model-viewer'] === undefined
    ) {
      AFrame.registerComponent('model-viewer', {
        schema: {
          gltfModel: { default: '' },
          title: { default: '' },
          uploadUIEnabled: { default: true }
        },
        init: function () {
          this.onModelLoaded = this.onModelLoaded.bind(this);

          this.onMouseUp = this.onMouseUp.bind(this);
          this.onMouseMove = this.onMouseMove.bind(this);
          this.onMouseDown = this.onMouseDown.bind(this);
          this.onMouseWheel = this.onMouseWheel.bind(this);

          this.onTouchMove = this.onTouchMove.bind(this);
          this.onTouchEnd = this.onTouchEnd.bind(this);

          this.submitURLButtonClicked = this.submitURLButtonClicked.bind(this);

          this.onThumbstickMoved = this.onThumbstickMoved.bind(this);

          this.onEnterVR = this.onEnterVR.bind(this);
          this.onExitVR = this.onExitVR.bind(this);

          this.onMouseDownLaserHitPanel =
            this.onMouseDownLaserHitPanel.bind(this);
          this.onMouseUpLaserHitPanel = this.onMouseUpLaserHitPanel.bind(this);

          this.onOrientationChange = this.onOrientationChange.bind(this);

          this.initCameraRig();
          this.initEntities();
          this.initBackground();

          if (this.data.uploadUIEnabled) {
            this.initUploadInput();
          }

          // Disable context menu on canvas when pressing mouse right button;
          this.el.sceneEl.canvas.oncontextmenu = function (evt) {
            evt.preventDefault();
          };

          window.addEventListener(
            'orientationchange',
            this.onOrientationChange
          );

          // VR controls.
          this.laserHitPanelEl.addEventListener(
            'mousedown',
            this.onMouseDownLaserHitPanel
          );
          this.laserHitPanelEl.addEventListener(
            'mouseup',
            this.onMouseUpLaserHitPanel
          );

          this.leftHandEl.addEventListener(
            'thumbstickmoved',
            this.onThumbstickMoved
          );
          this.rightHandEl.addEventListener(
            'thumbstickmoved',
            this.onThumbstickMoved
          );

          // Mouse 2D controls.
          document.addEventListener('mouseup', this.onMouseUp);
          document.addEventListener('mousemove', this.onMouseMove);
          document.addEventListener('mousedown', this.onMouseDown);
          document.addEventListener('wheel', this.onMouseWheel);

          // Mobile 2D controls.
          document.addEventListener('touchend', this.onTouchEnd);
          document.addEventListener('touchmove', this.onTouchMove);

          this.el.sceneEl.addEventListener('enter-vr', this.onEnterVR);
          this.el.sceneEl.addEventListener('exit-vr', this.onExitVR);

          this.modelEl.addEventListener('model-loaded', this.onModelLoaded);
        },

        initUploadInput: function () {
          const el = this.el;

          const uploadContainerEl = el.querySelector('#uploadContainerEl');
          this.uploadContainerEl = uploadContainerEl;

          const inputEl = el.querySelector('#inputEl');
          this.inputEl = inputEl;

          const submitButtonEl = el.querySelector('#submitButtonEl');
          this.submitButtonEl = submitButtonEl;

          if (
            AFrame.utils.device.checkARSupport() &&
            document.querySelector('#model-viewer-style') === null
          ) {
            if (AFrame.utils.device.checkARSupport()) {
              const style = document.createElement('style');
              style.id = 'model-viewer-style';

              const css = `@media only screen and (max-width: 800px) {
                .a-upload-model-input {width: 60%;}
              }`;

              if (style.styleSheet) {
                style.styleSheet.cssText = css;
              } else {
                style.appendChild(document.createTextNode(css));
              }
              document.querySelector('head').appendChild(style);
            }
          }

          submitButtonEl.addEventListener('click', this.submitURLButtonClicked);

          const inputDefaultValue = 'Copy URL to glTF or glb model';
          this.inputDefaultValue = inputDefaultValue;
          inputEl.onfocus = function () {
            if (this.value !== inputDefaultValue) {
              return;
            }
            this.value = '';
          };
          inputEl.onblur = function () {
            if (this.value) {
              return;
            }
            this.value = inputDefaultValue;
          };
          this.el.sceneEl.addEventListener('infomessageopened', function () {
            uploadContainerEl.classList.add('hidden');
          });
          this.el.sceneEl.addEventListener('infomessageclosed', function () {
            uploadContainerEl.classList.remove('hidden');
          });

          inputEl.value = inputDefaultValue;

          uploadContainerEl.appendChild(inputEl);
          uploadContainerEl.appendChild(submitButtonEl);

          this.el.sceneEl.appendChild(uploadContainerEl);
        },
        update: function () {
          if (!this.data.gltfModel) {
            return;
          }
          this.modelEl.setAttribute('gltf-model', this.data.gltfModel);
        },

        submitURLButtonClicked: function () {
          const modelURL = this.inputEl.value;
          if (modelURL === this.inputDefaultValue) {
            return;
          }
          this.el.setAttribute('model-viewer', 'gltfModel', modelURL);
        },

        initCameraRig: function () {
          const el = this.el;
          this.cameraRigEl = el.querySelector('#cameraRigEl');
          this.cameraEl = el.querySelector('#cameraEl');
          this.rightHandEl = el.querySelector('#rightHandEl');
          this.leftHandEl = el.querySelector('#leftHandEl');
        },

        initBackground: function () {
          this.backgroundEl = this.el.querySelector('#backgroundEl');
        },

        initEntities: function () {
          const el = this.el;
          // Container for our entities to keep the scene clean and tidy.
          this.containerEl = el.querySelector('#containerEl');
          // Plane used as a hit target for laser controls when in VR mode
          this.laserHitPanelEl = el.querySelector('#laserHitPanel');
          // Models are often not centered on the 0,0,0.
          // We will center the model and rotate a pivot.
          this.modelPivotEl = el.querySelector('#modelPivot');
          // This is our glTF model entity.
          this.modelEl = el.querySelector('#model');
          // Shadow blurb for 2D and VR modes. Scaled to match the size of the model.
          this.shadowEl = el.querySelector('#shadowEl');
          // Real time shadow only used in AR mode.
          this.arShadowEl = el.querySelector('#arShadowEl');
          // The title / legend displayed above the model.
          this.titleEl = el.querySelector('#title');
          this.titleEl.setAttribute('text', 'value', this.data.title);
          // Reticle model used to position the model in AR mode.
          this.reticleEl = el.querySelector('#reticleEl');
          // Scene ligthing.
          this.lightEl = el.querySelector('#light');
          this.sceneLightEl = el.querySelector('#sceneLightEl');
        },

        onThumbstickMoved: function (evt) {
          const modelPivotEl = this.modelPivotEl;
          let modelScale = this.modelScale || modelPivotEl.object3D.scale.x;
          modelScale -= evt.detail.y / 20;
          modelScale = Math.min(Math.max(0.8, modelScale), 2.0);
          modelPivotEl.object3D.scale.set(modelScale, modelScale, modelScale);
          this.modelScale = modelScale;
        },

        onMouseWheel: function (evt) {
          const modelPivotEl = this.modelPivotEl;
          let modelScale = this.modelScale || modelPivotEl.object3D.scale.x;
          modelScale -= evt.deltaY / 100;
          modelScale = Math.min(Math.max(0.8, modelScale), 2.0);
          // Clamp scale.
          modelPivotEl.object3D.scale.set(modelScale, modelScale, modelScale);
          this.modelScale = modelScale;
        },

        onMouseDownLaserHitPanel: function (evt) {
          const cursorEl = evt.detail.cursorEl;
          const intersection = cursorEl.components.raycaster.getIntersection(
            this.laserHitPanelEl
          );
          if (!intersection) {
            return;
          }
          cursorEl.setAttribute('raycaster', 'lineColor', 'white');
          this.activeHandEl = cursorEl;
          this.oldHandX = undefined;
          this.oldHandY = undefined;
        },

        onMouseUpLaserHitPanel: function (evt) {
          const cursorEl = evt.detail.cursorEl;
          if (cursorEl === this.leftHandEl) {
            this.leftHandPressed = false;
          }
          if (cursorEl === this.rightHandEl) {
            this.rightHandPressed = false;
          }
          cursorEl.setAttribute('raycaster', 'lineColor', 'white');
          if (this.activeHandEl === cursorEl) {
            this.activeHandEl = undefined;
          }
        },

        onOrientationChange: function () {
          if (AFrame.utils.device.isLandscape()) {
            this.cameraRigEl.object3D.position.z -= 1;
          } else {
            this.cameraRigEl.object3D.position.z += 1;
          }
        },

        tick: function () {
          const modelPivotEl = this.modelPivotEl;
          const activeHandEl = this.activeHandEl;
          const laserHitPanelEl = this.laserHitPanelEl;
          if (!this.el.sceneEl.is('vr-mode')) {
            return;
          }
          if (!activeHandEl) {
            return;
          }

          const intersection =
            activeHandEl.components.raycaster.getIntersection(laserHitPanelEl);
          if (!intersection) {
            activeHandEl.setAttribute('raycaster', 'lineColor', 'white');
            return;
          }
          activeHandEl.setAttribute('raycaster', 'lineColor', '#007AFF');

          const intersectionPosition = intersection.point;
          this.oldHandX = this.oldHandX || intersectionPosition.x;
          this.oldHandY = this.oldHandY || intersectionPosition.y;

          modelPivotEl.object3D.rotation.y -=
            (this.oldHandX - intersectionPosition.x) / 4;
          modelPivotEl.object3D.rotation.x +=
            (this.oldHandY - intersectionPosition.y) / 4;

          this.oldHandX = intersectionPosition.x;
          this.oldHandY = intersectionPosition.y;
        },

        onEnterVR: function () {
          const cameraRigEl = this.cameraRigEl;

          this.cameraRigPosition = cameraRigEl.object3D.position.clone();
          this.cameraRigRotation = cameraRigEl.object3D.rotation.clone();

          // debugger;
          if (!this.el.sceneEl.is('ar-mode')) {
            cameraRigEl.object3D.position.set(0, 0, 2);
          } else {
            cameraRigEl.object3D.position.set(0, 0, 0);
          }
        },

        onExitVR: function () {
          const cameraRigEl = this.cameraRigEl;

          cameraRigEl.object3D.position.copy(this.cameraRigPosition);
          cameraRigEl.object3D.rotation.copy(this.cameraRigRotation);

          cameraRigEl.object3D.rotation.set(0, 0, 0);
        },

        onTouchMove: function (evt) {
          if (evt.touches.length === 1) {
            this.onSingleTouchMove(evt);
          }
          if (evt.touches.length === 2) {
            this.onPinchMove(evt);
          }
        },

        onSingleTouchMove: function (evt) {
          const modelPivotEl = this.modelPivotEl;
          this.oldClientX = this.oldClientX || evt.touches[0].clientX;
          this.oldClientY = this.oldClientY || evt.touches[0].clientY;

          const dX = this.oldClientX - evt.touches[0].clientX;
          const dY = this.oldClientY - evt.touches[0].clientY;

          modelPivotEl.object3D.rotation.y -= dX / 200;
          this.oldClientX = evt.touches[0].clientX;

          modelPivotEl.object3D.rotation.x -= dY / 100;

          // Clamp x rotation to [-90,90]
          modelPivotEl.object3D.rotation.x = Math.min(
            Math.max(-Math.PI / 2, modelPivotEl.object3D.rotation.x),
            Math.PI / 2
          );
          this.oldClientY = evt.touches[0].clientY;
        },

        onPinchMove: function (evt) {
          const dX = evt.touches[0].clientX - evt.touches[1].clientX;
          const dY = evt.touches[0].clientY - evt.touches[1].clientY;
          const modelPivotEl = this.modelPivotEl;
          const distance = Math.sqrt(dX * dX + dY * dY);
          const oldDistance = this.oldDistance || distance;
          const distanceDifference = oldDistance - distance;
          let modelScale = this.modelScale || modelPivotEl.object3D.scale.x;

          modelScale -= distanceDifference / 500;
          modelScale = Math.min(Math.max(0.8, modelScale), 2.0);
          // Clamp scale.
          modelPivotEl.object3D.scale.set(modelScale, modelScale, modelScale);

          this.modelScale = modelScale;
          this.oldDistance = distance;
        },

        onTouchEnd: function (evt) {
          this.oldClientX = undefined;
          this.oldClientY = undefined;
          if (evt.touches.length < 2) {
            this.oldDistance = undefined;
          }
        },

        onMouseUp: function (evt) {
          this.leftRightButtonPressed = false;
          if (evt.buttons === undefined || evt.buttons !== 0) {
            return;
          }
          this.oldClientX = undefined;
          this.oldClientY = undefined;
        },

        onMouseMove: function (evt) {
          if (this.leftRightButtonPressed) {
            this.dragModel(evt);
          } else {
            this.rotateModel(evt);
          }
        },

        dragModel: function (evt) {
          const modelPivotEl = this.modelPivotEl;
          if (!this.oldClientX) {
            return;
          }
          const dX = this.oldClientX - evt.clientX;
          const dY = this.oldClientY - evt.clientY;
          modelPivotEl.object3D.position.y += dY / 200;
          modelPivotEl.object3D.position.x -= dX / 200;
          this.oldClientX = evt.clientX;
          this.oldClientY = evt.clientY;
        },

        rotateModel: function (evt) {
          const modelPivotEl = this.modelPivotEl;
          if (!this.oldClientX) {
            return;
          }
          const dX = this.oldClientX - evt.clientX;
          const dY = this.oldClientY - evt.clientY;
          modelPivotEl.object3D.rotation.y -= dX / 100;
          modelPivotEl.object3D.rotation.x -= dY / 200;

          // Clamp x rotation to [-90,90]
          modelPivotEl.object3D.rotation.x = Math.min(
            Math.max(-Math.PI / 2, modelPivotEl.object3D.rotation.x),
            Math.PI / 2
          );

          this.oldClientX = evt.clientX;
          this.oldClientY = evt.clientY;
        },

        onModelLoaded: function () {
          this.centerAndScaleModel();
        },

        centerAndScaleModel: function () {
          let box;
          let size;
          let scale;
          const modelEl = this.modelEl;
          const shadowEl = this.shadowEl;
          const titleEl = this.titleEl;
          const gltfObject = modelEl.getObject3D('mesh');

          // Reset position and scales.
          modelEl.object3D.position.set(0, 0, 0);
          modelEl.object3D.scale.set(1.0, 1.0, 1.0);
          this.cameraRigEl.object3D.position.z = 3.0;

          // Calculate model size.
          modelEl.object3D.updateMatrixWorld();
          box = new window.THREE.Box3().setFromObject(gltfObject);
          size = box.getSize(new window.THREE.Vector3());

          // Calculate scale factor to resize model to human scale.
          scale = 1.6 / size.y;
          scale = 2.0 / size.x < scale ? 2.0 / size.x : scale;
          scale = 2.0 / size.z < scale ? 2.0 / size.z : scale;

          modelEl.object3D.scale.set(scale, scale, scale);

          // Center model at (0, 0, 0).
          modelEl.object3D.updateMatrixWorld();
          box = new window.THREE.Box3().setFromObject(gltfObject);
          const center = box.getCenter(new window.THREE.Vector3());
          size = box.getSize(new window.THREE.Vector3());

          shadowEl.object3D.scale.y = size.x;
          shadowEl.object3D.scale.x = size.y;
          shadowEl.object3D.position.y = -size.y / 2;
          shadowEl.object3D.position.z = -center.z;
          shadowEl.object3D.position.x = -center.x;

          titleEl.object3D.position.x = 2.2 - center.x;
          titleEl.object3D.position.y = size.y + 0.5;
          titleEl.object3D.position.z = -2;
          titleEl.object3D.visible = true;

          modelEl.object3D.position.x = -center.x;
          modelEl.object3D.position.y = -center.y;
          modelEl.object3D.position.z = -center.z;

          // When in mobile landscape we want to bring the model a bit closer.
          if (AFrame.utils.device.isLandscape()) {
            this.cameraRigEl.object3D.position.z -= 1;
          }
        },

        onMouseDown: function (evt) {
          if (evt.buttons) {
            this.leftRightButtonPressed = evt.buttons === 3;
          }
          this.oldClientX = evt.clientX;
          this.oldClientY = evt.clientY;
        }
      });
    }
    if (AFrame?.components?.['model-viewer'] !== undefined) {
      setModelViewerIsLoaded(true);
    }
  }, [AFrame, arShadowsIsLoaded, hideOnEnterArIsLoaded]);

  return modelViewerIsLoaded;
}
