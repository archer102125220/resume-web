/* eslint-disable quotes */
import { useId } from 'react';
import PropTypes from 'prop-types';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { useAFrame } from '@/components/AFrame/AFrameContent';

function AFrameInfoPanel({
  menuButtonClassName,
  fadeBackgroundId,
  backgroundId,
  mixinMovieImageId,
  ponyoId,
  kazetachinuId,
  karigurashiId
}) {
  const movieTitleId = useId();
  const movieDescriptionId = useId();
  const karigurashiMovieImageId = useId();
  const kazetachinuMovieImageId = useId();
  const ponyoMovieImageId = useId();

  const [AFrame] = useAFrame();

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
          background: { type: 'string', default: '' }
        },
        init: function () {
          const buttonEls = document.querySelectorAll(this.data.menuButtonClassName);
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

          console.log(AFrame.utils.device.isMobile());
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

  return (
    AFrame !== null && (
      // Info panel of the selected movie.
      <a-entity
        id="infoPanel"
        position="0 0 0.5"
        info-panel={`menuButtonClassName: .${menuButtonClassName};
          fadeBackground: [id="${fadeBackgroundId}"];
          movieTitle: [id="${movieTitleId}"];
          movieDescription: [id="${movieDescriptionId}"];
          karigurashiMovieImage: [id="${karigurashiMovieImageId}"];
          kazetachinuMovieImage: [id="${kazetachinuMovieImageId}"];
          ponyoMovieImage: [id="${ponyoMovieImageId}"];
          background: [id="${backgroundId}"];
        `}
        visible="false"
        scale="0.001 0.001 0.001"
        geometry="primitive: plane; width: 1.5; height: 1.8"
        material="color: #333333; shader: flat; transparent: false"
        class="raycastable"
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
          text="shader: msdf; anchor: left; width: 1.5; font: https://cdn.aframe.io/examples/ui/Viga-Regular.json; color: white; value: Ponyo (2003)"
        />
        <a-entity
          id={movieDescriptionId}
          position="-0.68 -0.2 0"
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
  karigurashiId: PropTypes.string.isRequired
};

AFrameInfoPanel.defaultProps = {
  menuButtonClassName: 'menu-button'
};

export default AFrameInfoPanel;
