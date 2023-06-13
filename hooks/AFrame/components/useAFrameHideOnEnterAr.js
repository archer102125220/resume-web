import { useState } from 'react';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { useAFrame } from '@/hooks/AFrame/useAFrame';

export function useAFrameHideOnEnterAr() {
  const [hideOnEnterArIsLoaded, setHideOnEnterArIsLoaded] = useState(false);

  const AFrame = useAFrame();

  useIsomorphicLayoutEffect(() => {
    if (AFrame !== null && AFrame.components['hide-on-enter-ar'] === undefined) {
      AFrame.registerComponent('hide-on-enter-ar', {
        init: function () {
          const self = this;
          this.el.sceneEl.addEventListener('enter-vr', function () {
            if (self.el.sceneEl.is('ar-mode')) {
              self.el.object3D.visible = false;
            }
          });
          this.el.sceneEl.addEventListener('exit-vr', function () {
            self.el.object3D.visible = true;
          });
        }
      });
    }
    if (AFrame?.components?.['hide-on-enter-ar'] !== undefined) {
      setHideOnEnterArIsLoaded(true);
    }
  }, [AFrame]);

  return hideOnEnterArIsLoaded;
}
