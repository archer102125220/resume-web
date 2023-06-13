import { useState } from 'react';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { useAFrame } from '@/hooks/AFrame/useAFrame';

export function useAFrameBackgroundGradient() {
  const [backgroundGradientIsLoaded, setBackgroundGradientIsLoaded] = useState(false);

  const AFrame = useAFrame();

  useIsomorphicLayoutEffect(() => {
    if (
      AFrame !== null &&
      AFrame.shaders['background-gradient'] === undefined
    ) {
      AFrame.registerShader('background-gradient', {
        schema: {
          colorTop: { type: 'color', default: '#37383c', is: 'uniform' },
          colorBottom: { type: 'color', default: '#757575', is: 'uniform' }
        },
        vertexShader: `
            varying vec3 vWorldPosition;
            void main() {
              vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
              vWorldPosition = worldPosition.xyz;
              gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }
        `,
        fragmentShader: `
            uniform vec3 colorTop;
            uniform vec3 colorBottom;
            varying vec3 vWorldPosition;
            void main() {
              vec3 pointOnSphere = normalize(vWorldPosition.xyz);
              float f = 1.0;
              f = sin(pointOnSphere.y * 2.2) + 0.4;
              gl_FragColor = vec4(mix(colorBottom, colorTop, f), 1.0);
            }
        `
      });
    }
    if (AFrame?.shaders?.['background-gradient'] !== undefined) {
      setBackgroundGradientIsLoaded(true);
    }
  }, [AFrame]);

  return backgroundGradientIsLoaded;
}
