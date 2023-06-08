import PropTypes from 'prop-types';
import {
  useState,
  useEffect,
  forwardRef,
  createContext,
  useContext,
  useReducer
} from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

const _AFrameContent = forwardRef(function AFrameContent(
  {
    children,
    renderBeforeAFrameLoad,
    beforeAFrameLoad,
    getAframe,
    afterAFrameLoad
  },
  AFrameRoot
) {
  const [AFrameLoaded, setAFrameLoaded] = useState(false);

  const [AFrame, dispatch] = useReducer(AFrameReducer, initialAFrame);

  useIsomorphicLayoutEffect(() => {
    (async () => {
      if (typeof beforeAFrameLoad === 'function') {
        await beforeAFrameLoad();
      }

      try {
        await import('aframe');
        await Promise.all([
          import('aframe-event-set-component'),
          import('aframe-environment-component')
        ]);
      } catch (error) {
        console.log(error);
      }

      if (typeof getAframe === 'function') {
        await getAframe(window.AFRAME);
      }

      const html = document.querySelector('html');
      const hasClassName = html.classList.value.includes('a-fullscreen');
      if (hasClassName === false) {
        html.classList.add('a-fullscreen');
      }

      dispatch({
        type: 'insert',
        payload: window.AFRAME
      });
      setAFrameLoaded(true);
    })();
  }, []);
  useEffect(() => {
    return () => {
      const html = document.querySelector('html');
      html.classList.remove('a-fullscreen');
    };
  }, []);
  useEffect(() => {
    if (AFrameLoaded === true && typeof afterAFrameLoad === 'function') {
      afterAFrameLoad(window.AFRAME);
    }
  }, [AFrameLoaded]);

  return (
    <AFrameContext.Provider value={AFrame}>
      <AFrameDispatchContext.Provider value={dispatch}>
        <div ref={AFrameRoot}>
          {renderBeforeAFrameLoad || AFrameLoaded ? children : <></>}
        </div>
      </AFrameDispatchContext.Provider>
    </AFrameContext.Provider>
  );
});

_AFrameContent.propTypes = {
  children: PropTypes.any,
  renderBeforeAFrameLoad: PropTypes.bool,
  beforeAFrameLoad: PropTypes.func,
  getAframe: PropTypes.func,
  afterAFrameLoad: PropTypes.func
};

_AFrameContent.defaultProps = {
  renderBeforeAFrameLoad: false,
  beforeAFrameLoad() {},
  getAframe() {},
  afterAFrameLoad() {}
};

const AFrameContext = createContext(null);

const AFrameDispatchContext = createContext(null);

function AFrameReducer(AFrame, action) {
  switch (action.type) {
    case 'insert': {
      return action.payload;
    }
    default: {
      return AFrame;
    }
  }
}

const initialAFrame = null;

export function useAFrame() {
  return [useContext(AFrameContext), useContext(AFrameDispatchContext)];
}

// export function useAFrameDispatch() {
//   return useContext(AFrameDispatchContext);
// }

export default _AFrameContent;
