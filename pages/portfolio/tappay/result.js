import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import { buttonStyle } from '@/styles/buttonStyle';
import useGTMTrack from '@/hooks/useGTMTrack';
import Image from '@/components/Image';

const styles = {
  tappayResult: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
    alignItems: 'center'
  },
  tappayResultButton: {
    ...buttonStyle,
    textAlign: 'center'
  }
};

const useStyles = makeStyles(styles);

function TappayResult() {
  const nextRouter = useRouter();

  const classes = useStyles();

  useEffect(() => {
    console.log(nextRouter.query);
  }, [nextRouter]);

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/tappay/result' });

  function handleGoToTappayUi(e) {
    e.preventDefault();
    nextRouter.push('/portfolio/tappay/tappay-ui');
  }

  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - Tappay付款成功</title>
      </Head>
      <div>
        <p>付款成功！</p>
        <p>若實際有收到扣款通知，將於當日晚上自動退款．</p>
      </div>
      <div className={classes.tappayResult}>
        <Button
          className={classes.tappayResultButton}
          variant="contained"
          onClick={handleGoToTappayUi}
          component="a"
          href="/portfolio/tappay/tappay-ui"
        >
          <p>返回付款測試頁面</p>
          <Image
            src="/img/tappay/tappay-logo.svg"
            alt="tappay"
            width={200}
            height={200}
          />
        </Button>
      </div>
    </div>
  );
}

export default TappayResult;
