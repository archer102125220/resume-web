import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { useImportAFrame } from '@/hooks/AFrame/useImportAFrame';

const _AFrameContent = forwardRef(function AFrameContent(
  {
    children,
    beforeAFrameLoad = () => {},
    getAframe = () => {},
    afterAFrameLoad = () => {},
    isRender = true
  },
  AFrameRootRef
) {
  const _AFrame = useImportAFrame(beforeAFrameLoad, getAframe, afterAFrameLoad);

  return (
    <div ref={AFrameRootRef}>
      {_AFrame !== null && isRender === true ? children : <></>}
    </div>
  );
});

_AFrameContent.propTypes = {
  children: PropTypes.any,
  beforeAFrameLoad: PropTypes.func,
  getAframe: PropTypes.func,
  afterAFrameLoad: PropTypes.func,
  isRender: PropTypes.bool
};

// _AFrameContent.defaultProps = {
//   beforeAFrameLoad() {},
//   getAframe() {},
//   afterAFrameLoad() {},
//   isRender: true
// };

export default _AFrameContent;
