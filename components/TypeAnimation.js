import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import { typeAnimation } from '@/styles/globals';

const styles = { typeAnimation };

const useStyles = makeStyles(styles);

function TypeAnimation(props) {
  const classes = useStyles(props);
  const { label } = props;

  return (
    <p className={classes.typeAnimation} data-text={label}>
      {label}
    </p>
  );
}

TypeAnimation.propTypes = {
  label: PropTypes.string
};

TypeAnimation.defaultProps = {
  label: ''
};

export default TypeAnimation;
