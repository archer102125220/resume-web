import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';

import { mediaMobile } from '@/styles/globals';

const styles = {
  menu: {
    display: 'inline-block',
    width: '200px',
    // height: '200px',
    maxWidth: '10%',
    // backgroundColor: 'rgb(0,0,0)',
    '& > a': {
      display: 'block',
      marginBottom: '6px'
    },
    [mediaMobile]: {
      maxWidth: '10%'
    }
  }
};

const useStyles = makeStyles(styles);

const Menu = forwardRef(function Menu(props, ref) {
  const classes = useStyles(props);
  const { className = '' } = props;

  return (
    <div ref={ref} className={[classes.menu, className].join(' ')}>
      <Link href="/home">首頁</Link>
      <Link href="/isu">愛嬉遊</Link>
      <Link href="/sports-streaming-platform">體育賽事直播</Link>
      <Link href="/matsu360">馬祖360</Link>
      <Link href="/bbshop">BBShop</Link>
      <Link href="/portfolio">小成品展示</Link>
      <Link href="/external-link">站外成品</Link>
      <Link href="/about-web_site">關於本站</Link>
    </div>
  );
});

Menu.propTypes = {
  className: PropTypes.string
};

// Menu.defaultProps = {
//   className: ''
// };

export default Menu;
