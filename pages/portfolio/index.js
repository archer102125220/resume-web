import Head from 'next/head';
import Image from 'next/image';
// import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import { mediaMobile } from '@/styles/globals';
import { buttonStyle } from '@/styles/buttonStyle';
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
    ...buttonStyle,
    textAlign: 'center',
    [mediaMobile]: {
      padding: '6px 10px'
    }
  },
  portfolioImg: {
    width: '200px'
  },
  portfolioCKeditorImg: {
    width: '100px',
    height: '100px'
  }
};

const useStyles = makeStyles(styles);

function Portfolio() {
  const nextRouter = useRouter();

  const classes = useStyles();

  useGTMTrack({ event: 'scnOpen', url: '/portfolio' });

  function handleGoToTappay(e) {
    console.log(e);
    e.preventDefault();
    nextRouter.push('/portfolio/tappay');
  }
  function handleGoToFirebaseAdmin(e) {
    e.preventDefault();
    nextRouter.push('/portfolio/firebase-admin');
  }
  function handleGoToHTMLEditor(e) {
    e.preventDefault();
    nextRouter.push('/portfolio/html-editor');
  }

  return (
    <div>
      <Head>
        <title>Parker Chan 的個人資料 - 作品集</title>
      </Head>
      <p>
        除了個人在學及閒暇時間所做的成品，工作時所做並易於抽離的部分也會列在此處～
      </p>
      <div className={classes.portfolio}>
        <Button
          sx={styles.portfolioButton}
          variant="contained"
          onClick={handleGoToTappay}
          component="a"
          href="/portfolio/tappay"
        >
          <p>Tappay串接</p>
          <Image
            src="/img/tappay-logo.svg"
            alt="Tappay Logo"
            className={classes.portfolioImg}
            width={200}
            height={50}
          />
        </Button>

        <Button
          sx={styles.portfolioButton}
          variant="contained"
          onClick={handleGoToFirebaseAdmin}
          component="a"
          href="/portfolio/firebase-admin"
        >
          <p>Firebase Admin SDK</p>
          <Image
            src="/img/firebase_logo.png"
            alt="Firebase Logo"
            className={classes.portfolioImg}
            width={200}
            height={50}
          />
        </Button>

        <Button
          sx={styles.portfolioButton}
          variant="contained"
          onClick={handleGoToHTMLEditor}
          component="a"
          href="/portfolio/html-editor"
        >
          <p>HTML編輯器</p>
          <Image
            src="/ckeditor/img/ckeditor-4.svg"
            alt="CKEditor4"
            className={classes.portfolioCKeditorImg}
            width={100}
            height={100}
          />
          <Image
            src="/ckeditor/img/ckeditor-5.svg"
            alt="CKEditor5"
            className={classes.portfolioCKeditorImg}
            width={100}
            height={100}
          />
        </Button>
      </div>
    </div>
  );
}

export default Portfolio;
