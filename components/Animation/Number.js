import { useState, useEffect, isValidElement } from 'react';
import PropTypes from 'prop-types';

import { handleAnimateNumber } from '@/styles/animation';

function AnimationNumber(props) {
  const {
    tagName = 'span',
    component = null,
    label = '',
    start = 9,
    duration = 1000,
    ...ortherProps
  } = props;

  const [numberLabel, setNumberLabel] = useState(Number(label));

  let CustomTag = tagName;

  if (isValidElement(component) === true) {
    CustomTag = component;
  }

  useEffect(() => {
    if (isNaN(Number(label)) === false) {
      handleAnimateNumber(setNumberLabel, start, Number(label), duration);
    }
  }, []);

  return <CustomTag {...ortherProps}>{numberLabel}</CustomTag>;
}

AnimationNumber.propTypes = {
  tagName: PropTypes.string,
  component: PropTypes.any,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  start: PropTypes.number,
  duration: PropTypes.number
};

// AnimationNumber.defaultProps = {
//   tagName: 'span',
//   component: null,
//   label: '',
//   start: 9,
//   duration: 1000
// };

export default AnimationNumber;
