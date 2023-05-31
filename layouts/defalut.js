import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import anime from 'animejs';

import { mediaMobile } from '@/styles/globals';
import { tableStyle } from '@/styles/tableStyle';
import Menu from '@/components/layout/Menu';

const styles = theme => ({
  content: {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.primary.main
  },
  table: {
    ...tableStyle,
    top: '5%',
    left: '2.5%',
    width: '95%',
    height: '90%'
  },
  tableclothAnimeContent: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  tablecloth: {
    width: '80%',
    height: '100%',
    margin: 'auto',
    padding: '15px',
    // textAlign: 'center',
    backgroundColor: 'rgb(255 226 177)',
    overflow: 'auto',
    [mediaMobile]: {
      width: '70%',
      // padding: '15px 5px',
      padding: '15px 2px',
    }
  },
  tableclothAnimeContentMenu: {
    position: 'absolute',
    left: '-100%',
    [mediaMobile]: {
      width: '15%'
    }
  }
});

const useStyles = makeStyles(styles);

function DefalutLayout({ children }) {
  const tableclothRef = useRef(null);
  const mainContentRef = useRef(null);
  const menuRef = useRef(null);

  const {
    table,
    content,
    tableclothAnimeContent,
    tablecloth,
    tableclothAnimeContentMenu
  } = useStyles();

  useEffect(() => {
    if (menuRef?.current?.style) menuRef.current.style.left = '-100%';
    anime({
      targets: tableclothRef.current,
      top: ['-100%', '0%'],
      duration: 1000,
      easing: 'easeOutQuint',
      complete() {
        anime({
          targets: menuRef.current,
          left: ['-100%', '0%'],
          duration: 1000,
          easing: 'easeOutQuint'
        });
      }
    });
  }, []);

  return (
    <div className={content}>
      <div className={table}>
        <div ref={tableclothRef} className={tableclothAnimeContent}>
          <Menu ref={menuRef} className={tableclothAnimeContentMenu} />
          <div className={tablecloth}>
            <Typography component="main" ref={mainContentRef}>
              {children}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

DefalutLayout.propTypes = {
  children: PropTypes.any
};

export default DefalutLayout;
