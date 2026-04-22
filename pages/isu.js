import Head from 'next/head';
import { makeStyles } from '@mui/styles';

import { linkStyle } from '@/styles/linkStyle';
import useGTMTrack from '@/hooks/useGTMTrack';
import Image from '@/components/Image';

const styles = {
  // isu: {},
  isuTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px'
  },
  isuTitleLink: {
    ...linkStyle,
    fontSize: '24px'
  },
  isuFeature: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '8px 0px'
  },
  isuFeatureList: {
    // display: 'flex',
    // flexDirection: 'row',
    // flexWrap: 'wrap'
  },
  isuFeatureItem: {
    marginLeft: '24px'
    // '&:not(:first-child)': {
    //   marginLeft: '48px'
    // }
  },
  isuFeatureSubList: {
    marginLeft: '24px'
  },
  isuScreenshot: {
    display: 'block',
    margin: 'auto',
    marginTop: '16px'
  }
};

const useStyles = makeStyles(styles);

function Isu() {
  const classes = useStyles();
  useGTMTrack({ event: 'scnOpen', url: '/isu' });

  return (
    <div>
      <Head>
        <title>Parker Chan 的上線專案介紹- Isu</title>
      </Head>
      <div className={classes.isuTitle}>
        <a
          className={classes.isuTitleLink}
          href="https://www.iseeyou.org.tw/"
          target="_blank"
          rel="noreferrer noopenner"
        >
          愛嬉遊臺灣青年旅館聯盟
        </a>
      </div>
      <p>
        獨自開發前後台之前端部分，並且也有註冊於 Google Search
        Console，使搜尋引擎能夠有效爬取網站，採用 SSR
        技術（Nuxt3）開發，功能模組包括：
      </p>
      <div className={classes.isuFeature}>
        <ul className={classes.isuFeatureList}>
          <li className={classes.isuFeatureItem}>部落格</li>
          <li className={classes.isuFeatureItem}>Facebook分享功能</li>
          <li className={classes.isuFeatureItem}>景點推薦</li>
          <li className={classes.isuFeatureItem}>住宿推薦</li>
          <li className={classes.isuFeatureItem}>最新消息</li>
          <li className={classes.isuFeatureItem}>Google Map 路徑導覽</li>
          <li className={classes.isuFeatureItem}>GA串接</li>
        </ul>
        <ul className={classes.isuFeatureList}>
          <li className={classes.isuFeatureItem}>
            <p>會員系統：</p>
            <ul className={classes.isuFeatureSubList}>
              <li>Google 登入及榜定</li>
              <li>Facebook 登入及榜定</li>
              <li>Line 登入及榜定</li>
              <li>會員點數兌換</li>
              <li>會員集章兌換</li>
              <li>會員優惠券兌換</li>
            </ul>
          </li>
        </ul>
        <ul className={classes.isuFeatureList}>
          <li className={classes.isuFeatureItem}>
            <p>後台管理系統：</p>
            <ul className={classes.isuFeatureSubList}>
              <li>權限管理功能</li>
              <li>文章管理功能</li>
              <li>景點推薦管理功能</li>
              <li>住宿推薦管理功能</li>
              <li>最新消息管理功能</li>
              <li>會員管理功能</li>
              <li>會員點數管理功能</li>
              <li>會員集章管理功能</li>
              <li>會員優惠券管理功能</li>
              <li>會員點數兌換功能</li>
              <li>會員集章兌換功能</li>
              <li>會員優惠券兌換功能</li>
            </ul>
          </li>
        </ul>
      </div>
      <p>
        其中兌換功能的部分，由於客戶有額外希望做雙重確認的機制，因此有透過
        WebSocket
        的方式，讓後台在按下兌換時，會員須到兌換頁面等待確認談窗的出現，按下確認後才可以完成兌換流程{' '}
      </p>

      <Image
        className={classes.isuScreenshot}
        loading="lazy"
        src="/img/isu/isu.png"
        alt="ISU"
        width={920}
        height={500}
      />
    </div>
  );
}

export default Isu;
