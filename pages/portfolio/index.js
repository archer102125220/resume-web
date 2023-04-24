import Head from 'next/head';
import Image from 'next/image';
// import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import useGTMTrack from '@/hooks/useGTMTrack';

const styles = {
  portfolio: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
    alignItems: 'center'
  },
  portfolioButton: {
    display: 'block',
    marginTop: '10px',
    marginBottom: '10px',
    background: '#fbc780',
    '&:active': {
      background: '#dfa14d'
    },
    '&:hover': {
      background: '#f8cd92'
    }
  }
};

const useStyles = makeStyles(styles);

function Portfolio() {
  const nextRouter = useRouter();

  const classes = useStyles();

  useGTMTrack({ event: 'scnOpen', url: '/portfolio' });

  function handleGoToTappay() {
    nextRouter.push('/portfolio/tappay');
  }
  function handleGoToFirebaseAdmin() {
    nextRouter.push('/portfolio/firebase-admin');
  }

  return (
    <div>
      <Head>
        <title>Parker Chan 的個人資料 - 作品集</title>
      </Head>
      <div className={classes.portfolio}>
        <Button
          sx={styles.portfolioButton}
          variant="contained"
          onClick={handleGoToTappay}
        >
          <p>Tappay串接</p>
          <Image
            src="/tappay-logo.svg"
            alt="Tappay Logo"
            width={200}
            height={50}
          />
        </Button>

        <Button
          sx={styles.portfolioButton}
          variant="contained"
          onClick={handleGoToFirebaseAdmin}
        >
          <p>Firebase Admin SDK</p>
          <Image
            src="/firebase_logo.png"
            alt="Firebase Logo"
            width={200}
            height={50}
          />
        </Button>
      </div>
    </div>
  );
}

export default Portfolio;
