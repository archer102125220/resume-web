import PropTypes from 'prop-types';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { useAFrame } from '@/hooks/AFrame/useAFrame';

export function AFrameHideOnClick({ anotherCubeId, aSphereId, cursorId }) {
  const AFrame = useAFrameHideOnClick();

  return (
    AFrame !== null && (
      <a-sphere
        id={aSphereId}
        raycaster={`objects: #${cursorId}`}
        hide-on-click={`target: [id="${anotherCubeId}"]`}
        position="0 1.25 -5"
        radius="1.25"
        src="/a-frame/img/cork-board.webp"
      />
    )
  );
}

AFrameHideOnClick.propTypes = {
  anotherCubeId: PropTypes.string.isRequired,
  aSphereId: PropTypes.string.isRequired,
  cursorId: PropTypes.string.isRequired
};

export function useAFrameHideOnClick() {
  const AFrame = useAFrame();

  useIsomorphicLayoutEffect(() => {
    if (AFrame !== null && AFrame.components['hide-on-click'] === undefined) {
      AFrame.registerComponent('hide-on-click', {
        dependencies: ['raycaster'],
        schema: {
          target: { type: 'selector' }
        },
        init: function () {
          const data = this.data;
          const el = this.el;
          el.addEventListener('click', function () {
            el.setAttribute('visible', false);
            data.target.setAttribute('visible', true);
          });
        }
        // update: function () {},
        // tick: function () {},
        // remove: function () {},
        // pause: function () {},
        // play: function () {}
      });
    }
  }, [AFrame]);

  return AFrame;
}

export default AFrameHideOnClick;
