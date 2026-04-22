import Head from 'next/head';
import { makeStyles } from '@mui/styles';

import { linkStyle } from '@/styles/linkStyle';
import useGTMTrack from '@/hooks/useGTMTrack';
import Image from '@/components/Image';

const styles = {
  // matsu360: {},
  matsu360Title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px'
  },
  matsu360TitleLink: {
    ...linkStyle,
    fontSize: '24px'
  },
  matsu360Screenshot: {
    display: 'block',
    margin: 'auto'
  }
};

const useStyles = makeStyles(styles);

function Matsu360() {
  const classes = useStyles();
  useGTMTrack({ event: 'scnOpen', url: '/matsu360' });

  return (
    <div>
      <Head>
        <title>Parker Chan 的上線專案介紹- Matsu360</title>
      </Head>
      <div className={classes.matsu360Title}>
        <a
          className={classes.matsu360TitleLink}
          href="https://etravel.matsu.gov.tw/360vr"
          target="_blank"
          rel="noreferrer noopenner"
        >
          馬祖e點通 - 360°VR 線上玩
        </a>
      </div>
      <p>
        本專案為馬祖縣政府的觀光網站，參予專案期間內整合並開發網頁環景服務，並協助專案架構調整。
      </p>
      <p>
        本專案採SSR技術（Nuxt3）開發，專案初期並沒有加入，之後由於專案本身偏大，主要負責專案的同事再將大部分功能都快完成時，發現來不及研究並開發
        WebVR（A-frame） 的環景功能，因此主管讓我來負責該部分的研究及開發。
      </p>

      <Image
        className={classes.matsu360Screenshot}
        loading="lazy"
        src="/img/matsu360/matsu360.png"
        width={920}
        height={500}
        alt="馬祖e點通 - 360°VR 線上玩"
      />
    </div>
  );
}

export default Matsu360;
