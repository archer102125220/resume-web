import Link from 'next/link';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { systemAsyncThunk } from '@/redux/system';
import { wrapper } from '@/redux/index';

const styles = {
  container: {
    padding: '0 2rem',
  },
  main: {
    minHeight: 'calc(100vh - 1em - 8rem)',
    padding: '4rem 0',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const useStyles = makeStyles(styles);

function Tow(props) {
  const classes = useStyles(props);

  const dispatch = useDispatch();
  const gethomePage = () => dispatch(systemAsyncThunk.GET_HomePage());
  const successMessage = () => {
    return dispatch({ type: 'system/message_success', payload: '246' });
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <Button variant="contained" onClick={gethomePage}>
          call api
        </Button>
        <Button variant="contained" onClick={successMessage}>
          open message
        </Button>
        <Link href="/home">home</Link>
      </div>
    </div>
  );
}

// https://github.com/kirill-konshin/next-redux-wrapper#getserversideprops
export const getServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) =>
    function () {
      dispatch({ type: 'system/message_success', payload: '123' });

      return {
        props: {},
      };
    }
);

export default Tow;
