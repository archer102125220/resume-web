import { useRef, useState, useEffect } from 'react';
import Head from 'next/head';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { buttonStyle } from '@/styles/buttonStyle';
import useGTMTrack from '@/hooks/useGTMTrack';
import Youtube from '@/components/Youtube';

const styles = {
  youtubeApiId: {
    display: 'flex',
    gap: '8px',
    marginTop: '16px',
    marginBottom: '16px'
  },
  youtubeApiIdInput: {
    flex: 1
  },
  youtubeApiPlayer: {
    height: '600px'
  }
};

const useStyles = makeStyles(styles);

function YoutubeApi(props) {
  const classes = useStyles(props);
  const youtubeRef = useRef(null);

  const [youtubeId, setYoutubeId] = useState('W8p5RPTPsoU');
  const [videoId, setVideoId] = useState('W8p5RPTPsoU');
  const [youtubeIdError, setYoutubeIdError] = useState(false);

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/youtube-api' });

  useEffect(() => {
    console.log(youtubeRef);
  }, [youtubeRef]);

  function handleYoutubeId(e) {
    const newYoutubeId = e.target?.value;
    console.log({ newYoutubeId });
    setYoutubeId(newYoutubeId);
    setYoutubeIdError(false);
  }
  function handleVideoId(e) {
    if (typeof youtubeId !== 'string' || youtubeId === '') {
      setYoutubeIdError(true);
    } else {
      setVideoId(youtubeId);
    }
  }

  return (
    <div className={classes.youtubeApi}>
      <Head>
        <title>Parker Chan 的個人資料 - youtube api react整合</title>
      </Head>
      <div className={classes.youtubeApiMain}>
        <p>
          參與BBS專案時，有將youtube
          api整合至Vue2的經驗，想說嘗試也整合進react中試試看
        </p>
        <Box className={classes.youtubeApiId}>
          <TextField
            className={classes.youtubeApiIdInput}
            label="youtubeId"
            error={youtubeIdError}
            value={youtubeId}
            onChange={handleYoutubeId}
          />
          <Button sx={buttonStyle} variant="contained" onClick={handleVideoId}>
            <p>更新youtubeId</p>
          </Button>
        </Box>
        <div className={classes.youtubeApiPlayer}>
          <Youtube ref={youtubeRef} videoId={videoId} />
        </div>
      </div>
    </div>
  );
}

export default YoutubeApi;
