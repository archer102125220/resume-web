import { useEffect } from 'react';

import { useAFrame } from '@/components/AFrame/AFrameContent';

export function AFrameHideOnClick() {
  const [AFrame] = useAFrame();

  useEffect(() => {
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
      });
    }
  }, [AFrame]);

  return (
    AFrame !== null && (
      <a-sphere
        hide-on-click="target:#another_cube"
        position="0 1.25 -5"
        radius="1.25"
        src="/a-frame/img/cork-board.webp"
      />
    )
  );
}

export default AFrameHideOnClick;
