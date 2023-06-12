import PropTypes from 'prop-types';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { useAFrame } from '@/hooks/AFrame/useAFrame';

function AFrameHighlight({
  menuButtonClassName,
  backgroundId,
  mixinFrameId,
  karigurashiPosterId,
  mixinPosterId,
  kazetachinuPosterId,
  ponyoPosterId,
  raycasterClassName,
  karigurashiButtonId,
  kazetachinuButtonId,
  ponyoButtonId
}) {
  const AFrame = useAFrameHighlight();

  return (
    AFrame !== null && (
      // Poster menu
      <a-entity
        id="menu"
        highlight={`menuButtonClassName: .${menuButtonClassName}; background: [id="${backgroundId}"];`}
      >
        <a-entity
          id={karigurashiButtonId}
          position="-0.8 0 0"
          mixin={mixinFrameId}
          class={[raycasterClassName, menuButtonClassName].join(' ')}
        >
          <a-entity
            material={`src: ${karigurashiPosterId};`}
            mixin={mixinPosterId}
          />
        </a-entity>

        <a-entity
          id={kazetachinuButtonId}
          position="0 0 0"
          mixin={mixinFrameId}
          class={[raycasterClassName, menuButtonClassName].join(' ')}
        >
          <a-entity
            material={`src: ${kazetachinuPosterId}`}
            mixin={mixinPosterId}
          />
        </a-entity>

        <a-entity
          id={ponyoButtonId}
          position="0.8 0 0"
          mixin={mixinFrameId}
          class={[raycasterClassName, menuButtonClassName].join(' ')}
        >
          <a-entity material={`src: ${ponyoPosterId}`} mixin={mixinPosterId} />
        </a-entity>
      </a-entity>
    )
  );
}

AFrameHighlight.propTypes = {
  menuButtonClassName: PropTypes.string.isRequired,
  backgroundId: PropTypes.string.isRequired,
  mixinFrameId: PropTypes.string.isRequired,
  karigurashiPosterId: PropTypes.string.isRequired,
  mixinPosterId: PropTypes.string.isRequired,
  kazetachinuPosterId: PropTypes.string.isRequired,
  ponyoPosterId: PropTypes.string.isRequired,
  raycasterClassName: PropTypes.string.isRequired,
  karigurashiButtonId: PropTypes.string.isRequired,
  kazetachinuButtonId: PropTypes.string.isRequired,
  ponyoButtonId: PropTypes.string.isRequired
};

AFrameHighlight.defaultProps = {
  menuButtonClassName: 'menu-button'
};

export function useAFrameHighlight() {
  const AFrame = useAFrame();

  useIsomorphicLayoutEffect(() => {
    if (AFrame !== null && AFrame.components['highlight'] === undefined) {
      AFrame.registerComponent('highlight', {
        schema: {
          menuButtonClassName: { type: 'string', default: '' },
          background: { type: 'string', default: '' }
        },
        init: function () {
          const buttonEls = (this.buttonEls = this.el.querySelectorAll(
            this.data.menuButtonClassName
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
    }
  }, [AFrame]);

  return AFrame;
}

export default AFrameHighlight;
