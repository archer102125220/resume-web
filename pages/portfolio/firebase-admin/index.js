import Head from 'next/head';
// import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import { buttonStyle } from '@/styles/buttonStyle';
import { linkStyle } from '@/styles/linkStyle';
import useGTMTrack from '@/hooks/useGTMTrack';
import Image from '@/components/Image';

const styles = {
  firebaseAdmin: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
    alignItems: 'center'
  },
  // 'firebase_admin-warning': {
  //   color: 'red',
  //   fontSize: '24px'
  // },
  firebaseAdminButton: {
    ...buttonStyle,
    textAlign: 'center'
  },
  firebaseAdminLink: linkStyle,
  firebaseAdminSecondParagraph: {
    display: 'inline'
  },
  firebaseAdminMuiTappayLogo: {
    display: 'inline',
    marginRight: '5px',
    width: '140px'
  },
  firebaseAdminMuiLogo: {
    display: 'inline',
    marginLeft: '5px',
    width: '40px'
  }
};

const useStyles = makeStyles(styles);

function FirebaseAdmin() {
  const nextRouter = useRouter();

  const classes = useStyles();

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/firebase-admin' });

  function handleGoToFirebaseCloudMessaging(e) {
    e.preventDefault();
    nextRouter.push('/portfolio/firebase-admin/cloud-messaging');
  }

  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - FirebaseAdmin</title>
      </Head>
      {/* <p className={classes['firebase_admin-warning']}>
        **此功能目前疑似因為Firebase版本問題，因此目前已無法正常觸發通知功能，將再研究版本差異**
      </p> */}

      <p>
        Firebase原先是因為公司的React Native需要使用Firebase Cloud
        Messaging而研究的，為了有個測試的後台，所以才研究如何使用Firebase
        Admin，想說android跟ios都研究了，就連同web也一併研究了．
      </p>
      <div className={classes.firebaseAdmin}>
        <Button
          className={classes.firebaseAdminButton}
          variant="contained"
          onClick={handleGoToFirebaseCloudMessaging}
          component="a"
          href="/portfolio/firebase-admin/cloud-messaging"
        >
          <p>Firebase Cloud Messaging</p>
          <Image
            src="/img/firebase/firebase-cloud-messaging.png"
            alt="firebase-cloud-messaging"
            width={150}
            height={150}
          />
        </Button>
      </div>
    </div>
  );
}

export default FirebaseAdmin;
