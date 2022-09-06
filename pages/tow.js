import Head from 'next/head';
import Link from 'next/link';
import { makeStyles } from '@mui/styles';

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
    alignItems: 'center'
  },
};

const useStyles = makeStyles(styles);

function Tow(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      <Head>
        <title>Parker Chan 的個人資料</title>
      </Head>

      <div className={classes.main}>
        <Link href="/">home</Link>
      </div>
    </div>
  );
}

export default Tow;