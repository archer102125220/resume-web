import { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import anime from 'animejs';
// https://greensock.com/

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

const styles = (theme) => ({
  index: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
  indexLeftDoor: {
    ...doorStyle(theme),
    width: '50%',
    height: '100%',
    borderRight: '2px',
    left: 0,
  },
  indexRightDoor: {
    ...doorStyle(theme),
    width: '50%',
    height: '100%',
    borderLeft: '2px',
    right: 0,
  },
  indexLeftDoorHandle: {
    ...doorHandleStyle,
    right: 0,
  },
  indexRightDoorHandle: {
    ...doorHandleStyle,
    left: 0,
  },
  indexContent: {
    height: 'inherit',
    backgroundColor: theme.palette.primary.main,
    textAlign: 'center',
  },
  indexContentTable: tableStyle,
  indexContentTableside: {
    ...tableStyle,
    top: '100%',
    left: '0.5%',
    width: '99%',
    transform: 'perspective(0.5em) rotateX(359deg)',
  },
  indexContentTableBase: {
    ...tableStyle,
    // top: '110%',
    // height: '100%',
    // width: '10%',
    // borderRadius: '10%',
  },
});

const useStyles = makeStyles(styles);

function Index() {
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const tabletopRef = useRef(null);
  const tablesideRef = useRef(null);
  const tableBaseRef = useRef(null);
  const [openDoor, setOpenDoor] = useState(false);
  const classes = useStyles();
  const {
    index,
    indexLeftDoor,
    indexLeftDoorHandle,
    indexRightDoor,
    indexRightDoorHandle,
    indexContent,
    indexContentTable,
    indexContentTableside,
    indexContentTableBase,
  } = classes;

  useEffect(() => {
    if (openDoor === true) {
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
        // autoplay: false,
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
        // autoplay: false,
        complete() {
          console.log(tablesideRef.current);
        },
      });
    } else if (openDoor === false) {
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
  }, [openDoor]);

  return (
    <div className={index} onClick={() => setOpenDoor(!openDoor)}>
      <div className={indexLeftDoor} ref={leftDoorRef}>
        <div className={indexLeftDoorHandle} />
      </div>
      <div className={indexRightDoor} ref={rightDoorRef}>
        <div className={indexRightDoorHandle} />
      </div>
      <div className={indexContent}>
        <div className={indexContentTable} ref={tabletopRef}>
          <div className={indexContentTableside} ref={tablesideRef} />
          <div className={indexContentTableBase} ref={tableBaseRef} />
        </div>
      </div>
    </div>
  );
}

export default Index;
