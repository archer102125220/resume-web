import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { useImportAFrame } from '@/hooks/AFrame/useImportAFrame';

const _AFrameContent = forwardRef(function AFrameContent(
  { children, beforeAFrameLoad, getAframe, afterAFrameLoad },
  AFrameRootRef
) {
  const _AFrame = useImportAFrame(beforeAFrameLoad, getAframe, afterAFrameLoad);

  return <div ref={AFrameRootRef}>{_AFrame !== null ? children : <></>}</div>;
});

_AFrameContent.propTypes = {
  children: PropTypes.any,
  beforeAFrameLoad: PropTypes.func,
  getAframe: PropTypes.func,
  afterAFrameLoad: PropTypes.func
};

_AFrameContent.defaultProps = {
  beforeAFrameLoad() {},
  getAframe() {},
  afterAFrameLoad() {}
};

export default _AFrameContent;
