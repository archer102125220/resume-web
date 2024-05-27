import Head from 'next/head';
import Image from 'next/image';
import Avatar from '@mui/material/Avatar';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { mediaTablet } from '@/styles/globals';
// import { systemAsyncThunk } from '@/redux/system';
// import { test } from '@servicesClient/openAi';
import useGTMTrack from '@/hooks/useGTMTrack';
import AnimationString from '@/components/Animation/String';
import AnimationNumber from '@/components/Animation/Number';
// import Hr from '@/components/Hr';

const summaryName = {
  marginRight: 'auto'
};

const styles = {
  homePage: {
    minHeight: '100%',
    // margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    [mediaTablet]: {
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
    ...summaryName,
    marginTop: '8px'
  },
  'homePage-summary-enName': {
    ...summaryName
  },
  'homePage-summary-enNickName': {
    ...summaryName
  },
  'homePage-summary-email': {
    ...summaryName
  },
  'homePage-summary-gitHub': {
    ...summaryName,
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
    [mediaTablet]: {
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
    [mediaTablet]: {
      alignItems: 'flex-start'
    }
  },
  'homePage-summary-educationalQualifications-row-logo': {
    [mediaTablet]: {
      width: '25px',
      height: '25px'
    }
  },
  'homePage-summary-educationalQualifications-row-school-name': {
    // display: '',
    [mediaTablet]: {
      display: 'none'
    }
  },
  'homePage-summary-educationalQualifications-row-school-rwdName': {
    display: 'none',
    [mediaTablet]: {
      display: 'block'
    }
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

        <AnimationString
          className={classes['homePage-summary-name']}
          label="姓名：陳柏杰"
        />
        <AnimationString
          className={classes['homePage-summary-enName']}
          label="英文姓名：CHEN,PO-CHIEH"
        />
        <AnimationString
          className={classes['homePage-summary-enNickName']}
          label="英文暱稱：Parker"
        />
        <AnimationString
          tagname="a"
          label="Email：archer102125220.2015@gmail.com"
          href="mailto: archer102125220.2015@gmail.com"
          className={classes['homePage-summary-email']}
        />
        <AnimationString
          tagname="a"
          label="gitHub：https://github.com/archer102125220"
          href="https://github.com/archer102125220"
          className={classes['homePage-summary-gitHub']}
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
              <AnimationString
                className={
                  classes[
                    'homePage-summary-educationalQualifications-row-school-name'
                  ]
                }
                label="國立台中科技大學 資訊管理系 學士"
              />
              <AnimationString
                className={
                  classes[
                    'homePage-summary-educationalQualifications-row-school-rwdName'
                  ]
                }
                label="國立台中科技大學"
              />
              <AnimationString
                className={
                  classes[
                    'homePage-summary-educationalQualifications-row-school-rwdName'
                  ]
                }
                label="資訊管理系 學士"
              />
              {/* <p>2018 / 9 - 2020 / 6</p> */}
              <div>
                <AnimationNumber label="2018" start={1000} duration={1000} />
                <span> / </span>
                <AnimationNumber label="9" start={0} duration={1000} />
                <span> - </span>
                <AnimationNumber label="2020" start={1000} duration={1000} />
                <span> / </span>
                <AnimationNumber label="6" start={0} duration={1000} />
              </div>
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
              <AnimationString
                className={
                  classes[
                    'homePage-summary-educationalQualifications-row-school-name'
                  ]
                }
                label="康寧醫護暨管理專科學校 資訊管理系 副學士"
              />
              <AnimationString
                className={
                  classes[
                    'homePage-summary-educationalQualifications-row-school-rwdName'
                  ]
                }
                label="康寧醫護暨管理專科校"
              />
              <AnimationString
                className={
                  classes[
                    'homePage-summary-educationalQualifications-row-school-rwdName'
                  ]
                }
                label="資訊管理系 副學士"
              />
              {/* <p>2013 / 9 - 2018 / 6</p> */}
              <div>
                <AnimationNumber label="2013" start={1000} duration={1000} />
                <span> / </span>
                <AnimationNumber label="9" start={0} duration={1000} />
                <span> - </span>
                <AnimationNumber label="2018" start={1000} duration={1000} />
                <span> / </span>
                <AnimationNumber label="6" start={0} duration={1000} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>不好意思，其餘頁面與動畫正在設計中，感謝您的來訪~</p>
    </div>
  );
}

export default Home;
