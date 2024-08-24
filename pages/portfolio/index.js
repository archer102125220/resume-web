import Head from 'next/head';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

import { mediaMobile } from '@/styles/globals';
import { buttonStyle } from '@/styles/buttonStyle';
import useGTMTrack from '@/hooks/useGTMTrack';

import Image from '@/components/Image';

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
    width: '80px',
    height: '80px'
  }
};

const useStyles = makeStyles(styles);

function Portfolio() {
  const nextRouter = useRouter();

  const classes = useStyles();

  useGTMTrack({ event: 'scnOpen', url: '/portfolio' });

  function handleGoToTappay(e) {
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

  function handleGoToAFrame(e) {
    e.preventDefault();
    nextRouter.push('/portfolio/a-frame');
  }

  function handleGoToYoutubeApi(e) {
    e.preventDefault();
    nextRouter.push('/portfolio/youtube-api');
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
          className={classes.portfolioButton}
          variant="contained"
          onClick={handleGoToTappay}
          component="a"
          href="/portfolio/tappay"
        >
          <p>Tappay串接</p>
          <Image
            src="/img/tappay/tappay-logo.svg"
            alt="Tappay Logo"
            className={classes.portfolioImg}
            width={200}
            height={50}
          />
        </Button>

        <Button
          className={classes.portfolioButton}
          variant="contained"
          onClick={handleGoToFirebaseAdmin}
          component="a"
          href="/portfolio/firebase-admin"
        >
          <p>Firebase Admin SDK</p>
          <Image
            src="/img/firebase/firebase_logo.png"
            alt="Firebase Logo"
            className={classes.portfolioImg}
            priority={true}
            width={200}
            height={50}
          />
        </Button>

        <Button
          className={classes.portfolioButton}
          variant="contained"
          onClick={handleGoToHTMLEditor}
          component="a"
          href="/portfolio/html-editor"
        >
          <p>HTML編輯器</p>
          <Image
            src="/img/ckeditor/ckeditor-4.svg"
            alt="CKEditor4"
            className={classes.portfolioCKeditorImg}
            width={80}
            height={80}
          />
          <Image
            src="/img/ckeditor/ckeditor-5.svg"
            alt="CKEditor5"
            className={classes.portfolioCKeditorImg}
            width={100}
            height={100}
          />
        </Button>

        <Button
          className={classes.portfolioButton}
          variant="contained"
          onClick={handleGoToAFrame}
          component="a"
          href="/portfolio/a-frame"
        >
          <p>a-frame</p>
          <Image
            src="/img/aframe-name-pink.svg"
            alt="a-frame"
            className={classes.portfolioImg}
            priority={true}
            width={200}
            height={50}
          />
        </Button>

        <Button
          className={classes.portfolioButton}
          variant="contained"
          onClick={handleGoToYoutubeApi}
          component="a"
          href="/portfolio/youtube-api"
        >
          <p>youtube api</p>
          <Image
            src="/img/youtube-logo-icon.svg"
            alt="youtube"
            className={classes.portfolioImg}
            priority={true}
            width={200}
            height={50}
          />
        </Button>
      </div>
    </div>
  );
}

export default Portfolio;
