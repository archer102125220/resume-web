import Head from 'next/head';
import Image from 'next/image';
import Avatar from '@mui/material/Avatar';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { mediaMobile } from '@/styles/globals';
// import { systemAsyncThunk } from '@/redux/system';
// import { test } from '@servicesClient/openAi';
import useGTMTrack from '@/hooks/useGTMTrack';
import TypeAnimation from '@/components/TypeAnimation';
// import Hr from '@/components/Hr';

const styles = {
  homePage: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    [mediaMobile]: {
      alignItems: ' flex-start',
      alignContent: 'flex-start'
    }
  },
  'homePage-summary': {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'center',
    // gap: '16px',
    [mediaMobile]: {
      marginBottom: '16px'
    }
  },
  'homePage-summary-avatar': {
    width: '50%',
    height: '50%',
    margin: 'auto'
  },
  'homePage-summary-name': {
    marginRight: 'auto',
    marginTop: '8px'
  },
  'homePage-summary-enName': {
    marginRight: 'auto',
    marginBottom: '16px'
  },
  'homePage-summary-educationalQualifications': {
    marginRight: 'auto'
  },
  'homePage-summary-educationalQualifications-title': {
    display: 'flex',
    alignItems: 'center',
    fontSize: '24px',
    marginRight: 'auto'
  },
  'homePage-summary-educationalQualifications-title-icon': {
    [mediaMobile]: {
      width: '25px',
      height: '25px'
    }
  },
  'homePage-summary-educationalQualifications-row': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5px',
    marginTop: '8px',
    marginLeft: '20px',
    [mediaMobile]: {
      alignItems: 'flex-start'
    }
  },
  'homePage-summary-educationalQualifications-row-logo': {
    [mediaMobile]: {
      width: '25px',
      height: '25px'
    }
  },
  'homePage-summary-educationalQualifications-row-school-name': {
    // display: '',
    [mediaMobile]: {
      display: 'none'
    }
  },
  'homePage-summary-educationalQualifications-row-school-rwdName': {
    display: 'none',
    [mediaMobile]: {
      display: 'block'
    }
  }
};

const useStyles = makeStyles(styles);

function Home(props) {
  const classes = useStyles(props);
  console.log({ classes });

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

        <TypeAnimation
          className={classes['homePage-summary-name']}
          label="姓名：陳柏杰"
        />
        <TypeAnimation
          className={classes['homePage-summary-enName']}
          label="英文姓名：CHEN,PO-CHIEH／Parker"
        />

        <div className={classes['homePage-summary-educationalQualifications']}>
          {/* <Hr label="學歷" /> */}
          <div
            className={
              classes['homePage-summary-educationalQualifications-title']
            }
          >
            <Image
              className={
                classes['homePage-summary-educationalQualifications-title-icon']
              }
              loading="lazy"
              objectFit="contain"
              src="/img/icon/educational-qualifications-icon.png"
              alt="學歷icon"
              width={50}
              height={50}
            />
            <p>學歷</p>
          </div>

          <div
            className={
              classes['homePage-summary-educationalQualifications-row']
            }
          >
            <Image
              className={
                classes['homePage-summary-educationalQualifications-row-logo']
              }
              loading="lazy"
              objectFit="contain"
              src="/img/logo/nutc-logo.png"
              alt="NUTC LOGO"
              width={40}
              height={40}
            />
            <div
              className={
                classes['homePage-summary-educationalQualifications-row-school']
              }
            >
              <TypeAnimation
                className={
                  classes[
                    'homePage-summary-educationalQualifications-row-school-name'
                  ]
                }
                label="國立台中科技大學 資訊管理系 學士"
              />
              <TypeAnimation
                className={
                  classes[
                    'homePage-summary-educationalQualifications-row-school-rwdName'
                  ]
                }
                label="國立台中科技大學"
              />
              <TypeAnimation
                className={
                  classes[
                    'homePage-summary-educationalQualifications-row-school-rwdName'
                  ]
                }
                label="資訊管理系 學士"
              />
              <p>2018 / 9 - 2020 / 6</p>
            </div>
          </div>

          <div
            className={
              classes['homePage-summary-educationalQualifications-row']
            }
          >
            <Image
              className={
                classes['homePage-summary-educationalQualifications-row-logo']
              }
              src="/img/logo/knjc-mis-logo.png"
              alt="KNJC MIS LOGO"
              width={40}
              height={40}
            />
            <div
              className={
                classes['homePage-summary-educationalQualifications-row-school']
              }
            >
              <TypeAnimation
                className={
                  classes[
                    'homePage-summary-educationalQualifications-row-school-name'
                  ]
                }
                label="康寧醫護暨管理專科學校 資訊管理系 副學士"
              />
              <TypeAnimation
                className={
                  classes[
                    'homePage-summary-educationalQualifications-row-school-rwdName'
                  ]
                }
                label="康寧醫護暨管理專科學校"
              />
              <TypeAnimation
                className={
                  classes[
                    'homePage-summary-educationalQualifications-row-school-rwdName'
                  ]
                }
                label="資訊管理系 副學士"
              />
              <p>2013 / 9 - 2018 / 6</p>
            </div>
          </div>
        </div>
      </div>
      <p>不好意思，其餘頁面與動畫正在設計中，感謝您的來訪~</p>
    </div>
  );
}

export default Home;
