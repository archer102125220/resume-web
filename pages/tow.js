import { useCallback } from 'react';
import Head from 'next/head';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { systemAsyncThunk } from '@/redux/system';
// import { wrapper } from '@/redux/index';
import useGTMTrack from '@/hooks/useGTMTrack';

const styles = {
  container: {
    padding: '0 2rem'
  },
  main: {
    minHeight: 'calc(100vh - 1em - 8rem)',
    padding: '4rem 0',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const useStyles = makeStyles(styles);

function Tow(props) {
  const classes = useStyles(props);

  const dispatch = useDispatch();
  const gethomePage = useCallback(
    () => dispatch(systemAsyncThunk.GET_HomePage()),
    [dispatch]
  );
  const successMessage = useCallback(() => {
    return dispatch({ type: 'system/message_success', payload: '246' });
  }, [dispatch]);

  useGTMTrack({ event: 'scnOpen', url: '/tow' });

  return (
    <div className={classes.container}>
      <Head>
        <title>Parker Chan 的個人資料 - 次頁</title>
      </Head>
      <div className={classes.main}>
        <Button variant="contained" onClick={gethomePage}>
          call api
        </Button>
        <Button variant="contained" onClick={successMessage}>
          open message
        </Button>
      </div>
    </div>
  );
}

// https://github.com/kirill-konshin/next-redux-wrapper#getserversideprops
// export const getServerSideProps = wrapper.getServerSideProps(
//   ({ dispatch }) =>
//     function () {
//       dispatch({ type: 'system/message_success', payload: '123' });

//       return {
//         props: {}
//       };
//     }
// );

export default Tow;
