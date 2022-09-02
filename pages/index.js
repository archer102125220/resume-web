// import PropTypes from 'prop-types';
import Head from 'next/head';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { wrapper } from '@/redux/index';
import { systemAsyncThunk } from '@/redux/system';

const styles = {
  container: {
    padding: '0 2rem',
  },
  main: {
    minHeight: '100vh',
    padding: '4rem 0',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
};

const useStyles = makeStyles(styles);

function Home(props) {
  const classes = useStyles(props);

  const dispatch = useDispatch();
  const gethomePage = () => dispatch(systemAsyncThunk.GET_HomePage());
  const successMessage = () => dispatch({ type: 'system/message_success', payload: '246' });

  return (
    <div className={classes.container}>
      <Head>
        <title>Parker Chan 的個人資料</title>
      </Head>

      <main className={classes.main}>
        <Button variant="contained" onClick={gethomePage}>
          call api
        </Button>
        <Button variant="contained" onClick={successMessage}>
          open message
        </Button>
      </main>
    </div>
  );
}

export default Home;
// export default Home;

Home.propTypes = {
};

// // https://github.com/kirill-konshin/next-redux-wrapper#getserversideprops
export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) =>
  function () {
    dispatch({ type: 'system/message_success', payload: '123' });

    return {
      props: {},
    };
  }
);
