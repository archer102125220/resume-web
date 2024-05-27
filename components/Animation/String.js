import { isValidElement } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import { animationString } from '@/styles/animation';

const styles = { animationString };

const useStyles = makeStyles(styles);

function AnimationString(props) {
  const classes = useStyles(props);
  const { tagname = 'p', component = null, label = '', color = '#000' } = props;
  const style = {};

  if (typeof color === 'string' && color !== '') {
    style['--string_animation_color'] = color;
  }

  let CustomTag = tagname;

  if (isValidElement(component) === true) {
    CustomTag = component;
  }

  return (
    <CustomTag
      {...props}
      className={[classes.animationString, props.className].join(' ')}
      data-text={label}
      style={style}
    >
      {label}
    </CustomTag>
  );
}

AnimationString.propTypes = {
  tagname: PropTypes.string,
  component: PropTypes.any,
  label: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string
};

AnimationString.defaultProps = {
  tagname: 'p',
  component: null,
  label: '',
  color: '#000',
  className: ''
};

export default AnimationString;
