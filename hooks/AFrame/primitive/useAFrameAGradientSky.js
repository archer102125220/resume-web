import { useState } from 'react';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { useAFrame } from '@/hooks/AFrame/useAFrame';

export function useAFrameAGradientSky() {
  const [aGradientSkyIsLoaded, setAGradientSkyIsLoaded] = useState(false);

  const AFrame = useAFrame();

  useIsomorphicLayoutEffect(() => {
    if (
      AFrame !== null &&
      AFrame.primitives.primitives['a-gradient-sky'] === undefined
    ) {
      AFrame.registerPrimitive('a-gradient-sky', {
        defaultComponents: {
          geometry: {
            primitive: 'sphere',
            radius: 5000,
            segmentsWidth: 64,
            segmentsHeight: 20
          },
          material: {
            shader: 'gradient'
          },
          scale: '-1 1 1'
        },

        mappings: {
          topColor: 'material.topColor',
          bottomColor: 'material.bottomColor',
          offset: 'material.offset',
          exponent: 'material.exponent'
        }
      });
    }
    if (AFrame?.primitives?.primitives?.['a-gradient-sky'] !== undefined) {
      setAGradientSkyIsLoaded(true);
    }
  }, [AFrame]);

  return aGradientSkyIsLoaded;
}
