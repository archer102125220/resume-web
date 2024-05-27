import { isValidElement } from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { handleAnimateNumber } from '@/styles/animation';

function AnimationNumber(props) {
  const {
    tagname = 'span',
    component = null,
    label = '',
    start = 9,
    duration = 1000
  } = props;

  const [numberLabel, setNumberLabel] = useState(Number(label));

  let CustomTag = tagname;

  if (isValidElement(component) === true) {
    CustomTag = component;
  }

  useEffect(() => {
    if (isNaN(Number(label)) === false) {
      handleAnimateNumber(setNumberLabel, start, Number(label), duration);
    }
  }, []);

  return <CustomTag {...props}>{numberLabel}</CustomTag>;
}

AnimationNumber.propTypes = {
  tagname: PropTypes.string,
  component: PropTypes.any,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  start: PropTypes.number,
  duration: PropTypes.number
};

AnimationNumber.defaultProps = {
  tagname: 'span',
  component: null,
  label: '',
  start: 9,
  duration: 1000
};

export default AnimationNumber;
