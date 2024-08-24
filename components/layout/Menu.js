import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';

import { mediaMobile } from '@/styles/globals';

const styles = {
  menu: {
    display: 'inline-block',
    width: '85px',
    // height: '200px',
    maxWidth: '8%',
    // backgroundColor: 'rgb(0,0,0)',
    '& > a': {
      display: 'block'
    },
    [mediaMobile]: {
      maxWidth: '10%'
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
      <Link href="/isu">愛嬉遊</Link>
      <Link href="/matsu360">馬祖360</Link>
      <Link href="/bbshop">BBShop</Link>
      <Link href="/portfolio">小成品展示</Link>
    </div>
  );
});

Menu.propTypes = {
  className: PropTypes.string
};

Menu.defaultProps = {
  className: ''
};

export default Menu;
