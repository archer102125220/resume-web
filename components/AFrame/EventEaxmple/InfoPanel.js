import PropTypes from 'prop-types';
import { useId } from 'react';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { useAFrame } from '@/hooks/AFrame/useAFrame';
import { AFrameStoreSubscriber } from '@/hooks/AFrame/useAFrameStore';

function AFrameInfoPanel({
  menuButtonClassName,
  fadeBackgroundId,
  backgroundId,
  mixinMovieImageId,
  ponyoId,
  kazetachinuId,
  karigurashiId,
  raycasterClassName,
  karigurashiButtonId,
  kazetachinuButtonId,
  ponyoButtonId
}) {
  const movieTitleId = useId();
  const movieDescriptionId = useId();
  const karigurashiMovieImageId = useId();
  const kazetachinuMovieImageId = useId();
  const ponyoMovieImageId = useId();

  const AFrame = useAFrameInfoPanel();

  return (
    AFrame !== null && (
      // Info panel of the selected movie.
      <a-entity
        id="infoPanel"
        position="0 0 0.5"
        info-panel={`
          menuButtonClassName: .${menuButtonClassName};
          fadeBackground: [id="${fadeBackgroundId}"];
          movieTitle: [id="${movieTitleId}"];
          movieDescription: [id="${movieDescriptionId}"];
          karigurashiMovieImage: [id="${karigurashiMovieImageId}"];
          kazetachinuMovieImage: [id="${kazetachinuMovieImageId}"];
          ponyoMovieImage: [id="${ponyoMovieImageId}"];
          background: [id="${backgroundId}"];
          karigurashiButtonId: ${karigurashiButtonId};
          kazetachinuButtonId: ${kazetachinuButtonId};
          ponyoButtonId: ${ponyoButtonId};
        `}
        visible="false"
        scale="0.001 0.001 0.001"
        geometry="primitive: plane; width: 1.5; height: 1.8"
        material="color: #333333; shader: flat; transparent: false"
        class={raycasterClassName}
      >
        <a-entity
          id={ponyoMovieImageId}
          mixin={mixinMovieImageId}
          material={`src: ${ponyoId}`}
          visible="false"
        />
        <a-entity
          id={kazetachinuMovieImageId}
          mixin={mixinMovieImageId}
          material={`src: ${kazetachinuId}`}
          visible="false"
        />
        <a-entity
          id={karigurashiMovieImageId}
          mixin={mixinMovieImageId}
          material={`src: ${karigurashiId}`}
          visible="false"
        />
        <a-entity
          id={movieTitleId}
          position="-0.68 -0.1 0"
          // text="shader: msdf; anchor: left; width: 1.5; font: /a-frame/font/custom/zh-msdf.json; color: white; value:《崖上的波妞》（2003年）"
          // text="shader: msdf; anchor: left; width: 1.5; font: /a-frame/font/cubic_11/fonts/msdf/cubic_11_1.010_R-msdf.json; color: white; value:《崖上的波妞》（2003年）"
          // text="shader: msdf; anchor: left; width: 1.5; font: /a-frame/font/zcool/msdf/zcool-W03-msdf.json; color: white; value:《崖上的波妞》（2003年）"
          // text="anchor: left; width: 1.5; font: /a-frame/font/crayonfont/crayon_1-1.typeface.json; color: white; value:《崖上的波妞》（2003年）"
          // text="anchor: left; width: 1.5; font: /a-frame/font/zcool/typeface/zcool-W03.json; color: white; value:《崖上的波妞》（2003年）"
          text="shader: msdf; anchor: left; width: 1.5; font: https://cdn.aframe.io/examples/ui/Viga-Regular.json; color: white; value: Ponyo (2003)"
        />
        <a-entity
          id={movieDescriptionId}
          position="-0.68 -0.2 0"
          // text="baseline: top; shader: msdf; anchor: left; font: /a-frame/font/custom/zh-msdf.json; color: white; value: 這是宮崎駿為吉卜力工作室執導的第八部電影，總體上是他的第十部作品。該片講述了一隻名叫波妞的金魚逃離海洋並被困在玻璃罐中，在被沖上岸後被五歲男孩宗介所救的故事。"
          // text="baseline: top; shader: msdf; anchor: left; font: /a-frame/font/cubic_11/fonts/msdf/cubic_11_1.010_R-msdf.json; color: white; value: 這是宮崎駿為吉卜力工作室執導的第八部電影，總體上是他的第十部作品。該片講述了一隻名叫波妞的金魚逃離海洋並被困在玻璃罐中，在被沖上岸後被五歲男孩宗介所救的故事。"
          // text="baseline: top; shader: msdf; anchor: left; font: /a-frame/font/zcool/msdf/zcool-W03-msdf.json; color: white; value: 這是宮崎駿為吉卜力工作室執導的第八部電影，總體上是他的第十部作品。該片講述了一隻名叫波妞的金魚逃離海洋並被困在玻璃罐中，在被沖上岸後被五歲男孩宗介所救的故事。"
          // text="baseline: top; anchor: left; font: /a-frame/font/crayonfont/crayon_1-1.typeface.json; color: white; value: 這是宮崎駿為吉卜力工作室執導的第八部電影，總體上是他的第十部作品。該片講述了一隻名叫波妞的金魚逃離海洋並被困在玻璃罐中，在被沖上岸後被五歲男孩宗介所救的故事。"
          // text="baseline: top; anchor: left; font: /a-frame/font/zcool/typeface/zcool-W03.json; color: white; value: 這是宮崎駿為吉卜力工作室執導的第八部電影，總體上是他的第十部作品。該片講述了一隻名叫波妞的金魚逃離海洋並被困在玻璃罐中，在被沖上岸後被五歲男孩宗介所救的故事。"
          text="baseline: top; shader: msdf; anchor: left; font: https://cdn.aframe.io/examples/ui/Viga-Regular.json; color: white; value: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
      </a-entity>
    )
  );
}

