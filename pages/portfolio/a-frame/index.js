import { useState, useEffect, useCallback } from 'react';
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
  AFrameListSecondParagraph: {
    display: 'inline'
  },
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
  const [fullScreenGoBack, setFullScreenGoBack] = useState('');
  const nextRouter = useRouter();

  const dispatch = useDispatch();
  const SAVE_defalutLayoutSetting = useCallback(
    payload =>
      dispatch({
        type: 'system/SAVE_defalutLayoutSetting',
        payload
      }),
    [dispatch]
  );

  const classes = useStyles();

  useEffect(() => {
    setFullScreenGoBack(nextRouter.pathname);
  }, []);
  useGTMTrack({ event: 'scnOpen', url: '/portfolio/a-frame' });

  function handleGoToHelloWorkd(e) {
    e.preventDefault();
    SAVE_defalutLayoutSetting({
      fullScreen: true,
      fullScreenTargetUrl: '/portfolio/a-frame/hello-workd',
      fullScreenGoBack
    });
  }

  function handleGoToNpmExample(e) {
    e.preventDefault();
    SAVE_defalutLayoutSetting({
      fullScreen: true,
      fullScreenTargetUrl: '/portfolio/a-frame/npm-example',
      fullScreenGoBack
    });
  }

  function handleGoToAFrameReact(e) {
    e.preventDefault();
    SAVE_defalutLayoutSetting({
      fullScreen: true,
      fullScreenTargetUrl: '/portfolio/a-frame/aframe-react',
      fullScreenGoBack
    });
  }

  function handleGoToAEntity(e) {
    e.preventDefault();
    SAVE_defalutLayoutSetting({
      fullScreen: true,
      fullScreenTargetUrl: '/portfolio/a-frame/a-entity',
      fullScreenGoBack
    });
  }

  function handleGoToUiEaxmple(e) {
    e.preventDefault();
    SAVE_defalutLayoutSetting({
      fullScreen: true,
      fullScreenTargetUrl: '/portfolio/a-frame/ui-example',
      fullScreenGoBack
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
      <Box>
        <p className={classes.AFrameListSecondParagraph}>
          a-frame是換工作時，新公司在使用的技術，在這裡做測試結果的紀錄！
          <br />
          其中UI範例是官網上的其中一項範例，不過看起來好像不是官方自己做的，所以把
        </p>
        <a
          target="_blank"
          className={[
            classes.AFrameListSecondParagraph,
            classes.AFrameListLink
          ].join(' ')}
          href="https://github.com/supermedium/moonrider/tree/master"
        >
          源碼網址
        </a>
        <p className={classes.AFrameListSecondParagraph}>也一併作紀錄</p>
      </Box>
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
        <Button
          className={classes.AFrameListButton}
          variant="contained"
          onClick={handleGoToNpmExample}
          component="a"
          href="/portfolio/a-frame/npm-example"
        >
          <p>npm 範例</p>
        </Button>
        <Button
          className={classes.AFrameListButton}
          variant="contained"
          onClick={handleGoToAFrameReact}
          component="a"
          href="/portfolio/a-frame/aframe-react"
        >
          <p>aframe-react</p>
        </Button>
        <Button
          className={classes.AFrameListButton}
          variant="contained"
          onClick={handleGoToAEntity}
          component="a"
          href="/portfolio/a-frame/a-entity"
        >
          <p>a-entity</p>
        </Button>
        <Button
          className={classes.AFrameListButton}
          variant="contained"
          onClick={handleGoToUiEaxmple}
          component="a"
          href="/portfolio/a-frame/ui-example"
        >
          <p>UI範例</p>
        </Button>
      </div>
    </div>
  );
}

export default AFrame;
