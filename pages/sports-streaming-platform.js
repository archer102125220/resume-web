import Head from 'next/head';
import { makeStyles } from '@mui/styles';

import { linkStyle } from '@/styles/linkStyle';
import useGTMTrack from '@/hooks/useGTMTrack';
import Image from '@/components/Image';

const styles = {
  SportsStreamingPlatformTitle: {
    fontSize: '24px',
    textAlign: 'center'
  },
  SportsStreamingPlatformTitleLink: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '16px',
    fontSize: '18px',
    '& > a': {
      ...linkStyle,
      margin: '0'
    }
  },
  SportsStreamingPlatformScreenshot: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '8px',
    paddingTop: '8px',
    paddingBottom: '8px'
  },
  SportsStreamingPlatformScreenshotPc: {
    // flex: 1,
    width: '530px',
    height: '400px'
  },
  SportsStreamingPlatformScreenshotM: {
    // flex: 1,
    width: '200px',
    height: '400px'
  }
};

const useStyles = makeStyles(styles);

function SportsStreamingPlatform() {
  const classes = useStyles();
  useGTMTrack({ event: 'scnOpen', url: '/sports-streaming-platform' });

  return (
    <div>
      <Head>
        <title>Parker Chan 的上線專案介紹- 體育賽事直播平台</title>
      </Head>
      <p className={classes.SportsStreamingPlatformTitle}>體育賽事直播平台</p>
      <div className={classes.SportsStreamingPlatformTitleLink}>
        <a
          href="https://www.xga2ytxqck3y.xyz/pages/match/match"
          target="_blank"
          rel="noreferrer noopenner"
        >
          西瓜看球(桌機版)
        </a>
        <p>、</p>
        <a
          href="https://m.xga2ytxqck3y.xyz/"
          target="_blank"
          rel="noreferrer noopenner"
        >
          西瓜看球(手機版 | android版 | ios書籤版)
        </a>
        <p>、</p>
        <a
          href="https://www.sgss2.com/"
          target="_blank"
          rel="noreferrer noopenner"
        >
          松果賽事(桌機版)
        </a>
        <p>、</p>
        <a
          href="https://m.sgss2.com/"
          target="_blank"
          rel="noreferrer noopenner"
        >
          松果賽事(手機版 | android版 | ios書籤版)
        </a>
      </div>
      <p>
        本專案因應客戶需求，與團隊一同將產品調整為適合換皮的架構進行開發，參予專案期間內改善專案架構，並翻新介面及優化，在提供簡潔流暢的使用者介面情況下改善專案的維護性。
      </p>
      <p>
        本專案由uni-app框架開發，狀態管理採用vuex做處理，並使用axios做api串接，css預處理器採用less做樣式開發，程式碼格式化則是採用prettier做規範，不過由於uni-app有與一般網頁套件相容的疑慮，因此大多數UI功能需自行實踐。
      </p>

      <div className={classes.SportsStreamingPlatformScreenshot}>
        <Image
          className={classes.SportsStreamingPlatformScreenshotPc}
          loading="lazy"
          src="/img/sports-streaming-platform/bl-PC.png"
          alt="SportsStreamingPlatform"
          width={530}
          height={400}
        />
        <Image
          className={classes.SportsStreamingPlatformScreenshotM}
          loading="lazy"
          src="/img/sports-streaming-platform/bl-M.png"
          alt="SportsStreamingPlatform"
          width={200}
          height={400}
        />
        <Image
          className={classes.SportsStreamingPlatformScreenshotPc}
          loading="lazy"
          src="/img/sports-streaming-platform/sg-PC.png"
          alt="SportsStreamingPlatform"
          width={530}
          height={400}
        />
        <Image
          className={classes.SportsStreamingPlatformScreenshotM}
          loading="lazy"
          src="/img/sports-streaming-platform/sg-M.png"
          alt="SportsStreamingPlatform"
          width={200}
          height={400}
        />
      </div>
    </div>
  );
}

export default SportsStreamingPlatform;
