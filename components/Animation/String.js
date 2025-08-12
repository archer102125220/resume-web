import { useState, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import { animationString } from '@/styles/animation';

const styles = { animationString };

const useStyles = makeStyles(styles);

function AnimationString(props) {
  const classes = useStyles(props);
  const {
    tagName = 'p',
    component = null,
    label = '',
    color = '#000',
    ...ortherProps
  } = props;
  const style = {};

  const [isAnimationEnd, setIsAnimationEnd] = useState(false);

  if (typeof color === 'string' && color !== '') {
    style['--string_animation_color'] = color;
  }

  let CustomTag = tagName;

  if (isValidElement(component) === true) {
    CustomTag = component;
  }

  return (
    <CustomTag
      {...ortherProps}
      className={[
        isAnimationEnd === false ? classes.animationString : '',
        props.className
      ].join(' ')}
      data-text={label}
      style={style}
      onAnimationEnd={() => setIsAnimationEnd(true)}
    >
      {label}
    </CustomTag>
  );
}

AnimationString.propTypes = {
  tagName: PropTypes.string,
  component: PropTypes.any,
  label: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string
};

// AnimationString.defaultProps = {
//   tagName: 'p',
//   component: null,
//   label: '',
//   color: '#000',
//   className: ''
// };

export default AnimationString;
