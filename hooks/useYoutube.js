import { useState, useEffect } from 'react';

const UNSTARTED = -1;
const ENDED = 0;
const PLAYING = 1;
const PAUSED = 2;
const BUFFERING = 3;
const CUED = 5;

export function useYoutube(el, options = {}) {
  const [player, setPlayer] = useState(null);
  const [events] = useState({
    [UNSTARTED]: 'unstarted',
    [PLAYING]: 'playing',
    [PAUSED]: 'paused',
    [ENDED]: 'ended',
    [BUFFERING]: 'buffering',
    [CUED]: 'cued'
  });

  useEffect(() => {
    if (document.getElementById('youtube-script') === null) {
      const el = document.createElement('script');
      el.setAttribute('id', 'youtube-script');
      el.setAttribute('src', 'https://www.youtube.com/iframe_api');
      el.setAttribute('async', '');
      el.setAttribute('defer', '');
      document.body.appendChild(el);
      init();
    } else if (
      typeof options?.videoId === 'string' &&
      options?.videoId !== ''
    ) {
      if (typeof window.onYouTubeIframeAPIReady === 'function') {
        createPlayer();
      }
    }

    return function () {
      if (typeof player?.destroy === 'function') {
        player.destroy();
        setPlayer(null);
        window.youTubeIsCreated = false;
      }
    };
  }, [el]);

  function init() {
    window.onYouTubeIframeAPIReady = (...arg) => {
      createPlayer(null, null, ...arg);
    };
  }
  function createPlayer(_videoId, _el) {
    const currentVideoId = _videoId || options?.videoId;
    const YoutubeRefEl = _el || el.current;

    if (
      window.YT?.Player &&
      typeof currentVideoId === 'string' &&
      currentVideoId !== ''
    ) {
      setPlayer(new window.YT.Player(YoutubeRefEl, options));
      window.youTubeIsCreated = true;
    } else if (
      typeof options?.videoId === 'string' &&
      options?.videoId !== ''
    ) {
      setTimeout(() => createPlayer(options?.videoId, YoutubeRefEl), 500);
    }
  }

  return {
    player,
    events,
    getPlayerState() {
      const playerState = player.getPlayerState();
      return events[playerState] || playerState;
    },
    el,
    youtubeApi: typeof window === 'object' ? window.YT : null
  };
}
