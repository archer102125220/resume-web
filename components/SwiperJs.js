'use client';
// import PropTypes from 'prop-types';
import { useState, useRef, useCallback, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import _debounce from 'lodash/debounce';

// Import Swiper and modules
import Swiper from 'swiper';
// import { SwiperOptions } from 'swiper/types';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const swiper_js_prev_next = {
  position: 'absolute',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%'
};
const swiper_js_prev_next_btn = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '24px',
  height: '24px',
  borderRadius: '100%',
  color: '#fff',
  backgroundColor: '#008cff'
};

const styles = {
  swiperJs: {
    position: 'relative'
  },
  swiperJsPrev: {
    ...swiper_js_prev_next,
    left: '5px'
  },
  swiperJsPrevBtn: swiper_js_prev_next_btn,
  swiperJsNext: {
    ...swiper_js_prev_next,
    right: '5px'
  },
  swiperJsNextBtn: swiper_js_prev_next_btn,
  swiperJsContent: {
    // height: '100%',
    height: 'var(--content_wrapper_slide_height)'
  },
  swiperJsContentWrapper: {
    // height: '100%',
    height: 'var(--content_wrapper_slide_height)'
  },
  swiperJsContentWrapperSlide: {
    // height: '100%',
    // overflowY: 'auto',
    // overflowX: 'hidden',

    display: 'var(--slide_display)',
    flexDirection: 'var(--slide_flex_direction)',

    // height: 'var(--content_wrapper_slide_height)',
    height: 'var(--content_wrapper_slide_height)'
  },
  swiperJsContentWrapperSlideCenter: {
    position: 'relative',
    flex: 'var(--center_flex)',
    display: 'flex',
    height: 'var(--content_wrapper_slide_height)',
    maxHeight: 'var(--content_wrapper_slide_height)'
  },
  swiperJsContentWrapperSlideCenterMiddle: {
    flex: 1,
    position: 'relative',
    height: 'var(--content_wrapper_slide_height)',
    overflowY: 'var(--slide_overflow_y)',
    overflowX: 'var(--slide_overflow_x)'
  }
};

const useStyles = makeStyles(styles);

