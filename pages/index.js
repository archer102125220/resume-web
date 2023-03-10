import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import anime from 'animejs';
// https://greensock.com/
import { useSelector } from 'react-redux';
import { mediaMobile } from '@/styles/globals';
import { tableStyle } from '@/styles/tableStyle';

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
  overflow: 'hidden',
});

const doorHandleStyle = {
  position: 'absolute',
  top: '50%',
  background: '#000',
  width: '50px',
  height: '50px',
  borderRadius: 100,
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
const doorplate = {
  background: '#f8c97c',
  fontSize: '36px',
  display: 'inline-block',
  whiteSpace: 'nowrap',
  border: '1px solid',
  [mediaMobile]: {
    fontSize: '25px',
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
  leftDoorDoorplate: {
    ...doorplate,
    position: 'absolute',
    top: '25%',
    right: 0,
    borderRight: 0,
    [mediaMobile]: {
      ...doorplate[mediaMobile],
    },
  },
  rightDoorHandle: {
    ...doorHandleStyle,
    left: 0,
  },
  rightDoorDoorplate: {
    ...doorplate,
    position: 'absolute',
    top: '25%',
    left: 0,
    borderLeft: 0,
    [mediaMobile]: {
      ...doorplate[mediaMobile],
    },
  },
  content: {
    height: 'inherit',
    backgroundColor: theme.palette.primary.main,
    textAlign: 'center',
  },
  contentTable: {
    ...tableStyle,
    top: '25%',
    left: '25%',
    width: '50%',
    height: '20%',
    transform: 'perspective(0.5em) rotateX(1deg)',
  },
  contentTableside: {
    ...tableStyle,
    top: '100%',
    left: '0.5%',
    width: '99%',
    height: '13%',
    transform: 'perspective(0.5em) rotateX(359deg)',
    zIndex: 2,
  },
  contentTableLowerLeftHandBaseFront,
  contentTableLowerLeftHandBaseSide,
  contentTableLowerRightHandBaseFront: {
    ...contentTableLowerLeftHandBaseFront,
    left: null,
    right: '8%',
    transform: 'skewX(347deg)',
    [mediaMobile]: {
      ...contentTableLowerLeftHandBaseFront[mediaMobile],
      left: null,
      right: '9%',
      transform: 'skewX(347deg)',
    },
  },
  contentTableLowerRightHandBaseSide: {
    ...contentTableLowerLeftHandBaseSide,
    left: null,
    right: '13%',
    transform: 'skewX(321deg)',
    [mediaMobile]: {
      ...contentTableLowerLeftHandBaseSide[mediaMobile],
      left: null,
      right: '16%',
      transform: 'skewX(347deg)',
    },
  },
});

const useStyles = makeStyles(styles);

function Index() {
  const nextRouter = useRouter();
  const [openDoor, setOpenDoor] = useState(false);
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const tabletopRef = useRef(null);
  const tablesideRef = useRef(null);
  const tableLowerLeftHandBaseSideRef = useRef(null);
  const tableLowerLeftHandBaseFrontRef = useRef(null);
  const tableLowerRightHandBaseFrontRef = useRef(null);
  const tableLowerRightHandBaseSideRef = useRef(null);
  const leftDoorAnime = useRef(null);
  const rightDoorAnime = useRef(null);
  const tabletopAnime = useRef(null);
  const tablesideAnime = useRef(null);
  const tableLowerLeftHandBaseFrontAnime = useRef(null);
  const tableLowerLeftHandBaseSideAnime = useRef(null);
  const tableLowerRightHandBaseFrontAnime = useRef(null);
  const tableLowerRightHandBaseSideAnime = useRef(null);
  const classes = useStyles();
  const {
    index,
    leftDoor,
    leftDoorHandle,
    leftDoorDoorplate,
    rightDoor,
    rightDoorHandle,
    rightDoorDoorplate,
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
    if (openDoor === true) {
      leftDoorAnime.current.seek(leftDoorAnime.current.duration);
      rightDoorAnime.current.seek(rightDoorAnime.current.duration);
      tabletopAnime.current.seek(tabletopAnime.current.duration);
      tablesideAnime.current.seek(tablesideAnime.current.duration);
      tableLowerLeftHandBaseFrontAnime.current.seek(tableLowerLeftHandBaseFrontAnime.current.duration);
      tableLowerLeftHandBaseSideAnime.current.seek(tableLowerLeftHandBaseSideAnime.current.duration);
      tableLowerRightHandBaseFrontAnime.current.seek(tableLowerRightHandBaseFrontAnime.current.duration);
      tableLowerRightHandBaseSideAnime.current.seek(tableLowerRightHandBaseSideAnime.current.duration);
    }

    const autoplay = true;
    leftDoorAnime.current = anime({
      targets: leftDoorRef.current,
      translateX: '-100%',
      duration: 1000,
    });
    rightDoorAnime.current = anime({
      targets: rightDoorRef.current,
      translateX: '100%',
      duration: 1000,
    });
    tabletopAnime.current = anime({
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
        // console.log(tabletopRef.current);
      },
    });
    tablesideAnime.current = anime({
      targets: tablesideRef.current,
      left: ['0.5%', '0%'],
      width: ['99%', '100%'],
      height: [isMobile === true ? '10%' : '13%', '0%'],
      delay: 500,
      easing: 'easeOutQuint',
      autoplay,
      complete() {
        // console.log(tablesideRef.current);
      },
    });
    tableLowerLeftHandBaseFrontAnime.current = anime({
      targets: [tableLowerLeftHandBaseFrontRef.current],
      top: [isMobile === true ? '109%' : '112%', '100%'],
      left: ['9%', '1%'],
      width: [isMobile === true ? '10%' : '5%', '8%'],
      height: [isMobile === true ? '25%' : '50%', '0%'],
      skewX: [isMobile === true ? 26 : 43, 0],
      delay: 500,
      easing: 'easeOutQuint',
      autoplay,
      complete() {
        // console.log(tableLowerLeftHandBaseFrontRef.current);
      },
    });
    tableLowerLeftHandBaseSideAnime.current = anime({
      targets: tableLowerLeftHandBaseSideRef.current,
      top: [isMobile === true ? '109%' : '112%', '100%'],
      left: [isMobile === true ? '16%' : '13%', '9%'],
      width: [isMobile === true ? '5%' : '2.5%', '0.2%'],
      height: [isMobile === true ? '25%' : '50%', '0%'],
      skewX: [isMobile === true ? 25 : 43, 0],
      delay: 500,
      easing: 'easeOutQuint',
      autoplay,
      complete() {
        // console.log(tableLowerLeftHandBaseSideRef.current);
      },
    });
    tableLowerRightHandBaseFrontAnime.current = anime({
      targets: tableLowerRightHandBaseFrontRef.current,
      top: [isMobile === true ? '109%' : '112%', '100%'],
      right: ['9%', '1%'],
      width: [isMobile === true ? '10%' : '5%', '8%'],
      height: [isMobile === true ? '25%' : '50%', '0%'],
      skewX: [isMobile === true ? 347 : 321, 360],
      delay: 500,
      easing: 'easeOutQuint',
      autoplay,
      complete() {
        // console.log(tableLowerRightHandBaseFrontRef.current);
      },
    });
    tableLowerRightHandBaseSideAnime.current = anime({
      targets: tableLowerRightHandBaseSideRef.current,
      top: [isMobile === true ? '109%' : '112%', '100%'],
      right: [isMobile === true ? '16%' : '13%', '9%'],
      width: [isMobile === true ? '5%' : '2.5%', '0.2%'],
      height: [isMobile === true ? '25%' : '50%', '0%'],
      skewX: [isMobile === true ? 345 : 321, 360],
      delay: 500,
      easing: 'easeOutQuint',
      autoplay,
      complete() {
        // console.log(tableLowerRightHandBaseSideRef.current);
        nextRouter.push('/home');
      },
    });
    setOpenDoor(true);
  }
  // function cloesingAnime() {
  //   anime({
  //     targets: leftDoorRef.current,
  //     translateX: 0,
  //     // https://easings.net/
  //     easing: 'easeOutQuint',
  //   });
  //   anime({
  //     targets: rightDoorRef.current,
  //     translateX: 0,
  //     easing: 'easeOutQuint',
  //   });
  // }

  // useEffect(() => {
  //   if (openDoor === true) {
  //     openingAnime();
  //   } else if (openDoor === false) {
  //     cloesingAnime();
  //   }
  // }, [openDoor]);

  return (
    <div className={index} onClick={openingAnime}>
      <div className={leftDoor} ref={leftDoorRef}>
        <div className={leftDoorHandle} />
        <h1 className={leftDoorDoorplate}>Parker Cheng</h1>
      </div>
      <div className={rightDoor} ref={rightDoorRef}>
        <div className={rightDoorHandle} />
        <h1 className={rightDoorDoorplate}>的個人資料室</h1>
      </div>
      <div className={content}>
        <div className={contentTable} ref={tabletopRef}>
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

Index.propTypes = {
  isMobile: PropTypes.bool,
};

export default Index;
