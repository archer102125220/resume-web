import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';

const styles = {
  menu: {
    display: 'inline-block',
    width: '60px',
    height: '100px',
    // backgroundColor: 'rgb(0,0,0)',
    '& > a': {
      display: 'block'
    }
  }
};

const useStyles = makeStyles(styles);

const Menu = forwardRef(function Menu(props, ref) {
  const classes = useStyles(props);
  const propClassName = props.className;

  return (
    <div ref={ref} className={[classes.menu, propClassName].join(' ')}>
      <Link href="/home">首頁</Link>
      {/* <Link href="/tow">tow</Link> */}
      <Link href="/portfolio">作品集</Link>
    </div>
  );
});

Menu.propTypes = {
  className: PropTypes.string,
};

Menu.defaultProps = {
  className: '',
};

export default Menu;
