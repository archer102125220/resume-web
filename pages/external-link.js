import Head from 'next/head';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

import { mediaMobile } from '@/styles/globals';
import { buttonStyle } from '@/styles/buttonStyle';
import { linkStyle } from '@/styles/linkStyle';

import useGTMTrack from '@/hooks/useGTMTrack';

import Image from '@/components/Image';

const styles = {
  externalLink: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
    alignItems: 'center'
  },
  externalLinkButton: {
    ...linkStyle,
    ...buttonStyle,
    textAlign: 'center',
    [mediaMobile]: {
      padding: '6px 10px'
    }
  },
  externalLinkImg: {
    width: '200px'
  }
};

const useStyles = makeStyles(styles);

function ExternalLink() {
  const classes = useStyles();

  useGTMTrack({ event: 'scnOpen', url: '/external-link' });

  return (
    <div>
      <Head>
        <title>Parker Chan 的個人資料 - 站外成品</title>
      </Head>
      <p>
        除了本站以外，有些成品可能以不同或不同版本的SSR框架做開發，因此以站外連結的方式做處理
      </p>
      <div className={classes.externalLink}>
        <Button
          className={classes.externalLinkButton}
          component="a"
          target="_blank"
          variant="contained"
          rel="noreferrer noopenner"
          href="https://parker-nuxt-lab.vercel.app/"
        >
          <p>Parker 的 Nuxt 實驗室</p>
          <Image
            src="/img/NuxtRock.v.10.4.webp"
            alt="Parker's Nuxt Lab"
            className={classes.externalLinkImg}
            width={200}
            height={50}
          />
        </Button>

        
        <Button
          className={classes.externalLinkButton}
          component="a"
          target="_blank"
          variant="contained"
          rel="noreferrer noopenner"
          href="https://parker-nextjs-lab.vercel.app"
        >
          <p>Parker 的 Next.js 實驗室</p>
          <Image
            src="/img/Next.jsLab.v.01.webp"
            alt="Parker's Next.js Lab"
            className={classes.externalLinkImg}
            width={200}
            height={50}
          />
        </Button>
      </div>
    </div>
  );
}

export default ExternalLink;
