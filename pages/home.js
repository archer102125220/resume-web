import Head from 'next/head';
import Image from 'next/image';
import Avatar from '@mui/material/Avatar';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';

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
    justifyContent: 'space-around'
  },
  'homePage-Summary': {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    // alignItems: 'center',
    alignContent: 'center',
    gap: '16px'
  },
  'homePage-Summary-Avatar': {
    width: '50%',
    height: '50%',
    margin: 'auto'
  },
  'homePage-Summary-Name': {},
  'homePage-Summary-EducationalQualifications': {
    // width: '100%'
    marginRight: 'auto'
  },
  'homePage-Summary-EducationalQualifications-title': {
    display: 'flex',
    alignItems: 'center',
    fontSize: '24px',
    marginRight: 'auto'
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
      <div className={classes['homePage-Summary']}>
        <Avatar
          className={classes['homePage-Summary-Avatar']}
          alt="陳柏杰"
          variant="square"
          src="/img/avatar.png"
        />
        <TypeAnimation
          className={classes['homePage-Summary-Name']}
          label="姓名：陳柏杰／CHEN,PO-CHIEH／Parker"
        />

        <div className={classes['homePage-Summary-EducationalQualifications']}>
          {/* <Hr label="學歷" /> */}
          <div
            className={
              classes['homePage-Summary-EducationalQualifications-title']
            }
          >
            <Image
              src="/img/icon/educational-qualifications-icon.png"
              alt="學歷icon"
              width={50}
              height={50}
            />
            <p>學歷</p>
          </div>
          <TypeAnimation label="國立台中科技大學 資訊管理系" />
        </div>
      </div>
      <p>不好意思，其餘頁面與動畫正在設計中，感謝您的來訪~</p>
    </div>
  );
}

export default Home;
