import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { makeStyles } from '@mui/styles';

const styles = {
  menu: {
    display: 'inline-block',
    width: '100px',
    height: '100px',
    backgroundColor: 'rgb(0,0,0)',
  },
};

const useStyles = makeStyles(styles);

const Menu = forwardRef(function Menu(props, ref) {
  const classes = useStyles(props);
  const propClassName = props.className;

  return (
    <div ref={ref} className={[classes.menu, propClassName].join(' ')}></div>
  );
});

Menu.propTypes = {
  className: PropTypes.string,
};

Menu.defaultProps = {
  className: '',
};

export default Menu;
