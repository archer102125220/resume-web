import { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import anime from 'animejs';

// https://www.atjiang.com/create-grids-via-css-linear-gradient/
const doorStyle = {
  position: 'absolute',
  top: 0,
  background: '#ffe7c0',
  backgroundImage:
    'linear-gradient(rgb(106 106 106) 1px, transparent 0), linear-gradient(90deg, rgb(106 106 106) 1px, transparent 0)',
  backgroundSize: '50px 50px, 50px 50px',
  border: 0,
  borderStyle: 'solid',
  cursor: 'pointer',
};

const doorHandleStyle = {
  position: 'absolute',
  top: '50%',
  background: '#000',
  width: '50px',
  height: '50px',
  borderRadius: 100,
};

const styles = {
  index: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
  indexLeftDoor: {
    ...doorStyle,
    width: '50%',
    height: '100%',
    borderRight: '2px',
    left: 0,
  },
  indexRightDoor: {
    ...doorStyle,
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
  textArea: {
    textAlign: 'center',
  },
};

const useStyles = makeStyles(styles);

function Index() {
  const reftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const [openDoor, setOpenDoor] = useState(false);
  const classes = useStyles() || {};
  const {
    index,
    indexLeftDoor,
    indexLeftDoorHandle,
    indexRightDoor,
    indexRightDoorHandle,
    textArea,
  } = classes;

  useEffect(() => {
    if (openDoor === true) {
      anime({
        targets: reftDoorRef.current,
        translateX: '-100%',
        duration: 1000,
        complete() {
          console.log(reftDoorRef.current);
        },
      });
      anime({
        targets: rightDoorRef.current,
        translateX: '100%',
        duration: 1000,
        complete() {
          console.log(rightDoorRef.current);
        },
      });
    } else if (openDoor === false) {
      anime({
        targets: reftDoorRef.current,
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
      <div className={indexLeftDoor} ref={reftDoorRef}>
        <div className={indexLeftDoorHandle} />
      </div>
      <div className={indexRightDoor} ref={rightDoorRef}>
        <div className={indexRightDoorHandle} />
      </div>
      <p className={textArea}>
        不好意思，其餘頁面與動畫正在設計中，感謝您的來訪~
      </p>
    </div>
  );
}

export default Index;