AFrameInfoPanel.propTypes = {
  menuButtonClassName: PropTypes.string.isRequired,
  fadeBackgroundId: PropTypes.string.isRequired,
  backgroundId: PropTypes.string.isRequired,
  mixinMovieImageId: PropTypes.string.isRequired,
  ponyoId: PropTypes.string.isRequired,
  kazetachinuId: PropTypes.string.isRequired,
  karigurashiId: PropTypes.string.isRequired,
  raycasterClassName: PropTypes.string.isRequired,
  karigurashiButtonId: PropTypes.string.isRequired,
  kazetachinuButtonId: PropTypes.string.isRequired,
  ponyoButtonId: PropTypes.string.isRequired
};

AFrameInfoPanel.defaultProps = {
  menuButtonClassName: 'menu-button'
};

export function useAFrameInfoPanel() {
  const AFrame = useAFrame();

  useIsomorphicLayoutEffect(() => {
    if (AFrame !== null && AFrame.components['info-panel'] === undefined) {
      AFrame.registerComponent('info-panel', {
        schema: {
          menuButtonClassName: { type: 'string', default: '' },
          fadeBackground: { type: 'string', default: '' },
          movieTitle: { type: 'string', default: '' },
          movieDescription: { type: 'string', default: '' },
          karigurashiMovieImage: { type: 'string', default: '' },
          kazetachinuMovieImage: { type: 'string', default: '' },
          ponyoMovieImage: { type: 'string', default: '' },
          background: { type: 'string', default: '' },
          karigurashiButtonId: { type: 'string', default: '' },
          kazetachinuButtonId: { type: 'string', default: '' },
          ponyoButtonId: { type: 'string', default: '' }
        },
        init: function () {
          const AFrameStore = AFrameStoreSubscriber.getSnapshot();

          const {
            menuButtonClassName,
            fadeBackground,
            movieTitle,
            movieDescription,
            karigurashiMovieImage,
            kazetachinuMovieImage,
            ponyoMovieImage,
            background,
            karigurashiButtonId,
            kazetachinuButtonId,
            ponyoButtonId
          } = this.data;

          const buttonEls = document.querySelectorAll(menuButtonClassName);
          this.fadeBackgroundEl = document.querySelector(fadeBackground);
          this.movieImageEl = null;
          this.movieTitleEl = document.querySelector(movieTitle);
          this.movieDescriptionEl = document.querySelector(movieDescription);
          this.movieInfo = {
            [karigurashiButtonId]: AFrameStore.eventEaxmple.getKarigurashi(
              karigurashiMovieImage
            ),
            [kazetachinuButtonId]: AFrameStore.eventEaxmple.getKazetachinu(
              kazetachinuMovieImage
            ),
            [ponyoButtonId]:
              AFrameStore.eventEaxmple.getPonyoMovieImage(ponyoMovieImage)
          };

          this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
          this.onBackgroundClick = this.onBackgroundClick.bind(this);
          this.backgroundEl = document.querySelector(background);
          for (let i = 0; i < buttonEls.length; ++i) {
            buttonEls[i].addEventListener('click', this.onMenuButtonClick);
          }
          this.backgroundEl.addEventListener('click', this.onBackgroundClick);
          this.el.object3D.renderOrder = 9999999;
          this.el.object3D.depthTest = false;
          this.fadeBackgroundEl.object3D.renderOrder = 9;
          this.fadeBackgroundEl.getObject3D('mesh').material.depthTest = false;
        },
        onMenuButtonClick: function (evt) {
          const movieInfo = this.movieInfo[evt.currentTarget.id];
          this.backgroundEl.object3D.scale.set(1, 1, 1);
          this.el.object3D.scale.set(1, 1, 1);

          if (AFrame.utils.device.isMobile()) {
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
    }
  }, [AFrame]);

  return AFrame;
}

export default AFrameInfoPanel;
