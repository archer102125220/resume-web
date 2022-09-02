import axios from 'axios';
import qs from 'qs';

const baseURL = process.env.AXIOS_BASE_URL;

const ax = axios.create({ baseURL });

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

export default request;