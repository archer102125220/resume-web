/* eslint-disable quotes */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useId, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Box from '@mui/material/Box';

import useGTMTrack from '@/hooks/useGTMTrack';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import AFrameContent from '@/components/AFrame/AFrameContent';

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

  const aFrameRoot = useRef(null);

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

  function getAframe(Aframe) {
    try {
      Aframe.registerComponent('info-panel', {
        schema: {
          menuButton: { type: 'string', default: '' },
          fadeBackground: { type: 'string', default: '' },
          movieTitle: { type: 'string', default: '' },
          movieDescription: { type: 'string', default: '' },
          karigurashiMovieImage: { type: 'string', default: '' },
          kazetachinuMovieImage: { type: 'string', default: '' },
          ponyoMovieImage: { type: 'string', default: '' },
          background: { type: 'string', default: '' }
        },
        init: function () {
          const buttonEls = document.querySelectorAll(this.data.menuButton);
          const fadeBackgroundEl = (this.fadeBackgroundEl =
            document.querySelector(this.data.fadeBackground));
          this.movieImageEl;
          this.movieTitleEl = document.querySelector(this.data.movieTitle);
          this.movieDescriptionEl = document.querySelector(
            this.data.movieDescription
          );
          this.movieInfo = {
            karigurashiButton: {
              title: 'The Secret World of Arrietty (2010)',
              imgEl: document.querySelector(this.data.karigurashiMovieImage),
              description: `Based on the 1952 novel The Borrowers by Mary Norton, an English author of children's books, about a family of tiny people who live secretly in the walls and floors of a typical household, borrowing items from humans to survive.`
            },
            kazetachinuButton: {
              title: 'The Wind Rises (2013)',
              imgEl: document.querySelector(this.data.kazetachinuMovieImage),
              description: `The Wind Rises is a fictionalised biographical film of Jiro Horikoshi (1903, 1982), designer of the Mitsubishi A5M fighter aircraft and its successor, the Mitsubishi A6M Zero, used by the Empire of Japan during World War II. The film is adapted from Miyazaki's manga of the same name, which was in turn loosely based on both the 1937 novel The Wind Has Risen by Tatsuo Hori and the life of Jiro Horikoshi.`
            },
            ponyoButton: {
              title: 'Ponyo (2003)',
              imgEl: document.querySelector(this.data.ponyoMovieImage),
              description:
                'It is the eighth film Miyazaki directed for Studio Ghibli, and his tenth overall. The film tells the story of Ponyo (Nara), a goldfish who escapes from the ocean and is rescued by a five-year-old human boy, Sōsuke (Doi) after she is washed ashore while trapped in a glass jar.'
            }
          };
          this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
          this.onBackgroundClick = this.onBackgroundClick.bind(this);
          this.backgroundEl = document.querySelector(this.data.background);
          for (let i = 0; i < buttonEls.length; ++i) {
            buttonEls[i].addEventListener('click', this.onMenuButtonClick);
          }
          this.backgroundEl.addEventListener('click', this.onBackgroundClick);
          this.el.object3D.renderOrder = 9999999;
          this.el.object3D.depthTest = false;
          fadeBackgroundEl.object3D.renderOrder = 9;
          fadeBackgroundEl.getObject3D('mesh').material.depthTest = false;
        },
        onMenuButtonClick: function (evt) {
          const movieInfo = this.movieInfo[evt.currentTarget.id];
          this.backgroundEl.object3D.scale.set(1, 1, 1);
          this.el.object3D.scale.set(1, 1, 1);

          console.log(Aframe.utils.device.isMobile());
          if (Aframe.utils.device.isMobile()) {
            this.el.object3D.scale.set(1.4, 1.4, 1.4);
          }
          this.el.object3D.visible = true;
          this.fadeBackgroundEl.object3D.visible = true;
          if (this.movieImageEl) {
            this.movieImageEl.object3D.visible = false;
          }
          this.movieImageEl = movieInfo.imgEl;
          this.movieImageEl.object3D.visible = true;
          this.movieTitleEl.setAttribute('text', 'value', movieInfo.title);
          this.movieDescriptionEl.setAttribute(
            'text',
            'value',
            movieInfo.description
          );
        },
        // eslint-disable-next-line no-unused-vars
        onBackgroundClick: function (evt) {
          this.backgroundEl.object3D.scale.set(0.001, 0.001, 0.001);
          this.el.object3D.scale.set(0.001, 0.001, 0.001);
          this.el.object3D.visible = false;
          this.fadeBackgroundEl.object3D.visible = false;
        }
      });

      Aframe.registerComponent('highlight', {
        schema: {
          menuButton: { type: 'string', default: '' },
          background: { type: 'string', default: '' }
        },
        init: function () {
          const buttonEls = (this.buttonEls = this.el.querySelectorAll(
            this.data.menuButton
          ));
          const backgroundEl = document.querySelector(this.data.background);
          this.onClick = this.onClick.bind(this);
          this.onMouseEnter = this.onMouseEnter.bind(this);
          this.onMouseLeave = this.onMouseLeave.bind(this);
          this.reset = this.reset.bind(this);
          backgroundEl.addEventListener('click', this.reset);
          for (let i = 0; i < buttonEls.length; ++i) {
            buttonEls[i].addEventListener('mouseenter', this.onMouseEnter);
            buttonEls[i].addEventListener('mouseleave', this.onMouseLeave);
            buttonEls[i].addEventListener('click', this.onClick);
          }
        },
        onClick: function (evt) {
          evt.target.pause();
          evt.target.setAttribute('material', 'color', '#046de7');
          this.el.addState('clicked');
          evt.target.object3D.scale.set(1.2, 1.2, 1.2);
        },
        onMouseEnter: function (evt) {
          const buttonEls = this.buttonEls;
          evt.target.setAttribute('material', 'color', '#046de7');
          for (let i = 0; i < buttonEls.length; ++i) {
            if (evt.target === buttonEls[i]) {
              continue;
            }
            buttonEls[i].setAttribute('material', 'color', 'white');
          }
        },
        onMouseLeave: function (evt) {
          if (this.el.is('clicked')) {
            return;
          }
          evt.target.setAttribute('material', 'color', 'white');
        },
        reset: function () {
          const buttonEls = this.buttonEls;
          for (let i = 0; i < buttonEls.length; ++i) {
            this.el.removeState('clicked');
            buttonEls[i].play();
            buttonEls[i].emit('mouseleave');
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - a-frame(事件範例)</title>
      </Head>
      <Box>
        <AFrameContent ref={aFrameRoot} getAframe={getAframe}>
          <a-scene
            background="color: #212"
            environment=""
            cursor="rayOrigin: mouse; fuse: false"
            raycaster="objects: .raycastable"
          >
            <a-assets>
              {/*
                Image source: http://www.ghibli.jp/works/kazetachinu/#frame&gid=1&pid=1
                Image author: Studio Ghibli
               */}
              <img
                id={kazetachinuId}
                src="https://cdn.aframe.io/examples/ui/kazetachinu.jpg"
                crossOrigin="anonymous"
              />
              <img
                id={kazetachinuPosterId}
                src="https://cdn.aframe.io/examples/ui/kazetachinuPoster.jpg"
                crossOrigin="anonymous"
              />
              {/*
                Image source: http://www.ghibli.jp/works/ponyo/#frame&gid=1&pid=36
                Image author: Studio Ghibli
               */}
              <img
                id={ponyoId}
                src="https://cdn.aframe.io/examples/ui/ponyo.jpg"
                crossOrigin="anonymous"
              />
              <img
                id={ponyoPosterId}
                src="https://cdn.aframe.io/examples/ui/ponyoPoster.jpg"
                crossOrigin="anonymous"
              />
              {/* <!--
              Image source: http://www.ghibli.jp/works/karigurashi/#frame&gid=1&pid=32
              Image author: Studio Ghibli
            --> */}
              <img
                id={karigurashiId}
                src="https://cdn.aframe.io/examples/ui/karigurashi.jpg"
                crossOrigin="anonymous"
              />
              <img
                id={karigurashiPosterId}
                src="https://cdn.aframe.io/examples/ui/karigurashiPoster.jpg"
                crossOrigin="anonymous"
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
              class="raycastable"
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

            {/* <!-- Hand controls --> */}
            {/* <a-entity
              id="leftHand"
              laser-controls="hand: left"
              raycaster="objects: .raycastable"
            /> */}
            {/* <a-entity
              id="rightHand"
              laser-controls="hand: right"
              raycaster="objects: .raycastable"
              line="color: #118A7E"
            /> */}

            <a-entity id="ui" position="0 1.6 -2.5">
              {/* <!-- Poster menu --> */}
              <a-entity
                id="menu"
                highlight={`menuButton: .menu-button; background: [id="${backgroundId}"];`}
              >
                <a-entity
                  id="karigurashiButton"
                  position="-0.8 0 0"
                  mixin={mixinFrameId}
                  class="raycastable menu-button"
                >
                  <a-entity
                    material={`src: #${karigurashiPosterId};`}
                    mixin={mixinPosterId}
                  />
                </a-entity>

                <a-entity
                  id="kazetachinuButton"
                  position="0 0 0"
                  mixin={mixinFrameId}
                  class="raycastable menu-button"
                >
                  <a-entity
                    material={`src: #${kazetachinuPosterId}`}
                    mixin={mixinPosterId}
                  />
                </a-entity>

                <a-entity
                  id="ponyoButton"
                  position="0.8 0 0"
                  mixin={mixinFrameId}
                  class="raycastable menu-button"
                >
                  <a-entity
                    material={`src: #${ponyoPosterId}`}
                    mixin={mixinPosterId}
                  />
                </a-entity>
              </a-entity>

              {/* <!-- Info panel of the selected movie. --> */}
              <a-entity
                id="infoPanel"
                position="0 0 0.5"
                info-panel={`menuButton: .menu-button;
                fadeBackground: [id="${fadeBackgroundId}"];
                movieTitle: #movieTitle;
                movieDescription: #movieDescription;
                karigurashiMovieImage: #karigurashiMovieImage;
                kazetachinuMovieImage: #kazetachinuMovieImage;
                ponyoMovieImage: #ponyoMovieImage;
                background: [id="${backgroundId}"];
                `}
                visible="false"
                scale="0.001 0.001 0.001"
                geometry="primitive: plane; width: 1.5; height: 1.8"
                material="color: #333333; shader: flat; transparent: false"
                class="raycastable"
              >
                <a-entity
                  id="ponyoMovieImage"
                  mixin={mixinMovieImageId}
                  material={`src: #${ponyoId}`}
                  visible="false"
                />
                <a-entity
                  id="kazetachinuMovieImage"
                  mixin={mixinMovieImageId}
                  material={`src: #${kazetachinuId}`}
                  visible="false"
                />
                <a-entity
                  id="karigurashiMovieImage"
                  mixin={mixinMovieImageId}
                  material={`src: #${karigurashiId}`}
                  visible="false"
                />
                <a-entity
                  id="movieTitle"
                  position="-0.68 -0.1 0"
                  text="shader: msdf; anchor: left; width: 1.5; font: https://cdn.aframe.io/examples/ui/Viga-Regular.json; color: white; value: Ponyo (2003)"
                />
                <a-entity
                  id="movieDescription"
                  position="-0.68 -0.2 0"
                  text="baseline: top; shader: msdf; anchor: left; font: https://cdn.aframe.io/examples/ui/Viga-Regular.json; color: white; value: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                />
              </a-entity>
            </a-entity>
          </a-scene>
        </AFrameContent>
      </Box>
    </div>
  );
}

export default AFrameEventEaxmple;
