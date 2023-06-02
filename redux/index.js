import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import system from '@/redux/system';
import firebaseAdmin from '@/redux/firebaseAdmin';
import tappay from '@/redux/tappay';

// 經過數次測試，若伺服端需要透過req等連線資訊初始化資料池，若頁面不觸發wrapper.getServerSideProps，則createWrapper內的function無法接到相關餐數
export const wrapper = createWrapper(function (appContext) {
  const combinedReducer = combineReducers({
    system,
    firebaseAdmin,
    tappay
  });

  const reducer = (state, action) => {
    // console.log({
    //   'action.type': action.type,
    //   'action.payload': action.payload
    // });
    if (action.type === HYDRATE) {
      const nextState = {
        ...state,
        ...action.payload
      };
      return nextState;
    } else {
      return combinedReducer(state, action);
    }
    // return combinedReducer(state, action);
  };

  const reduxStore = configureStore({
    reducer,
    devTools: process.env.NODE_ENV === 'development',
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false })
  });

  if (typeof window !== 'object') {
    const userAgent = appContext?.req?.headers?.['user-agent'] || '';
    const isMobile =
      userAgent.includes('Android') || userAgent.includes('iPhone');
    reduxStore.dispatch({ type: 'system/SAVE_is_mobile', payload: isMobile });
  }

  return reduxStore;
});

// export function wrapperGetServerSideProps(mainCallback, secondCallback) {
//   return wrapper.getServerSideProps((store) => {
//     if (typeof (secondCallback) === 'function') secondCallback(store);
//     return (content) => {
//       return mainCallback(content, store);
//     };
//   });
// }

// export function wrapperGetStaticProps(mainCallback, secondCallback) {
//   return wrapper.getStaticProps((store) => {
//     if (typeof (secondCallback) === 'function') secondCallback(store);
//     return (content) => {
//       return mainCallback(content, store);
//     };
//   });
// }

// export function wrapperGetInitialAppProps(mainCallback, secondCallback) {
//   return wrapper.getInitialAppProps((store) => {
//     if (typeof (secondCallback) === 'function') secondCallback(store);
//     return (content) => {
//       return mainCallback(content, store);
//     };
//   });
// }

// export function wrapperGetInitialPageProps(mainCallback, secondCallback) {
//   return wrapper.getInitialPageProps((store) => {
//     if (typeof (secondCallback) === 'function') secondCallback(store);
//     return (content) => {
//       return mainCallback(content, store);
//     };
//   });
// }
