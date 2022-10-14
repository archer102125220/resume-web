import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import anime from 'animejs';
import { tableStyle } from '@/styles/tableStyle';

const styles = (theme) => ({
  content: {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
  },
  contentTable: {
    ...tableStyle,
    top: '5%',
    left: '5%',
    width: '90%',
    height: '90%',
  },
  contentTableTableclothAnimeContent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  contentTableTablecloth: {
    width: '80%',
    height: '100%',
    margin: 'auto',
    padding: '15px',
    // textAlign: 'center',
    backgroundColor: 'rgb(255 226 177)',
  },
});

const useStyles = makeStyles(styles);

function DefalutLayout({ children }) {
  const tableclothRef = useRef(null);
  const mainContentRef = useRef(null);
  const {
    contentTable,
    content,
    contentTableTableclothAnimeContent,
    contentTableTablecloth,
  } = useStyles();
  useEffect(() => {
    console.log(tableclothRef);
    anime({
      targets: tableclothRef.current,
      top: ['-100%', '0%'],
      duration: 1000,
      easing: 'easeOutQuint',
    });
  }, []);
  return (
    <div className={content}>
      <div className={contentTable}>
        <div ref={tableclothRef} className={contentTableTableclothAnimeContent}>
          <div className={contentTableTablecloth}>
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
  children: PropTypes.any,
};

export default DefalutLayout;
