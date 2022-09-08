import axios from 'axios';
import qs from 'qs';

const baseURL = process.env.AXIOS_BASE_URL;

const ax = axios.create({ baseURL });

export class cancelRequest {
  requestCancelerList = {};

  addRequestCanceler(cancel, method = 'GET', url) {
    const key = method.toLocaleLowerCase() + '_' + url;
    this.requestCancelerList[key] = cancel;
  }
  getRequestCanceler(method = 'GET', url) {
    const key = method.toLocaleLowerCase() + '_' + url;
    return this.requestCancelerList[key];
  }
  removeRequestCanceler(method = 'GET', url) {
    const key = method.toLocaleLowerCase() + '_' + url;
    this.requestCancelerList[key] = null;
  }

  handlerCancel = (method = 'GET', url) => {
    const key = method.toLocaleLowerCase() + '_' + url;
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

const CancelRequest = new cancelRequest();

ax.interceptors.request.use(function (config) {
  const controller = new AbortController();
  const cfg = {
    ...config,
    signal: controller.signal,
  };
  CancelRequest.addRequestCanceler(controller, config.method, config.url);
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
    .then((response) => response.data);
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
