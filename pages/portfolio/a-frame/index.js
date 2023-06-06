import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

import { buttonStyle } from '@/styles/buttonStyle';
import { linkStyle } from '@/styles/linkStyle';
import useGTMTrack from '@/hooks/useGTMTrack';

const styles = {
  AFrameList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
    alignItems: 'center'
  },
  AFrameListButton: {
    ...buttonStyle,
    textAlign: 'center'
  },
  AFrameListLink: linkStyle,
  AFrameListMuiAFrameLogo: {
    display: 'inline',
    marginRight: '5px',
    width: '140px'
  },
  AFrameListMuiLogo: {
    display: 'inline',
    marginLeft: '5px',
    width: '40px'
  }
};

const useStyles = makeStyles(styles);

function AFrame() {
  const nextRouter = useRouter();

  const dispatch = useDispatch();
  const SAVE_defalutLayoutFullScreen = useCallback(
    ({ payload, callback }) =>
      dispatch({
        type: 'system/SAVE_defalutLayoutFullScreen',
        payload: payload,
        callback
      }),
    [dispatch]
  );

  const classes = useStyles();

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/a-frame' });

  function handleGoToHelloWorkd(e) {
    e.preventDefault();
    SAVE_defalutLayoutFullScreen({
      payload: true,
      callback() {
        nextRouter.push('/portfolio/a-frame/hello-workd');
      }
    });
  }

  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - a-frame</title>
      </Head>
      <Box>
        <Image
          src="/img/aframe-name-pink.svg"
          alt="a-frame"
          width={300}
          height={100}
        />
      </Box>
      <p className={classes.AFrameListSecondParagraph}>
        a-frame是換工作時，新公司在使用的技術，在這裡做測試結果的紀錄！
      </p>
      <div className={classes.AFrameList}>
        <Button
          className={classes.AFrameListButton}
          variant="contained"
          onClick={handleGoToHelloWorkd}
          component="a"
          href="/portfolio/a-frame/hello-workd"
        >
          <p>Hello, World!</p>
        </Button>
      </div>
    </div>
  );
}

export default AFrame;
