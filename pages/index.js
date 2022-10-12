import { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import anime from 'animejs';
// https://greensock.com/
import { useSelector } from 'react-redux';
import { mediaMobile } from '@/styles/globals';

// https://www.atjiang.com/create-grids-via-css-linear-gradient/
const doorStyle = (theme) => ({
  position: 'absolute',
  top: 0,
  zIndex: 10,
  background: theme.palette.secondary.main,
  backgroundImage:
    'linear-gradient(rgb(106 106 106) 1px, transparent 0), linear-gradient(90deg, rgb(106 106 106) 1px, transparent 0)',
  backgroundSize: '50px 50px, 50px 50px',
  border: 0,
  borderStyle: 'solid',
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  OUserSelect: 'none',
  userSelect: 'none',
});

const doorHandleStyle = {
  position: 'absolute',
  top: '50%',
  background: '#000',
  width: '50px',
  height: '50px',
  borderRadius: 100,
};

const tableStyle = {
  position: 'absolute',
  border: '1px solid',
  backgroundColor: '#d7904e',
};
const contentTableLowerLeftHandBaseFront = {
  ...tableStyle,
  top: '112%',
  left: '8%',
  height: '50%',
  width: '5%',
  // transform: 'matrix( 1, 0, 1, 1, 0, 0 )',
  // transform: 'scaleX(1) scaleY(1) skewY(0deg) skewX(43deg)',
  transform: 'skewX(43deg)',
  // borderRadius: '10%',
  [mediaMobile]: {
    top: '109%',
    left: '9%',
    width: '10%',
    height: '25%',
    transform: 'skewX(26deg)',
  },
};
const contentTableLowerLeftHandBaseSide = {
  ...tableStyle,
  top: '112%',
  left: '13%',
  height: '50%',
  width: '2.5%',
  // transform: 'matrix( 1, 0, 1, 1, 0, 0 )',
  // transform: 'scaleX(1) scaleY(1) skewY(0deg) skewX(43deg)',
  transform: 'skewX(43deg)',
  // borderRadius: '10%',
  [mediaMobile]: {
    top: '109%',
    left: '16%',
    width: '5%',
    height: '25%',
    transform: 'skewX(25deg)',
  },
};

const styles = (theme) => ({
  index: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
  leftDoor: {
    ...doorStyle(theme),
    width: '50%',
    height: '100%',
    borderRight: '2px',
    left: 0,
  },
  rightDoor: {
    ...doorStyle(theme),
    width: '50%',
    height: '100%',
    borderLeft: '2px',
    right: 0,
  },
  leftDoorHandle: {
    ...doorHandleStyle,
    right: 0,
  },
  rightDoorHandle: {
    ...doorHandleStyle,
    left: 0,
  },
  content: {
    height: 'inherit',
    backgroundColor: theme.palette.primary.main,
    textAlign: 'center',
  },
  contentTable: tableStyle,
  contentTableside: {
    ...tableStyle,
    top: '100%',
    left: '0.5%',
    width: '99%',
    transform: 'perspective(0.5em) rotateX(359deg)',
    zIndex: 2,
  },
  contentTableLowerLeftHandBaseFront,
  contentTableLowerLeftHandBaseSide,
  contentTableLowerRightHandBaseFront: {
    ...contentTableLowerLeftHandBaseFront,
    left: 'unset',
    right: '8%',
    transform: 'skewX(321deg)',
    [mediaMobile]: {
      left: 'unset',
      right: '9%',
    },
  },
  contentTableLowerRightHandBaseSide: {
    ...contentTableLowerLeftHandBaseSide,
    left: 'unset',
    right: '13%',
    transform: 'skewX(321deg)',
    [mediaMobile]: {
      left: 'unset',
      right: '16%',
    },
  },
});

const useStyles = makeStyles(styles);

function Index() {
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const tabletopRef = useRef(null);
  const tablesideRef = useRef(null);
  const tableLowerLeftHandBaseSideRef = useRef(null);
  const tableLowerLeftHandBaseFrontRef = useRef(null);
  const tableLowerRightHandBaseFrontRef = useRef(null);
  const tableLowerRightHandBaseSideRef = useRef(null);
  const [openDoor, setOpenDoor] = useState(false);
  const classes = useStyles();
  const {
    index,
    leftDoor,
    leftDoorHandle,
    rightDoor,
    rightDoorHandle,
    content,
    contentTable,
    contentTableside,
    contentTableLowerLeftHandBaseFront,
    contentTableLowerLeftHandBaseSide,
    contentTableLowerRightHandBaseFront,
    contentTableLowerRightHandBaseSide,
  } = classes;
  const isMobile = useSelector(({ system }) => system.isMobile);

  function openingAnime() {
    const autoplay = true;
    anime({
      targets: leftDoorRef.current,
      translateX: '-100%',
      duration: 1000,
    });
    anime({
      targets: rightDoorRef.current,
      translateX: '100%',
      duration: 1000,
    });
    anime({
      targets: tabletopRef.current,
      top: ['25%', '5%'],
      left: ['25%', '5%'],
      width: ['50%', '90%'],
      height: ['20%', '90%'],
      perspective: ['0.5em', '0.5em'],
      rotateX: [1, 0],
      delay: 500,
      easing: 'easeOutQuint',
      autoplay,
      complete() {
        console.log(tabletopRef.current);
      },
    });
    anime({
      targets: tablesideRef.current,
      left: ['0.5%', '0%'],
      width: ['99%', '100%'],
      height: ['13%', '0%'],
      delay: 500,
      easing: 'easeOutQuint',
      autoplay,
      complete() {
        console.log(tablesideRef.current);
      },
    });
    anime({
      targets: tablesideRef.current,
      left: ['0.5%', '0%'],
      width: ['99%', '100%'],
      height: [isMobile === true ? '10%' : '13%', '0%'],
      delay: 500,
      easing: 'easeOutQuint',
      autoplay,
      complete() {
        console.log(tablesideRef.current);
      },
    });
    anime({
      targets: [tableLowerLeftHandBaseFrontRef.current],
      top: [isMobile === true ? '109%' : '112%', '100%'],
      left: ['9%', '1%'],
      width: [isMobile === true ? '10%' : '5%', '8%'],
      height: [isMobile === true ? '25%' : '50%', '0%'],
      // transform: 'skewX(43deg)'
      skewX: [isMobile === true ? 26 : 43, 0],
      delay: 500,
      easing: 'easeOutQuint',
      autoplay,
      complete() {
        console.log(tableLowerLeftHandBaseFrontRef.current);
      },
    });
    anime({
      targets: [tableLowerLeftHandBaseSideRef.current],
      top: [isMobile === true ? '109%' : '112%', '100%'],
      left: [isMobile === true ? '16%' : '13%', '9%'],
      width: [isMobile === true ? '5%' : '2.5%', '0.2%'],
      height: [isMobile === true ? '25%' : '50%', '0%'],
      // transform: 'skewX(43deg)'
      skewX: [isMobile === true ? 25 : 43, 0],
      delay: 500,
      easing: 'easeOutQuint',
      autoplay,
      complete() {
        console.log(tableLowerLeftHandBaseSideRef.current);
      },
    });
    anime({
      targets: [tableLowerRightHandBaseFrontRef.current],
      top: [isMobile === true ? '109%' : '112%', '100%'],
      right: ['9%', '1%'],
      width: [isMobile === true ? '10%' : '5%', '8%'],
      height: [isMobile === true ? '25%' : '50%', '0%'],
      // transform: 'skewX(43deg)'
      skewX: [isMobile === true ? 347 : 321, 360],
      delay: 500,
      easing: 'easeOutQuint',
      autoplay,
      complete() {
        console.log(tableLowerRightHandBaseFrontRef.current);
      },
    });
    anime({
      targets: [tableLowerRightHandBaseSideRef.current],
      top: [isMobile === true ? '109%' : '112%', '100%'],
      right: [isMobile === true ? '16%' : '13%', '9%'],
      width: [isMobile === true ? '5%' : '2.5%', '0.2%'],
      height: [isMobile === true ? '25%' : '50%', '0%'],
      // transform: 'skewX(43deg)'
      skewX: [isMobile === true ? 345 : 321, 360],
      delay: 500,
      easing: 'easeOutQuint',
      autoplay,
      complete() {
        console.log(tableLowerRightHandBaseSideRef.current);
      },
    });
  }
  function cloesingAnime() {
    anime({
      targets: leftDoorRef.current,
      translateX: 0,
      // https://easings.net/
      easing: 'easeOutQuint',
    });
    anime({
      targets: rightDoorRef.current,
      translateX: 0,
      easing: 'easeOutQuint',
    });
  }

  useEffect(() => {
    if (openDoor === true) {
      openingAnime();
    } else if (openDoor === false) {
      cloesingAnime();
    }
  }, [openDoor]);

  return (
    <div className={index} onClick={() => setOpenDoor(!openDoor)}>
      <div className={leftDoor} ref={leftDoorRef}>
        <div className={leftDoorHandle} />
      </div>
      <div className={rightDoor} ref={rightDoorRef}>
        <div className={rightDoorHandle} />
      </div>
      <div className={content}>
        <div className={contentTable} ref={tabletopRef}>
          不好意思，其餘頁面與動畫正在設計中，感謝您的來訪~
          <div className={contentTableside} ref={tablesideRef} />
          <div
            className={contentTableLowerLeftHandBaseFront}
            ref={tableLowerLeftHandBaseFrontRef}
          />
          <div
            className={contentTableLowerLeftHandBaseSide}
            ref={tableLowerLeftHandBaseSideRef}
          />
          <div
            className={contentTableLowerRightHandBaseFront}
            ref={tableLowerRightHandBaseFrontRef}
          />
          <div
            className={contentTableLowerRightHandBaseSide}
            ref={tableLowerRightHandBaseSideRef}
          />
        </div>
      </div>
    </div>
  );
}

export default Index;
