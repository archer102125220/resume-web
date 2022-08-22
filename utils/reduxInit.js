import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as reduxSagaEffects from 'redux-saga/effects';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import pluginRedux from '@/redux/redux';

export let store;

export default function reduxInit(pluginRedux) {
  // https://github.com/explooosion/react-redux-i18n-boilerplate/blob/master/src/reducers/settings.js
  // https://github.com/ms314006/React-With-Redux-Saga/blob/master/Ch02/src/saga/data.js

  let models = {};
  const mySagaList = [];
  pluginRedux.map((element) => {
    const { namespace, reducers, effects } = element;
    Object.keys(reducers).map((reducersKey) => {
      reducers[`${namespace}/${reducersKey}`] = reducers[reducersKey];
    });
    if (typeof effects === 'object') {
      Object.keys(effects).forEach((effectsKey) => {
        if (effectsKey.includes('/')) {
          const key = effectsKey.split('/');
          if (`${key[0]}/${key[1]}` === effectsKey && key[0] === namespace) {
            return;
          }
        }
        effects[`${namespace}/${effectsKey}`] = function* (args) {
          yield effects[effectsKey](args, reduxSagaEffects);
        };
        function* mySaga() {
          yield reduxSagaEffects.takeEvery(
            `${namespace}/${effectsKey}`,
            effects[`${namespace}/${effectsKey}`]
          );
        }
        mySagaList.push(mySaga());
      });
    }

    models = {
      ...models,
      [namespace]: function (state = element.state, action) {
        // https://shangdeyou.github.io/2021/05/23/lib-of-redux-on-next/
        if (
          action.type === HYDRATE &&
          typeof action.payload[namespace] === 'object'
        ) {
          return { ...state, ...action.payload[namespace] };
        }
        const reducer = reducers[action.type] || (() => {});
        const newState = reducer(state, action) || state;
        return newState;
      },
    };
  });

  function* rootSaga() {
    yield reduxSagaEffects.all(mySagaList);
  }

  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
  const sagaMiddleware = createSagaMiddleware();

  const reduxStore = createStore(
    combineReducers(models),
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  store = reduxStore;

  return reduxStore;
}


export const wrapper = createWrapper(() => reduxInit(pluginRedux));

export function wrapperGetServerSideProps(mainCallback, secondCallback) {
  return wrapper.getServerSideProps((store) => {
    if(typeof(secondCallback) === 'function') secondCallback(store);
    return (content) => {
      return mainCallback(content, store);
    };
});
}

export function wrapperGetStaticProps(mainCallback, secondCallback) {
  return wrapper.getStaticProps((store) => {
    if(typeof(secondCallback) === 'function') secondCallback(store);
    return (content) => {
      return mainCallback(content, store);
    };
  });
}

export function wrapperGetInitialAppProps(mainCallback, secondCallback) {
  return wrapper.getInitialAppProps((store) => {
    if(typeof(secondCallback) === 'function') secondCallback(store);
    return(content) => {
      return mainCallback(content, store);
    };
  });
}

export function wrapperGetInitialPageProps(mainCallback, secondCallback) {
  return wrapper.getInitialPageProps((store) => {
    if(typeof(secondCallback) === 'function') secondCallback(store);
    return (content) => {
      return mainCallback(content, store);
    };
  });
}
