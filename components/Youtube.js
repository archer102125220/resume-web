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

/**
 * A simple button component.
 *
 * @component
 * @param {Object} props
 * @param {string} props.videoId -
 * @param {string} props.videoUrl -
 * @param {Object} props.playerVars -
 * @param {bool} props.autoplay -
 * @param {function} props.onReady -
 * @param {function} props.onStateChange -
 * @param {function} props.onError -
 * @param {function} props.onBeforeCreate -
 * @param {function} props.onCreated -
 * @returns {JSX.Element} The rendered button component.
 *
 * @example
 * // 帶入videoId
 * <Youtube videoId="W8p5RPTPsoU" />
 */
const Youtube = forwardRef(function Youtube(props, ref) {
  const {
    videoId,
    videoUrl,
    playerVars,
    autoplay,
    onReady,
    onStateChange,
    onError,
    onBeforeCreate,
    onCreated
  } = props;
  const classes = useStyles(props);

  const YoutubeRef = useRef(null);
  const youtbue = useYoutube(YoutubeRef, {
    videoId,
    videoUrl,
    playerVars,
    events: {
      onReady: playerReady,
      onStateChange,
      onError,
      beforeCreate: onBeforeCreate,
      created: onCreated
    }
  });

  function playerReady(e, ...arg) {
    const youtubePlayer = e.target;
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
  onError: PropTypes.func,
  onBeforeCreate: PropTypes.func,
  onCreated: PropTypes.func
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
  onError: () => {},
  onBeforeCreate: () => {},
  onCreated: () => {}
};

export default Youtube;
