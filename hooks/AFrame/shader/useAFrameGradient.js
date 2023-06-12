import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { useAFrame } from '@/hooks/AFrame/useAFrame';

export function useAFrameGradient() {
  const AFrame = useAFrame();

  useIsomorphicLayoutEffect(() => {
    if (AFrame !== null && AFrame.shaders['gradient'] === undefined) {
      AFrame.registerShader('gradient', {
        schema: {
          topColor: {
            type: 'vec3',
            default: { x: 1, y: 0, z: 0 },
            is: 'uniform'
          },
          bottomColor: {
            type: 'vec3',
            default: { x: 0, y: 0, z: 1 },
            is: 'uniform'
          },
          offset: { type: 'float', default: 400, is: 'uniform' },
          exponent: { type: 'float', default: 0.6, is: 'uniform' }
        },
        vertexShader: `
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );
          }
        `,
        fragmentShader: `
            uniform vec3 bottomColor;
            uniform vec3 topColor;
            uniform float offset;
            uniform float exponent;
            varying vec3 vWorldPosition;
            void main() {
              float h = normalize( vWorldPosition + offset ).y;
              gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max(h, 0.0 ), exponent ), 0.0 ) ), 1.0 );
            }
        `
      });
    }
  }, [AFrame]);
}