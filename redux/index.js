import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import system from '@/redux/system';

export const wrapper = createWrapper(function () {
  const combinedReducer = combineReducers({
    system
  });

  const reducer = (state, action) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state,
        ...action.payload,
      };
      return nextState;
    } else {
      return combinedReducer(state, action);
    }
  };

  const reduxStore = configureStore({
    reducer,
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  });

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
