// https://www.tpisoftware.com/tpu/articleDetails/2415
export const cssAnimation = {
  '@keyframes type': {
    '0%': {
      width: '0%'
    },
    '100%': {
      width: '100%'
    }
  },
  '@keyframes blink ': {
    '0%': {
      borderRight: '1px solid #000'
    },
    '100%': {
      borderRight: '0px solid #000'
    }
  }
};
export const animationString = {
  position: 'relative',
  color: 'transparent',
  '&::before': {
    content: 'attr(data-text)',
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    // color: '#000',
    color: 'var(--string_animation_color, #000)',
    overflow: 'hidden',
    animation: 'type 1.5s steps(18), blink 1.5s steps(18)',
    '-webkit-animation': 'type 1.5s steps(18), blink 1.5s steps(18)',
    whiteSpace: 'nowrap'
  }
};

export function handleAnimateNumber(
  valueSetter = () => null,
  start,
  end,
  duration
) {
  if (typeof valueSetter !== 'function') {
    console.error('valueSetter is not a function');
    return;
  }

  let startTimestamp = null;

  function step(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    valueSetter(Math.floor(progress * (end - start) + start));
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}
