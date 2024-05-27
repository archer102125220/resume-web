import Head from 'next/head';
import Avatar from '@mui/material/Avatar';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { mediaTablet } from '@/styles/globals';
// import { systemAsyncThunk } from '@/redux/system';
// import { test } from '@servicesClient/openAi';
import useGTMTrack from '@/hooks/useGTMTrack';
import HomeSummaryName from '@/components/Home/Summary/Name';
import HomeSummaryOutboundLinks from '@/components/Home/Summary/OutboundLinks';
import HomeSummaryEducationalQualifications from '@/components/Home/Summary/EducationalQualifications';
import HomeExperienceWork from '@/components/Home/Experience/Work';

const styles = {
  homePage: {
    minHeight: '100%',
    // margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    [mediaTablet]: {
      alignItems: ' flex-start',
      alignContent: 'flex-start',
      flexDirection: 'column'
    }
  },
  'homePage-summary': {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'center',
    // gap: '16px',
    [mediaTablet]: {
      marginBottom: '16px'
    }
  },
  'homePage-summary-avatar': {
    width: '50%',
    height: '50%',
    margin: 'auto'
  },
  'homePage-summary-name': {
    paddingTop: '8px'
  },
  'homePage-summary-outboundLinks': {
    marginBottom: '16px'
  },
  'homePage-summary-item': {
    marginRight: 'auto'
  },
  'homePage-experience': {
    // margin: 'auto',
    flex: 1
  }
};

const useStyles = makeStyles(styles);

function Home(props) {
  const classes = useStyles(props);

  useGTMTrack({ event: 'scnOpen', url: '/home' });

  // useEffect(() => {
  //   console.log(132);
  //   test()
  //     .then(result => console.log(result))
  //     .catch(console.error);
  // }, []);

  return (
    <div className={classes.homePage}>
      <Head>
        <title>Parker Chan 的個人資料 - 首頁</title>
      </Head>
      <div className={classes['homePage-summary']}>
        <Avatar
          className={classes['homePage-summary-avatar']}
          alt="陳柏杰"
          variant="square"
          src="/img/avatar.png"
        />
        <HomeSummaryName className={classes['homePage-summary-name']} />

        <HomeSummaryOutboundLinks
          className={classes['homePage-summary-outboundLinks']}
        />

        <HomeSummaryEducationalQualifications
          className={classes['homePage-summary-item']}
        />
      </div>
      <div className={classes['homePage-experience']}>
        <HomeExperienceWork />
      </div>
    </div>
  );
}

export default Home;
