import qs from 'qs';
// https://juejin.cn/post/6974902702400602148

function generateReqKey(config) {
  const { method, url, params, data } = config;
  return [method, url, qs.stringify(params), qs.stringify(data)].join('&');
}

function isCacheLike(cache) {
  return !!(cache.set && cache.get && cache.delete && cache.clear
    && typeof cache.get === 'function' && typeof cache.set === 'function'
    && typeof cache.delete === 'function' && typeof cache.clear === 'function'
  );
}

export default function cacheAdapterEnhancer(adapter, options) {
  const { maxAge, enabledByDefault = true,
    cacheFlag = 'cache', defaultCache = options.defaultCache,
  } = options;

  return (config) => {
    const { method, forceUpdate } = config;
    const useCache = config[cacheFlag] !== undefined && config[cacheFlag] !== null
      ? config[cacheFlag]
      : enabledByDefault;
    if (method === 'get' && useCache) {
      const cache = isCacheLike(useCache) ? useCache : defaultCache;
      const requestKey = generateReqKey(config);  // 生成請求Key
      let responsePromise = cache.get(requestKey); // 從快取中取得請求key對應的響應對象
      if (!responsePromise || forceUpdate) { // 快取未命中/失效或強制更新時，則重新請求資料
        responsePromise = (async () => {
          try {
            return await adapter(config);  // 使用預設的xhrAdapter發送請求
          } catch (reason) {
            cache.delete(requestKey);
            throw reason;
          }
        })();
        cache.set(requestKey, responsePromise, maxAge);  // 保存請求回傳的響應對象
        return responsePromise; // 回傳已經保存得響應對象
      }
      return responsePromise;
    }
    return adapter(config); // 使用預設的xhrAdapter發送請求
  };
}