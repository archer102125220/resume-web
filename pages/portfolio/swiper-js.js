import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import SwiperJs from '@/components/SwiperJs';

import useGTMTrack from '@/hooks/useGTMTrack';

const styles = {
  swiperJsPage: {
    // width: '100%',
    height: '70dvh'
    // overflow: 'hidden'
  },
  swiperJsPageContent: {
    width: '100%',
    height: '100%',
    overflowX: 'hidden'
  },
  swiperJsPageContentSlide: {
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  }
};

const useStyles = makeStyles(styles);

const slideList = [];

for (let i = 0; i <= 100; i++) {
  // _tabList.push(i);
  let slide = '';
  for (let j = i; j >= 0; j--) {
    slide += j;
  }
  slideList.push(slide);
}

export function SwiperJsPage(props) {
  useGTMTrack({ event: 'scnOpen', url: '/portfolio/swiper-js' });

  const [slideValue, setSlideValue] = useState(1);

  const classes = useStyles(props);

  useEffect(() => {
    console.log({ slideValue });
  }, [slideValue]);

  return (
    <div className={classes.swiperJsPage}>
      <SwiperJs
        className={classes.swiperJsPageContent}
        shouldFillHeight={true}
        value={slideValue}
        slideList={slideList}
        renderSlide={({ item, index, isSliderMoveing }) => (
          <div className={classes.swiperJsPageContentSlide}>
            <p>item: {item}</p>
            <p>index: {index}</p>
            <p>isSliderMoveing: {`${isSliderMoveing}`}</p>
          </div>
        )}
        change={setSlideValue}
      />
    </div>
  );
}

export default SwiperJsPage;
