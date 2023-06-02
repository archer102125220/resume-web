import Head from 'next/head';
import Image from 'next/image';
// import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import { buttonStyle } from '@/styles/buttonStyle';
import { linkStyle } from '@/styles/linkStyle';
import useGTMTrack from '@/hooks/useGTMTrack';

const styles = {
  tappayList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
    alignItems: 'center'
  },
  tappayListButton: {
    ...buttonStyle,
    textAlign: 'center'
  },
  tappayListLink: linkStyle,
  tappayListSecondParagraph: {
    display: 'inline'
  },
  tappayListMuiTappayLogo: {
    display: 'inline',
    marginRight: '5px',
    width: '140px'
  },
  tappayListMuiLogo: {
    display: 'inline',
    marginLeft: '5px',
    width: '40px'
  }
};

const useStyles = makeStyles(styles);

function Tappay() {
  const nextRouter = useRouter();

  const classes = useStyles();

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/tappay' });

  function handleGoToTappayUi(e) {
    console.log(e);
    e.preventDefault();
    nextRouter.push('/portfolio/tappay/tappay-ui');
  }

  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - Tappay串接</title>
      </Head>
      <div>
        <p className={classes.tappayListSecondParagraph}>
          tappay原先是因為公司的React
          Native需要使用，但礙於npm上沒有整合好的又合喜好的套件，所以就直接自己研究整合並了
          ，也順便研究了如何發布React Native的套件上npm（
        </p>
        <a
          target="_blank"
          className={[
            classes.tappayListSecondParagraph,
            classes.tappayListLink
          ].join(' ')}
          href="https://www.npmjs.com/package/react-native-tappay-hook"
        >
          react-native-tappay-hook
        </a>
        <p className={classes.tappayListSecondParagraph}>
          ），想說一不做二不休，就直接連同網頁的部分也一併做研究，不過中途發現可能是涉及安全性問題，tappay官方並沒有提及純資料流的做法．
        </p>
      </div>
      <div className={classes.tappayList}>
        <Button
          className={classes.tappayListButton}
          variant="contained"
          onClick={handleGoToTappayUi}
          component="a"
          href="/portfolio/tappay/tappay-ui"
        >
          <p>tappay-tappayUi</p>
          <Image
            src="/img/tappay/tappay-logo.svg"
            alt="tappay"
            width={300}
            height={100}
          />
        </Button>
      </div>
    </div>
  );
}

export default Tappay;