export function SwiperJs(props) {
  const {
    // render相關參數
    className = '',
    renderPrevBtn: RenderPrevBtn = null,
    renderNextBtn: RenderNextBtn = null,
    slideList = [],
    valueKey = null,
    renderSlideTop: RenderSlideTop = null,
    renderSlideLeft: RenderSlideLeft = null,
    renderSlideMiddleTop: RenderSlideMiddleTop = null,
    renderSlide: RenderSlide = null,
    renderSlideMiddleBottom: RenderSlideMiddleBottom = null,
    renderSlideRight: RenderSlideRight = null,
    renderSlideBottom: RenderSlideBottom = null,

    // css變數相關參數
    overflow = false,
    shouldFillHeight = false,
    swiperHeight = '',

    // 原生Swiper.js相關參數
    centeredSlides = null,
    slidesPerView = 1,
    spaceBetween = null,
    longSwipesRatio = 0.2,
    loop = false,
    autoplayDelay = null,
    autoplayDisableOnInteraction = false,
    paginationClickable = true,
    dynamicBullets = false,

    // 與原生Swiper.js磨合相關參數
    value = 0,
    hasNavigation = false,
    hasPagination = false,
    hasScrollbar = false,

    // 原生Swiper.js相關事件參數
    change = null,
    beforeInit = null,
    init = null,
    afterInit = null,
    beforeDestroy = null,
    destroy = null,
    beforeSlideChangeStart = null,
    slideChange = null,
    slideChangeTransitionEnd = null,
    sliderMove = null,
    reachBeginning = null,
    reachEnd = null,
    fromEdge = null,
    activeIndexChange = null,
    beforeTransitionStart = null,
    realIndexChange = null
  } = props;

  const classes = useStyles(props);

  const swiperJsRootRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const paginationRef = useRef(null);
  const scrollbarRef = useRef(null);

  const [swiperObj, setSwiperObj] = useState(null);
  const [params, setParams] = useState(null);
  const [isSliderMoveing, setIsSliderMoveing] = useState(false);

  const [cssVariable, setCssVariable] = useState(null);

  const resetMoveingStatus = useCallback(() => {
    setIsSliderMoveing(false);
  }, []);
  const resetSwiperScroll = useCallback(() => {
    // 校正 slide 位置，避免有任何scroll事件影響swiper位置
    if (swiperJsRootRef.current?.scrollWidth > 0) {
      swiperJsRootRef.current.scrollTo(0, 0);
    }
  }, []);

  const syncSlide = useCallback(
    (value, swiper) => {
      if (
        typeof swiper?.slideTo !== 'function' ||
        Array.isArray(slideList) === false ||
        slideList.length <= 0
      ) {
        return;
      }
      const _slideIndex = slideList.findIndex(
        slide =>
          (loop === true &&
            (`${slide?.[valueKey]}` === value ||
              `${slide?.value}` === value)) ||
          (loop === false &&
            (slide?.[valueKey] === value || slide?.value === value))
      );
      const slideIndex =
        typeof _slideIndex === 'number' && _slideIndex > -1
          ? _slideIndex
          : value;

      if (Number(slideIndex) !== swiper.realIndex) {
        if (loop === true) {
          swiper.slideToLoop(slideIndex || 0);
        } else {
          swiper.slideTo(slideIndex || 0);
        }
      }
    },
    [slideList, loop, valueKey]
  );
  const syncSlideList = useCallback(
    (newSlideList = [], swiper) => {
      if (
        typeof swiper?.slideTo !== 'function' ||
        Array.isArray(newSlideList) === false ||
        newSlideList.length <= 0
      ) {
        return;
      }
      const _slideIndex = newSlideList.findIndex(
        slide => slide?.[valueKey] === value || slide?.value === value
      );
      const slideIndex =
        typeof _slideIndex === 'number' && _slideIndex > -1
          ? _slideIndex
          : value;
      swiper.slideTo(slideIndex || 0);
    },
    [valueKey, value]
  );

  const handleAfterInit = useCallback(
    swiper => {
      if (typeof afterInit === 'function') {
        afterInit(swiper);
      }
    },
    [afterInit]
  );
  const changeDebounce = useCallback(
    _debounce((slideValue, activeIndex) => {
      if (typeof change === 'function') {
        change(
          isNaN(slideValue) ? slideValue : Number(slideValue),
          activeIndex
        );
      }
    }, 200),
    [change]
  );
  const handleSlideChange = useCallback(
    (swiper, ...arg) => {
      if (loop === true) {
        const slideValueEl = swiper.slides[swiper.activeIndex];
        const slideValue = slideValueEl?.getAttribute('swiper-loop-value');

        if (`${value}` !== slideValue) {
          changeDebounce(slideValue, swiper.activeIndex);
        }
      } else {
        // const slideData = slideList[swiper.activeIndex];
        // const slideValue =
        //   slideData?.[valueKey] || slideData?.value || swiper.activeIndex;
        const slideData = slideList[swiper.realIndex];
        const slideValue =
          slideData?.[valueKey] || slideData?.value || swiper.realIndex;

        if (value !== slideValue) {
          changeDebounce(slideValue, swiper.activeIndex);
        }
      }

      if (typeof slideChange === 'function') {
        slideChange(swiper, ...arg);
      }
    },
    [loop, changeDebounce, slideList, valueKey, value, slideChange]
  );
  const handleSliderMove = useCallback(
    (swiper, ...arg) => {
      if (typeof sliderMove === 'function') {
        sliderMove(swiper, ...arg);
      }
      setIsSliderMoveing(true);
    },
    [sliderMove]
  );
  const handleSwiperInit = useCallback(() => {
    const _params = {
      modules: [],
      centeredSlides,
      slidesPerView,
      spaceBetween,
      longSwipesRatio,
      on: {
        beforeInit,
        init,
        afterInit: handleAfterInit,
        beforeDestroy,
        destroy,
        beforeSlideChangeStart,
        slideChange: handleSlideChange,
        sliderMove: handleSliderMove,
        reachBeginning,
        reachEnd,
        fromEdge,
        activeIndexChange,
        beforeTransitionStart,
        realIndexChange,
        slideChangeTransitionEnd
      }
    };
    if (hasNavigation === true) {
      _params.modules = [..._params.modules, Navigation];
      _params.navigation = {
        nextEl: nextRef.current,
        prevEl: prevRef.current
      };
    }
    if (hasPagination === true) {
      _params.modules = [..._params.modules, Pagination];
      _params.pagination = {
        el: paginationRef.current,
        clickable: paginationClickable,
        dynamicBullets: dynamicBullets
      };
    }
    if (hasScrollbar === true) {
      _params.modules = [..._params.modules, Scrollbar];
      _params.scrollbar = {
        el: scrollbarRef.current
      };
    }

    if (autoplayDelay !== null && isNaN(autoplayDelay) === false) {
      _params.modules = [..._params.modules, Autoplay];
      _params.autoplay = {
        delay: autoplayDelay,
        disableOnInteraction: autoplayDisableOnInteraction
      };
    }
    if (loop === true) {
      _params.loop = loop;
    }

    setSwiperObj(new Swiper(swiperRef.current, _params));
    setParams(_params);
  }, [
    centeredSlides,
    slidesPerView,
    spaceBetween,
    longSwipesRatio,

    beforeInit,
    init,
    handleAfterInit,
    beforeDestroy,
    destroy,
    beforeSlideChangeStart,
    handleSlideChange,
    handleSliderMove,
    reachBeginning,
    reachEnd,
    fromEdge,
    activeIndexChange,
    beforeTransitionStart,
    realIndexChange,
    slideChangeTransitionEnd,

    hasNavigation,

    hasPagination,
    paginationClickable,
    dynamicBullets,

    hasScrollbar,
    autoplayDelay,
    autoplayDisableOnInteraction,
    loop
  ]);
  const handleSwiperUpdata = useCallback(
    newProps => {
      if (
        typeof swiperObj?.update === 'function' &&
        Array.isArray(newProps.slideList) &&
        newProps.slideList.length > 0
      ) {
        const _params = {
          ...(params || {}),
          modules: [],
          centeredSlides: newProps.centeredSlides,
          slidesPerView: newProps.slidesPerView,
          spaceBetween: newProps.spaceBetween,
          longSwipesRatio: newProps.longSwipesRatio
        };
        if (newProps.hasNavigation === true) {
          _params.modules = [..._params.modules, Navigation];
          _params.navigation = {
            nextEl: nextRef.current,
            prevEl: prevRef.current
          };
        }
        if (newProps.hasPagination === true) {
          _params.modules = [..._params.modules, Pagination];
          _params.pagination = {
            el: paginationRef.current,
            clickable: newProps.paginationClickable,
            dynamicBullets: newProps.dynamicBullets
          };
        }
        if (newProps.hasScrollbar === true) {
          _params.modules = [..._params.modules, Scrollbar];
          _params.scrollbar = {
            el: scrollbarRef.current
          };
        }

        if (
          newProps.autoplayDelay !== null &&
          isNaN(newProps.autoplayDelay) === false
        ) {
          _params.modules = [..._params.modules, Autoplay];
          _params.autoplay = {
            delay: newProps.autoplayDelay,
            disableOnInteraction: newProps.autoplayDisableOnInteraction
          };
        }

        swiperObj.update(_params);
        swiperObj.updateSize();
        swiperObj.updateSlides();
        setParams(_params);

        // 校正 slide 位置
        swiperObj.off('slideChange', handleSlideChange);
        swiperObj.slideTo(props.slideList.length - 1, 0, false);
        setTimeout(() => {
          swiperObj.on('slideChange', handleSlideChange);
          syncSlide(value, swiperObj);
        }, 300);
      }
    },
    [swiperObj, value]
  );

  useEffect(() => {
    const _cssVariable = {};

    if (typeof overflow === 'boolean' && overflow === true) {
      _cssVariable['--content_wrapper_slide_height'] = '100%';
      _cssVariable['--slide_height'] = '100%';
      _cssVariable['--slide_overflow_y'] = 'auto';
      _cssVariable['--slide_overflow_x'] = 'hidden';
    }

    if (typeof shouldFillHeight === 'boolean' && shouldFillHeight === true) {
      _cssVariable['--content_wrapper_slide_height'] = '100%';
      _cssVariable['--slide_height'] = '100%';
      _cssVariable['--slide_display'] = 'flex';
      _cssVariable['--slide_flex_direction'] = 'column';
      _cssVariable['--center_flex'] = 1;
    }

    if (typeof swiperHeight === 'string' && swiperHeight !== '') {
      _cssVariable['--content_wrapper_slide_height'] = swiperHeight;
      _cssVariable['--slide_height'] = swiperHeight;
    } else if (swiperHeight !== '' && isNaN(Number(swiperHeight)) === false) {
      _cssVariable['--content_wrapper_slide_height'] = `${swiperHeight}px`;
      _cssVariable['--slide_height'] = `${swiperHeight}px`;
    } else {
      // _cssVariable["--content_wrapper_slide_height"] = "";
      _cssVariable['--slide_height'] = '';
    }

    setCssVariable(_cssVariable);
  }, [overflow, shouldFillHeight, swiperHeight]);

  useEffect(() => {
    if (typeof swiperRef.current?.swiper === 'undefined') return;
    // handleSwiperUpdata(props);

    window.requestAnimationFrame(() => {
      handleSwiperUpdata(props);
      syncSlideList(props.slideList, swiperObj);

      const newValue = props.loop === true ? `${props.value}` : props.value;
      syncSlide(newValue, swiperObj);
    });
  }, [props]);
  useEffect(() => {
    if (typeof swiperRef.current?.swiper !== 'undefined') return;
    handleSwiperInit();
  }, [handleSwiperInit]);

  return (
    <div
      ref={swiperJsRootRef}
      className={[classes.swiperJs, className].join(' ')}
      style={cssVariable}
      onMouseUp={resetMoveingStatus}
      onTouchEnd={resetMoveingStatus}
      onScroll={resetSwiperScroll}
    >
      {/* If we need navigation buttons */}
      {hasNavigation === true && (
        <div ref={prevRef} className={classes['swiperJsPrev']}>
          {/* <slot name="prev">
          <div className={classes["swiperJsPrevBtn"]}>
            { '<' }
          </div>
        </slot> */}
          {typeof RenderPrevBtn === 'function' ? (
            <RenderPrevBtn />
          ) : (
            <div className={classes.swiperJsPrevBtn}>{'<'}</div>
          )}
        </div>
      )}
      {hasNavigation === true && (
        <div ref={nextRef} className={classes['swiperJsNext']}>
          {/* <slot name="next">
          <div className={classes["swiperJsPrevBtn"]}>
            { '>' }
          </div>
        </slot> */}
          {typeof RenderNextBtn === 'function' ? (
            <RenderNextBtn />
          ) : (
            <div className={classes.swiperJsPrevBtn}>{'<'}</div>
          )}
        </div>
      )}

      {/* Additional required wrapper */}
      <div ref={swiperRef} className={classes.swiperJsContent}>
        <div
          className={[classes['swiperJsContentWrapper'], 'swiper-wrapper'].join(
            ' '
          )}
        >
          {/* Slides */}
          {slideList.map((slide, index) => (
            <div
              key={slide[valueKey] || slide.value || index}
              swiper-loop-value={slide[valueKey] || slide.value || index}
              className={[
                classes['swiperJsContentWrapperSlide'],
                'swiper-slide'
              ].join(' ')}
            >
              {/* <slot
                v-if="slotNameIsDefault === false"
                name="`${slide[slotNameKey] || slide.slotName || index}-top`"
                item="slide"
                index="index"
                is-slider-moveing="isSliderMoveing"
              />
              <slot
                v-else
                name="default-top"
                item="slide"
                index="index"
                is-slider-moveing="isSliderMoveing"
              /> */}
              {typeof RenderSlideTop === 'function' ? (
                <RenderSlideTop
                  item={slide}
                  index={index}
                  isSliderMoveing={isSliderMoveing}
                />
              ) : (
                ''
              )}

              <div className={classes['swiperJsContentWrapperSlideCenter']}>
                {/* <slot
                  v-if="slotNameIsDefault === false"
                  name="`${slide[slotNameKey] || slide.slotName || index}-left`"
                  item="slide"
                  index="index"
                  is-slider-moveing="isSliderMoveing"
                />
                <slot
                  v-else
                  name="default-left"
                  item="slide"
                  index="index"
                  is-slider-moveing="isSliderMoveing"
                /> */}
                {typeof RenderSlideLeft === 'function' ? (
                  <RenderSlideLeft
                    item={slide}
                    index={index}
                    isSliderMoveing={isSliderMoveing}
                  />
                ) : (
                  ''
                )}

                <div
                  className={classes['swiperJsContentWrapperSlideCenterMiddle']}
                >
                  {/* <slot
                    v-if="slotNameIsDefault === false"
                    name="`${
                    slide[slotNameKey] || slide.slotName || index
                  }-middle_top`"
                    item="slide"
                    index="index"
                    is-slider-moveing="isSliderMoveing"
                  />
                  <slot
                    v-else
                    name="default-middle_top"
                    item="slide"
                    index="index"
                    is-slider-moveing="isSliderMoveing"
                  /> */}
                  {typeof RenderSlideMiddleTop === 'function' ? (
                    <RenderSlideMiddleTop
                      item={slide}
                      index={index}
                      isSliderMoveing={isSliderMoveing}
                    />
                  ) : (
                    ''
                  )}

                  {/* <slot
                    v-if="slotNameIsDefault === false"
                    name="slide[slotNameKey] || slide.slotName || index"
                    item="slide"
                    index="index"
                    is-slider-moveing="isSliderMoveing"
                  >
                    <p>{slide.content || slide}</p>
                  </slot>
                  <slot
                    v-else
                    item="slide"
                    index="index"
                    is-slider-moveing="isSliderMoveing"
                  >
                    <p> {slide.content || slide}</p>
                  </slot> */}
                  {typeof RenderSlide === 'function' ? (
                    <RenderSlide
                      item={slide}
                      index={index}
                      isSliderMoveing={isSliderMoveing}
                    />
                  ) : (
                    <p>{slide.content || slide}</p>
                  )}

                  {/* <slot
                    v-if="slotNameIsDefault === false"
                    name="`${
                    slide[slotNameKey] || slide.slotName || index
                  }-middle_bottom`"
                    item="slide"
                    index="index"
                    is-slider-moveing="isSliderMoveing"
                  />
                  <slot
                    v-else
                    name="default-middle_bottom"
                    item="slide"
                    index="index"
                    is-slider-moveing="isSliderMoveing"
                  /> */}
                  {typeof RenderSlideMiddleBottom === 'function' ? (
                    <RenderSlideMiddleBottom
                      item={slide}
                      index={index}
                      isSliderMoveing={isSliderMoveing}
                    />
                  ) : (
                    ''
                  )}
                </div>

                {/* <slot
                  v-if="slotNameIsDefault === false"
                  name="`${slide[slotNameKey] || slide.slotName || index}-right`"
                  item="slide"
                  index="index"
                  is-slider-moveing="isSliderMoveing"
                />
                <slot
                  v-else
                  name="default-right"
                  item="slide"
                  index="index"
                  is-slider-moveing="isSliderMoveing"
                /> */}
                {typeof RenderSlideRight === 'function' ? (
                  <RenderSlideRight
                    item={slide}
                    index={index}
                    isSliderMoveing={isSliderMoveing}
                  />
                ) : (
                  ''
                )}
              </div>

              {/* <slot
                v-if="slotNameIsDefault === false"
                name="`${slide[slotNameKey] || slide.slotName || index}-bottom`"
                item="slide"
                index="index"
                is-slider-moveing="isSliderMoveing"
              />
              <slot
                v-else
                name="default-bottom"
                item="slide"
                index="index"
                is-slider-moveing="isSliderMoveing"
              /> */}
              {typeof RenderSlideBottom === 'function' ? (
                <RenderSlideBottom
                  item={slide}
                  index={index}
                  isSliderMoveing={isSliderMoveing}
                />
              ) : (
                ''
              )}
            </div>
          ))}
        </div>
      </div>

      {/* If we need pagination */}
      {hasPagination === true && (
        <div ref={paginationRef} className="swiper-pagination" />
      )}

      {/* If we need scrollbar */}
      {hasScrollbar === true && (
        <div ref={scrollbarRef} className="swiper-scrollbar" />
      )}
    </div>
  );
}

