// https://developers.google.com/youtube/iframe_api_reference?hl=zh-tw
import {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef
} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const UNSTARTED = -1;
const ENDED = 0;
const PLAYING = 1;
const PAUSED = 2;
const BUFFERING = 3;
const CUED = 5;

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
    ready,
    stateChange,
    onError
  } = props;
  const classes = useStyles(props);

  const [player, setPlayer] = useState(null);
  const [events] = useState({
    [UNSTARTED]: 'unstarted',
    [PLAYING]: 'playing',
    [PAUSED]: 'paused',
    [ENDED]: 'ended',
    [BUFFERING]: 'buffering',
    [CUED]: 'cued'
  });

  const YoutubeRef = useRef(null);

  function playerReady(e) {
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
    if (typeof ready === 'function') {
      ready(e.target, e);
    }
  }
  function playerStateChange(e) {
    if (typeof stateChange === 'function') {
      stateChange(e.target, e);
    }
  }
  function onPlayerError(e) {
    if (typeof onError === 'function') {
      onError(e.target, e);
    }
  }
  function createPlayer(_videoId, _videoUrl, _el) {
    const currentVideoId = _videoId || videoId;
    const currentVideoUrl = _videoUrl || videoUrl;
    const el = _el || YoutubeRef.current;
    if (
      window.YT?.Player &&
      (currentVideoId !== '' || currentVideoUrl !== '')
    ) {
      setPlayer(
        new window.YT.Player(el, {
          videoId: currentVideoId,
          playerVars,
          events: {
            onReady: playerReady,
            onStateChange: playerStateChange,
            onError: onPlayerError
          }
        })
      );
      window.youTubeIsCreated = true;
    } else if (typeof videoId === 'string' && videoId !== '') {
      setTimeout(() => createPlayer(videoId, videoUrl, el), 500);
    }
  }
  function init() {
    window.onYouTubeIframeAPIReady = (...arg) => {
      createPlayer(null, null, null, ...arg);
    };
  }

  useEffect(() => {
    if (document.getElementById('youtube-script') === null) {
      const el = document.createElement('script');
      el.setAttribute('id', 'youtube-script');
      el.setAttribute('src', 'https://www.youtube.com/iframe_api');
      el.setAttribute('async', '');
      el.setAttribute('defer', '');
      document.body.appendChild(el);
      init();
    } else if (videoId !== '') {
      if (typeof window.onYouTubeIframeAPIReady === 'function') {
        createPlayer();
      }
    }

    return function () {
      if (player !== null && typeof player.destroy === 'function') {
        player.destroy();
        setPlayer(null);
        window.youTubeIsCreated = false;
      }
    };
  }, [YoutubeRef]);
  useEffect(() => {
    if (
      (typeof videoUrl !== 'string' || videoUrl === '') &&
      player !== null &&
      typeof player.destroy === 'function'
    ) {
      player.destroy();
    } else {
      createPlayer(null, videoUrl, YoutubeRef.current);
    }
  }, [videoUrl]);

  useImperativeHandle(
    ref,
    () => ({
      player,
      events,
      getPlayerState() {
        const playerState = player.getPlayerState();
        return events[playerState] || playerState;
      },
      youtubeApi: window.YT,
      el: YoutubeRef.current
    }),
    [player, events]
  );
  return <div className={classes.youtubeRoot} ref={YoutubeRef} />;
});

Youtube.propTypes = {
  videoId: PropTypes.string,
  videoUrl: PropTypes.string,
  playerVars: PropTypes.object,
  autoplay: PropTypes.bool,

  ready: PropTypes.func,
  stateChange: PropTypes.func,
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

  ready: () => {},
  stateChange: () => {},
  onError: () => {}
};

export default Youtube;
