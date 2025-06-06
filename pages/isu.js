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
  isuScreenshot: {
    display: 'block',
    margin: 'auto'
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
        本專案為愛嬉遊臺灣青年旅館聯盟的網站翻新、網站內容管理系統開發以及會員系統的整合。
      </p>
      <p>
        本專案採SSR技術（Nuxt3）開發，提供google、FaceBook以及Line等第三方的快速註冊及登入，並有FaceBook分享功能，能便於會員可快速分享心儀的文章或資訊。
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
