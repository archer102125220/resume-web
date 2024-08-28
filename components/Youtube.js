// https://developers.google.com/youtube/iframe_api_reference?hl=zh-tw
import { useRef, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import { useYoutube } from '@/hooks/useYoutube';

const styles = {
  youtubeRoot: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
};

const useStyles = makeStyles(styles);

const Youtube = forwardRef(function Youtube(props, ref) {
  const {
    videoId,
    videoUrl,
    playerVars,
    autoplay,
    onReady,
    onStateChange,
    onError
  } = props;
  const classes = useStyles(props);

  const YoutubeRef = useRef(null);
  const youtbue = useYoutube(YoutubeRef, {
    videoId,
    playerVars,
    events: {
      onReady: playerReady,
      onStateChange: playerStateChange,
      onError: onPlayerError
    }
  });

  function playerReady(e, ...arg) {
    const youtubePlayer = e.target;
    if (typeof videoUrl === 'string' && videoUrl !== '') {
      // player.loadVideoByUrl(mediaContentUrl:String, startSeconds?:Number, endSeconds?:Number):Void
      youtubePlayer.loadVideoByUrl(videoUrl);
      if (autoplay === false) {
        youtubePlayer.stopVideo();
      }
    }
    if (
      // !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      //   navigator.userAgent
      // ) &&
      autoplay === true
    ) {
      // https://tutorials.webduino.io/zh-tw/docs/socket/useful/youtube.html
      youtubePlayer.seekTo(0);
    }
    if (typeof onReady === 'function') {
      onReady(youtubePlayer, e, ...arg);
    }
  }
  function playerStateChange(e, ...arg) {
    if (typeof onStateChange === 'function') {
      onStateChange(e.target, e, ...arg);
    }
  }
  function onPlayerError(e, ...arg) {
    if (typeof onError === 'function') {
      onError(e.target, e, ...arg);
    }
  }

  useImperativeHandle(ref, () => ({ youtbue }), [youtbue]);
  return <div className={classes.youtubeRoot} ref={YoutubeRef} />;
});

Youtube.propTypes = {
  videoId: PropTypes.string,
  videoUrl: PropTypes.string,
  playerVars: PropTypes.object,
  autoplay: PropTypes.bool,

  onReady: PropTypes.func,
  onStateChange: PropTypes.func,
  onError: PropTypes.func
};

Youtube.defaultProps = {
  videoId: '',
  videoUrl: '',
  playerVars: {
    rel: 0,
    controls: 1,
    showinfo: 0,
    enablejsapi: 1,
    wmode: 'opaque'
  },
  autoplay: false,

  onReady: () => {},
  onStateChange: () => {},
  onError: () => {}
};

export default Youtube;
