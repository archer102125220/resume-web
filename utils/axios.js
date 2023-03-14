import axios from 'axios';
import qs from 'qs';

// https://github.com/axios/axios/issues/5072
// import { cacheAdapterEnhancer } from 'axios-extensions';

import cacheAdapterEnhancer from '@/utils/axios-extensions';
import LRUCache from 'lru-cache';

const baseURL = process.env.AXIOS_BASE_URL;

// https://www.hai-fe.com/docs/nuxt/apiCache.html
// https://www.npmjs.com/package/lru-cache
// api資料快取儲存物件
const cacheCfg = new LRUCache({
  ttl: 1000 * 60 * 10,
  max: 100,
});
const ax = axios.create({
  baseURL,
  adapter: cacheAdapterEnhancer(
    axios.defaults.adapter,
    {
      enabledByDefault: false,
      cacheFlag: 'useCache',
      defaultCache: cacheCfg,
    }
  )
});

export class cancelRequest {
  requestCancelerList = {};

  getRequestKey(method, url, params) {
    let requestKey = method.toLocaleLowerCase() + '|__|' + url;
    if (typeof params === 'object' && params !== null) {
      requestKey += '|__|' + JSON.stringify(params);
    }
    return requestKey;
  }

  addRequestCanceler(cancel, method = 'GET', url, params) {
    const key = this.getRequestKey(method, url, params);
    this.requestCancelerList[key] = cancel;
  }
  getRequestCanceler(method = 'GET', url, params) {
    const key = this.getRequestKey(method, url, params);
    return this.requestCancelerList[key];
  }
  removeRequestCanceler(method = 'GET', url, params) {
    const key = this.getRequestKey(method, url, params);
    this.requestCancelerList[key] = null;
  }

  handlerCancel = (method = 'GET', url, params) => {
    const key = this.getRequestKey(method, url, params);
    const requestCanceler = this.requestCancelerList[key] || {};
    if (typeof requestCanceler === 'object' && requestCanceler !== null) {
      requestCanceler.abort();
      this.requestCancelerList[key] = null;
    }
  };
  handlerCancelAll = () => {
    const requestCancelerList = this.requestCancelerList;
    Object.keys(requestCancelerList).forEach((requestCancelerKey) => {
      const requestCanceler = requestCancelerList[requestCancelerKey] || {};
      if (typeof requestCanceler === 'object' && requestCanceler !== null) {
        requestCanceler.abort();
        this.requestCancelerList[requestCancelerKey] = null;
      }
    });
  };
}

export const CancelRequest = new cancelRequest();

ax.interceptors.request.use(function (config) {
  const controller = new AbortController();
  let params = config.params;
  const configData = config.data;
  if (configData) {
    params = JSON.parse(configData);
  }
  const cfg = {
    ...config,
    signal: controller.signal,
  };
  CancelRequest.addRequestCanceler(
    controller,
    config.method,
    config.url,
    params
  );
  return cfg;
});

function request(_method = 'GET', url, _params = {}, _extendOption = {}) {
  const method = _method.toUpperCase();
  let params = {};

  switch (method) {
    case (method.match(/POST|PUT|PATCH/) || {}).input:
      params.data = _params;
      break;
    case (method.match(/GET/) || {}).input:
      params.params = _params;
      break;
    default:
      params = {};
      break;
  }
  return ax
    .request({
      url,
      method,
      paramsSerializer: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
      ...params,
      ..._extendOption,
      // withCredentials: true,
    })
    .then((response) => {
      const { config, data } = response;
      let params = config.params;
      const configData = config.data;
      if (configData) {
        params = JSON.parse(configData);
      }
      CancelRequest.removeRequestCanceler(config.method, config.url, params);
      return data;
    });
}

request.ax = ax;
request.axios = axios;
request.baseURL = baseURL;
request.get = function (...arg) {
  return request('GET', ...arg);
};
request.post = function (...arg) {
  return request('POST', ...arg);
};
request.put = function (...arg) {
  return request('PUT', ...arg);
};
request.delete = function (...arg) {
  return request('DELETE', ...arg);
};
request.patch = function (...arg) {
  return request('PATCH', ...arg);
};
request.cancel = CancelRequest.handlerCancel;
request.getCancel = function (...arg) {
  return CancelRequest.handlerCancel('get', ...arg);
};
request.postCancel = function (...arg) {
  return CancelRequest.handlerCancel('post', ...arg);
};
request.putCancel = function (...arg) {
  return CancelRequest.handlerCancel('put', ...arg);
};
request.deleteCancel = function (...arg) {
  return CancelRequest.handlerCancel('delete', ...arg);
};
request.patchCancel = function (...arg) {
  return CancelRequest.handlerCancel('patch', ...arg);
};
request.cancelAll = CancelRequest.handlerCancelAll;

export default request;