// propTypes 即將被移除：https://github.com/woocommerce/woocommerce/issues/49534
// SwiperJs.propTypes = {
//   value: [PropTypes.number, PropTypes.string, PropTypes.object],
//   valueKey: [PropTypes.string, PropTypes.number],
//   longSwipesRatio: PropTypes.number,
//   slideList: PropTypes.array,
//   RenderSlideTop: PropTypes.func,
//   RenderSlideLeft: PropTypes.func,
//   RenderSlideMiddleTop: PropTypes.func,
//   RenderSlide: PropTypes.func,
//   RenderSlideMiddleBottom: PropTypes.func,
//   RenderSlideRight: PropTypes.func,
//   RenderSlideBottom: PropTypes.func,
//   centeredSlides: PropTypes.Boolean,
//   spaceBetween: [PropTypes.string, PropTypes.number],
//   overflow: PropTypes.Boolean,
//   hasPagination: PropTypes.Boolean,
//   paginationClickable: PropTypes.Boolean,
//   dynamicBullets: PropTypes.Boolean,
//   hasNavigation: PropTypes.Boolean,
//   RenderPrevBtn: PropTypes.func,
//   RenderNextBtn: PropTypes.func,
//   autoplayDelay: PropTypes.number,
//   autoplayDisableOnInteraction: PropTypes.Boolean,
//   slidesPerView: [PropTypes.string, PropTypes.number],
//   loop: PropTypes.Boolean,
//   hasScrollbar: PropTypes.Boolean,
//   shouldFillHeight: PropTypes.Boolean,
//   swiperHeight: [PropTypes.string, PropTypes.number],

//   change: PropTypes.func,
//   beforeInit: PropTypes.func,
//   init: PropTypes.func,
//   afterInit: PropTypes.func,
//   beforeDestroy: PropTypes.func,
//   destroy: PropTypes.func,
//   beforeSlideChangeStart: PropTypes.func,
//   slideChange: PropTypes.func,
//   slideChangeTransitionEnd: PropTypes.func,
//   sliderMove: PropTypes.func,
//   reachBeginning: PropTypes.func,
//   reachEnd: PropTypes.func,
//   fromEdge: PropTypes.func,
//   activeIndexChange: PropTypes.func,
//   beforeTransitionStart: PropTypes.func,
//   realIndexChange: PropTypes.func
// };

export default SwiperJs;
