import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
// import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';

const styles = {
  portfolio: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
    alignItems: 'center'
  }
};

const useStyles = makeStyles(styles);

function Portfolio() {
  const classes = useStyles();

  useEffect(() => {
    try {
      const title = document.head.title;
      window.dataLayer.push({ event: 'scnOpen', url: '/portfolio', title });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Parker Chan 的個人資料 - 作品集</title>
      </Head>
      <div className={classes.portfolio}>
        <Link href="/tappay">Tappay串接</Link>
        <Link href="/firebase-admin">FirebaseAdmin</Link>
      </div>
    </div>
  );
}

export default Portfolio;
