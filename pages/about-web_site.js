import Head from 'next/head';
import { makeStyles } from '@mui/styles';
// import Button from '@mui/material/Button';

import { mediaMobile } from '@/styles/globals';
import { buttonStyle } from '@/styles/buttonStyle';
import { linkStyle } from '@/styles/linkStyle';

import useGTMTrack from '@/hooks/useGTMTrack';

import Image from '@/components/Image';

const styles = {
  aboutWebSite: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
    alignItems: 'center'
  },
  aboutWebSiteButton: {
    ...linkStyle,
    ...buttonStyle,
    textAlign: 'center',
    [mediaMobile]: {
      padding: '6px 10px'
    }
  },
  aboutWebSiteImg: {
    width: '200px'
  }
};

const useStyles = makeStyles(styles);

function AboutWebSite() {
  const classes = useStyles();

  useGTMTrack({ event: 'scnOpen', url: '/external-link' });

  return (
    <div>
      <Head>
        <title>Parker Chan 的個人資料 - 關於本站</title>
      </Head>
      <p>
        本站主要是由Nextjs、redux-toolkit、MUI、animejs做開發，以文件式路由做路由處理，並由vercel做自動化部屬，不過由於開發初期完全沒有設計概念，因此花費在大量時間摸索整體風格，目前仍有些不滿意，但應該會以其他SSR框架實作
      </p>
      <div className={classes.aboutWebSite}>
        <Image
          src="/img/about-web_site/320px-React-icon.png"
          alt="React Logo"
          className={classes.aboutWebSiteImg}
          width={200}
          height={150}
        />
        <Image
          src="/img/about-web_site/1280px-Nextjs-logo.png"
          alt="NextJs Logo"
          className={classes.aboutWebSiteImg}
          width={200}
          height={150}
        />
        <Image
          src="/img/about-web_site/nui-logo.png"
          alt="MUI Logo"
          className={classes.aboutWebSiteImg}
          width={200}
          height={200}
        />
        <Image
          src="/img/about-web_site/Redux.png"
          alt="Redux Logo"
          className={classes.aboutWebSiteImg}
          width={200}
          height={150}
        />
      </div>
    </div>
  );
}

export default AboutWebSite;
